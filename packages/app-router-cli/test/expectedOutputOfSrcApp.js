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
        path: "app/(...group)",
        props: {
          layout: "app/(...group)/layout.tsx",
        },
        children: [
          {
            path: "app/(...group)/posts",
            props: {
              page: "app/(...group)/posts/page.ts",
            },
            children: [],
          },
        ],
      },
      {
        path: "app/(group)",
        props: {
          page: "app/(group)/page.ts",
        },
        children: [
          {
            path: "app/(group)/posts",
            props: {},
            children: [
              {
                path: "app/(group)/posts/[[...id]]",
                props: {
                  page: "app/(group)/posts/[[...id]]/page.ts",
                },
                children: [],
              },
            ],
          },
          {
            path: "app/(group)/[id]",
            props: {
              page: "app/(group)/[id]/page.ts",
            },
            children: [],
          },
        ],
      },
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
        children: [
          {
            children: [],
            path: "app/empty/empty",
            props: {},
          },
        ],
        path: "app/empty",
        props: {},
      },
      {
        path: "app/error",
        props: {
          page: "app/error/page.ts",
        },
        children: [],
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
    ],
  },
];
