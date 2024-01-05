import { join } from "node:path";
import traverseFileSystem from "../src/core/traverseFileSystem";
import data from "./data";

test("no private items", () => {
  const output = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app"));

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

test("select the first one sorted alphabetically when there're duplicated files with the same name.", () => {
  const output = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app"));

  const homeNode = output[0].children.find((node) => node.path === "app/home");

  expect(homeNode.props["error"].split(".")[1]).toBe("jsx");
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

  test("starts with src/app/", () => {
    const output = traverseFileSystem(join(__dirname, "./"), join(__dirname, "./src/app"));
    expect(startsWith(output, "src/app/")).toBe(true);
  });

  test("starts with app/", () => {
    const output = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app"));
    expect(startsWith(output, "app/")).toBe(true);
  });

  test("starts with ../app/", () => {
    const output = traverseFileSystem(join(__dirname, "./src/test"), join(__dirname, "./src/app"));
    expect(startsWith(output, "../app/")).toBe(true);
  });

  test("starts with ../../app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./src/test/test"),
      join(__dirname, "./src/app")
    );
    expect(startsWith(output, "../../app/")).toBe(true);
  });
});

test("test the generated folder tree fully", () => {
  const output = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app"));

  expect(output).toStrictEqual(data);
});
