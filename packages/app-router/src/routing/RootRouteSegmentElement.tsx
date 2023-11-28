import { type FC } from "react";
import RouteSegmentElement, {
  type RouteSegmentElementProps,
  RouteSegmentElementLayout,
} from "./RouteSegmentElement";
import DefaultRootLayout from "../defaults/DefaultRootLayout";

interface RootRouteSegmentElementProps
  extends Omit<RouteSegmentElementProps, "children" | "layout"> {
  children?: RouteSegmentElementProps["children"];
}

const RootRouteSegmentElement: FC<RootRouteSegmentElementProps> = ({ children, ...restProps }) => {
  return (
    <RouteSegmentElement {...restProps} layout={RouteSegmentElementLayout.ROOT_LAYOUT}>
      {children || DefaultRootLayout}
    </RouteSegmentElement>
  );
};

export default RootRouteSegmentElement;
