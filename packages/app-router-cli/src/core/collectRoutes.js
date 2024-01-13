import { getRelativePath, stripExtension } from "./utils";

const collectRoutes = (nodes, parent) => {
  const routes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    const route = {
      id: node.path,
      ...(node.path[node.path.length - 1] === "/"
        ? { index: true }
        : { path: parent ? node.path.replace(parent.path + "/", "") : node.path }),
      props: node.props,
    };

    route.children =
      node.children && node.children.length ? collectRoutes(node.children, node) : [];

    routes.push(route);
  }

  return routes;
};

export default collectRoutes;
