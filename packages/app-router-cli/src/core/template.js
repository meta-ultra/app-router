import Handlebars from "handlebars";
import { nameByFullPath } from "./nameByFullPath.js";
import routerSpec from "../templates/router.spec.js";
import childrenRouteSpec from "../templates/childrenRoute.spec.js";

/* Compile Template */
const routerTemplate = Handlebars.template(routerSpec);
const childrenRouteTemplate = Handlebars.template(childrenRouteSpec);
/* End of Compile Template */

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

Handlebars.registerHelper("preset", preset);
Handlebars.registerHelper("lazyImport", lazyImport);
Handlebars.registerHelper("undefinable", undefinable);
Handlebars.registerHelper("nameByFullPath", nameByFullPath);
Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
  const children = generateChildrenRoutes(routes);
  return `[${children.join(",")}]`;
});
/* End of Register Helpers */

const generateOutput = (defaultImports, routes) =>
  routerTemplate({
    defaultImports,
    routes,
  });

export { generateOutput };
