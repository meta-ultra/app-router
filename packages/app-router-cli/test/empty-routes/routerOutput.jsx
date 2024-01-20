import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
} from "@meta-ultra/app-router";

const router = createRouter([
  {
    id: "app",
    path: "/",
    element: <RootLayoutRouteElement />,
    errorElement: <RootErrorElement />,
  },
]);

export default router;
