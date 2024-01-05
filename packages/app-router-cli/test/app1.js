export default [
  {
    path: "app1",
    props: {
      error: "app1/error.js",
      "global-error": "app1/global-error.js",
      layout: "app1/layout.tsx",
      loading: "app1/loading.jsx",
    },
    children: [
      {
        path: "app1/(...group)",
        props: {
          layout: "app1/(...group)/layout.tsx",
        },
        children: [
          {
            path: "app1/(...group)/posts",
            props: {
              page: "app1/(...group)/posts/page.ts",
            },
            children: [],
          },
        ],
      },
      {
        path: "app1/(group)",
        props: {
          page: "app1/(group)/page.ts",
        },
        children: [
          {
            path: "app1/(group)/posts",
            props: {},
            children: [
              {
                path: "app1/(group)/posts/[[...id]]",
                props: {
                  page: "app1/(group)/posts/[[...id]]/page.ts",
                },
                children: [],
              },
            ],
          },
          {
            path: "app1/(group)/[id]",
            props: {
              page: "app1/(group)/[id]/page.ts",
            },
            children: [],
          },
        ],
      },
      {
        path: "app1/about",
        props: {
          "global-error": "app1/about/global-error.tsx",
          page: "app1/about/page.jsx",
        },
        children: [
          {
            path: "app1/about/nested",
            props: {
              "not-found": "app1/about/nested/not-found.js",
              page: "app1/about/nested/page.js",
              template: "app1/about/nested/template.tsx",
            },
            children: [],
          },
        ],
      },
      {
        children: [
          {
            children: [
              {
                children: [],
                path: "app1/catch-all/[...id]/create",
                props: {
                  page: "app1/catch-all/[...id]/create/page.tsx",
                },
              },
            ],
            path: "app1/catch-all/[...id]",
            props: {
              page: "app1/catch-all/[...id]/page.tsx",
            },
          },
          {
            children: [
              {
                children: [],
                path: "app1/catch-all/[id]/create",
                props: {
                  page: "app1/catch-all/[id]/create/page.tsx",
                },
              },
            ],
            path: "app1/catch-all/[id]",
            props: {
              page: "app1/catch-all/[id]/page.tsx",
            },
          },
          {
            children: [
              {
                children: [],
                path: "app1/catch-all/[[...id]]/create",
                props: {
                  page: "app1/catch-all/[[...id]]/create/page.tsx",
                },
              },
            ],
            path: "app1/catch-all/[[...id]]",
            props: {
              page: "app1/catch-all/[[...id]]/page.tsx",
            },
          },
        ],
        path: "app1/catch-all",
        props: {},
      },
      {
        children: [
          {
            children: [],
            path: "app1/empty/empty",
            props: {},
          },
        ],
        path: "app1/empty",
        props: {},
      },
      {
        path: "app1/error",
        props: {
          page: "app1/error/page.ts",
        },
        children: [],
      },
      {
        path: "app1/home",
        props: {
          error: "app1/home/error.jsx",
          layout: "app1/home/layout.jsx",
          page: "app1/home/page.tsx",
        },
        children: [],
      },
      {
        children: [
          {
            children: [],
            path: "app1/not-empty/not-empty",
            props: {
              page: "app1/not-empty/not-empty/page.tsx",
            },
          },
        ],
        path: "app1/not-empty",
        props: {},
      },
    ],
  },
];
