/**
 * Prunes the nodes returned by `traverseFileSystem` in a place.
 * @param {*} nodes - the return value from `traverseFileSystem`
 * @returns
 */
const prune = (nodes, level = 0) => {
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node) {
      // global-error locates in the root route only, while error locates in the nested route.
      if (level === 0) {
        delete node.error;
        node.error = node["global-error"];
      } else {
        delete node["global-error"];
      }

      // fulfill preset layout notation for the root route
      if (level === 0) {
        node.layout = node.layout || "preset::root-layout";
      } else {
        if (
          !["page", "layout"].find((feature) => node[feature]) &&
          !!["loading", "error", "not-found"].find((feature) => node[feature])
        ) {
          node.layout = "preset::layout";
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
