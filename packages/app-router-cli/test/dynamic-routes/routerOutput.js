import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  LayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";

const router = createRouter([
  {
    id: "app",
    element: <RootLayoutRouteElement />,
    errorElement: <RootErrorElement />,
    children: [
      {
        id: "app/catch-all",
        path: "catch-all",
        element: (
          <LayoutRouteElement>
            {lazy(() => import("./app/catch-all/layout"))}
          </LayoutRouteElement>
        ),
        children: [
          {
            id: "app/catch-all/",
            index: true,
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/catch-all/page"))}
              </PageRouteElement>
            ),
          },
          {
            id: "app/catch-all/anything",
            path: "anything",
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/catch-all/anything/page"))}
              </PageRouteElement>
            ),
          },
          {
            id: "app/catch-all/[id]/create",
            path: ":id/create",
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/catch-all/[id]/create/page"))}
              </PageRouteElement>
            ),
          },
          {
            id: "app/catch-all/[id]",
            path: ":id",
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/catch-all/[id]/page"))}
              </PageRouteElement>
            ),
          },
          {
            id: "app/catch-all/[[...id]]",
            path: "*",
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/catch-all/[[...id]]/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
