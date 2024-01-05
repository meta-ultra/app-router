const PRESET_ROOT_LAYOUT = "preset::root-layout";
const PRESET_LAYOUT = "preset::layout";

const GLOBAL_ERROR = "global-error";
const NOT_FOUND = "not-found";

/**
 * rename global-error to error, and remove the global-error property inside the nested routes.
 * @param {*} props
 * @param {*} level
 */
const renameGlobalError = (props, level) => {
  // global-error locates in the root route only, while error locates in the nested route.
  if (level === 0) {
    delete props.error;
    if (props[GLOBAL_ERROR]) {
      // rename global-error to error for follow-up proceeding.
      props.error = props[GLOBAL_ERROR];
      delete props[GLOBAL_ERROR];
    }
  } else {
    delete props[GLOBAL_ERROR];
  }
};

const isNoLayout = (props) => !["layout"].find((propName) => props[propName]);
const isWithUtilities = (props) =>
  !!["loading", "error", "not-found"].find((propName) => props[propName]);
/**
 * fulfill default layout.
 * @param {*} props
 * @param {*} level
 */
const fulfillLayout = (props, level) => {
  if (level === 0) {
    // fulfill preset layout notation for the root route.
    props.layout = props.layout || PRESET_ROOT_LAYOUT;
  } else {
    // fulfill preset layout notation for the nested route with loading, error or not-found, but no layout.
    if (isNoLayout(props) && isWithUtilities(props)) {
      props.layout = PRESET_LAYOUT;
    }
  }
};

/**
 * rename "not-found" to "notFound"
 * @param {*} props
 */
const renameNotFound = (props) => {
  if (props[NOT_FOUND]) {
    props["notFound"] = props[NOT_FOUND];
    delete props[NOT_FOUND];
  }
};

/**
 * remove children of catch-all or optional catch-all route in a place.
 * @param {*} node
 */
const removeCatchAllRouteChildren = (node) => {
  const folderName = node.path.split("/").pop();
  if (
    [/^\[\.{3}[a-z][a-z0-9]*\]$/, /^\[\[\.{3}[a-z][a-z0-9]*\]\]$/].find((regexp) =>
      regexp.test(folderName)
    )
  ) {
    node.children = [];
  }
};

/**
 * sink the page to the level below if it's along with a layout
 * @param {*} node
 */
const sinkPageWithLayout = (node) => {
  if (node.props.page && node.props.layout) {
    node.children.unshift({
      path: `${node.path}/`,
      props: {
        page: node.props.page,
      },
      children: [],
    });
    delete node.props.page;
  }
};

const score = (name) => {
  const result = [
    [/^\s*$/, 1], // index page route
    [/^[a-z][a-z0-9]*$/, 0], // normal route
    [/^\[[a-z][a-z0-9]*\]$/, -1], // dynamic route
    [/^\[\.{3}[a-z][a-z0-9]*\]$/, -2], // catch-all route
    [/^\[\[\.{3}[a-z][a-z0-9]*\]\]$/, -3], // optional catch-all route
  ].find(([regexp]) => regexp.test(name));

  return result ? result[1] : 0;
};
const sortChildren = (node) => {
  node.children.sort((node1, node2) =>
    score(node1.path.split("/").pop()) > score(node2.path.split("/").pop()) ? -1 : 1
  );
};

/**
 * Normalize the nodes returned by `traverseFileSystem` in a place.
 * @param {*} nodes - the return value from `traverseFileSystem`.
 * @param {number} level - the level of tree starts from 0.
 * @param {{isRemained: boolean}} parentState - indicate whether to remain the current branch.
 * @returns
 */
const normalize = (nodes, level = 0, parentState = { isRemained: false }) => {
  const removingIndexes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node) {
      const props = node.props;
      if (props) {
        renameGlobalError(props, level);
        fulfillLayout(props, level);
        renameNotFound(props);
      }

      removeCatchAllRouteChildren(node);
      sinkPageWithLayout(node);
      sortChildren(node);

      // collect nodes to be being removed if it has either page or layout, or any of its descendant has.
      const state = { isRemained: false };
      if (node.children && node.children.length) {
        normalize(node.children, level + 1, state);
      }
      state.isRemained = state.isRemained || props.page || props.layout;
      if (state.isRemained) {
        parentState.isRemained = true;
      } else {
        removingIndexes.push(i);
      }
    }
  }

  // nodes are remained if only it has either page or layout, or any of its descendant has.
  for (let i = removingIndexes.length - 1; i >= 0; i--) {
    const pruningIndex = removingIndexes[i];
    nodes.splice(pruningIndex, 1);
  }

  return nodes;
};

export default normalize;
