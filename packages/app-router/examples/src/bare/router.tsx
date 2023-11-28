import { createBrowserRouter } from "react-router-dom";

import { RouteSegmentElement, RouteSegmentElementLayout } from "../../../src/index";

import RootLayout from "./app/layout";
import Home from "./app/home/page";
import About from "./app/about/page";
import Error from "./app/error/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RouteSegmentElement layout={RouteSegmentElementLayout.ROOT_LAYOUT}>
          {/**
           * A default root layout will be created for you if there is no custom root layout.
           * Comments the custom root layout below to have a try.
           */}
          <RootLayout />
        </RouteSegmentElement>
      ),
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
    basename: "/bare",
  }
);

export default router;
