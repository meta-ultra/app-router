export default [
  {
    path: "app",
    props: {},
    children: [
      {
        path: "catch-all",
        children: [
          {
            children: [],
            path: "app/catch-all/anything",
            props: {
              page: "app/catch-all/anything/page.tsx",
            },
          },
          {
            children: [
              {
                children: [],
                path: "app/catch-all/[...id]/create",
                props: {
                  page: "app/catch-all/[...id]/create/page.tsx",
                },
              },
            ],
            path: "app/catch-all/[...id]",
            props: {
              page: "app/catch-all/[...id]/page.tsx",
            },
          },
          {
            children: [
              {
                children: [],
                path: "app/catch-all/[id]/create",
                props: {
                  page: "app/catch-all/[id]/create/page.tsx",
                },
              },
            ],
            path: "app/catch-all/[id]",
            props: {
              page: "app/catch-all/[id]/page.tsx",
            },
          },
          {
            children: [
              {
                children: [],
                path: "app/catch-all/[[...id]]/create",
                props: {
                  page: "app/catch-all/[[...id]]/create/page.tsx",
                },
              },
            ],
            path: "app/catch-all/[[...id]]",
            props: {
              page: "app/catch-all/[[...id]]/page.tsx",
            },
          },
        ],
        path: "app/catch-all",
        props: {
          layout: "app/catch-all/layout.tsx",
          page: "app/catch-all/page.tsx",
        },
      },
    ],
  },
];
