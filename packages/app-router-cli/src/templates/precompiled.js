import Handlebars from "handlebars";

(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["childrenRoute"] = template({
    1: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        'path: "' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "path") ||
              (depth0 != null ? lookupProperty(depth0, "path") : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
                name: "path",
                hash: {},
                data: data,
                loc: { start: { line: 2, column: 21 }, end: { line: 2, column: 29 } },
              })
            : helper)
        ) +
        '",'
      );
    },
    3: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "index: " +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (depth0 != null ? lookupProperty(depth0, "index") : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
                name: "index",
                hash: {},
                data: data,
                loc: { start: { line: 3, column: 23 }, end: { line: 3, column: 32 } },
              })
            : helper)
        ) +
        ","
      );
    },
    5: function (container, depth0, helpers, partials, data) {
      return "LAYOUT";
    },
    7: function (container, depth0, helpers, partials, data) {
      return "NO";
    },
    9: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = container.lambda(
        (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
          ? lookupProperty(stack1, "layout")
          : stack1,
        depth0
      )) != null
        ? stack1
        : "";
    },
    11: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = container.lambda(
        (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
          ? lookupProperty(stack1, "page")
          : stack1,
        depth0
      )) != null
        ? stack1
        : "";
    },
    13: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "  children: [" +
        ((stack1 = lookupProperty(helpers, "each").call(
          depth0 != null ? depth0 : container.nullContext || {},
          depth0 != null ? lookupProperty(depth0, "grandchildren") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(14, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 11, column: 4 }, end: { line: 11, column: 48 } },
          }
        )) != null
          ? stack1
          : "") +
        "\r\n  ]\r\n"
      );
    },
    14: function (container, depth0, helpers, partials, data) {
      var stack1;

      return ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "") + ",";
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "{\r\n  " +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "path") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(1, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 2, column: 2 }, end: { line: 2, column: 38 } },
          }
        )) != null
          ? stack1
          : "") +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "index") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(3, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 3, column: 2 }, end: { line: 3, column: 40 } },
          }
        )) != null
          ? stack1
          : "") +
        "\r\n  element: (\r\n    <RouteSegmentElement layout={RouteSegmentElementLayout." +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
            ? lookupProperty(stack1, "layout")
            : stack1,
          {
            name: "if",
            hash: {},
            fn: container.program(5, data, 0),
            inverse: container.program(7, data, 0),
            data: data,
            loc: { start: { line: 5, column: 59 }, end: { line: 5, column: 103 } },
          }
        )) != null
          ? stack1
          : "") +
        "} loading={" +
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
              alias1,
              (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
                ? lookupProperty(stack1, "loading")
                : stack1,
              {
                name: "nameByFullPath",
                hash: {},
                data: data,
                loc: { start: { line: 5, column: 131 }, end: { line: 5, column: 161 } },
              }
            ),
            {
              name: "undefinable",
              hash: {},
              data: data,
              loc: { start: { line: 5, column: 116 }, end: { line: 5, column: 164 } },
            }
          )
        ) +
        "} error={" +
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
              alias1,
              (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
                ? lookupProperty(stack1, "error")
                : stack1,
              {
                name: "nameByFullPath",
                hash: {},
                data: data,
                loc: { start: { line: 5, column: 190 }, end: { line: 5, column: 218 } },
              }
            ),
            {
              name: "undefinable",
              hash: {},
              data: data,
              loc: { start: { line: 5, column: 175 }, end: { line: 5, column: 221 } },
            }
          )
        ) +
        "} notFound={" +
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
              alias1,
              (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
                ? lookupProperty(stack1, "notFound")
                : stack1,
              {
                name: "nameByFullPath",
                hash: {},
                data: data,
                loc: { start: { line: 5, column: 250 }, end: { line: 5, column: 281 } },
              }
            ),
            {
              name: "undefinable",
              hash: {},
              data: data,
              loc: { start: { line: 5, column: 235 }, end: { line: 5, column: 284 } },
            }
          )
        ) +
        '}>\r\n      {lazy(() => import("' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
            ? lookupProperty(stack1, "layout")
            : stack1,
          {
            name: "if",
            hash: {},
            fn: container.program(9, data, 0),
            inverse: container.program(11, data, 0),
            data: data,
            loc: { start: { line: 6, column: 26 }, end: { line: 6, column: 95 } },
          }
        )) != null
          ? stack1
          : "") +
        '"))}\r\n    </RouteSegmentElement>\r\n  ),' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "grandchildren") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(13, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 9, column: 2 }, end: { line: 13, column: 9 } },
          }
        )) != null
          ? stack1
          : "") +
        "}\r\n"
      );
    },
    useData: true,
  });
  templates["router"] = template({
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
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
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
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
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
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
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
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
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
        alias3(
          container.lambda(
            (stack1 = depth0 != null ? lookupProperty(depth0, "props") : depth0) != null
              ? lookupProperty(stack1, "layout")
              : stack1,
            depth0
          )
        ) +
        '"))}\r\n    </RouteSegmentElement>\r\n    ), \r\n  errorElement: <RootErrorElement notFound={' +
        alias3(
          (
            lookupProperty(helpers, "undefinable") ||
            (depth0 && lookupProperty(depth0, "undefinable")) ||
            alias2
          ).call(
            alias1,
            (
              lookupProperty(helpers, "nameByFullPath") ||
              (depth0 && lookupProperty(depth0, "nameByFullPath")) ||
              alias2
            ).call(
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
        ((stack1 = (
          lookupProperty(helpers, "generateChildrenRoutes") ||
          (depth0 && lookupProperty(depth0, "generateChildrenRoutes")) ||
          alias2
        ).call(alias1, depth0 != null ? lookupProperty(depth0, "children") : depth0, {
          name: "generateChildrenRoutes",
          hash: {},
          data: data,
          loc: { start: { line: 20, column: 12 }, end: { line: 20, column: 54 } },
        })) != null
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
  });
})();
