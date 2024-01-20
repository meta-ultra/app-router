import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

import RootNotFound from "./app/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={<RootNotFound />}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "about",
          element: <PageRouteElement>{lazy(() => import("./app/about/page"))}</PageRouteElement>,
        },
      ],
    },
  ],
  {
    basename: "/lazy-loading",
  }
);

export default router;
