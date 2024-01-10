import { readFileSync } from "node:fs";
import { join } from "node:path";
import Handlebars from "handlebars";
import escape from "./escape.js";
import routerSpec from "../templates/router.spec.js";
import childrenRouteSpec from "../templates/childrenRoute.spec.js";

/* Register Compiled Template */
const routerTemplate = Handlebars.template(routerSpec);
const childrenRouteTemplate = Handlebars.template(childrenRouteSpec);
/* End of Register Compiled Template */

/* Register Helpers */
function undefinable(value) {
  return value == undefined ? "undefined" : value;
}

const generateChildrenRoutes = (routes) => {
  const children = [];
  for (let i = 0; routes && i < routes.length; ++i) {
    const route = routes[i];
    const grandchildren = generateChildrenRoutes(route.children);

    children.push(childrenRouteTemplate({ ...routes[i], grandchildren }));
  }

  return children;
};

const preset = (value, defaultValue) => {
  let output = defaultValue;
  if (value && value.startsWith("preset:")) {
    const name = value.replace(/^preset:/, "");
    if (name === "root-layout") {
      output = "<Outlet/>";
    }
  }

  return new Handlebars.SafeString(output);
};

const lazyImport = (path) => {
  return `{lazy(() => import("${path}"))}`;
};

Handlebars.registerHelper("join", (array, sep) => array.join(sep));
Handlebars.registerHelper("preset", preset);
Handlebars.registerHelper("preset", preset);
Handlebars.registerHelper("lazyImport", lazyImport);
Handlebars.registerHelper("undefinable", undefinable);
Handlebars.registerHelper("nameByFullPath", escape);
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
const renderOnFly = (path, context, options) => {
  const content = readFileSync(path);
  const template = Handlebars.compile(content.toString("utf-8"));
  return template(context, options);
};

const render = (appRouterNamedImports, staticDefaultImports) => {
  return renderOnFly(join(__dirname, "../templates/staticDefaultImports.hbs"), {
    appRouterNamedImports,
    staticDefaultImports,
  });
};

export default render;
