import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootLayoutRouteElement,
  RootErrorElement,
  LayoutRouteElement,
  PageRouteElement,
} from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayoutRouteElement>{lazy(() => import("./app/layout"))}</RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement />,
      children: [
        {
          index: true,
          element: <PageRouteElement>{lazy(() => import("./app/home/page"))}</PageRouteElement>,
        },
        {
          path: "static-workflow",
          element: (
            <LayoutRouteElement>
              {lazy(() => import("./app/static-workflow/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              path: "step1",
              element: (
                <PageRouteElement>
                  {lazy(() => import("./app/static-workflow/step1/page"))}
                </PageRouteElement>
              ),
            },
            {
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
          path: "template/step1",
          element: (
            <PageRouteElement template={lazy(() => import("./app/template/template"))}>
              {lazy(() => import("./app/template/step1/page"))}
            </PageRouteElement>
          ),
        },
        {
          path: "template/step2",
          element: (
            <PageRouteElement template={lazy(() => import("./app/template/template"))}>
              {lazy(() => import("./app/template/step2/page"))}
            </PageRouteElement>
          ),
        },
        {
          path: "template-layout",
          element: (
            <LayoutRouteElement>
              {lazy(() => import("./app/template-layout/layout"))}
            </LayoutRouteElement>
          ),
          children: [
            {
              path: "other",
              element: (
                <LayoutRouteElement template={lazy(() => import("./app/template-layout/template"))}>
                  {lazy(() => import("./app/template-layout/other/page"))}
                </LayoutRouteElement>
              ),
            },
            {
              path: "steps",
              element: (
                <LayoutRouteElement template={lazy(() => import("./app/template-layout/template"))}>
                  {lazy(() => import("./app/template-layout/steps/layout"))}
                </LayoutRouteElement>
              ),
              children: [
                {
                  path: "step1",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/template-layout/steps/step1/page"))}
                    </PageRouteElement>
                  ),
                },
                {
                  path: "step2",
                  element: (
                    <PageRouteElement>
                      {lazy(() => import("./app/template-layout/steps/step2/page"))}
                    </PageRouteElement>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/template",
  }
);

export default router;
