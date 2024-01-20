import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  LayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";
import App_notFound from "./app/not-found";
import App_lpSub1Rp_notFound from "./app/(sub1)/not-found";
import App_lpSub1Rp_sub1Home_notFound from "./app/(sub1)/sub1-home/not-found";
import App_lpSub2Rp_notFound from "./app/(sub2)/not-found";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={App_notFound}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={App_notFound} />,
      children: [
        {
          id: "app/(sub1)",
          element: (
            <LayoutRouteElement notFound={App_lpSub1Rp_notFound}>
              {lazy(() => import("./app/(sub1)/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/(sub1)/about",
              path: "about",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(sub1)/about/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/(sub1)/sub1-home",
              path: "sub1-home",
              element: (
                <LayoutRouteElement notFound={App_lpSub1Rp_sub1Home_notFound} />
              ),
              children: [
                {
                  id: "app/(sub1)/sub1-home/",
                  index: true,
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/(sub1)/sub1-home/page"))}
                    </PageRouteElement>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: "app/(sub2)",
          element: (
            <LayoutRouteElement notFound={App_lpSub2Rp_notFound}>
              {lazy(() => import("./app/(sub2)/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/(sub2)/about",
              path: "about",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(sub2)/about/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/(sub2)/sub2-home",
              path: "sub2-home",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(sub2)/sub2-home/page"))}
                </PageRouteElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  { basename: "/multi-root-layouts" },
);

export default router;
