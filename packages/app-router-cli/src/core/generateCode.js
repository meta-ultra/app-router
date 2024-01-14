/*eslint-disable*/
import { readFileSync } from "node:fs";
import { join, isAbsolute, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";
import escape from "./escape.js";
import routerSpec from "../templates/deprecated/router.spec.js";
import childrenRouteSpec from "../templates/deprecated/childrenRoute.spec.js";
import { PRESET_ROOT_LAYOUT, PRESET_LAYOUT } from "./constants.js";
import { getRelativePath, stripExtension } from "./utils.js";

let __dirname;
try {
  __dirname = dirname(fileURLToPath(import.meta.url));
} catch (e) {
  __dirname = __dirname;
}

/* Utilities */
const readTemplateSync = (path) =>
  readFileSync(isAbsolute(path) ? path : join(__dirname, path)).toString("utf-8");
/* End of Utilities */

/* Register Compiled Template */
const routerTemplate = Handlebars.template(routerSpec);
const childrenRouteTemplate = Handlebars.template(childrenRouteSpec);
/* End of Register Compiled Template */

/* Register Helpers */
Handlebars.registerHelper("escape", escape);
Handlebars.registerHelper("join", (array, sep) => array.join(sep));
Handlebars.registerHelper("isNil", (value) => value === undefined || value === null);
Handlebars.registerHelper(
  "isNilorEmpty",
  (value) => value === undefined || value === null || !value.length
);
Handlebars.registerHelper("lazyImport", (path) => {
  let output = undefined;
  if ([PRESET_ROOT_LAYOUT, PRESET_LAYOUT].indexOf(path) !== -1) {
    output = "";
  } else {
    output = `{lazy(() => import("${stripExtension(getRelativePath(path))}"))}`;
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
/* End of Register Helpers */

/* Partials on fly */
Handlebars.registerPartial(
  "staticDefaultImports",
  readTemplateSync("../templates/staticDefaultImports.hbs")
);
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

const generateCode = (isHash, appRouterNamedImports, staticDefaultImports, routes, basename) => {
  return generateCodeOnFly("../templates/router.hbs", {
    isHash,
    appRouterNamedImports,
    staticDefaultImports,
    routes,
    basename,
  });
};

export { generateCodeOnFly, readTemplateSync };
export default generateCode;
