import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
  LayoutRouteElement,
} from "@meta-ultra/app-router";
import App_notFound from "./app/not-found";
import App_gallery_Atother_loading from "./app/gallery/@other/loading";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement
          notFound={App_notFound}
          parallelRoutes={{
            root: (
              <PageRouteElement>
                {lazy(() => import("./app/@root/page"))}
              </PageRouteElement>
            ),
          }}
        >
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={App_notFound} />,
      children: [
        {
          id: "app/gallery",
          path: "gallery",
          element: (
            <LayoutRouteElement
              parallelRoutes={{
                list: (
                  <PageRouteElement>
                    {lazy(() => import("./app/gallery/@list/page"))}
                  </PageRouteElement>
                ),
                other: (
                  <PageRouteElement loading={App_gallery_Atother_loading}>
                    {lazy(() => import("./app/gallery/@other/page"))}
                  </PageRouteElement>
                ),
              }}
            >
              {lazy(() => import("./app/gallery/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/gallery/",
              index: true,
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/gallery/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/gallery/imgs/[id]",
              path: "imgs/:id",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/gallery/imgs/[id]/page"))}
                </PageRouteElement>
              ),
            },
          ],
        },
        {
          id: "app/home",
          path: "home",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/home/page"))}
            </PageRouteElement>
          ),
        },
      ],
    },
  ],
  { basename: "/parallel-routes" },
);

export default router;
