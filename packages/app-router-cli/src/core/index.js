import { pipe } from "./utils.js";
import { traverseFileSystem } from "./traverseFileSystem.js";
import { sinkPageWithLayout } from "./sinkPageWithLayout.js";
import { processNotFound } from "./processNotFound.js";
import { processGlobalError } from "./processGlobalError.js";
import { remainValidRouteSegments } from "./remainValidRouteSegments.js";
import { mergeNestedRouteSegments } from "./mergeNestedRouteSegments.js";
import { collectDefaultImports } from "./collectDefaultImports.js";
import { mapDynamicRoutesToSplats, remainValidDynamicRoutes } from "./processDynamicRoutes.js";
import { fulfillDefaultRootLayout } from "./fulfillDefaultRootLayout.js";
import { generateOutput } from "./template.js";

const getRoutesFromFileSystem = (outputPath, sourcePath) => {
  const routes = pipe(
    // mapDynamicRoutesToSplats,
    // mergeNestedRouteSegments,
    // sinkPageWithLayout,
    // processNotFound,
    // processGlobalError,
    // remainValidDynamicRoutes,
    // remainValidRouteSegments,
    // fulfillDefaultRootLayout,
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
