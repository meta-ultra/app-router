import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RouteSegmentElement,
  RouteSegmentElementLayout,
  RootErrorElement,
} from "../../../src/index";

import RootNotFound from "./app/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RouteSegmentElement
          layout={RouteSegmentElementLayout.ROOT_LAYOUT}
          notFound={<RootNotFound />}
        >
          {lazy(() => import("./app/layout"))}
        </RouteSegmentElement>
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
