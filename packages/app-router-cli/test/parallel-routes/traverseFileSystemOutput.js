export default [
  {
    "path": "app",
    "props": {},
    "children": [
      {
        "path": "app/dashboard",
        "props": {
          "layout": "app/dashboard/layout.js",
          "page": "app/dashboard/page.js",
          "template": "app/dashboard/template.js"
        },
        "children": [
          {
            "path": "app/dashboard/@chart1",
            "props": {
              "layout": "app/dashboard/@chart1/layout.js",
              "loading": "app/dashboard/@chart1/loading.js",
              "not-found": "app/dashboard/@chart1/not-found.js",
              "page": "app/dashboard/@chart1/page.js",
              "template": "app/dashboard/@chart1/template.js"
            },
            "children": []
          },
          {
            "path": "app/dashboard/@chart2",
            "props": {
              "layout": "app/dashboard/@chart2/layout.ts",
              "not-found": "app/dashboard/@chart2/not-found.js"
            },
            "children": [
              {
                "path": "app/dashboard/@chart2/@chart2-children",
                "props": {
                  "page": "app/dashboard/@chart2/@chart2-children/page.js"
                },
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
]
