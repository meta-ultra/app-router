export default [
  {
    path: "app",
    props: {
      layout: "app/layout.tsx",
      loading: "app/loading.jsx",
      error: "app/global-error.js",
    },
    children: [
      {
        path: "app/about",
        props: {
          page: "app/about/page.jsx",
        },
        children: [
          {
            path: "app/about/nested",
            props: {
              template: "app/about/nested/template.tsx",
              layout: "preset::layout",
              notFound: "app/about/nested/not-found.js",
            },
            children: [
              {
                path: "app/about/nested/",
                props: {
                  page: "app/about/nested/page.js",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: "app/home",
        props: {
          error: "app/home/error.jsx",
          layout: "app/home/layout.jsx",
        },
        children: [
          {
            path: "app/home/",
            props: {
              page: "app/home/page.tsx",
            },
            children: [],
          },
        ],
      },
      {
        path: "app/not-empty/not-empty",
        props: {
          page: "app/not-empty/not-empty/page.js",
        },
        children: [],
      },
    ],
  },
];
