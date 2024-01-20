import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  PageRouteElement,
  LayoutRouteElement,
} from "@meta-ultra/app-router";

const router = createRouter(
  [
    {
      id: "app",
      path: "/",
      element: (
        <RootLayoutRouteElement>
          {lazy(() => import("./app/layout"))}
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement />,
      children: [
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
          id: "app/static-workflow",
          path: "static-workflow",
          element: (
            <LayoutRouteElement>
              {lazy(() => import("./app/static-workflow/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/static-workflow/step1",
              path: "step1",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/static-workflow/step1/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/static-workflow/step2",
              path: "step2",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/static-workflow/step2/page"))}
                </PageRouteElement>
              ),
            },
          ],
        },
        {
          id: "app/template-layout",
          path: "template-layout",
          element: (
            <LayoutRouteElement>
              {lazy(() => import("./app/template-layout/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              id: "app/template-layout/other",
              path: "other",
              element: (
                <PageRouteElement
                  template={lazy(
                    () => import("./app/template-layout/template"),
                  )}
                >
                  {lazy(() => import("./app/template-layout/other/page"))}
                </PageRouteElement>
              ),
            },
            {
              id: "app/template-layout/steps",
              path: "steps",
              element: (
                <LayoutRouteElement
                  template={lazy(
                    () => import("./app/template-layout/template"),
                  )}
                >
                  {lazy(() => import("./app/template-layout/steps/layout"))}
                </LayoutRouteElement>
              ),
              children: [
                {
                  id: "app/template-layout/steps/step1",
                  path: "step1",
                  element: (
                    <PageRouteElement>
                      {lazy(
                        () => import("./app/template-layout/steps/step1/page"),
                      )}
                    </PageRouteElement>
                  ),
                },
                {
                  id: "app/template-layout/steps/step2",
                  path: "step2",
                  element: (
                    <PageRouteElement>
                      {lazy(
                        () => import("./app/template-layout/steps/step2/page"),
                      )}
                    </PageRouteElement>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: "app/template/step1",
          path: "template/step1",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/template/step1/page"))}
            </PageRouteElement>
          ),
        },
        {
          id: "app/template/step2",
          path: "template/step2",
          element: (
            <PageRouteElement>
              {lazy(() => import("./app/template/step2/page"))}
            </PageRouteElement>
          ),
        },
      ],
    },
  ],
  { basename: "/template" },
);

export default router;
