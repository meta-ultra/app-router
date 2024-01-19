import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
  LayoutRouteElement,
} from "@meta-ultra/app-router";
import App_loading from "./app/loading";
import App_globalError from "./app/global-error";
import App_home_error from "./app/home/error";
import App_about_nested_notFound from "./app/about/nested/not-found";

const router = createRouter([
  {
    id: "app",
    element: (
      <RootLayoutRouteElement loading={App_loading} error={App_globalError}>
        lazy(() => import("./app/layout"))
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
        id: "app/home",
        path: "home",
        element: (
          <LayoutRouteElement error={App_home_error}>
            {lazy(() => import("./app/home/layout"))}
          </LayoutRouteElement>
        ),
        children: [
          {
            id: "app/home/",
            index: true,
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/home/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
      {
        id: "app/about/nested",
        path: "about/nested",
        element: (
          <LayoutRouteElement notFound={App_about_nested_notFound}>
            {}
          </LayoutRouteElement>
        ),
        children: [
          {
            id: "app/about/nested/",
            index: true,
            element: (
              <PageRouteElement
                template={lazy(() => import("./app/about/nested/template"))}
              >
                {lazy(() => import("./app/about/nested/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
      {
        id: "app/not-empty/not-empty",
        path: "not-empty/not-empty",
        element: (
          <PageRouteElement>
            {lazy(() => import("./app/not-empty/not-empty/page"))}
          </PageRouteElement>
        ),
      },
    ],
  },
]);

export default router;
