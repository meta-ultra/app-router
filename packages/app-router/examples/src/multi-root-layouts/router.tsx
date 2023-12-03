import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootRouteSegmentElement, RouteSegmentElement, RootErrorElement } from "../../../src/index";

import RootNotFound from "./app/not-found";
import Sub1RootNotFound from "./app/(sub1)/not-found";
import Sub2RootNotFound from "./app/(sub2)/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootRouteSegmentElement notFound={<Sub1RootNotFound />} />,
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          element: (
            <RootRouteSegmentElement notFound={<Sub1RootNotFound />}>
              {lazy(() => import("./app/(sub1)/layout"))}
            </RootRouteSegmentElement>
          ),
          children: [
            {
              path: "sub1/home",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(sub1)/home/page"))}
                </RouteSegmentElement>
              ),
            },
            {
              path: "sub1/about",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(sub1)/about/page"))}
                </RouteSegmentElement>
              ),
            },
          ],
        },
        {
          element: (
            <RootRouteSegmentElement notFound={<Sub2RootNotFound />}>
              {lazy(() => import("./app/(sub2)/layout"))}
            </RootRouteSegmentElement>
          ),
          children: [
            {
              path: "sub2/home",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(sub2)/home/page"))}
                </RouteSegmentElement>
              ),
            },
            {
              path: "sub2/about",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/(sub2)/about/page"))}
                </RouteSegmentElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/multi-root-layouts",
  }
);

export default router;
