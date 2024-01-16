const {
  INDEX_RE,
  GROUP_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
} = require("./constants.js");

const getLastSeg = (path) => path.split("/").pop();
const match = (regexps, value) => regexps.find((regexp) => regexp.test(value));
const isIntercepting = (node) =>
  node.children.find((child) =>
    match(
      [INTERCEPTING_ONE_LEVEL_UP_RE, INTERCEPTING_TWO_LEVEL_UP_RE, INTERCEPTING_ROOT_LEVEL_UP_RE],
      getLastSeg(child.path)
    )
  );

const collectRoutes = (nodes, parent) => {
  const routes = [];
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    const lastSeg = getLastSeg(node.path);
    let type = undefined;
    if (match([INDEX_RE], lastSeg)) {
      type = "page";
    } else if (node.props.intercepted) {
      type = "intercepted";
    } else if (isIntercepting(node)) {
      type = "intercepting";
    } else {
      type = node.props.layout ? "layout" : "page";
    }

    let path = node.path
    if (parent) {
      path = path.replace(parent.path + "/", "")
    }
    // strip group name from route's path
    path = path.split("/").filter((seg) => !GROUP_RE.test(seg)).join("/")

    const route = {
      id: node.path,
      type,
      ...(INDEX_RE.test(lastSeg)
        ? { index: true }
        : path
        ? { path }
        : {}),
      props: node.props,
    };

    route.children =
      node.children && node.children.length ? collectRoutes(node.children, node) : [];

    routes.push(route);
  }

  return routes;
};

module.exports = {
  collectRoutes
};
