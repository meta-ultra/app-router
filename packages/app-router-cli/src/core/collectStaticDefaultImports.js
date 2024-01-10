/**
 * Collect dependencies need to be static imports, such as error, loading, not-found.
 */
import escape from "./escape.js";

const isRelativePath = (path) => /^\.{1,2}\//.test(path);

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
          path: isRelativePath(path) ? path : "./" + path, // the file path
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
