import { type FC, type ComponentType, type ReactElement, type LazyExoticComponent } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { type LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import { DynamicRouteWrapper } from "../dynamic-route";
import DefaultErrorForNotFound from "../defaults/DefaultErrorForNotFound";
import createElement from "../utils/createElement";
import PageRouteElement from "./PageRouteElement";

type LayoutRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  parallelRoutes?: {
    [name: string]: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  };
};

const LayoutRouteElement: FC<LayoutRouteElementProps> = ({
  children,
  loading,
  error,
  notFound,
  template,
  parallelRoutes,
}) => {
  const layoutChildren = (
    <LoadingBoundary fallback={loading}>
      <NotFoundProvider fallback={notFound}>
        <ErrorBoundary fallback={error || (notFound && DefaultErrorForNotFound)}>
          <Outlet />
        </ErrorBoundary>
      </NotFoundProvider>
    </LoadingBoundary>
  );

  let props = undefined;
  if (parallelRoutes) {
    props = Object.entries(parallelRoutes).reduce((parallelRoutes, entry) => {
      parallelRoutes[entry[0]] = <PageRouteElement>{entry[1]}</PageRouteElement>;

      return parallelRoutes;
    }, {} as Record<string, ReactElement>);
  }

  let child = createElement(children, props, layoutChildren);
  if (template) {
    // create a brand new key to make sure create a new Template instance every rendering.
    child = createElement(template, { key: +new Date() }, child);
  }

  return (
    <MetadataBoundary component={children}>
      <DynamicRouteWrapper>{child}</DynamicRouteWrapper>
    </MetadataBoundary>
  );
};

export type { LayoutRouteElementProps };
export default LayoutRouteElement;
