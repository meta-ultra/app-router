import { type FC, type ComponentType, type ReactElement, type LazyExoticComponent } from "react";
import { useNavigationType } from "react-router-dom";
import createElement from "../utils/createElement";
import { info } from "../utils/logging";

type InterceptedRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  interceptingRouteElement: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const InterceptedRouteElement: FC<InterceptedRouteElementProps> = ({
  children,
  interceptingRouteElement,
}) => {
  const navigationType = useNavigationType();
  if (navigationType === "POP") {
    info("come here through typing URL on the browser URL bar, or backward or forward button");
    return createElement(children);
  } else {
    // `REPLACE`, `PUSH`
    info("come here through `navigate` or `Link` component");
    return createElement(interceptingRouteElement);
  }
};

export type { InterceptedRouteElementProps };
export default InterceptedRouteElement;
