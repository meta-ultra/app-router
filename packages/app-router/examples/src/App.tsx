import { type ReactElement, useMemo, useState, useEffect } from "react";
import Basic from "./basic";
import LazyLoading from "./lazy-loading";

const routes: Record<string, ReactElement> = {
  basic: <Basic />,
  "lazy-loading": <LazyLoading />,
};

const App = () => {
  const [route, setRoute] = useState("");

  useEffect(() => {
    const [_, basename] = location.pathname.split("/");
    console.log(basename);
    if (basename) {
      setRoute(basename);
    }
  }, []);

  useEffect(() => {
    const [_, basename] = location.pathname.split("/");
    if (route && basename !== route) {
      location.assign(route);
    }
  }, [route]);

  const children = useMemo(
    () =>
      routes[route] || (
        <ul>
          <li onClick={() => setRoute("basic")}> basic </li>
          <li onClick={() => setRoute("lazy-loading")}>lazy-loading</li>
        </ul>
      ),
    [route]
  );

  return children;
};

export default App;
