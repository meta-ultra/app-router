const {
  PRESET_ROOT_LAYOUT,
  PRESET_LAYOUT,
  GLOBAL_ERROR,
  NOT_FOUND,
  INDEX_RE,
  GROUP_RE,
  NORMAL_RE,
  DYNAMIC_RE,
  CATCH_ALL_RE,
  OPTIONAL_CATCH_ALL_RE,
  PARALLEL_RE,
  INTERCEPTING_SAME_LEVEL_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
} = require("./constants.js");
const {
  isIntercepted,
  isIntercepting,
} = require("./utils.js")

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
  !!["loading", "error", NOT_FOUND].find((propName) => props[propName]);
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

const isCatchAll = (folderName) => !![CATCH_ALL_RE, OPTIONAL_CATCH_ALL_RE].find((re) => re.test(folderName))
/**
 * remove children of catch-all or optional catch-all route in a place.
 * @param {*} node
 */
const removeCatchAllRouteChildren = (node) => {
  const folderName = node.path.split("/").pop();
  if (isCatchAll(folderName)) {
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
    [INDEX_RE, 1], // index page route
    [NORMAL_RE, 0], // normal route
    [DYNAMIC_RE, -1], // dynamic route
    [CATCH_ALL_RE, -2], // catch-all route
    [OPTIONAL_CATCH_ALL_RE, -3], // optional catch-all route
  ].find(([regexp]) => regexp.test(name));

  return result ? result[1] : 0;
};
const sortChildren = (node) => {
  node.children.sort((node1, node2) =>
    score(node1.path.split("/").pop()) > score(node2.path.split("/").pop()) ? -1 : 1
  );
};

/**
 * remove catch-all route if optional catch-all exists
 * @param {*} node
 */
const normalizeDynamicRoute = (node) => {
  if (node.children.length >= 2) {
    // be sure to call sortChildren before calling normalizeDynamicRoute.
    const last1 = node.children[node.children.length - 1];
    const last2 = node.children[node.children.length - 2];
    if (
      OPTIONAL_CATCH_ALL_RE.test(last1.path.split("/").pop()) &&
      CATCH_ALL_RE.test(last2.path.split("/").pop())
    ) {
      node.children.splice(node.children.length - 2, 1);
    }
  }
};

/**
 * remove its own layout and template from parallel route
 */
const normalizeParallelRoute = (node) => {
  if (node.path.split("/").pop().startsWith("@")) {
    node.children = [];
    delete node.props.layout;
    delete node.props.template;
  }
};

const doNormalizeInterceptingRoute = (node) => {
  delete node.props.layout;
  if (node.children && node.children.length) {
    const removingIndexes = [];
    for (let i = 0; i < node.children.length; ++i) {
      const child = node.children[i];
      if (
        [
          PARALLEL_RE,
          INTERCEPTING_SAME_LEVEL_RE,
          INTERCEPTING_ONE_LEVEL_UP_RE,
          INTERCEPTING_TWO_LEVEL_UP_RE,
          INTERCEPTING_ROOT_LEVEL_UP_RE,
        ].find((re) => re.test(child.path.split("/").pop()))
      ) {
        removingIndexes.push(i);
      } else {
        doNormalizeInterceptingRoute(child);
      }
    }

    // remove nested intercepting routes
    for (let i = removingIndexes.length - 1; i >= 0; i--) {
      node.children.splice(removingIndexes[i], 1);
    }
  }
};
const normalizeInterceptingRoute = (node) => {
  const folderName = node.path.split("/").pop();
  if (
    [
      INTERCEPTING_SAME_LEVEL_RE,
      INTERCEPTING_ONE_LEVEL_UP_RE,
      INTERCEPTING_TWO_LEVEL_UP_RE,
      INTERCEPTING_ROOT_LEVEL_UP_RE,
    ].find((re) => re.test(folderName))
  ) {
    doNormalizeInterceptingRoute(node);
  }
};

/**
 * Normalize the nodes returned by `traverseFileSystem` in a place.
 * @param {*} nodes - the return value from `traverseFileSystem`.
 * @param {number} level - the level of tree starts from 0.
 * @param {{isRemained: boolean}} parentState - indicate whether to remain the current branch.
 * @returns
 */
