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
        "id": "app/",
        "type": "page",
        "index": true,
        "props": {
          "page": "app/page.js"
        },
        "children": []
      },
      {
        "id": "app/gallery",
        "type": "layout",
        "props": {
          "layout": "app/gallery/layout.tsx"
        },
        "children": [
          {
            "id": "app/gallery/list",
            "type": "page",
            "path": "gallery/list",
            "props": {
              "page": "app/gallery/list/page.js"
            },
            "children": []
          },
          {
            "id": "app/gallery",
            "type": "intercepting",
            "props": {
              "intercepting": true,
              "page": {
                "props": {
                  "page": "app/gallery/page.js"
                },
                "children": []
              }
            },
            "children": [
              {
                "id": "app/gallery/(..)imgs/[id]",
                "type": "page",
                "path": "imgs/:id",
                "props": {
                  "page": "app/gallery/(..)imgs/[id]/page.tsx"
                },
                "children": []
              },
              {
                "id": "app/gallery/(..)imgs/[id]",
                "type": "page",
                "path": "imgs/:id",
                "props": {
                  "page": "app/gallery/(..)imgs/[id]/page.tsx"
                },
                "children": []
              },
              {
                "id": "app/gallery/nested/(..)(..)imgs/[id]",
                "type": "page",
                "path": "nested/imgs/:id",
                "props": {
                  "page": "app/gallery/nested/(..)(..)imgs/[id]/page.tsx"
                },
                "children": []
              },
              {
                "id": "app/gallery/nested/nested/(...)imgs/[id]",
                "type": "page",
                "path": "nested/nested/imgs/:id",
                "props": {
                  "page": "app/gallery/nested/nested/(...)imgs/[id]/page.tsx"
                },
                "children": []
              }
            ],
            "path": "gallery"
          }
        ]
      },
      {
        "id": "app/imgs/[id]",
        "type": "intercepted",
        "path": "imgs/:id",
        "props": {
          "page": "app/imgs/[id]/page.tsx",
          "intercepted": {
            "props": {
              "page": "app/(.)imgs/[id]/page.js"
            },
            "children": []
          }
        },
        "children": []
      }
    ]
  }
];
