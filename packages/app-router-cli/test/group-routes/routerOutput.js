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
        id: "app/(...group)",
        element: (
          <LayoutRouteElement>
            {lazy(() => import("./app/(...group)/layout"))}
          </LayoutRouteElement>
        ),
        children: [
          {
            id: "app/(...group)/posts",
            path: "posts",
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/(...group)/posts/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
      {
        id: "app/(group)/something",
        path: "something",
        element: (
          <PageRouteElement>
            {lazy(() => import("./app/(group)/something/page"))}
          </PageRouteElement>
        ),
      },
    ],
  },
]);

export default router;
