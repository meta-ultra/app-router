import { lazy } from "react";
import { createBrowserRouter as createRouter } from "react-router-dom";
import {
  RootErrorElement,
  RootLayoutRouteElement,
  LayoutRouteElement,
  PageRouteElement,
} from "@meta-ultra/app-router";
import App_users_loading from "./app/users/loading";
import { AxiosRouteHandlerRegister as RouteHandlerRegister } from "@meta-ultra/app-router";
import mockAdapter from "./utils/mockAdapter";
import * as App_api_groups_route from "./app/api/groups/route";
import * as App_api_groups_lsIdRs_route from "./app/api/groups/[id]/route";
import * as App_users_route from "./app/users/route";
import * as App_users_lsIdRs_route from "./app/users/(special-users)/[id]/route";

const routeHandlerRegister = new RouteHandlerRegister(
  mockAdapter,
  process.env.REACT_APP_BASE_URL,
);
routeHandlerRegister.register("/api/groups/route", App_api_groups_route);
routeHandlerRegister.register(
  "/api/groups/[id]/route",
  App_api_groups_lsIdRs_route,
);
routeHandlerRegister.register("/users/route", App_users_route);
routeHandlerRegister.register("/users/[id]/route", App_users_lsIdRs_route);

const router = createRouter([
  {
    id: "app",
    path: "/",
    element: <RootLayoutRouteElement />,
    errorElement: <RootErrorElement />,
    children: [
      {
        id: "app/users",
        path: "users",
        element: <LayoutRouteElement loading={App_users_loading} />,
        children: [
          {
            id: "app/users/",
            index: true,
            element: (
              <PageRouteElement>
                {lazy(() => import("./app/users/page"))}
              </PageRouteElement>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
