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
          "layout": "app/dashboard/layout.js"
        },
        "children": [
          {
            "path": "app/dashboard/",
            "props": {
              "page": "app/dashboard/page.js"
            },
            "children": []
          },
          {
            "path": "app/dashboard/@chart1",
            "props": {
              "loading": "app/dashboard/@chart1/loading.js",
              "page": "app/dashboard/@chart1/page.js",
              "template": "app/dashboard/@chart1/template.js",
              "notFound": "app/dashboard/@chart1/not-found.js"
            },
            "children": []
          }
        ]
      }
    ]
  }
]
