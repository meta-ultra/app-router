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
        "id": "app/(.)imgs/[id]",
        "type": "page",
        "path": "(.)imgs/:id",
        "props": {
          "page": "app/(.)imgs/[id]/page.js"
        },
        "children": []
      },
      {
        "id": "app/gallery/(..)imgs/[id]",
        "type": "page",
        "path": "gallery/(..)imgs/:id",
        "props": {
          "page": "app/gallery/(..)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "id": "app/gallery/nested/(..)(..)imgs/[id]",
        "type": "page",
        "path": "gallery/nested/(..)(..)imgs/:id",
        "props": {
          "page": "app/gallery/nested/(..)(..)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "id": "app/gallery/nested/nested/(...)imgs/[id]",
        "type": "page",
        "path": "gallery/nested/nested/(...)imgs/:id",
        "props": {
          "page": "app/gallery/nested/nested/(...)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "id": "app/imgs/[id]",
        "type": "page",
        "path": "imgs/:id",
        "props": {
          "page": "app/imgs/[id]/page.tsx"
        },
        "children": []
      }
    ]
  }
];
