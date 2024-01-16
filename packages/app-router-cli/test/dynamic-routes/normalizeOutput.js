export default [
  {
    "path": "app",
    "props": {
      "layout": "preset::root-layout"
    },
    "children": [
      {
        "path": "app/catch-all",
        "children": [
          {
            "path": "app/catch-all/",
            "props": {
              "page": "app/catch-all/page.tsx"
            },
            "children": []
          },
          {
            "children": [],
            "path": "app/catch-all/anything",
            "props": {
              "page": "app/catch-all/anything/page.tsx"
            }
          },
          {
            "children": [],
            "path": "app/catch-all/[id]/create",
            "props": {
              "page": "app/catch-all/[id]/create/page.tsx"
            }
          },
          {
            "children": [],
            "path": "app/catch-all/[id]",
            "props": {
              "page": "app/catch-all/[id]/page.tsx"
            }
          },
          {
            "children": [],
            "path": "app/catch-all/[[...id]]",
            "props": {
              "page": "app/catch-all/[[...id]]/page.tsx"
            }
          }
        ],
        "props": {
          "layout": "app/catch-all/layout.tsx"
        }
      }
    ]
  }
]
