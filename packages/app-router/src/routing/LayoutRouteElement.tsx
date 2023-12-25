import {
  type FC,
  type ComponentType,
  type ReactElement,
  type LazyExoticComponent,
  createElement,
  isValidElement,
  cloneElement,
} from "react";
import { Outlet } from "react-router-dom";
import { isValidElementType } from "react-is";
import ErrorBoundary, { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";
import LoadingBoundary, { LoadingBoundaryProps } from "../loading/LoadingBoundary";
import MetadataBoundary from "../metadata/MetadataBoundary";
import { DynamicRouteWrapper } from "./DynamicRouteWrapper";

const generateElement = (
  element: unknown,
  props: Parameters<typeof cloneElement>[1],
  children: Parameters<typeof createElement>[2]
): ReactElement => {
  if (isValidElementType(element)) {
    return createElement(element, props, children);
  }
  if (isValidElement(element)) {
    return cloneElement(element, props, children);
  }

  throw Error(
    `[@meta-ultra/app-router] Parameter "element" is neither a valid element type nor a valid element.`
  );
};

//* The default fallback for ErrorBoundary when the valid notFound property exists to make the calling of `notFound` work properly.
const NOT_FOUND_ERROR_FALLBACK = <div>Default Error Fallback for Custom Not Found Fallback.</div>;

type LayoutRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const LayoutRouteElement: FC<LayoutRouteElementProps> = ({
  children,
  loading,
  error,
  notFound,
  template,
}) => {
  const layoutChildren = (
    <LoadingBoundary fallback={loading}>
      <NotFoundProvider fallback={notFound}>
        <ErrorBoundary fallback={error || (notFound && NOT_FOUND_ERROR_FALLBACK)}>
          <Outlet />
        </ErrorBoundary>
      </NotFoundProvider>
    </LoadingBoundary>
  );
  let child = generateElement(children, undefined, layoutChildren);
  if (template) {
    // create a brand new key to make sure create a new Template instance every rendering.
    child = generateElement(template, { key: +new Date() }, child);
  }

  return (
    <MetadataBoundary component={children}>
      <DynamicRouteWrapper>{child}</DynamicRouteWrapper>
    </MetadataBoundary>
  );
};

export type { LayoutRouteElementProps };
export default LayoutRouteElement;
