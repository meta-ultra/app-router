import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

import RootNotFound from "./app/not-found";
import Sub1RootNotFound from "./app/(sub1)/not-found";
import Sub2RootNotFound from "./app/(sub2)/not-found";

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
          element: (
            <RootLayoutRouteElement notFound={<Sub1RootNotFound />}>
              {lazy(() => import("./app/(sub1)/layout"))}
            </RootLayoutRouteElement>
          ),
          children: [
            {
              path: "sub1-home",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(sub1)/sub1-home/page"))}
                </PageRouteElement>
              ),
            },
            {
              path: "about",
              element: (
                <PageRouteElement>{lazy(() => import("./app/(sub1)/about/page"))}</PageRouteElement>
              ),
            },
          ],
        },
        {
          element: (
            <RootLayoutRouteElement notFound={<Sub2RootNotFound />}>
              {lazy(() => import("./app/(sub2)/layout"))}
            </RootLayoutRouteElement>
          ),
          children: [
            {
              path: "sub2-home",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(sub2)/sub2-home/page"))}
                </PageRouteElement>
              ),
            },
            {
              path: "about",
              element: (
                <PageRouteElement>{lazy(() => import("./app/(sub2)/about/page"))}</PageRouteElement>
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
