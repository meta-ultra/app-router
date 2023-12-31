import { nameByFullPath } from "./nameByFullPath.js";

const isStaticImportFileName = (filename) =>
  ["error", "loading", "notFound"].indexOf(filename) !== -1;

const collectDefaultImports = (children, defaultImports = []) => {
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    const staticImportFileNames = Object.keys(child.props || {}).filter((key) =>
      isStaticImportFileName(key)
    );

    for (let j = 0; j < staticImportFileNames.length; j++) {
      const staticImportFileName = staticImportFileNames[j];
      const staticImportFilePath = child.props[staticImportFileName];
      if (staticImportFilePath) {
        defaultImports.push({
          default: nameByFullPath(staticImportFilePath),
          path: staticImportFilePath,
        });
      }
    }

    collectDefaultImports(child.children, defaultImports);
  }

  return defaultImports;
};

export { collectDefaultImports };
