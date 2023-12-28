import {
  type FC,
  type ReactNode,
  type ComponentType,
  type ReactElement,
  type LazyExoticComponent,
  FunctionComponent,
} from "react";
import { type LoadingBoundaryProps } from "../loading/LoadingBoundary";
import { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { type NotFoundProviderProps } from "../not-found/notFound";
import LayoutRouteElement from "./LayoutRouteElement";
import { useMatches } from "react-router-dom";

type InterceptingRouteElementProps = {
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const InterceptingRouteLayout = ({
  children,
  page,
}: {
  children: ReactNode;
  page: ReactNode;
}): ReactElement => {
  const matches = useMatches();
  console.log(matches);

  return (
    <>
      {children}
      {page}
    </>
  );
};

const InterceptingRouteElement: FC<InterceptingRouteElementProps> = ({
  children,
  loading,
  error,
  notFound,
  template,
}) => {
  return (
    <LayoutRouteElement
      loading={loading}
      error={error}
      notFound={notFound}
      template={template}
      parallelRoutes={{
        page: children,
      }}
    >
      {InterceptingRouteLayout as FunctionComponent}
    </LayoutRouteElement>
  );
};

export type { InterceptingRouteElementProps };
export default InterceptingRouteElement;
