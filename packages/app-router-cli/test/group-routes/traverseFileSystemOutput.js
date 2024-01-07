export default [
  {
    path: "app",
    props: {},
    children: [
      {
        path: "app/(...empty)",
        props: {},
        children: [
          {
            path: "app/(...empty)/empty",
            props: {},
            children: [],
          },
        ],
      },
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
        props: {},
        children: [
          {
            path: "app/(group)/something",
            props: {
              page: "app/(group)/something/page.ts",
            },
            children: [],
          },
        ],
      },
    ],
  },
];
