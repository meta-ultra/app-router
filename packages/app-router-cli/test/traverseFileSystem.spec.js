import { join } from "node:path";
import { traverseFileSystem } from "../src/core/traverseFileSystem";

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

test("select the first one sorted alphabetically when there're duplicated files with the same name.", () => {
  const output = traverseFileSystem(
    join(__dirname, "./traverseFileSystem"),
    join(__dirname, "./traverseFileSystem/app")
  );

  expect(output[0].children[2].props["error"].split(".")[1]).toBe("jsx");
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

  test("starts with traverseFileSystem/app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./"),
      join(__dirname, "./traverseFileSystem/app")
    );
    expect(startsWith(output, "traverseFileSystem/app/")).toBe(true);
  });

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

  test("starts with ../../app/", () => {
    const output = traverseFileSystem(
      join(__dirname, "./traverseFileSystem/test/test"),
      join(__dirname, "./traverseFileSystem/app")
    );
    expect(startsWith(output, "../../app/")).toBe(true);
  });
});

test.only("test the generated folder tree fully", () => {
  const output = traverseFileSystem(
    join(__dirname, "./traverseFileSystem"),
    join(__dirname, "./traverseFileSystem/app")
  );

  const expected = [
    {
      children: [
        {
          props: {
            layout: "app/(...group)/layout.tsx",
          },
          children: [
            {
              props: {
                page: "app/(...group)/posts/page.ts",
              },
            },
          ],
        },
        {
          props: {
            page: "app/(group)/page.ts",
          },
          children: [
            {
              children: [
                {
                  props: {
                    page: "app/(group)/posts/[[...id]]/page.ts",
                  },
                },
              ],
            },
            {
              props: {
                page: "app/(group)/[id]/page.ts",
              },
            },
          ],
        },
        {
          children: [
            {
              props: {
                "not-found": "app/about/nested/not-found.js",
                page: "app/about/nested/page.js",
                template: "app/about/nested/template.tsx",
              },
            },
          ],
          props: {
            page: "app/about/page.jsx",
            "global-error": "app/about/global-error.tsx",
          },
        },
        {
          props: {
            page: "app/error/page.ts",
          },
        },
        {
          props: {
            error: "app/home/error.jsx",
            layout: "app/home/layout.jsx",
            page: "app/home/page.tsx",
          },
        },
      ],
      props: {
        error: "app/error.js",
        "global-error": "app/global-error.js",
        layout: "app/layout.tsx",
        loading: "app/loading.jsx",
      },
    },
  ];

  expect(output).toStrictEqual(expected);
});
