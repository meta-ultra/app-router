import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement />,
      children: [
        {
          id: "app/about",
          path: "about",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/about/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/error",
          path: "error",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/error/page"))}
            </PageRouteElement>
          ),
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
  { basename: "/bare" },
);

export default router;
