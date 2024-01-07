export default [
  {
    path: "app2",
    props: {},
    children: [
      {
        path: "app2/dashboard",
        props: {
          layout: "app2/dashboard/layout.js",
          page: "app2/dashboard/page.js",
        },
        children: [
          {
            path: "app2/dashboard/@chart1",
            props: {
              loading: "app2/dashboard/@chart1/loading.js",
              "not-found": "app2/dashboard/@chart1/not-found.js",
              page: "app2/dashboard/@chart1/page.js",
              template: "app2/dashboard/@chart1/template.js",
              layout: "app2/dashboard/@chart1/layout.js",
            },
            children: [],
          },
          {
            path: "app2/dashboard/@chart2",
            props: {
              "not-found": "app2/dashboard/@chart2/not-found.js",
              layout: "app2/dashboard/@chart2/layout.ts",
            },
            children: [
              {
                path: "app2/dashboard/@chart2/@chart2-children",
                props: {
                  page: "app2/dashboard/@chart2/@chart2-children/page.js",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: "app2/gallery",
        props: {},
        children: [
          {
            path: "app2/gallery/(..)imgs",
            props: {},
            children: [
              {
                path: "app2/gallery/(..)imgs/(..)imgs",
                props: {
                  page: "app2/gallery/(..)imgs/(..)imgs/page.js",
                },
                children: [],
              },
              {
                path: "app2/gallery/(..)imgs/@test",
                props: {
                  page: "app2/gallery/(..)imgs/@test/page.ts",
                },
                children: [],
              },
              {
                path: "app2/gallery/(..)imgs/[id]",
                props: {
                  page: "app2/gallery/(..)imgs/[id]/page.tsx",
                },
                children: [],
              },
            ],
          },
          {
            path: "app2/gallery/nested",
            props: {},
            children: [
              {
                path: "app2/gallery/nested/(..)(..)imgs",
                props: {},
                children: [
                  {
                    path: "app2/gallery/nested/(..)(..)imgs/[id]",
                    props: {
                      page: "app2/gallery/nested/(..)(..)imgs/[id]/page.tsx",
                    },
                    children: [],
                  },
                ],
              },
              {
                path: "app2/gallery/nested/nested",
                props: {},
                children: [
                  {
                    path: "app2/gallery/nested/nested/(...)imgs",
                    props: {},
                    children: [
                      {
                        path: "app2/gallery/nested/nested/(...)imgs/[id]",
                        props: {
                          page: "app2/gallery/nested/nested/(...)imgs/[id]/page.tsx",
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
        path: "app2/imgs",
        props: {},
        children: [
          {
            path: "app2/imgs/[id]",
            props: {
              page: "app2/imgs/[id]/page.tsx",
            },
            children: [],
          },
        ],
      },
    ],
  },
];
