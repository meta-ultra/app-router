import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
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
          id: "app/catch-all",
          path: "catch-all",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/catch-all/page"))}
            </PageRouteElement>
          ),
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
          id: "app/posts",
          path: "posts",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/posts/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/posts/create",
          path: "posts/create",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/posts/create/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/posts/[id]/edit",
          path: "posts/:id/edit",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/posts/[id]/edit/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/posts/[id]",
          path: "posts/:id",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/posts/[id]/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/catch-all/[...id]",
          path: "catch-all/*",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/catch-all/[...id]/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/[[...id]]",
          path: "*",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/[[...id]]/page"))}
            </PageRouteElement>
          ),
        },
      ],
    },
  ],
  { basename: "/dynamic-routes" },
);

export default router;
