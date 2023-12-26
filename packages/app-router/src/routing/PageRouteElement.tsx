import { type FC, type ComponentType, type ReactElement, type LazyExoticComponent } from "react";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import { DynamicRouteWrapper } from "../dynamic-route";
import DefaultErrorForNotFound from "../defaults/DefaultErrorForNotFound";
import createElement from "../utils/createElement";

type PageRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const PageRouteElement: FC<PageRouteElementProps> = ({
  children,
  loading,
  error,
  notFound,
  template,
}) => {
  let child = createElement(children);
  if (template) {
    // create a brand new key to make sure create a new Template instance every rendering.
    child = createElement(template, { key: +new Date() }, child);
  }

  return (
    <LoadingBoundary fallback={loading}>
      <NotFoundProvider fallback={notFound}>
        <ErrorBoundary fallback={error || (notFound && DefaultErrorForNotFound)}>
          <MetadataBoundary component={children}>
            <DynamicRouteWrapper>{child}</DynamicRouteWrapper>
          </MetadataBoundary>
        </ErrorBoundary>
      </NotFoundProvider>
    </LoadingBoundary>
  );
};

export type { PageRouteElementProps };
export default PageRouteElement;
