const {
  INDEX_RE,
  GROUP_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
  DYNAMIC_RE,
  CATCH_ALL_RE,
  OPTIONAL_CATCH_ALL_RE,
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
    } else if (node.props.intercepting) {
      type = "intercepting";
    } else {
      type = node.props.layout ? "layout" : "page";
    }

    let path = node.path
    if (parent) {
      path = path.replace(parent.path + "/", "")
    }
    // strip group name from route's path
    let segs = path.split("/").filter((seg) => !GROUP_RE.test(seg))
    // process dynamic, catch-all and optional catch-all routes
    segs = segs.map((seg) => {
      const dynamicMatch = DYNAMIC_RE.exec(seg)
      if (dynamicMatch) {
        return `:${dynamicMatch[1]}`
      }
      else if ([CATCH_ALL_RE, OPTIONAL_CATCH_ALL_RE].find((re) => re.test(seg))) {
        return "*"
      }
      else {
        return seg
      }
    })
    path = segs.join("/")

    const props = node.props

    const route = {
      id: node.path,
      type,
      ...(INDEX_RE.test(lastSeg)
        ? { index: true }
        : path
        ? { path }
        : {}),
      props,
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
