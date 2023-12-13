import { type FC, useState, useEffect } from "react";
import { type LayoutRouteProps } from "react-router-dom";
import { Provider } from "./templateContext";

const Template: FC<LayoutRouteProps> = ({ children }) => {
  const [state, setState] = useState(1);
  useEffect(() => {
    console.log("template mounted");
  }, []);

  return <Provider value={{ state, setState }}>{children}</Provider>;
};

export default Template;
