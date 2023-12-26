import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootLayoutRouteElement,
  RootErrorElement,
  LayoutRouteElement,
  PageRouteElement,
} from "../../../src/index";

import RootNotFound from "./app/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={<RootNotFound />}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "gallery",
          element: (
            <LayoutRouteElement>{lazy(() => import("./app/gallery/page"))}</LayoutRouteElement>
          ),
          children: [
            {
              id: "img/[id]",
              path: "img/:id",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/gallery/img/[id]/page"))}
                </PageRouteElement>
              ),
            },
            // {
            //   path: "*",
            //   element: (
            //     <ParallelRoutes>
            //       <ParallelRoutes index>{lazy(() => import("./app/gallery/page"))}</ParallelRoutes>
            //       {/* redirect to img/[id] if the previous state is undefined. */}
            //       <ParallelRoutes id="img/[id]" redirect>{lazy(() => import("./app/gallery/img/[id]/page"))}</ParallelRoutes>
            //     </ParallelRoutes>
            //   ),
            // },
          ],
        },
      ],
    },
  ],
  {
    basename: "/modal",
  }
);

export default router;
