/**
 * Prunes the nodes returned by `traverseFileSystem` in a place.
 * @param {*} nodes - the return value from `traverseFileSystem`
 * @returns
 */
const prune = (nodes, level = 0) => {
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node) {
      const props = node.props;
      if (props) {
        // global-error locates in the root route only, while error locates in the nested route.
        if (level === 0) {
          delete props.error;
          if (props["global-error"]) {
            // rename global-error to error for follow-up proceeding.
            props.error = props["global-error"];
            delete props["global-error"];
          }
        } else {
          delete props["global-error"];
        }

        // fulfill preset layout notation for the root route
        if (level === 0) {
          props.layout = props.layout || "preset::root-layout";
        } else {
          if (
            !["page", "layout"].find((feature) => props[feature]) &&
            !!["loading", "error", "not-found"].find((feature) => props[feature])
          ) {
            props.layout = "preset::layout";
          }
        }
      }

      if (node.children && node.children.length) {
        prune(node.children, level + 1);
      }
    }
  }

  return nodes;
};

export { prune };
