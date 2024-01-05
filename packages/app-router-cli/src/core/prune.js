const PRESET_ROOT_LAYOUT = "preset::root-layout";
const PRESET_LAYOUT = "preset::layout";

const GLOBAL_ERROR = "global-error";

const isNoLayout = (props) => !["layout"].find((propName) => props[propName]);
const isWithUtilities = (props) =>
  !!["loading", "error", "not-found"].find((propName) => props[propName]);

/**
 * Prunes the nodes returned by `traverseFileSystem` in a place.
 * @param {*} nodes - the return value from `traverseFileSystem`.
 * @param {number} level - the level of tree starts from 0.
 * @param {{isRemained: boolean}} parentStatus - indicate whether to remain the current branch.
 * @returns
 */
const prune = (nodes, level = 0, parentStatus = { isRemained: false }) => {
  const pruningIndexes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node) {
      const props = node.props;
      if (props) {
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

        if (level === 0) {
          // fulfill preset layout notation for the root route.
          props.layout = props.layout || PRESET_ROOT_LAYOUT;
        } else {
          // fulfill preset layout notation for the nested route with loading, error or not-found, but no layout.
          if (isNoLayout(props) && isWithUtilities(props)) {
            props.layout = PRESET_LAYOUT;
          }
        }
      }

      const status = { isRemained: false };
      if (node.children && node.children.length) {
        prune(node.children, level + 1, status);
      }
      status.isRemained = status.isRemained || props.page || props.layout;
      if (status.isRemained) {
        parentStatus.isRemained = true;
      } else {
        pruningIndexes.push(i);
      }
    }
  }

  for (let i = pruningIndexes.length - 1; i >= 0; i--) {
    const pruningIndex = pruningIndexes[i];
    nodes.splice(pruningIndex, 1);
  }

  return nodes;
};

export { prune };
