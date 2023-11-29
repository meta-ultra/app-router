import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootErrorElement, RouteSegmentElement, RootRouteSegmentElement } from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement>{lazy(() => import("./app/layout"))}</RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement />,
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
    basename: "/metadata",
  }
);

export default router;
