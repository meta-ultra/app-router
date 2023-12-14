import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootRouteSegmentElement,
  RouteSegmentElement,
  RootErrorElement,
  RouteSegmentElementLayout,
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
            <RouteSegmentElement layout={RouteSegmentElementLayout.LAYOUT}>
              {lazy(() => import("./app/gallery/page"))}
            </RouteSegmentElement>
          ),
          children: [
            {
              id: "img/[id]",
              path: "img/:id",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/gallery/img/[id]/page"))}
                </RouteSegmentElement>
              ),
            },
            // {
            //   path: "*",
            //   element: (
            //     <ParallelRoutes>
            //       <ParallelRoutes index>{lazy(() => import("./app/gallery/page"))}</ParallelRoutes>
            //       {/* redirect to img/[id] if the previous state is undefined. */}
            //       <ParallelRoutes id="img/[id]" redirect>{lazy(() => import("./app/gallery/img/[id]/page"))}</ParallelRoutes>
            //     </ParallelRoutes>
            //   ),
            // },
          ],
        },
      ],
    },
  ],
  {
    basename: "/modal",
  }
);

export default router;
