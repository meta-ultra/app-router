import { createBrowserRouter } from "react-router-dom";

import {
  RouteSegmentElement,
  RouteSegmentElementLayout,
  RootErrorElement,
} from "../../../src/index";

import RootLayout from "./app/layout";
import RootNotFound from "./app/not-found";
import Home from "./app/home/page";
import About from "./app/about/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RouteSegmentElement
          layout={RouteSegmentElementLayout.ROOT_LAYOUT}
          notFound={<RootNotFound />}
        >
          <RootLayout />
        </RouteSegmentElement>
      ),
      errorElement: <RootErrorElement notFound={<RootNotFound />} />,
      children: [
        {
          path: "home",
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
    basename: "/basic",
  }
);

export default router;
