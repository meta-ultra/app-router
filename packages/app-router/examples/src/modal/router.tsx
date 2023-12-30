import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootLayoutRouteElement,
  RootErrorElement,
  LayoutRouteElement,
  PageRouteElement,
  InterceptingLayoutRouteElement,
  InterceptedRouteElement,
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
          id: "/",
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          id: "/posts/detail",
          path: "posts/detail",
          element: (
            <InterceptedRouteElement
              interceptingRouteElement={
                <PageRouteElement>
                  {lazy(() => import("./app/posts/(.)detail/page"))}
                </PageRouteElement>
              }
            >
              <PageRouteElement>{lazy(() => import("./app/posts/detail/page"))}</PageRouteElement>
            </InterceptedRouteElement>
          ),
        },
        {
          element: (
            <LayoutRouteElement>{lazy(() => import("./app/gallery/layout"))}</LayoutRouteElement>
          ),
          children: [
            {
              path: "gallery/list",
              element: (
                <PageRouteElement>{lazy(() => import("./app/gallery/list/page"))}</PageRouteElement>
              ),
            },
            {
              path: "gallery",
              element: (
                <InterceptingLayoutRouteElement page={lazy(() => import("./app/gallery/page"))} />
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
                  id: "/gallery/detail/(..)(..)imgs/[id]",
                  path: "detail/imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/detail/(..)(..)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "/gallery/detail/more/(...)imgs/[id]",
                  path: "detail/more/imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/detail/more/(...)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "/gallery/nested/(group)/(..)(..)imgs/[id]",
                  path: "nested/imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/nested/(group)/(..)(..)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
              ],
            },
            {
              id: "/imgs/[id]",
              path: "imgs/:id",
              element: (
                <PageRouteElement>{lazy(() => import("./app/imgs/[id]/page"))}</PageRouteElement>
              ),
            },
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
