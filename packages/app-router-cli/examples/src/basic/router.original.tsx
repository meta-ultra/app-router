import { createBrowserRouter } from "react-router-dom";

import { RootLayoutRouteElement, RootErrorElement, PageRouteElement } from "../../../src/index";

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
        <RootLayoutRouteElement notFound={RootNotFound} error={GlobalError}>
          <RootLayout />
        </RootLayoutRouteElement>
      ),
      errorElement: <RootErrorElement notFound={RootNotFound} />,
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
    basename: "/basic",
  }
);

export default router;
