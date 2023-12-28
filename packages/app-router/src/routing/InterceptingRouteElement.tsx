import {
  type FC,
  type ReactNode,
  type ComponentType,
  type ReactElement,
  type LazyExoticComponent,
  FunctionComponent,
} from "react";
import { useNavigationType, useMatches, Navigate } from "react-router-dom";
import { join } from "path";
import { type LoadingBoundaryProps } from "../loading/LoadingBoundary";
import { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { type NotFoundProviderProps } from "../not-found/notFound";
import LayoutRouteElement from "./LayoutRouteElement";

type InterceptingRouteElementProps = {
  children: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const getInterceptedUrl = (matches: ReturnType<typeof useMatches>): undefined | string => {
  let url = undefined;

  const NOTATIONS: [string, (dirname: string, basename: string) => string][] = [
    ["(...)", (dirname: string, basename: string) => join("/", basename)],
    ["(..)(..)", (dirname: string, basename: string) => join(dirname, "../..", basename)],
    ["(..)", (dirname: string, basename: string) => join(dirname, "../", basename)],
  ];
  const interceptingRoute = matches[matches.length - 1];
  if (interceptingRoute) {
    const { id, pathname } = interceptingRoute;
    for (let i = 0; url === undefined && i < NOTATIONS.length; ++i) {
      const notation = NOTATIONS[i];
      if (notation) {
        const [n, j] = notation;
        const index = id.indexOf(n);
        if (index !== -1) {
          const dirname = pathname.slice(0, index - 1);
          const basename = pathname.slice(index);
          url = j(dirname, basename);
        }
      }
    }
  }

  return url;
};

const InterceptingRouteLayout = ({
  children,
  page,
}: {
  children: ReactNode;
  page: ReactNode;
}): ReactElement => {
  const matches = useMatches();
  const navigationType = useNavigationType();
  if (navigationType === "POP") {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "navigate to this route by typing the URL directly or pressing the backward or forward button"
      );
    }
    const url = getInterceptedUrl(matches);
    if (url) {
      return <Navigate to={url} replace />;
    }
  } else {
    // `REPLACE`, `PUSH`
    if (process.env.NODE_ENV === "development") {
      console.log("navigate to this route by `navigate` or `Link` component");
    }
  }

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
