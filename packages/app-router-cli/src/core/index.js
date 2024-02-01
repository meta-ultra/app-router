const { pipe } = require("./utils.js");
const { traverseFileSystem } = require("./traverseFileSystem.js");
const { normalize } = require("./normalize.js");
const { collectAppRouterNamedImports } = require("../core/collectAppRouterNamedImports.js");
const { collectStaticDefaultImports } = require("../core/collectStaticDefaultImports.js");
const { collectRoutes } = require("../core/collectRoutes.js");
const { collectRouteHandlerRoutes } = require("../core/collectRouteHandlerRoutes.js");
const { generateCode } = require("./generateCode.js");

const getMetaRouteHandlerRoutes = (outputPath, sourcePath) => {
  const routes = pipe(traverseFileSystem)(outputPath, sourcePath);
  return routes
}

const getMetaRoutes = (outputPath, sourcePath) => {
  const routes = pipe(normalize, traverseFileSystem)(outputPath, sourcePath);
  return routes;
};

const generateRouter = (isHash, basename, metaRoutes, metaRouteHandlerRoutes, baseUrl, mockAdapter) => {
  const appRouterNamedImports = collectAppRouterNamedImports(metaRoutes);
  const staticDefaultImports = collectStaticDefaultImports(metaRoutes);
  const routes = collectRoutes(metaRoutes);
  const routeHandlerRoutes = collectRouteHandlerRoutes(metaRouteHandlerRoutes);

  const output = generateCode(
    isHash,
    appRouterNamedImports,
    staticDefaultImports,
    routes,
    basename,
    routeHandlerRoutes,
    baseUrl,
    mockAdapter
  );
  return output;
};

module.exports = { getMetaRoutes, generateRouter, getMetaRouteHandlerRoutes };
