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
        // {
        //   id: "imgs/[id]",
        //   path: "imgs/:id",
        //   element: (
        //     <InterceptingRouteElement
        //       interceptingRoutes={{
        //         "gallery": (
        //           <LayoutRouteElement
        //             parallelRoutes={{
        //               page: lazy(() => import("./app/gallery/page")),
        //               children: lazy(() => import("./app/gallery/(..)imgs/[id]/page")),
        //             }}
        //           />
        //         )
        //       }}
        //     >
        //       {lazy(() => import("./app/imgs/[id]/page"))}
        //     </InterceptingRouteElement>

        //   ),
        // },
        {
          path: "gallery",
          element: <PageRouteElement>{lazy(() => import("./app/gallery/page"))}</PageRouteElement>,
        },
      ],
    },
  ],
  {
    basename: "/modal",
  }
);

export default router;
