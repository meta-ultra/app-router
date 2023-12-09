import {
  createElement,
  cloneElement,
  type ReactElement,
  type FC,
  type ComponentType,
  type LazyExoticComponent,
  isValidElement,
} from "react";
import { Outlet } from "react-router-dom";
import { isValidElementType } from "react-is";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { GlobalNotFoundProvider } from "../not-found/globalNotFound";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import { DynamicRouteWrapper } from "./DynamicRouteWrapper";
import DefaultRootRouteSegmentElementNotFound from "../defaults/DefaultRootRouteSegmentElementNotFound";
import DefaultLoading from "../defaults/DefaultLoading";
import DefaultGlobalError from "../defaults/DefaultGlobalError";
import isLazyElementType from "../utils/isLazyElementType";

enum RouteSegmentElementLayout {
  NO = 0,
  LAYOUT = 1,
  ROOT_LAYOUT = 2,
}

//* The default fallback for ErrorBoundary when the valid notFound property exists to make the calling of `notFound` work properly.
const NOT_FOUND_ERROR_FALLBACK = <div>Default Error Fallback for Custom Not Found Fallback.</div>;

interface RouteSegmentElementProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  layout?: RouteSegmentElementLayout;
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
}

const RouteSegmentElement: FC<RouteSegmentElementProps> = ({
  template,
  children,
  loading,
  error,
  notFound,
  layout = RouteSegmentElementLayout.NO,
}) => {
  if (layout === RouteSegmentElementLayout.ROOT_LAYOUT) {
    // for the root layout route
    const layoutChildren = (
      <LoadingBoundary fallback={loading || DefaultLoading}>
        <Outlet />
      </LoadingBoundary>
    );

    //* The top-most not found provider to handle unprocessed invocation of notFound
    const layoutElement = (
      <GlobalNotFoundProvider fallback={notFound || DefaultRootRouteSegmentElementNotFound}>
        <NotFoundProvider fallback={notFound || DefaultRootRouteSegmentElementNotFound}>
          <ErrorBoundary fallback={error || DefaultGlobalError}>
            <MetadataBoundary component={children}>
              {isValidElementType(children)
                ? createElement(children, undefined, layoutChildren)
                : cloneElement(children as ReactElement, undefined, layoutChildren)}
            </MetadataBoundary>
          </ErrorBoundary>
        </NotFoundProvider>
      </GlobalNotFoundProvider>
    );

    return isLazyElementType(children) ? (
      <LoadingBoundary fallback={loading || DefaultLoading}>{layoutElement}</LoadingBoundary>
    ) : (
      layoutElement
    );
  } else if (layout === RouteSegmentElementLayout.LAYOUT) {
    // for intermediate layout route
    const layoutChildren = (
      <LoadingBoundary fallback={loading}>
        <NotFoundProvider fallback={notFound}>
          <ErrorBoundary fallback={error || (notFound && NOT_FOUND_ERROR_FALLBACK)}>
            <Outlet />
          </ErrorBoundary>
        </NotFoundProvider>
      </LoadingBoundary>
    );
    return (
      <MetadataBoundary component={children}>
        <DynamicRouteWrapper>
          {isValidElementType(children)
            ? createElement(children, undefined, layoutChildren)
            : cloneElement(children as ReactElement, undefined, layoutChildren)}
        </DynamicRouteWrapper>
      </MetadataBoundary>
    );
  } else {
    let child = isValidElementType(children) ? createElement(children) : (children as ReactElement);
    if (template) {
      if (isValidElementType(template)) {
        child = createElement(template, { key: +new Date() }, child);
      } else if (isValidElement(template)) {
        child = cloneElement(template, { key: +new Date() }, child);
      }
    }

    // for leaf route
    return (
      <LoadingBoundary fallback={loading}>
        <NotFoundProvider fallback={notFound}>
          <ErrorBoundary fallback={error || (notFound && NOT_FOUND_ERROR_FALLBACK)}>
            <MetadataBoundary component={children}>
              <DynamicRouteWrapper>{child}</DynamicRouteWrapper>
            </MetadataBoundary>
          </ErrorBoundary>
        </NotFoundProvider>
      </LoadingBoundary>
    );
  }
};

export type { RouteSegmentElementProps };
export { RouteSegmentElementLayout };
export default RouteSegmentElement;
