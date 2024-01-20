import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  LayoutRouteElement,
  PageRouteElement,
  InterceptingLayoutRouteElement,
  InterceptedRouteElement,
} from "@meta-ultra/app-router";
import App_notFound from "./app/not-found";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={App_notFound}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={App_notFound} />,
      children: [
        {
          id: "app/gallery",
          element: (
            <LayoutRouteElement>
              {lazy(() => import("./app/gallery/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/gallery/list",
              path: "gallery/list",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/gallery/list/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/gallery/nested/(group)",
              path: "gallery/nested",
              element: (
                <LayoutRouteElement>
                  {lazy(() => import("./app/gallery/nested/(group)/layout"))}
                </LayoutRouteElement>
              ),
              children: [
                {
                  id: "app/gallery/nested/(group)",
                  element: <InterceptingLayoutRouteElement />,
                  children: [
                    {
                      id: "app/gallery/nested/(group)/(..)(..)imgs/[id]",
                      path: "imgs/:id",
                      element: (
                        <PageRouteElement>
                          {lazy(
                            () =>
                              import(
                                "./app/gallery/nested/(group)/(..)(..)imgs/[id]/page"
                              ),
                          )}
                        </PageRouteElement>
                      ),
                    },
                    {
                      id: "app/gallery/nested/(group)/(..)(..)imgs/[id]",
                      path: "imgs/:id",
                      element: (
                        <PageRouteElement>
                          {lazy(
                            () =>
                              import(
                                "./app/gallery/nested/(group)/(..)(..)imgs/[id]/page"
                              ),
                          )}
                        </PageRouteElement>
                      ),
                    },
                  ],
                },
              ],
            },
            {
              id: "app/gallery",
              path: "gallery",
              element: (
                <InterceptingLayoutRouteElement
                  page={
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/page"))}
                    </PageRouteElement>
                  }
                />
              ),
              children: [
                {
                  id: "app/gallery/(..)imgs/[id]",
                  path: "imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/(..)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "app/gallery/(..)imgs/[id]",
                  path: "imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/gallery/(..)imgs/[id]/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "app/gallery/detail/(..)(..)imgs/[id]",
                  path: "detail/imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(
                        () =>
                          import("./app/gallery/detail/(..)(..)imgs/[id]/page"),
                      )}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "app/gallery/detail/more/(...)imgs/[id]",
                  path: "detail/more/imgs/:id",
                  element: (
                    <PageRouteElement>
                      {lazy(
                        () =>
                          import(
                            "./app/gallery/detail/more/(...)imgs/[id]/page"
                          ),
                      )}
                    </PageRouteElement>
                  ),
                },
              ],
            },
          ],
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
        {
          id: "app/posts/detail",
          path: "posts/detail",
          element: (
            <InterceptedRouteElement
              interceptingRouteElement={
                <PageRouteElement>
                  {lazy(() => import("./app/posts/(.)detail/page"))}
                </PageRouteElement>
              }
            >
              <PageRouteElement>
                {lazy(() => import("./app/posts/detail/page"))}
              </PageRouteElement>
            </InterceptedRouteElement>
          ),
        },
        {
          id: "app/imgs/[id]",
          path: "imgs/:id",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/imgs/[id]/page"))}
            </PageRouteElement>
          ),
        },
      ],
    },
  ],
  { basename: "/modal" },
);

export default router;
