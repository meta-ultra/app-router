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
const { assertNoRepeatedSlugs } = require("./utils.js");

const getLastSeg = (path) => path.split("/").pop();
const match = (regexps, value) => regexps.find((regexp) => regexp.test(value));

const collectRoutes = (nodes, parent, parentState, level = 0) => {
  let interceptingRouteIndex = -1;
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
      interceptingRouteIndex = i;
    } else {
      assertNoRepeatedSlugs(node.path);
      type = node.props.layout ? "layout" : "page";
    }

    /* Index and Path */
    const isIndex = INDEX_RE.test(lastSeg);
    let path = undefined;
    if (!isIndex) {
      path = node.path;
      if (parent) {
        if (path === parent.path) {
          // for intercepting route
          path = "";
        }
        else {
          path = path.replace(parent.path + "/", "");
        }
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
    let indexPathProps = {};
    if (isIndex) {
      indexPathProps = { index: true };
    }
    else if (level === 0 && (!node.children || node.children.length === 0)) {
      indexPathProps = { path: "/" };
    }
    else if (path) {
      indexPathProps =  { path };
    }
    /* End of Index and Path */

    const route = {
      id: node.path,
      type,
      ...indexPathProps,
      props: node.props,
    };

    const state = {type, path: indexPathProps.path};
    route.children =
      node.children && node.children.length ? collectRoutes(node.children, node, state, level + 1) : [];
    if (level === 0) {
      route.path = "/";
    }
    else if (route.path && state.path !== route.path) {
      if (state.path === undefined) {
        delete route.path;
      }
      else {
        route.path = state.path;
      }
    }

    routes.push(route);
  }

  if (routes[interceptingRouteIndex] && routes[interceptingRouteIndex].props.interceptingPage && parentState.path) {
    // move the parent node's path to the intercepting layout node, if the intercepting layout node has a page.
    for (let i = 0; i < routes.length; i++) {
      if (i !== interceptingRouteIndex && routes[i].path) {
        routes[i].path = parentState.path + "/" + routes[i].path;
      }
    }
    routes[interceptingRouteIndex].path = parentState.path;
    parentState.path = undefined;
  }

  return routes;
};

module.exports = {
  collectRoutes
};
