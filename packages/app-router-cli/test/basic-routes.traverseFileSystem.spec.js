import { join } from "node:path";
import { traverseFileSystem } from "../src/core/traverseFileSystem";
import input from "./basic-routes/traverseFileSystemOutput";

test("no private items", () => {
  const output = traverseFileSystem(
    join(__dirname, "./basic-routes"),
    join(__dirname, "./basic-routes/app")
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

test("select the first one sorted alphabetically when there're duplicated files with the same name.", () => {
  const output1 = traverseFileSystem(
    join(__dirname, "./basic-routes"),
    join(__dirname, "./basic-routes/app")
  );

  const homeNode = output1[0].children.find((node) => node.path === "app/home");

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

  test("starts with basic-routes/app/", () => {
    const output = traverseFileSystem(join(__dirname, "./"), join(__dirname, "./basic-routes/app"));
    expect(startsWith(output, "basic-routes/app/")).toBe(true);
  });

  test("starts with app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./basic-routes"),
      join(__dirname, "./basic-routes/app")
    );
    expect(startsWith(output, "app/")).toBe(true);
  });

  test("starts with ../app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./basic-routes/test"),
      join(__dirname, "./basic-routes/app")
    );
    expect(startsWith(output, "../app/")).toBe(true);
  });

  test("starts with ../../app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./basic-routes/test/test"),
      join(__dirname, "./basic-routes/app")
    );
    expect(startsWith(output, "../../app/")).toBe(true);
  });
});

test("test the generated folder tree fully", () => {
  const output = traverseFileSystem(
    join(__dirname, "./basic-routes"),
    join(__dirname, "./basic-routes/app")
  );
  // console.log(JSON.stringify(output, null, 2))

  expect(output).toStrictEqual(input);
});
