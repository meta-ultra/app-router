import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement>{lazy(() => import("./app/layout"))}</RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement />,
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
    basename: "/metadata",
  }
);

export default router;
