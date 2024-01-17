export default [
  {
    "path": "app",
    "props": {
      "layout": "preset::root-layout"
    },
    "children": [
      {
        "path": "app/",
        "props": {
          "page": "app/page.js"
        },
        "children": []
      },
      {
        "path": "app/(.)imgs/[id]",
        "props": {
          "page": "app/(.)imgs/[id]/page.js"
        },
        "children": []
      },
      {
        "path": "app/gallery/(..)imgs/[id]",
        "props": {
          "page": "app/gallery/(..)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "path": "app/gallery/nested/(..)(..)imgs/[id]",
        "props": {
          "page": "app/gallery/nested/(..)(..)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "path": "app/gallery/nested/nested/(...)imgs/[id]",
        "props": {
          "page": "app/gallery/nested/nested/(...)imgs/[id]/page.tsx"
        },
        "children": []
      },
      {
        "path": "app/imgs/[id]",
        "props": {
          "page": "app/imgs/[id]/page.tsx"
        },
        "children": []
      }
    ]
  }
];
