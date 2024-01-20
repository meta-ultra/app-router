import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

import RootNotFound from "./app/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={<RootNotFound />}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "posts",
          element: <PageRouteElement>{lazy(() => import("./app/posts/page"))}</PageRouteElement>,
        },
        {
          id: "posts/[id]",
          path: "posts/:id",
          element: (
            <PageRouteElement>{lazy(() => import("./app/posts/[id]/page"))}</PageRouteElement>
          ),
        },
        {
          id: "posts/[id]/edit",
          path: "posts/:id/edit",
          element: (
            <PageRouteElement>{lazy(() => import("./app/posts/[id]/edit/page"))}</PageRouteElement>
          ),
        },
        {
          path: "catch-all",
          element: (
            <PageRouteElement>{lazy(() => import("./app/catch-all/page"))}</PageRouteElement>
          ),
        },
        {
          id: "catch-all/[...id]",
          path: "catch-all/*",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/catch-all/[...id]/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "[[...id]]",
          path: "*",
          element: (
            <PageRouteElement>{lazy(() => import("./app/[[...id]]/page"))}</PageRouteElement>
          ),
        },
      ],
    },
  ],
  {
    basename: "/dynamic-routes",
  }
);

export default router;
