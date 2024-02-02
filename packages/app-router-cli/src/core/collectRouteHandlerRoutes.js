const { GROUP_RE } = require("./constants");
const { escape } = require("./escape.js");
const { getRelativePath } = require("./utils.js");

const LOOSE_GROUP_RE = GROUP_RE.source.replace(/^[^]|[$]$/g, "");
const INTERMEDIATE_GROUP_RE = RegExp(`(?<=\\/)${LOOSE_GROUP_RE}|${LOOSE_GROUP_RE}(?=\/)`, "g");
const EXTENSION_RE = /.[tj]s$/;

const collectRouteHandlerRoutes = (nodes, routes = [], existings = new Set(), rootPath) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!rootPath) {
      rootPath = node.path;
    }

    if (node) {
      if (node.props && node.props.route) {
        let filepath = node.props.route;
        if (EXTENSION_RE.test(filepath)) {
          const url = filepath.replace(INTERMEDIATE_GROUP_RE, "").split("/").filter(x => x).join("/").replace(EXTENSION_RE, "");
          if (existings.has(url)) {
            throw Error(`You cannot have multiple route handlers with the same path "${url}".`);
          }
          existings.add(url);
          routes.push({
            url: url.replace(RegExp(`^${rootPath}|\/route$`, "g"), ""),
            path: getRelativePath(filepath.replace(EXTENSION_RE, "")),
            defaultImportName: escape(url),
          });
        }
      }
      if (node.children && node.children.length) {
        collectRouteHandlerRoutes(node.children, routes, existings, rootPath);
      }
    }
  }

  return routes;
};

module.exports = {
  collectRouteHandlerRoutes
};
