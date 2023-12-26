import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootRouteSegmentElement,
  RouteSegmentElement,
  RootErrorElement,
  LayoutRouteElement,
} from "../../../src/index";

import RootNotFound from "./app/not-found";
import OtherLoading from "./app/gallery/@other/loading";

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

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
              parallelRoutes={{
                list: lazy(async () => {
                  await sleep(5000); // propagate loading state to the top most default loading component.
                  return import("./app/gallery/@list/page");
                }),
                other: (
                  <RouteSegmentElement loading={OtherLoading}>
                    {lazy(async () => {
                      await sleep(10000); // propagate loading state to its own loading component
                      return import("./app/gallery/@other/page");
                    })}
                  </RouteSegmentElement>
                ),
              }}
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
            {
              path: "imgs/:id",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/gallery/imgs/[id]/page"))}
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
