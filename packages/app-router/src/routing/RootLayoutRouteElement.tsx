import { type FC, type ComponentType, type ReactElement, type LazyExoticComponent } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { GlobalNotFoundProvider } from "../not-found/globalNotFound";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import isLazyElementType from "../utils/isLazyElementType";
import DefaultLoading from "../defaults/DefaultLoading";
import DefaultGlobalNotFound from "../defaults/DefaultGlobalNotFound";
import DefaultGlobalError from "../defaults/DefaultGlobalError";
import createElement from "../utils/createElement";
import PageRouteElement from "./PageRouteElement";

type RootLayoutRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  parallelRoutes?: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  };
};

const RootLayoutRouteElement: FC<RootLayoutRouteElementProps> = ({
  children,
  loading = DefaultLoading,
  error = DefaultGlobalError,
  notFound = DefaultGlobalNotFound,
  template,
  parallelRoutes,
}) => {
  let props = undefined;
  if (parallelRoutes) {
    props = Object.entries(parallelRoutes).reduce((parallelRoutes, entry) => {
      parallelRoutes[entry[0]] = <PageRouteElement>{entry[1]}</PageRouteElement>;

      return parallelRoutes;
    }, {} as Record<string, ReactElement>);
  }

  const layoutChildren = (
    <LoadingBoundary fallback={loading}>
      <Outlet />
    </LoadingBoundary>
  );

  // layoutChildren acts as default root layout as well
  let child = children ? createElement(children, props, layoutChildren) : layoutChildren;
  if (template) {
    // create a brand new key to make sure create a new Template instance every rendering.
    child = createElement(template, { key: +new Date() }, child);
  }

  //* The top-most not found provider to handle unprocessed invocation of notFound
  const layoutElement = (
    <GlobalNotFoundProvider fallback={notFound}>
      <NotFoundProvider fallback={notFound}>
        <ErrorBoundary fallback={error}>
          {children ? <MetadataBoundary component={children}>{child}</MetadataBoundary> : child}
        </ErrorBoundary>
      </NotFoundProvider>
    </GlobalNotFoundProvider>
  );

  return isLazyElementType(children) ? (
    <LoadingBoundary fallback={loading}>{layoutElement}</LoadingBoundary>
  ) : (
    layoutElement
  );
};

export type { RootLayoutRouteElementProps };
export default RootLayoutRouteElement;
