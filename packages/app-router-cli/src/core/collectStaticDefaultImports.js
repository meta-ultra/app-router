/**
 * Collect dependencies need to be static imports, such as error, loading, not-found.
 */
import escape from "./escape.js";
import { getRelativePath } from "./utils.js";

const isStaticDefaultImportProp = (propName) =>
  ["error", "loading", "notFound"].indexOf(propName) !== -1;

/**
 * @param {*} nodes - return value of normalize
 * @param {{ path: string, defaultImportName: string }} staticDefaultImports - output parameter
 * @returns
 */
const collectStaticDefaultImports = (nodes, staticDefaultImports = []) => {
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    for (const [name, path] of Object.entries(node.props)) {
      if (isStaticDefaultImportProp(name) && path) {
        staticDefaultImports.push({
          path: getRelativePath(path), // the file path
          defaultImportName: escape(path), // the fully qualified default name
        });
      }
    }

    if (node.children.length > 0) {
      collectStaticDefaultImports(node.children, staticDefaultImports);
    }
  }

  return staticDefaultImports;
};

export default collectStaticDefaultImports;