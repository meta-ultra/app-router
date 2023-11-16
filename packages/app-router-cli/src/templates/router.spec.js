export default {
  1: function (container, depth0, helpers, partials, data) {
    var alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty =
        container.lookupProperty ||
        function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };

    return (
      "import " +
      alias2(alias1(depth0 != null ? lookupProperty(depth0, "default") : depth0, depth0)) +
      ' from "' +
      alias2(alias1(depth0 != null ? lookupProperty(depth0, "path") : depth0, depth0)) +
      '";\r\n'
    );
  },
  3: function (container, depth0, helpers, partials, data) {
    var stack1,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      alias2 = container.escapeExpression,
      lookupProperty =
        container.lookupProperty ||
        function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };

    return (
      "{ \r\n  element: (\r\n    <RouteSegmentElement\r\n      layout={RouteSegmentElementLayout.ROOT_LAYOUT}\r\n      loading={" +
      alias2(
        lookupProperty(helpers, "undefinable").call(
          alias1,
          lookupProperty(helpers, "nameByFullPath").call(
            alias1,
            (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
              ? lookupProperty(stack1, "loading")
              : stack1,
            {
              name: "nameByFullPath",
              hash: {},
              data: data,
              loc: { start: { line: 12, column: 31 }, end: { line: 12, column: 66 } },
            }
          ),
          {
            name: "undefinable",
            hash: {},
            data: data,
            loc: { start: { line: 12, column: 16 }, end: { line: 12, column: 69 } },
          }
        )
      ) +
      "}\r\n      error={" +
      alias2(
        lookupProperty(helpers, "undefinable").call(
          alias1,
          lookupProperty(helpers, "nameByFullPath").call(
            alias1,
            (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
              ? lookupProperty(stack1, "error")
              : stack1,
            {
              name: "nameByFullPath",
              hash: {},
              data: data,
              loc: { start: { line: 13, column: 29 }, end: { line: 13, column: 62 } },
            }
          ),
          {
            name: "undefinable",
            hash: {},
            data: data,
            loc: { start: { line: 13, column: 14 }, end: { line: 13, column: 65 } },
          }
        )
      ) +
      "}\r\n      notFound={" +
      alias2(
        lookupProperty(helpers, "undefinable").call(
          alias1,
          lookupProperty(helpers, "nameByFullPath").call(
            alias1,
            (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
              ? lookupProperty(stack1, "notFound")
              : stack1,
            {
              name: "nameByFullPath",
              hash: {},
              data: data,
              loc: { start: { line: 14, column: 32 }, end: { line: 14, column: 68 } },
            }
          ),
          {
            name: "undefinable",
            hash: {},
            data: data,
            loc: { start: { line: 14, column: 17 }, end: { line: 14, column: 71 } },
          }
        )
      ) +
      '}\r\n    >\r\n      {lazy(() => import("' +
      alias2(
        container.lambda(
          (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
            ? lookupProperty(stack1, "layout")
            : stack1,
          depth0
        )
      ) +
      '"))}\r\n    </RouteSegmentElement>\r\n    ), \r\n  errorElement: <RootErrorElement notFound={' +
      alias2(
        lookupProperty(helpers, "undefinable").call(
          alias1,
          lookupProperty(helpers, "nameByFullPath").call(
            alias1,
            (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
              ? lookupProperty(stack1, "notFound")
              : stack1,
            {
              name: "nameByFullPath",
              hash: {},
              data: data,
              loc: { start: { line: 19, column: 60 }, end: { line: 19, column: 96 } },
            }
          ),
          {
            name: "undefinable",
            hash: {},
            data: data,
            loc: { start: { line: 19, column: 45 }, end: { line: 19, column: 99 } },
          }
        )
      ) +
      "} />,\r\n  children: " +
      ((stack1 = lookupProperty(helpers, "generateChildrenRoutes").call(
        alias1,
        depth0 != null ? lookupProperty(depth0, "children") : depth0,
        {
          name: "generateChildrenRoutes",
          hash: {},
          data: data,
          loc: { start: { line: 20, column: 12 }, end: { line: 20, column: 54 } },
        }
      )) != null
        ? stack1
        : "") +
      "\r\n}"
    );
  },
  compiler: [8, ">= 4.3.0"],
  main: function (container, depth0, helpers, partials, data) {
    var stack1,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      lookupProperty =
        container.lookupProperty ||
        function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };

    return (
      'import { lazy } from "react"; \r\nimport { createHashRouter as createRouter } from "react-router-dom"; \r\nimport { RouteSegmentElementLayout, RootErrorElement, RouteSegmentElement } from "@meta-ultra/app-router";\r\n' +
      ((stack1 = lookupProperty(helpers, "each").call(
        alias1,
        depth0 != null ? lookupProperty(depth0, "defaultImports") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 4, column: 0 }, end: { line: 6, column: 9 } },
        }
      )) != null
        ? stack1
        : "") +
      "\r\nconst router = createRouter([" +
      ((stack1 = lookupProperty(helpers, "each").call(
        alias1,
        depth0 != null ? lookupProperty(depth0, "routes") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(3, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 8, column: 29 }, end: { line: 21, column: 10 } },
        }
      )) != null
        ? stack1
        : "") +
      "])\r\n\r\nexport default router\r\n"
    );
  },
  useData: true,
};
