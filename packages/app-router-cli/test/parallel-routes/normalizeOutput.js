export default [
  {
    "path": "app",
    "props": {
      "layout": "preset::root-layout"
    },
    "children": [
      {
        "path": "app/dashboard",
        "props": {
          "layout": "app/dashboard/layout.js",
          "parallelRoutes": {
            "chart1": {
              "path": "app/dashboard/@chart1",
              "props": {
                "loading": "app/dashboard/@chart1/loading.js",
                "page": "app/dashboard/@chart1/page.js",
                "notFound": "app/dashboard/@chart1/not-found.js",
                "template": "app/dashboard/template.js"
              },
              "children": []
            }
          }
        },
        "children": [
          {
            "path": "app/dashboard/",
            "props": {
              "page": "app/dashboard/page.js",
              "template": "app/dashboard/template.js"
            },
            "children": []
          }
        ]
      }
    ]
  }
]
