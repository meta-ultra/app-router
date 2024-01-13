import { readFileSync } from "node:fs";
import { join } from "node:path";
import Handlebars from "handlebars";
import escape from "./escape.js";
import routerSpec from "../templates/deprecated/router.spec.js";
import childrenRouteSpec from "../templates/deprecated/childrenRoute.spec.js";
import { PRESET_ROOT_LAYOUT, PRESET_LAYOUT } from "./constants.js";
import { getRelativePath, stripExtension } from "./utils.js";

/* Register Compiled Template */
const routerTemplate = Handlebars.template(routerSpec);
const childrenRouteTemplate = Handlebars.template(childrenRouteSpec);
/* End of Register Compiled Template */

/* Register Helpers */
const generateChildrenRoutes = (routes) => {
  const children = [];
  for (let i = 0; routes && i < routes.length; ++i) {
    const route = routes[i];
    const grandchildren = generateChildrenRoutes(route.children);

    children.push(childrenRouteTemplate({ ...routes[i], grandchildren }));
  }

  return children;
};

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

Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
  const content = readFileSync(join(__dirname, "../templates/childrenRoutes.hbs")).toString(
    "utf-8"
  );
  const template = Handlebars.compile(content);
  return new Handlebars.SafeString(template({ routes }));
});

// Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
//   const children = generateChildrenRoutes(routes);
//   return `[${children.join(",")}]`;
// });
/* End of Register Helpers */

/**
 * render template on fly for development
 * @param {*} path - the template path
 * @param {*} context - the context parameter Handlebars template function consumes
 * @param {*} options - the options parameter Handlebars template function consumes
 * @returns
 */
const generateCodeOnFly = (path, context, options) => {
  const content = readFileSync(path).toString("utf-8");
  const template = Handlebars.compile(content);
  return template(context, options);
};

const generateCode = (appRouterNamedImports, staticDefaultImports) => {
  return generateCodeOnFly(join(__dirname, "../templates/staticDefaultImports.hbs"), {
    isHash: false,
    appRouterNamedImports,
    staticDefaultImports,
  });
};

export { generateCodeOnFly };
export default generateCode;
