import { createBrowserRouter } from "react-router-dom";

import { RouteSegmentElement, RouteSegmentElementLayout } from "../../../src/index";

import RootLayout from "./app/layout";
import Home from "./app/home/page";
import About from "./app/about/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RouteSegmentElement layout={RouteSegmentElementLayout.ROOT_LAYOUT}>
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
      ],
    },
  ],
  {
    basename: "/bare",
  }
);

export default router;
