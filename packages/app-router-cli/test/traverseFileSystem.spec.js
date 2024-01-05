import { join } from "node:path";
import traverseFileSystem from "../src/core/traverseFileSystem";
import app1 from "./app1";

test("no private items", () => {
  const output1 = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app1"));

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

  expect(containsPrivateItems(output1)).toBe(false);
});

test("select the first one sorted alphabetically when there're duplicated files with the same name.", () => {
  const output1 = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app1"));

  const homeNode = output1[0].children.find((node) => node.path === "app1/home");

  expect(homeNode.props["error"].split(".")[1]).toBe("jsx");
});

describe("the full paths for page, layout and others are relative to the `output1Path` parameter", () => {
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

  test("starts with src/app1/", () => {
    const output1 = traverseFileSystem(join(__dirname, "./"), join(__dirname, "./src/app1"));
    expect(startsWith(output1, "src/app1/")).toBe(true);
  });

  test("starts with app1/", () => {
    const output1 = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app1"));
    expect(startsWith(output1, "app1/")).toBe(true);
  });

  test("starts with ../app1/", () => {
    const output1 = traverseFileSystem(
      join(__dirname, "./src/test"),
      join(__dirname, "./src/app1")
    );
    expect(startsWith(output1, "../app1/")).toBe(true);
  });

  test("starts with ../../app1/", () => {
    const output1 = traverseFileSystem(
      join(__dirname, "./src/test/test"),
      join(__dirname, "./src/app1")
    );
    expect(startsWith(output1, "../../app1/")).toBe(true);
  });
});

test("test the generated folder tree fully", () => {
  const output1 = traverseFileSystem(join(__dirname, "./src"), join(__dirname, "./src/app1"));

  expect(output1).toStrictEqual(app1);
});
