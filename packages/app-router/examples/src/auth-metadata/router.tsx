import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootErrorElement, RouteSegmentElement, RootRouteSegmentElement } from "../../../src/index";
import RootNotFound from "./app/not-found";
import ProfileNotFound from "./app/profile/not-found";
import AvatarNotFound from "./app/avatar/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement notFound={RootNotFound}>
          {lazy(() => import("./app/layout"))}
        </RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement notFound={RootNotFound} />,
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
              {lazy(() => import("./app/profile/page"))}
            </RouteSegmentElement>
          ),
        },
        {
          path: "avatar",
          element: (
            <RouteSegmentElement notFound={AvatarNotFound}>
              {lazy(() => import("./app/avatar/page"))}
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
