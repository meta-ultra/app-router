import { type ReactElement, useMemo, useState, useLayoutEffect } from "react";

import Bare from "./bare";
import Basic from "./basic";
import LazyLoading from "./lazy-loading";
import Metadata from "./metadata";

const routes: Record<string, ReactElement> = {
  bare: <Bare />,
  basic: <Basic />,
  "lazy-loading": <LazyLoading />,
  metadata: <Metadata />,
};

const App = () => {
  const [route, setRoute] = useState("");

  useLayoutEffect(() => {
    const [_, basename] = location.pathname.split("/");
    if (basename) {
      setRoute(basename);
    }
  }, []);

  useLayoutEffect(() => {
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
