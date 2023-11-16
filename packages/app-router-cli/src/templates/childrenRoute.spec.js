export default {
  1: function (container, depth0, helpers, partials, data) {
    var lookupProperty =
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
        container.lambda(depth0 != null ? lookupProperty(depth0, "path") : depth0, depth0)
      ) +
      '",'
    );
  },
  3: function (container, depth0, helpers, partials, data) {
    var lookupProperty =
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
        container.lambda(depth0 != null ? lookupProperty(depth0, "index") : depth0, depth0)
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
};
