export { default as ErrorResponse } from "./not-found/ErrorResponse";
export { useNotFound, notFound } from "./not-found/notFound";
export { useGlobalNotFound } from "./not-found/globalNotFound";
export type { ErrorProps } from "./error/ErrorProps";
export type { RootErrorElementProps } from "./error/RootErrorElement";
export { default as RootErrorElement } from "./error/RootErrorElement";
export type { Metadata, GenerateMetadata } from "./metadata/Metadata";
export type { DynamicRouteProps } from "./dynamic-route";

export type { RootLayoutRouteElementProps } from "./routing/RootLayoutRouteElement";
export { default as RootLayoutRouteElement } from "./routing/RootLayoutRouteElement";
export type { LayoutRouteElementProps } from "./routing/LayoutRouteElement";
export { default as LayoutRouteElement } from "./routing/LayoutRouteElement";
export type { PageRouteElementProps } from "./routing/PageRouteElement";
export { default as PageRouteElement } from "./routing/PageRouteElement";
export type { InterceptingLayoutRouteElementProps } from "./routing/InterceptingLayoutRouteElement";
export { default as InterceptingLayoutRouteElement } from "./routing/InterceptingLayoutRouteElement";
export type { InterceptedRouteElementProps } from "./routing/InterceptedRouteElement";
export { default as InterceptedRouteElement } from "./routing/InterceptedRouteElement";

// deprecated APIs
export type { RouteSegmentElementProps } from "./routing/RouteSegmentElement";
export {
  default as RouteSegmentElement,
  RouteSegmentElementLayout,
} from "./routing/RouteSegmentElement";
export { default as RootRouteSegmentElement } from "./routing/RootRouteSegmentElement";
