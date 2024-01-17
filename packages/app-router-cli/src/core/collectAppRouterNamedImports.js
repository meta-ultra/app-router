const ROOT_ERROR = "RootErrorElement";
const ROOT_LAYOUT = "RootLayoutRouteElement";
const LAYOUT = "LayoutRouteElement";
const PAGE = "PageRouteElement";

const collectAppRouterNamedImports = (nodes, level = 0, namedImports = new Set()) => {
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (level === 0) {
      namedImports.add(ROOT_ERROR);
    }
    if (node.props.layout) {
      namedImports.add(level === 0 ? ROOT_LAYOUT : LAYOUT);
    }
    if (node.props.page) {
      namedImports.add(PAGE);
    }
    if (node.props.parallelRoutes) {
      const parallelNodes = Object.values(node.props.parallelRoutes);
      collectAppRouterNamedImports(parallelNodes, level, namedImports);
    }

    if (node.children.length > 0) {
      collectAppRouterNamedImports(node.children, level + 1, namedImports);
    }
  }

  return level === 0 ? Array.from(namedImports) : namedImports;
};

module.exports = {
  collectAppRouterNamedImports
};
