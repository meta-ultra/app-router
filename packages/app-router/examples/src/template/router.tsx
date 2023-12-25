import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  RootRouteSegmentElement,
  RouteSegmentElement,
  RootErrorElement,
  LayoutRouteElement,
} from "../../../src/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement>{lazy(() => import("./app/layout"))}</RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement />,
      children: [
        {
          index: true,
          element: (
            <RouteSegmentElement>{lazy(() => import("./app/home/page"))}</RouteSegmentElement>
          ),
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
                <RouteSegmentElement>
                  {lazy(() => import("./app/static-workflow/step1/page"))}
                </RouteSegmentElement>
              ),
            },
            {
              path: "step2",
              element: (
                <RouteSegmentElement>
                  {lazy(() => import("./app/static-workflow/step2/page"))}
                </RouteSegmentElement>
              ),
            },
          ],
        },
        {
          path: "template/step1",
          element: (
            <RouteSegmentElement template={lazy(() => import("./app/template/template"))}>
              {lazy(() => import("./app/template/step1/page"))}
            </RouteSegmentElement>
          ),
        },
        {
          path: "template/step2",
          element: (
            <RouteSegmentElement template={lazy(() => import("./app/template/template"))}>
              {lazy(() => import("./app/template/step2/page"))}
            </RouteSegmentElement>
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
                    <RouteSegmentElement>
                      {lazy(() => import("./app/template-layout/steps/step1/page"))}
                    </RouteSegmentElement>
                  ),
                },
                {
                  path: "step2",
                  element: (
                    <RouteSegmentElement>
                      {lazy(() => import("./app/template-layout/steps/step2/page"))}
                    </RouteSegmentElement>
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
