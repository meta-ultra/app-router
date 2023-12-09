import { type FC, useState } from "react";
import { type LayoutRouteProps } from "react-router-dom";
import { Provider } from "./context";

const Layout: FC<LayoutRouteProps> = ({ children }) => {
  const [state, setState] = useState(1);

  return <Provider value={{ state, setState }}>{children}</Provider>;
};

export default Layout;
