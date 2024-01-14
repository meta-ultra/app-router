import { pipe } from "./utils.js";
import traverseFileSystem from "./traverseFileSystem.js";
import normalize from "./normalize.js";
import collectAppRouterNamedImports from "../core/collectAppRouterNamedImports.js";
import collectStaticDefaultImports from "../core/collectStaticDefaultImports.js";
import collectRoutes from "../core/collectRoutes.js";
import generateCode from "./generateCode.js";

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

export { getMetaRoutes, generateRouter };
