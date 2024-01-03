/* eslint-disable */
const { join } = require("node:path");
const { traverseFileSystem } = require("../src/core/traverseFileSystem");

test("no private items", () => {
  const output = traverseFileSystem(
    join(__dirname, "./traverseFileSystem"),
    join(__dirname, "./traverseFileSystem/app")
  );

  const containsPrivateItems = (nodes, contains = false) => {
    for (let i = 0; !contains && i < nodes.length; ++i) {
      const node = nodes[i];
      const paths = Object.values(node.props);
      for (let j = 0; !contains && j < paths.length; j++) {
        const path = paths[j];
        contains = !!path.split("/").find((seg) => seg.startsWith("_"));
      }

      if (node.children && node.children.length) {
        contains = containsPrivateItems(node.children, contains);
      }
    }

    return contains;
  };

  expect(containsPrivateItems(output)).toBe(false);
});

describe("the full paths for page, layout and others are relative to the `outputPath` parameter", () => {
  const startsWith = (nodes, prefix, success = true) => {
    for (let i = 0; success && i < nodes.length; ++i) {
      const node = nodes[i];
      const paths = Object.values(node.props);
      for (let j = 0; success && j < paths.length; j++) {
        const path = paths[j];
        success = path.startsWith(prefix);
      }

      if (node.children && node.children.length) {
        success = startsWith(node.children, prefix, success);
      }
    }

    return success;
  };

  test("starts with app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./traverseFileSystem"),
      join(__dirname, "./traverseFileSystem/app")
    );
    expect(startsWith(output, "app/")).toBe(true);
  });

  test("starts with ../app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./traverseFileSystem/test"),
      join(__dirname, "./traverseFileSystem/app")
    );
    expect(startsWith(output, "../app/")).toBe(true);
  });
});
