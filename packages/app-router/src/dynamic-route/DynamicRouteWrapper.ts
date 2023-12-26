import { type ReactElement, type FC, useMemo, cloneElement } from "react";
import useParamsProxy from "./useParamsProxy";
import useSearchParamsProxy from "./useSearchParamsProxy";

interface DynamicRouteWrapperProps {
  children: ReactElement<Partial<DynamicRouteProps>>;
}

const DynamicRouteWrapper: FC<DynamicRouteWrapperProps> = ({ children }) => {
  const paramsProxy = useParamsProxy();
  const searchParamsProxy = useSearchParamsProxy();

  return useMemo(
    () => cloneElement(children, { params: paramsProxy, searchParams: searchParamsProxy }),
    [children, paramsProxy, searchParamsProxy]
  );
};

interface DynamicRouteProps<P extends string = string, S extends string = string> {
  params: Record<P, string | string[]>;
  searchParams: Record<S, string | string[]>;
}

export type { DynamicRouteWrapperProps, DynamicRouteProps };
export default DynamicRouteWrapper;
