import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  RouteSegmentElement,
  RootRouteSegmentElement,
  RouteSegmentElementLayout,
} from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement>{lazy(() => import("./app/layout"))}</RootRouteSegmentElement>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/home/page"))}</RouteSegmentElement>
          ),
        },
        {
          path: "login",
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/login/page"))}</RouteSegmentElement>
          ),
        },
        {
          element: (
            <RouteSegmentElement layout={RouteSegmentElementLayout.LAYOUT}>
              {lazy(() => import("./app/(...auth)/layout"))}
            </RouteSegmentElement>
          ),
          children: [
            {
              path: "about",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(...auth)/about/page"))}
                </RouteSegmentElement>
              ),
            },
            {
              path: "profile",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(...auth)/profile/page"))}
                </RouteSegmentElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/auth",
  }
);

export default router;
