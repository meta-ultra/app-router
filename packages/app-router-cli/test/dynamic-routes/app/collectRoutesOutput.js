export default [
  {
    "id": "app",
    "type": "layout",
    "path": "app",
    "props": {
      "layout": "preset::root-layout"
    },
    "children": [
      {
        "id": "app/catch-all",
        "type": "layout",
        "path": "catch-all",
        "props": {
          "layout": "app/catch-all/layout.tsx"
        },
        "children": [
          {
            "id": "app/catch-all/",
            "type": "page",
            "index": true,
            "props": {
              "page": "app/catch-all/page.tsx"
            },
            "children": []
          },
          {
            "id": "app/catch-all/anything",
            "type": "page",
            "path": "anything",
            "props": {
              "page": "app/catch-all/anything/page.tsx"
            },
            "children": []
          },
          {
            "id": "app/catch-all/[id]/create",
            "type": "page",
            "path": ":id/create",
            "props": {
              "page": "app/catch-all/[id]/create/page.tsx"
            },
            "children": []
          },
          {
            "id": "app/catch-all/[id]",
            "type": "page",
            "path": ":id",
            "props": {
              "page": "app/catch-all/[id]/page.tsx"
            },
            "children": []
          },
          {
            "id": "app/catch-all/[[...id]]",
            "type": "page",
            "path": "*",
            "props": {
              "page": "app/catch-all/[[...id]]/page.tsx"
            },
            "children": []
          }
        ]
      }
    ]
  }
]
