import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootLayoutRouteElement,
  RootErrorElement,
  LayoutRouteElement,
  PageRouteElement,
  InterceptingRouteElement,
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
          element: (
            <LayoutRouteElement>{lazy(() => import("./app/gallery/layout"))}</LayoutRouteElement>
          ),
          children: [
            {
              path: "gallery",
              element: (
                <InterceptingRouteElement>
                  {lazy(() => import("./app/gallery/page"))}
                </InterceptingRouteElement>
              ),
              children: [
                {
                  id: "/gallery/(..)imgs/[id]",
                  path: "imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/(..)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "/gallery/(..)posts/[id]",
                  path: "posts/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/(..)posts/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
              ],
            },
            // {
            //   id: "imgs/[id]",
            //   path: "imgs/:id",
            //   element: <PageRouteElement>{lazy(() => import ("./app/gallery/(..)imgs/[id]/page"))}</PageRouteElement>
            // },
            // {
            //   id: "posts/[id]",
            //   path: "posts/:id",
            //   element: <PageRouteElement>{lazy(() => import ("./app/gallery/(..)posts/[id]/page"))}</PageRouteElement>
            // },
          ],
        },
        // {
        //   path: "gallery",
        //   element: <InterceptingRouteElement from="/gallery">{lazy(() => import("./app/gallery/page"))}</InterceptingRouteElement>,
        //   children: [
        //     {
        //       id: "imgs/[id]",
        //       path: "imgs/:id",
        //       element: <PageRouteElement>{lazy(() => import ("./app/gallery/(..)imgs/[id]/page"))}</PageRouteElement>
        //     },
        //     {
        //       id: "posts/[id]",
        //       path: "posts/:id",
        //       element: <PageRouteElement>{lazy(() => import ("./app/gallery/(..)posts/[id]/page"))}</PageRouteElement>
        //     },
        //   ]
        // },
      ],
    },
  ],
  {
    basename: "/modal",
  }
);

export default router;
