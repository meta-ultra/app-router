import Handlebars from "handlebars";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { nameByFullPath } from "./nameByFullPath.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function undefinable(value) {
  return value == undefined ? "undefined" : value;
}

const childrenRouteTemplate = Handlebars.compile(
  readFileSync(join(__dirname, "../templates/childrenRoute.hbs")).toString()
);

const generateChildrenRoutes = (routes) => {
  const children = [];
  for (let i = 0; routes && i < routes.length; ++i) {
    const route = routes[i];
    const grandchildren = generateChildrenRoutes(route.children);

    children.push(childrenRouteTemplate({ ...routes[i], grandchildren }));
  }

  return children;
};

const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("undefinable", undefinable);
  Handlebars.registerHelper("nameByFullPath", nameByFullPath);
  Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
    const children = generateChildrenRoutes(routes);
    return `[${children.join(",")}]`;
  });
};

export { registerHandlebarsHelpers };
