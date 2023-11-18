import { join, relative, sep } from "node:path";
import { readdirSync, statSync } from "node:fs";
import { stripExtension } from "./utils.js";

const isValidFileName = (filename) =>
  ["page", "layout", "error", "global-error", "loading", "not-found"].indexOf(filename) !== -1;

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

  return (
    ROUTE_RE.test(name) ||
    GROUP_RE.test(name) ||
    DYNAMIC_RE.test(name) ||
    DYNAMIC_CATCH_ALL_RE.test(name) ||
    DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(name)
  );
};

const isGroupName = (filename) => /^\([^)(]+\)$/.test(filename);

/**
 * @param {string} outputPath - the output file path, such as "./src/router.tsx"
 * @param {string} dirname    - the input directory path, such as "./src/app"
 * @param {string} filename   - the folder name inside input directory which is diving into, such as "login"
 * @param {object[]} output   - the output type of which is an array of object with "path", "props" and "children" properties.󠁧󠁢
 * @returns
 */
const traverseFileSystem = (outputPath, dirname, filename = "", output = []) => {
  const node = {};
  const path = join(dirname, filename);
  const itemNames = readdirSync(path);
  for (let i = 0; i < itemNames.length; ++i) {
    const itemName = itemNames[i];
    if (!itemName.startsWith("_")) {
      const name = stripExtension(itemName);
      const filepath = join(path, itemName);

      const stats = statSync(filepath);
      if (stats.isDirectory() && isValidFolderName(name)) {
        node.children = node.children || [];
        traverseFileSystem(outputPath, path, itemName, node.children);
      } else if (isValidFileName(name)) {
        node.props = node.props || {};
        node.props[name] = stripExtension(
          relative(outputPath, filepath)
            .replace(/^\.{2}/, ".")
            .replaceAll(sep, "/")
        );
      }
    }
  }
  if (Object.keys(node).length > 0) {
    if (filename) {
      if (!isGroupName(filename)) {
        node.path = filename;
      } else {
        node._pathHint = filename;
      }
    }

    node.children = node.children || [];
    output.push(node);
  }

  return output;
};

export { traverseFileSystem };
