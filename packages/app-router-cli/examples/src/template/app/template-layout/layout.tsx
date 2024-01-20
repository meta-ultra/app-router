import { type FC, useState, useEffect } from "react";
import { type LayoutRouteProps } from "react-router-dom";
import { Provider } from "./layoutContext";

const Layout: FC<LayoutRouteProps> = ({ children }) => {
  const [state, setState] = useState(1000);

  return <Provider value={{ state, setState }}>{children}</Provider>;
};

export default Layout;
