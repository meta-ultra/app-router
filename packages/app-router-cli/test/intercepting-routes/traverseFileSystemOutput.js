export default [
  {
    path: "app",
    props: {
      page: "app/page.js",
    },
    children: [
      {
        path: "app/(.)imgs",
        props: {},
        children: [
          {
            path: "app/(.)imgs/[id]",
            props: {
              page: "app/(.)imgs/[id]/page.js",
            },
            children: [],
          },
        ],
      },
      {
        path: "app/gallery",
        props: {},
        children: [
          {
            path: "app/gallery/(..)imgs",
            props: {},
            children: [
              {
                path: "app/gallery/(..)imgs/(..)imgs",
                props: {
                  page: "app/gallery/(..)imgs/(..)imgs/page.js",
                },
                children: [],
              },
              {
                path: "app/gallery/(..)imgs/@test",
                props: {
                  page: "app/gallery/(..)imgs/@test/page.ts",
                },
                children: [],
              },
              {
                path: "app/gallery/(..)imgs/[id]",
                props: {
                  page: "app/gallery/(..)imgs/[id]/page.tsx",
                },
                children: [],
              },
            ],
          },
          {
            path: "app/gallery/nested",
            props: {},
            children: [
              {
                path: "app/gallery/nested/(..)(..)imgs",
                props: {},
                children: [
                  {
                    path: "app/gallery/nested/(..)(..)imgs/[id]",
                    props: {
                      page: "app/gallery/nested/(..)(..)imgs/[id]/page.tsx",
                    },
                    children: [],
                  },
                ],
              },
              {
                path: "app/gallery/nested/nested",
                props: {},
                children: [
                  {
                    path: "app/gallery/nested/nested/(...)imgs",
                    props: {},
                    children: [
                      {
                        path: "app/gallery/nested/nested/(...)imgs/[id]",
                        props: {
                          page: "app/gallery/nested/nested/(...)imgs/[id]/page.tsx",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "app/imgs",
        props: {},
        children: [
          {
            path: "app/imgs/[id]",
            props: {
              page: "app/imgs/[id]/page.tsx",
            },
            children: [],
          },
        ],
      },
    ],
  },
];
