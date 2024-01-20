import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootLayoutRouteElement,
  RootErrorElement,
  LayoutRouteElement,
  PageRouteElement,
} from "../../../src/index";

import RootNotFound from "./app/not-found";
import OtherLoading from "./app/gallery/@other/loading";

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement
          notFound={<RootNotFound />}
          parallelRoutes={{
            root: lazy(async () => {
              /**
               * Note that,
               * - The component subtree will not display until all parallel routes of root route have been loaded.
               * - Once all parallel routes of root route are ready, they pop in together immediately.
               */
              await sleep(2000);
              return import("./app/@root/page");
            }),
          }}
        >
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
            <LayoutRouteElement
              parallelRoutes={{
                list: lazy(async () => {
                  await sleep(5000); // propagate loading state to the top most default loading component.
                  return import("./app/gallery/@list/page");
                }),
                other: (
                  <PageRouteElement loading={OtherLoading}>
                    {lazy(async () => {
                      await sleep(10000); // propagate loading state to its own loading component
                      return import("./app/gallery/@other/page");
                    })}
                  </PageRouteElement>
                ),
              }}
            >
              {lazy(() => import("./app/gallery/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              index: true,
              element: (
                <PageRouteElement>{lazy(() => import("./app/gallery/page"))}</PageRouteElement>
              ),
            },
            {
              path: "imgs/:id",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/gallery/imgs/[id]/page"))}
                </PageRouteElement>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/parallel-routes",
  }
);

export default router;
