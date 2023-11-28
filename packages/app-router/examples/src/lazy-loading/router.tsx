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
          path: "about",
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/about/page"))}</RouteSegmentElement>
          ),
        },
      ],
    },
  ],
  {
    basename: "/lazy-loading",
  }
);

export default router;
