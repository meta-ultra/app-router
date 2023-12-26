import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";
import RootNotFound from "./app/not-found";
import ProfileNotFound from "./app/profile/not-found";
import AvatarNotFound from "./app/avatar/not-found";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement notFound={RootNotFound}>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={RootNotFound} />,
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "about",
          element: <PageRouteElement>{lazy(() => import("./app/about/page"))}</PageRouteElement>,
        },
        {
          path: "profile",
          element: (
            <PageRouteElement notFound={ProfileNotFound}>
              {lazy(() => import("./app/profile/page"))}
            </PageRouteElement>
          ),
        },
        {
          path: "avatar",
          element: (
            <PageRouteElement notFound={AvatarNotFound}>
              {lazy(() => import("./app/avatar/page"))}
            </PageRouteElement>
          ),
        },
      ],
    },
  ],
  {
    basename: "/auth-metadata",
  }
);

export default router;
