import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayoutRouteElement, LayoutRouteElement, PageRouteElement } from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement>{lazy(() => import("./app/layout"))}</RootLayoutRouteElement>
      ),
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "login",
          element: <PageRouteElement>{lazy(() => import("./app/login/page"))}</PageRouteElement>,
        },
        {
          element: (
            <LayoutRouteElement>{lazy(() => import("./app/(...auth)/layout"))}</LayoutRouteElement>
          ),
          children: [
            {
              path: "about",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(...auth)/about/page"))}
                </PageRouteElement>
              ),
            },
            {
              path: "profile",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/(...auth)/profile/page"))}
                </PageRouteElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/auth",
  }
);

export default router;
