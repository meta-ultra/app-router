import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootErrorElement, RouteSegmentElement, RootRouteSegmentElement } from "../../../src/index";
import ProfileNotFound from "./app/home/profile/not-found";
import AvatarNotFound from "./app/home/avatar/not-found";

const router = createBrowserRouter(
  [
    {
      element: (
        <RootRouteSegmentElement>{lazy(() => import("./app/layout"))}</RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement notFound={<div>h</div>} />,
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
        {
          path: "profile",
          element: (
            <RouteSegmentElement notFound={ProfileNotFound}>
              {lazy(() => import("./app/home/profile/page"))}
            </RouteSegmentElement>
          ),
        },
        {
          path: "avatar",
          element: (
            <RouteSegmentElement notFound={AvatarNotFound}>
              {lazy(() => import("./app/home/avatar/page"))}
            </RouteSegmentElement>
          ),
        },
      ],
    },
  ],
  {
    basename: "/auth-metadata",
  }
);

export default router;
