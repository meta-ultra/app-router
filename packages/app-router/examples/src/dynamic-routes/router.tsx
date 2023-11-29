import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootRouteSegmentElement, RouteSegmentElement, RootErrorElement } from "../../../src/index";

import RootNotFound from "./app/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement notFound={<RootNotFound />}>
          {lazy(() => import("./app/layout"))}
        </RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          index: true,
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/home/page"))}</RouteSegmentElement>
          ),
        },
        {
          path: "posts",
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/posts/page"))}</RouteSegmentElement>
          ),
        },
        {
          id: "posts/[id]",
          path: "posts/:id",
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/posts/[id]/page"))}</RouteSegmentElement>
          ),
        },
        {
          id: "posts/[id]/edit",
          path: "posts/:id/edit",
          element: (
            <RouteSegmentElement>
              {lazy(() => import("./app/posts/[id]/edit/page"))}
            </RouteSegmentElement>
          ),
        },
        {
          path: "catch-all",
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/catch-all/page"))}</RouteSegmentElement>
          ),
        },
        {
          id: "catch-all/[...id]",
          path: "catch-all/*",
          element: (
            <RouteSegmentElement>
              {lazy(() => import("./app/catch-all/[...id]/page"))}
            </RouteSegmentElement>
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