const normalizeBasic = (nodes, level = 0, parentState = { isRemained: false }) => {
  const removingIndexes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node) {
      const props = node.props;

      renameGlobalError(props, level);
      fulfillLayout(props, level);
      renameNotFound(props);
      normalizeParallelRoute(node);
      normalizeInterceptingRoute(node);
      removeCatchAllRouteChildren(node);
      sinkPageWithLayout(node);
      sortChildren(node);
      normalizeDynamicRoute(node);

      // collect nodes to be being removed if it has either page or layout, or any of its descendant has.
      const state = { isRemained: false };
      if (node.children && node.children.length) {
        normalizeBasic(node.children, level + 1, state);
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

/**
 * hoist the nested routes to the nearest level has layout.
 * @param {*} nodes
 * @param {*} parentHoistedNodes
 * @param {Number} trace - for debug only.
 */
const hoist = (nodes, parentHoistedNodes = undefined, trace = 0) => {
  const hoistedChildNodes = []
  const hoistedNodeIndexes = []
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];

    let hoistingNode = undefined;
    if ((node.props.page || node.props.layout) && parentHoistedNodes) {
      hoistedNodeIndexes.push(i);
      hoistingNode = {
        ...node,
        children: [] // the children will be completed afterwards
      };
    }

    if (node.children && node.children.length > 0) {
      if (node.props.layout) {
        hoist(node.children, undefined, trace + 1);
      }
      else {
        hoist(node.children, parentHoistedNodes || hoistedChildNodes, trace + 1);

        if (!node.props.page) {
          hoistedNodeIndexes.push(i);
        }
      }
    }

    if (hoistingNode) {
      // in the case that, the children of the hoisting node will change when its children or grandchildren do hoist as well.
      hoistingNode.children = node.children;
      parentHoistedNodes.push(hoistingNode);
    }
  }

  for (let i = hoistedNodeIndexes.length - 1; i >= 0; i--) {
    nodes.splice(hoistedNodeIndexes[i], 1);
  }

  // append the hoisted nodes
  nodes.push(...hoistedChildNodes);
  // sort to ensure the catch-all and optional catch-all routes are both at the end.
  nodes.sort((node1, node2) =>
    score(node1.path.split("/").pop()) > score(node2.path.split("/").pop()) ? -1 : 1
  );
}

const sinkTemplateAfterHoist = (nodes, parentTemplate = undefined) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.children && node.children.length > 0) {
      sinkTemplateAfterHoist(node.children, node.props.template)
    }
    delete node.props.template
    if (parentTemplate) {
      node.props.template = parentTemplate
    }
  }
}

const hoistParallelRoutesAsOneLevelUpLayoutProps = (nodes, parentNode = undefined) => {
  const hoistedIndexes = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.path) {
      const lastSeg = node.path.split("/").pop();
      const match = PARALLEL_RE.exec(lastSeg);
      if (match && parentNode && parentNode.props && parentNode.props.layout) {
        parentNode.props["parallelRoutes"] = parentNode.props["parallelRoutes"] || {};
        parentNode.props["parallelRoutes"][match[1]] = node;
        hoistedIndexes.push(i);
      }
    }

    if (node.children && node.children.length > 0) {
      hoistParallelRoutesAsOneLevelUpLayoutProps(node.children, node);
    }
  }

  for (let i = hoistedIndexes.length - 1; i >= 0; i--) {
    nodes.splice(hoistedIndexes[i], 1);
  }
}

const normalizeInterceptingSameLevel = (nodes) => {
  const removingIndexes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];

    const segs = node.path.split("/");
    if (isIntercepted(segs)) {
      const nodePath = segs.filter((seg) => !seg.test(GROUP_RE)).map((seg) => {
        const match = INTERCEPTING_SAME_LEVEL_RE.exec(seg);
        return match ? match[1] : seg;
      });
      const interceptedNode = nodes.find((other) => {
        if (other.path !== node.path) {
          const otherPath = other.path.split("/").filter((seg) => !seg.test(GROUP_RE)).join("/");
          return nodePath === otherPath;
        }
      })
      if (interceptedNode) {
        interceptedNode.props["intercepted"] = node;
        removingIndexes.push(i);
      }
    }
  }

  for (let i = removingIndexes.length - 1; i >= 0; i--) {
    nodes.splice(removingIndexes[i], 1);
  }
}


const normalize = (nodes) => {
  normalizeBasic(nodes);
  hoist(nodes);
  sinkTemplateAfterHoist(nodes);
  hoistParallelRoutesAsOneLevelUpLayoutProps(nodes);
  normalizeInterceptingSameLevel(nodes);

  return nodes
}

module.exports = {
  normalize
};
