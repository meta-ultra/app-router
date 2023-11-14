import Handlebars from "handlebars";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { traverseFileSystem } from "./traverseFileSystem.js";
import { sinkPageWithLayout } from "./sinkPageWithLayout.js";
import { processNotFound } from "./processNotFound.js";
import { processGlobalError } from "./processGlobalError.js";
import { collectDefaultImports } from "./collectDefaultImports.js";
import { registerHandlebarsHelpers } from "./registerHandlebarsHelpers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

registerHandlebarsHelpers();
const routerTemplate = Handlebars.compile(
  readFileSync(join(__dirname, "../templates/router.hbs")).toString()
);

const getRoutesFromFileSystem = (outputPath, sourcePath) => {
  const routes = sinkPageWithLayout(
    processNotFound(processGlobalError(traverseFileSystem(outputPath, sourcePath)))
  );

  return routes;
};

const generateRouterOutput = (routes) => {
  const defaultImports = collectDefaultImports(routes);
  const output = routerTemplate({
    defaultImports,
    routes,
  });

  return output;
};

export { getRoutesFromFileSystem, generateRouterOutput };
