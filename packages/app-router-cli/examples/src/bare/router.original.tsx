import { createBrowserRouter } from "react-router-dom";

import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

import RootLayout from "./app/layout";
import Home from "./app/home/page";
import About from "./app/about/page";
import Error from "./app/error/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        /**
         * A default root layout will be created for you if there is no custom root layout.
         * Remove the custom root layout below to have a try.
         */
        <RootLayoutRouteElement>
          <RootLayout />
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement />,
      children: [
        {
          index: true,
          element: (
            <PageRouteElement>
              <Home />
            </PageRouteElement>
          ),
        },
        {
          path: "about",
          element: (
            <PageRouteElement>
              <About />
            </PageRouteElement>
          ),
        },
        {
          path: "error",
          element: (
            <PageRouteElement>
              <Error />
            </PageRouteElement>
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
