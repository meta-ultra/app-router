import {
  type FC,
  type ReactNode,
  type ComponentType,
  type ReactElement,
  type LazyExoticComponent,
  type FunctionComponent,
} from "react";
import { useNavigationType, useMatches, Navigate } from "react-router-dom";
import { join } from "path";
import { type LoadingBoundaryProps } from "../loading/LoadingBoundary";
import { type ErrorBoundaryProps } from "../error/ErrorBoundary";
import { type NotFoundProviderProps } from "../not-found/notFound";
import LayoutRouteElement from "./LayoutRouteElement";
import { info } from "../utils/logging";

const getInterceptedUrl = (matches: ReturnType<typeof useMatches>): undefined | string => {
  let url = undefined;

  const notationResolvers: [string, (dirname: string, basename: string) => string][] = [
    ["(...)", (dirname: string, basename: string) => join("/", basename)],
    ["(..)(..)", (dirname: string, basename: string) => join(dirname, "../..", basename)],
    ["(..)", (dirname: string, basename: string) => join(dirname, "../", basename)],
  ];
  const interceptingRoute = matches[matches.length - 1];
  if (interceptingRoute) {
    const { id, pathname } = interceptingRoute;
    for (let i = 0; url === undefined && i < notationResolvers.length; ++i) {
      const notationResolver = notationResolvers[i];
      if (notationResolver) {
        const [notation, resolve] = notationResolver;
        // remove group routes from `id` first
        const noGroupRouteId = id
          .split("/")
          .filter((seg) => !/^\([^()]+\)$/.test(seg))
          .join("/");
        const index = noGroupRouteId.indexOf(notation);
        if (index !== -1) {
          const dirname = pathname.slice(0, index - 1);
          const basename = pathname.slice(index);
          url = resolve(dirname, basename);
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
  page?: ReactNode;
}): ReactElement => {
  const matches = useMatches();
  const navigationType = useNavigationType();
  if (navigationType === "POP") {
    info("come here through typing URL on the browser URL bar, or backward or forward button");
    const url = getInterceptedUrl(matches);
    if (url) {
      return <Navigate to={url} replace />;
    }
  } else {
    // `REPLACE`, `PUSH`
    info("come here through `navigate` or `Link` component");
  }

  return (
    <>
      {children}
      {page}
    </>
  );
};

type InterceptingLayoutRouteElementProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  page?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
  loading?: LoadingBoundaryProps["fallback"];
  error?: ErrorBoundaryProps["fallback"];
  notFound?: NotFoundProviderProps["fallback"];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  template?: ComponentType | ReactElement | LazyExoticComponent<ComponentType<any>>;
};

const InterceptingLayoutRouteElement: FC<InterceptingLayoutRouteElementProps> = ({
  page,
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
      parallelRoutes={page ? { page } : undefined}
    >
      {InterceptingRouteLayout as FunctionComponent}
    </LayoutRouteElement>
  );
};

export type { InterceptingLayoutRouteElementProps };
export default InterceptingLayoutRouteElement;
