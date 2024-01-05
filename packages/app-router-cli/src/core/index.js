import { pipe } from "./utils.js";
import traverseFileSystem from "./traverseFileSystem.js";
import normalize from "./normalize.js";
import { collectDefaultImports } from "./collectDefaultImports.js";
import { generateOutput } from "./template.js";

const getRoutesFromFileSystem = (outputPath, sourcePath) => {
  const routes = pipe(
    // mapDynamicRoutesToSplats,
    // mergeNestedRouteSegments,
    // sinkPageWithLayout,
    // processNotFound,
    // remainValidDynamicRoutes,
    // remainValidRouteSegments,
    normalize,
    traverseFileSystem
  )(outputPath, sourcePath);

  return routes;
};

const generateRouterOutput = (routes) => {
  const defaultImports = collectDefaultImports(routes);
  const output = generateOutput(defaultImports, routes);

  return output;
};

export { getRoutesFromFileSystem, generateRouterOutput };
