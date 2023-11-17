import { createElement, cloneElement, type ReactElement, type FC, type ComponentType } from "react";
import { Outlet } from "react-router-dom";
import { isValidElementType, isLazy } from "react-is";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import DynamicRouteWrapper from "./DynamicRouteWrapper/DynamicRouteWrapper";

enum RouteSegmentElementLayout {
  NO = 0,
  LAYOUT = 1,
  ROOT_LAYOUT = 2,
}

//* The default fallback for ErrorBoundary when the valid notFound property exists to make the calling of `notFound` work properly.
const NOT_FOUND_ERROR_FALLBACK = <div>Default Error Fallback for Custom Not Found Fallback.</div>;

interface RouteSegmentElementProps {
  children: ComponentType | ReactElement;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  layout?: RouteSegmentElementLayout;
}

const RouteSegmentElement: FC<RouteSegmentElementProps> = ({
  children,
  loading,
  error,
  notFound,
  layout = RouteSegmentElementLayout.NO,
}) => {
  if (layout === RouteSegmentElementLayout.ROOT_LAYOUT) {
    // for the root layout route
    const layoutChildren = (
      <LoadingBoundary fallback={loading}>
        <Outlet />
      </LoadingBoundary>
    );

    //* The top-most not found provider to handle unprocessed invocation of notFound
    const layoutElement = (
      <NotFoundProvider fallback={notFound}>
        <ErrorBoundary fallback={error || (notFound && NOT_FOUND_ERROR_FALLBACK)}>
          <MetadataBoundary component={children}>
            {isValidElementType(children)
              ? createElement(children, undefined, layoutChildren)
              : cloneElement(children as ReactElement, undefined, layoutChildren)}
          </MetadataBoundary>
        </ErrorBoundary>
      </NotFoundProvider>
    );

    return isLazy(children) ? (
      <LoadingBoundary fallback={loading}>{layoutElement}</LoadingBoundary>
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
    // for leaf route
    return (
      <LoadingBoundary fallback={loading}>
        <NotFoundProvider fallback={notFound}>
          <ErrorBoundary fallback={error || (notFound && NOT_FOUND_ERROR_FALLBACK)}>
            <MetadataBoundary component={children}>
              <DynamicRouteWrapper>
                {isValidElementType(children)
                  ? createElement(children)
                  : (children as ReactElement)}
              </DynamicRouteWrapper>
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
