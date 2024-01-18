const {
  INDEX_RE,
  GROUP_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
  DYNAMIC_RE,
  CATCH_ALL_RE,
  OPTIONAL_CATCH_ALL_RE,
  INTERCEPTING_SAME_LEVEL_RE,
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

    /* Index and Path */
    const isIndex = INDEX_RE.test(lastSeg);
    let path = undefined;
    if (!isIndex) {
      path = node.path;
      if (parent) {
        path = path.replace(parent.path + "/", "");
      }
      // strip group name from route's path
      let segs = path.split("/").filter((seg) => !GROUP_RE.test(seg));
      // process dynamic, catch-all, optional catch-all and intercepting routes
      segs = segs.map((seg) => {
        const dynamicMatch = DYNAMIC_RE.exec(seg);
        if (dynamicMatch) {
          return `:${dynamicMatch[1]}`;
        }
        else if ([CATCH_ALL_RE, OPTIONAL_CATCH_ALL_RE].find((re) => re.test(seg))) {
          return "*";
        }
        else {
          const res = [
            INTERCEPTING_SAME_LEVEL_RE,
            INTERCEPTING_ONE_LEVEL_UP_RE,
            INTERCEPTING_TWO_LEVEL_UP_RE,
            INTERCEPTING_ROOT_LEVEL_UP_RE
          ];
          let match = undefined;
          for (let i = 0; !match && i < res.length; ++i) {
            match = res[i].exec(seg);
          }
          if (match) {
            return match[1];
          }
          else {
            return seg;
          }
        }
      })
      path = segs.join("/");
    }
    const indexPathProps = isIndex ? { index: true } : path ? { path } : {};
    /* End of Index and Path */

    const route = {
      id: node.path,
      type,
      ...indexPathProps,
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
