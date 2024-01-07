export default [
  {
    path: "app",
    props: {
      error: "app/error.js",
      "global-error": "app/global-error.js",
      layout: "app/layout.tsx",
      loading: "app/loading.jsx",
    },
    children: [
      {
        path: "app/about",
        props: {
          "global-error": "app/about/global-error.tsx",
          page: "app/about/page.jsx",
        },
        children: [
          {
            path: "app/about/nested",
            props: {
              "not-found": "app/about/nested/not-found.js",
              page: "app/about/nested/page.js",
              template: "app/about/nested/template.tsx",
            },
            children: [],
          },
        ],
      },
      {
        path: "app/empty",
        props: {},
        children: [
          {
            path: "app/empty/empty",
            props: {},
            children: [],
          },
        ],
      },
      {
        path: "app/home",
        props: {
          error: "app/home/error.jsx",
          layout: "app/home/layout.jsx",
          page: "app/home/page.tsx",
        },
        children: [],
      },
      {
        path: "app/not-empty",
        props: {},
        children: [
          {
            path: "app/not-empty/not-empty",
            props: {
              page: "app/not-empty/not-empty/page.js",
            },
            children: [],
          },
        ],
      },
    ],
  },
];
