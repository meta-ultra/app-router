import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";
import App_globalError from "./app/global-error";
import App_notFound from "./app/not-found";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement error={App_globalError} notFound={App_notFound}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={App_notFound} />,
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
  { basename: "/basic" },
);

export default router;
