/*eslint-disable*/
const { readFileSync } = require("node:fs");
const { join, isAbsolute, dirname } = require("node:path");
const Handlebars = require("handlebars");
const { escape } = require("./escape.js");
// const { routerSpec } = require("../templates/deprecated/router.spec.js");
// const { childrenRouteSpec } = require("../templates/deprecated/childrenRoute.spec.js");
const { PRESET_ROOT_LAYOUT, PRESET_LAYOUT } = require("./constants.js");
const { getRelativePath, stripExtension } = require("./utils.js");

/* Utilities */
const readTemplateSync = (path) =>
  readFileSync(isAbsolute(path) ? path : join(__dirname, path)).toString("utf-8");
/* End of Utilities */

/* Register Compiled Template */
// const routerTemplate = Handlebars.template(routerSpec);
// const childrenRouteTemplate = Handlebars.template(childrenRouteSpec);
/* End of Register Compiled Template */

/* Register Helpers */
Handlebars.registerHelper("escape", escape);
Handlebars.registerHelper("join", (array, sep) => array.join(sep));
Handlebars.registerHelper("isNil", (value) => value === undefined || value === null);
Handlebars.registerHelper(
  "isNilorEmpty",
  (value) => value === undefined || value === null || !value.length
);
Handlebars.registerHelper(
  "isNilorPreset",
  (value) => value === undefined || value === null || !value.length || /^preset::/i.test(value)
);
Handlebars.registerHelper("lazyImport", (path) => {
  let output = undefined;
  if ([PRESET_ROOT_LAYOUT, PRESET_LAYOUT].indexOf(path) !== -1) {
    output = "";
  } else {
    output = `lazy(() => import("${stripExtension(getRelativePath(path))}"))`;
  }

  return new Handlebars.SafeString(output);
});
// there's no need to set the basename explicitly when it's an undefined basename.
Handlebars.registerHelper(
  "isUndefinedBasename",
  (basename) =>
    basename === undefined ||
    basename === null ||
    typeof basename !== "string" ||
    basename === "" ||
    basename === "/"
);
Handlebars.registerHelper("isPageRoute", (value) => value === "page");
Handlebars.registerHelper("isLayoutRoute", (value) => value === "layout");
Handlebars.registerHelper("isInterceptedRoute", (value) => value === "intercepted");
Handlebars.registerHelper("isInterceptingLayoutRoute", (value) => value === "intercepting");
Handlebars.registerHelper(
  "parallelRoutesProps",
  (parallelRoutes) => {
    const template = Handlebars.compile(readTemplateSync("../templates/parallelRoutesProps.hbs"))
    const content = template({parallelRoutes: Object.entries(parallelRoutes).map(([key, value]) => ({key, value}))})
    return new Handlebars.SafeString(`{${content}}`)
  }
);
Handlebars.registerHelper(
  "pageRouteElement",
  (node) => {
    const template = Handlebars.compile(readTemplateSync("../templates/pageRouteElement.hbs"))
    const content = template(node)
    return new Handlebars.SafeString(content)
  }
);
/* End of Register Helpers */

/* Partials on fly */
Handlebars.registerPartial("staticImports", readTemplateSync("../templates/staticImports.hbs"));
Handlebars.registerPartial("routeHandlers", readTemplateSync("../templates/routeHandlers.hbs"));
Handlebars.registerPartial("createRouter", readTemplateSync("../templates/createRouter.hbs"));
Handlebars.registerPartial("childrenRoutes", readTemplateSync("../templates/childrenRoutes.hbs"));
Handlebars.registerPartial(
  "pageRouteElement",
  readTemplateSync("../templates/pageRouteElement.hbs")
);
Handlebars.registerPartial(
  "layoutRouteElement",
  readTemplateSync("../templates/layoutRouteElement.hbs")
);
Handlebars.registerPartial(
  "interceptedRouteElement",
  readTemplateSync("../templates/interceptedRouteElement.hbs")
);
Handlebars.registerPartial(
  "interceptingLayoutRouteElement",
  readTemplateSync("../templates/interceptingLayoutRouteElement.hbs")
);
/* End of Partials on fly*/

/**
 * render template on fly for development
 * @param {*} path - the template path
 * @param {*} context - the context parameter Handlebars template function consumes
 * @param {*} options - the options parameter Handlebars template function consumes
 * @returns
 */
const generateCodeOnFly = (path, context, options) => {
  const content = readTemplateSync(path);
  const template = Handlebars.compile(content);
  return template(context, options);
};

const generateCode = (isHash, appRouterNamedImports, staticDefaultImports, routes, basename, routeHandlerRoutes, baseUrl, mockAdapter) => {
  return generateCodeOnFly("../templates/router.hbs", {
    isHash,
    appRouterNamedImports,
    staticDefaultImports,
    routes,
    basename,
    routeHandlerRoutes,
    baseUrl,
    mockAdapter
  });
};

module.exports = {
  generateCode,
  generateCodeOnFly,
  readTemplateSync,
}
