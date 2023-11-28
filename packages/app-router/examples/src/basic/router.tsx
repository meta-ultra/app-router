import { createBrowserRouter } from "react-router-dom";

import { RouteSegmentElement, RootRouteSegmentElement, RootErrorElement } from "../../../src/index";

import RootLayout from "./app/layout";
import RootNotFound from "./app/not-found";
import GlobalError from "./app/global-error";
import Home from "./app/home/page";
import About from "./app/about/page";
import Error from "./app/error/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootRouteSegmentElement notFound={RootNotFound} error={GlobalError}>
          <RootLayout />
        </RootRouteSegmentElement>
      ),
      errorElement: <RootErrorElement notFound={RootNotFound} />,
      children: [
        {
          index: true,
          element: (
            <RouteSegmentElement>
              <Home />
            </RouteSegmentElement>
          ),
        },
        {
          path: "about",
          element: (
            <RouteSegmentElement>
              <About />
            </RouteSegmentElement>
          ),
        },
        {
          path: "error",
          element: (
            <RouteSegmentElement>
              <Error />
            </RouteSegmentElement>
          ),
        },
      ],
    },
  ],
  {
    basename: "/basic",
  }
);

export default router;
