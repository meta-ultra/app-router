import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootRouteSegmentElement,
  RouteSegmentElement,
  RootErrorElement,
  LayoutRouteElement,
} from "../../../src/index";

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
          path: "gallery",
          element: (
            <LayoutRouteElement
            // parallelRoutes={{
            //   list: lazy(() => import("./app/gallery/@list/page"))
            // }}
            >
              {lazy(() => import("./app/gallery/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              index: true,
              // element: <PageRouteElement>{lazy(() => import("./app/gallery/page"))}</PageRouteElement>
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/gallery/page"))}
                </RouteSegmentElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/parallel-routes",
  }
);

export default router;
