import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import Handlebars from "handlebars";

const appRouterPath = join(process.cwd(), "./test_src/app");
const targetPath = join(process.cwd(), "./test_src/router.tsx");

const stripExtension = (name) => name.replace(/\.(t|j)sx?$/, "");

const isValidFileName = (filename) =>
  ["page", "layout", "error", "global-error", "loading", "not-found"].indexOf(filename) !== -1;

const isStaticImportFileName = (filename) =>
  ["error", "loading", "notFound"].indexOf(filename) !== -1;

const isGroupName = (filename) => /^\([^)(]+\)$/.test(filename);

const nameByFullPath = (fullPath) => {
  if (!fullPath) return undefined;

  return stripExtension(fullPath)
    .split("/")
    .filter((seg) => !/^\.{1,2}$/.test(seg))
    .reduce((accu, seg) => {
      accu.push(
        seg
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("")
      );
      return accu;
    }, [])
    .join("");
};

const traverseFileSystem = (dirname, filename = "", children = []) => {
  const node = {};
  const path = join(dirname, filename);
  const itemNames = readdirSync(path);
  for (let i = 0; i < itemNames.length; ++i) {
    const itemName = itemNames[i];
    if (!itemName.startsWith("_")) {
      const name = stripExtension(itemName);
      const filepath = join(path, itemName);

      const stats = statSync(filepath);
      if (stats.isDirectory()) {
        node.children = node.children || [];
        traverseFileSystem(path, itemName, node.children);
      } else if (isValidFileName(name)) {
        node.props = node.props || {};
        node.props[name] = stripExtension(
          relative(targetPath, filepath)
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
    children.push(node);
  }

  return children;
};

/**
 * 1. Check if there's a global-error file under app folder rather not an error file as the nested folders.
 * 2. Rename the `global-error` property to `error` property to close the structure of react-router-dom route.
 */
const processGlobalError = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    if (child.props["error"]) {
      console.log(
        `Please rename ${child.props["error"]} to ${child.props["error"].replace(
          "error",
          "global-error"
        )}.`
      );
    }

    child.props["error"] = child.props["global-error"];
    delete child.props["global-error"];
  }

  return children;
};

/**
 * Rename "not-found" to "notFound".
 */
const processNotFound = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    child.props["notFound"] = child.props["not-found"];
    delete child.props["not-found"];
  }

  return children;
};

/**
 * The page locates along with a layout file should be sunk to child level.
 */
const sinkPageWithLayout = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    sinkPageWithLayout(child.children);
    if (child.props.page && child.props.layout) {
      child.children.push({
        index: true,
        props: {
          page: child.props.page,
        },
        children: [],
      });
      delete child.props.page;
    }
  }

  return children;
};

const collectDefaultImports = (children, defaultImports = []) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    const staticImportFileNames = Object.keys(child.props || {}).filter((key) =>
      isStaticImportFileName(key)
    );

    for (let j = 0; j < staticImportFileNames.length; j++) {
      const staticImportFileName = staticImportFileNames[j];
      defaultImports.push({
        default: nameByFullPath(child.props[staticImportFileName]),
        path: child.props[staticImportFileName],
      });
    }
  }

  return defaultImports;
};

const routes = sinkPageWithLayout(
  processNotFound(processGlobalError(traverseFileSystem(appRouterPath)))
);

// generate
const defaultImports = collectDefaultImports(routes);

Handlebars.registerHelper("undefinable", function (value) {
  return value == undefined ? "undefined" : value;
});

Handlebars.registerHelper("nameByFullPath", nameByFullPath);

const childrenRouteTemplate = Handlebars.compile(`{
  {{#if path}}path: "{{path}}",{{/if}}
  {{~#if index}}index: {{index}},{{/if}}
  element: (
    <RouteSegmentElement layout={RouteSegmentElementLayout.{{#if props.layout}}LAYOUT{{else}}NO{{/if~}} } loading={ {{~undefinable (nameByFullPath props.loading)~}} } error={ {{~undefinable (nameByFullPath props.error)~}} } notFound={ {{~undefinable (nameByFullPath props.notFound)~}} }
      {lazy(() => import("{{#if props.layout}}{{{props.layout}}}{{else}}{{{props.page}}}{{/if}}")}
    </RouteSegmentElement>
  ),
  {{~#if grandchildren}}
  children: [
    {{~#each grandchildren}}{{{this}}},{{/each}}
  ]
  {{/if}}
}`);

const generateChildrenRoutes = (routes) => {
  const children = [];
  for (let i = 0; routes && i < routes.length; ++i) {
    const route = routes[i];
    const grandchildren = generateChildrenRoutes(route.children);

    children.push(childrenRouteTemplate({ ...routes[i], grandchildren }));
  }

  return children;
};

Handlebars.registerHelper("generateChildrenRoutes", function (routes) {
  const children = generateChildrenRoutes(routes);
  return `[${children.join(",")}]`;
});

const template = Handlebars.compile(readFileSync("./src/router.hbs").toString());
const router = template({
  defaultImports,
  routes: [
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  props: {
                    page: "./app/(...auth)/(workbench)/baseinfo/page",
                  },
                  path: "baseinfo",
                  children: [],
                },
                {
                  props: {
                    page: "./app/(...auth)/(workbench)/groups/page",
                  },
                  path: "groups",
                  children: [],
                },
              ],
              props: {
                layout: "./app/(...auth)/(workbench)/layout",
                loading: "./app/(...auth)/(workbench)/loading",
              },
              _pathHint: "(workbench)",
            },
          ],
          props: {
            layout: "./app/(...auth)/layout",
          },
          _pathHint: "(...auth)",
        },
        {
          props: {
            page: "./app/login/page",
          },
          path: "login",
          children: [],
        },
        {
          index: true,
          props: {
            page: "./app/page",
          },
          children: [],
        },
      ],
      props: {
        layout: "./app/layout",
        loading: "./app/loading",
        error: "./app/global-error",
        notFound: "./app/not-found",
      },
    },
  ],
});

writeFileSync(targetPath, router);

console.log(JSON.stringify(routes, undefined, 2));
