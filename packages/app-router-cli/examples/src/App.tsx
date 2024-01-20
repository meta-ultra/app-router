import { type ReactElement, useMemo, useState, useLayoutEffect } from "react";

import Bare from "./bare";
import Basic from "./basic";
import LazyLoading from "./lazy-loading";
import Metadata from "./metadata";
import AuthMetadata from "./auth-metadata";
import DynamicRoutes from "./dynamic-routes";
import Auth from "./auth";
import MultiRootLayouts from "./multi-root-layouts";
import Template from "./template";
import Modal from "./modal";
import ParallelRoutes from "./parallel-routes";

const routes: Record<string, ReactElement> = {
  bare: <Bare />,
  basic: <Basic />,
  "lazy-loading": <LazyLoading />,
  metadata: <Metadata />,
  "auth-metadata": <AuthMetadata />,
  "dynamic-routes": <DynamicRoutes />,
  auth: <Auth />,
  "multi-root-layouts": <MultiRootLayouts />,
  template: <Template />,
  modal: <Modal />,
  "parallel-routes": <ParallelRoutes />,
};

const App = () => {
  const [route, setRoute] = useState("");

  useLayoutEffect(() => {
    //disable-eslint-next-line @typescript-eslint/no-unused-vars
    const [_, basename] = location.pathname.split("/");
    if (basename) {
      setRoute(basename);
    }
  }, []);

  useLayoutEffect(() => {
    //disable-eslint-next-line @typescript-eslint/no-unused-vars
    const [_, basename] = location.pathname.split("/");
    if (route && basename !== route) {
      location.assign(route);
    }
  }, [route]);

  const children = useMemo(
    () =>
      routes[route] || (
        <ul>
          {(Object.keys(routes) || []).map((route) => (
            <li key={route}>
              <a href="javascript:void 0" onClick={() => setRoute(route)}>
                {route}
              </a>
            </li>
          ))}
        </ul>
      ),
    [route]
  );

  return children;
};

export default App;
