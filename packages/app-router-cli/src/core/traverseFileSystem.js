const { join, relative, sep } = require("node:path");
const { readdirSync, statSync } = require("node:fs");
const { stripExtension } = require("./utils.js");

const isValidFileName = (filename) =>
  ["page", "layout", "error", "global-error", "loading", "not-found", "template"].indexOf(
    filename
  ) !== -1;

/**
 * The valid folder name is as follows:
 * - Route name: a, test, test1, test_1, test-1
 * - Group name: (...<Route Name>) or (<Route Name>)
 */
const isValidFolderName = (name) => {
  const ROUTE_RE = /^[a-z][a-z0-9-_]*$/;
  const GROUP_RE = /^\(([.]{3})?[a-z][a-z0-9-_]*\)$/;
  const DYNAMIC_RE = /^\[[a-z][a-z0-9-_]*\]$/;
  const DYNAMIC_CATCH_ALL_RE = /^\[([.]{3})[a-z][a-z0-9-_]*\]$/;
  const DYNAMIC_OPTIONAL_CATCH_ALL_RE = /^\[\[([.]{3})[a-z][a-z0-9-_]*\]\]$/;
  const PARALLEL_RE = /^@[a-z][a-z0-9-_]*$/;
  const INTERCEPTING_SAME_LEVEL_RE = /^\(\.\)[a-z][a-z0-9-_]*$/;
  const INTERCEPTING_ONE_LEVEL_UP_RE = /^\(\.\.\)[a-z][a-z0-9-_]*$/;
  const INTERCEPTING_TWO_LEVEL_UP_RE = /^\(\.\.\)\(\.\.\)[a-z][a-z0-9-_]*$/;
  const INTERCEPTING_ROOT_LEVEL_UP_RE = /^\(\.\.\.\)[a-z][a-z0-9-_]*$/;

  return (
    ROUTE_RE.test(name) ||
    GROUP_RE.test(name) ||
    DYNAMIC_RE.test(name) ||
    DYNAMIC_CATCH_ALL_RE.test(name) ||
    DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(name) ||
    PARALLEL_RE.test(name) ||
    INTERCEPTING_SAME_LEVEL_RE.test(name) ||
    INTERCEPTING_ONE_LEVEL_UP_RE.test(name) ||
    INTERCEPTING_TWO_LEVEL_UP_RE.test(name) ||
    INTERCEPTING_ROOT_LEVEL_UP_RE.test(name)
  );
};

/**
 * @param {string} outputPath - the output file path, such as "./src/router.tsx"
 * @param {string} dirname    - the input directory path, such as "./src/app"
 * @param {string} filename   - the folder name inside the input directory which is diving into, such as "login"
 * @param {object[]} output   - the output, type of which is an array of object with "path", "props" and "children" properties.󠁧󠁢
 * The "props" property is an object contains "page", "layout", "template" and other conventions nested property value of which is the full path with extension of that file from the root dirname.
 * For example, { "props": { "page": "app/home/page.js" } }
 *
 * Note that, the root node is allowed to have "error" property, while the nested node can have "global-error" property as well.
 * @returns
 */
const traverseFileSystem = (outputPath, dirname, filename = "", output = []) => {
  const path = join(dirname, filename);
  const node = {
    path: relative(outputPath, path).replaceAll(sep, "/"),
    props: {},
    children: [],
  };
  const itemNames = readdirSync(path);
  for (let i = 0; i < itemNames.length; ++i) {
    const itemName = itemNames[i];
    // Avoid diving into private items for optimization. The name of private item starts with underscore "_".
    if (!itemName.startsWith("_")) {
      const filepath = join(path, itemName);
      const stats = statSync(filepath);

      if (stats.isDirectory()) {
        if (isValidFolderName(itemName)) {
          traverseFileSystem(outputPath, path, itemName, node.children);
        }
      } else if (/\.[jt]sx?$/i.test(itemName)) {
        const fileName = stripExtension(itemName);
        if (!node.props[fileName] && isValidFileName(fileName)) {
          node.props[fileName] = relative(outputPath, filepath).replaceAll(sep, "/");
        }
      }
    }
  }

  if (Object.keys(node).length > 0) {
    output.push(node);
  }

  return output;
};

module.exports = {
  traverseFileSystem
};
