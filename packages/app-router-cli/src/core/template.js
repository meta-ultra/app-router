import Handlebars from "handlebars";
import { nameByFullPath } from "./nameByFullPath.js";
import "../templates/precompiled.js";

/* Compile Template */
const routerTemplate = Handlebars.templates["router"];
const childrenRouteTemplate = Handlebars.templates["childrenRoute"];
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
