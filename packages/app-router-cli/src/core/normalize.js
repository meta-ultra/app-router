const PRESET_ROOT_LAYOUT = "preset::root-layout";
const PRESET_LAYOUT = "preset::layout";

const GLOBAL_ERROR = "global-error";
const NOT_FOUND = "not-found";

const renameGlobalErrorToError = (props, level) => {
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

const renameNotFound = (props) => {
  // rename "not-found" to "notFound"
  if (props[NOT_FOUND]) {
    props["notFound"] = props[NOT_FOUND];
    delete props[NOT_FOUND];
  }
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
        renameGlobalErrorToError(props, level);
        fulfillLayout(props, level);
        renameNotFound(props);
      }

      const state = { isRemained: false };
      if (node.children && node.children.length) {
        normalize(node.children, level + 1, state);
      }
      // remain current node if it has either page or layout, or any of its descendant has.
      state.isRemained = state.isRemained || props.page || props.layout;
      if (state.isRemained) {
        parentState.isRemained = true;
      } else {
        removingIndexes.push(i);
      }
    }
  }

  for (let i = removingIndexes.length - 1; i >= 0; i--) {
    const pruningIndex = removingIndexes[i];
    nodes.splice(pruningIndex, 1);
  }

  return nodes;
};

export default normalize;
