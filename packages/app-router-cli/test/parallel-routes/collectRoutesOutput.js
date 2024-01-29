export default [
  {
    "id": "app",
    "type": "layout",
    "path": "/",
    "props": {
      "layout": "preset::root-layout"
    },
    "children": [
      {
        "id": "app/dashboard",
        "type": "layout",
        "path": "dashboard",
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
            "id": "app/dashboard/",
            "type": "page",
            "index": true,
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
