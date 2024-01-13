import { readFileSync } from "node:fs";
import { join } from "node:path";
import Handlebars from "handlebars";
import escape from "./escape.js";
import routerSpec from "../templates/router.spec.js";
import childrenRouteSpec from "../templates/childrenRoute.spec.js";
import { PRESET_ROOT_LAYOUT, PRESET_LAYOUT } from "./constants.js";
import { getRelativePath } from "./utils.js";

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
Handlebars.registerHelper("lazyImport", (path) => {
  let output = undefined;
  if (path === PRESET_ROOT_LAYOUT) {
    output = "<Outlet/>";
  } else if (path === PRESET_LAYOUT) {
    output = "<Outlet/>";
  } else {
    output = `{lazy(() => import("${getRelativePath(path)}"))}`;
  }

  return new Handlebars.SafeString(output);
});

Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
  const children = generateChildrenRoutes(routes);
  return `[${children.join(",")}]`;
});
/* End of Register Helpers */

/**
 * render template on fly for development
 * @param {*} path - the template path
 * @param {*} context - the context parameter Handlebars template function consumes
 * @param {*} options - the options parameter Handlebars template function consumes
 * @returns
 */
const generateCodeOnFly = (path, context, options) => {
  const content = readFileSync(path);
  const template = Handlebars.compile(content.toString("utf-8"));
  return template(context, options);
};

const generateCode = (appRouterNamedImports, staticDefaultImports) => {
  return generateCodeOnFly(join(__dirname, "../templates/staticDefaultImports.hbs"), {
    isHash: false,
    appRouterNamedImports,
    staticDefaultImports,
  });
};

export default generateCode;
