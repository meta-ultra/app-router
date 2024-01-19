import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  LayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";
import App_dashboard_Atchart1_loading from "./app/dashboard/@chart1/loading";
import App_dashboard_Atchart1_notFound from "./app/dashboard/@chart1/not-found";

const router = createRouter([
  {
    id: "app",
    element: <RootLayoutRouteElement />,
    errorElement: <RootErrorElement />,
    children: [
      {
        id: "app/dashboard",
        path: "dashboard",
        element: (
          <LayoutRouteElement
            parallelRoutes={{
              chart1: (
                <PageRouteElement
                  loading={App_dashboard_Atchart1_loading}
                  notFound={App_dashboard_Atchart1_notFound}
                  template={lazy(() => import("./app/dashboard/template"))}
                >
                  {lazy(() => import("./app/dashboard/@chart1/page"))}
                </PageRouteElement>
              ),
            }}
          >
            {lazy(() => import("./app/dashboard/layout"))}
          </LayoutRouteElement>
        ),
        children: [
          {
            id: "app/dashboard/",
            index: true,
            element: (
              <PageRouteElement
                template={lazy(() => import("./app/dashboard/template"))}
              >
                {lazy(() => import("./app/dashboard/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
