const { pipe } = require("./utils.js");
const { traverseFileSystem } = require("./traverseFileSystem.js");
const { normalize } = require("./normalize.js");
const { collectAppRouterNamedImports } = require("../core/collectAppRouterNamedImports.js");
const { collectStaticDefaultImports } = require("../core/collectStaticDefaultImports.js");
const { collectRoutes } = require("../core/collectRoutes.js");
const { generateCode } = require("./generateCode.js");

const getMetaRoutes = (outputPath, sourcePath) => {
  const routes = pipe(normalize, traverseFileSystem)(outputPath, sourcePath);

  return routes;
};

const generateRouter = (isHash, basename, metaRoutes) => {
  const appRouterNamedImports = collectAppRouterNamedImports(metaRoutes);
  const staticDefaultImports = collectStaticDefaultImports(metaRoutes);
  const routes = collectRoutes(metaRoutes);

  const output = generateCode(
    isHash,
    appRouterNamedImports,
    staticDefaultImports,
    routes,
    basename
  );
  return output;
};

module.exports = { getMetaRoutes, generateRouter };
