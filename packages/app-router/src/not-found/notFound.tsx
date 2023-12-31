/**========================================================================
 *                             notFound
 *
 * 1. Throw a 404 error with context within asynchronous operating.
 * ```ts
 * import { useNotFound } from "@meta-ultra/app-router"
 *
 * const Demo = () => {
 *   const notFound = useNotFound()
 *
 *   return <div onClick={() => notFound()}>Hello World</div>
 * }
 * ```
 *
 * 2. Throw a context free 404 error within synchronous operating.
 * ```ts
 * import { notFound } from "@meta-ultra/app-router"
 *
 * const Demo = () => {
 *   notFound()
 *
 *   return <div>Hello World</div>
 * }
 * ```
 *========================================================================**/
import {
  createContext,
  createElement,
  useContext,
  useState,
  isValidElement,
  ReactElement,
  cloneElement,
  type FC,
  type PropsWithChildren,
  type ComponentType,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import ErrorResponse from "./ErrorResponse";
import useEvent from "../utils/useEvent";
import nextTick from "../utils/nextTick";

/**----------------------
 *    NotFoundContext
 *------------------------**/
interface NotFoundContextType {
  setError: ReturnType<typeof useState<ErrorResponse>>[1];
}
const NotFoundContext = createContext<NotFoundContextType | undefined>(undefined);
/*---- END OF NotFoundContext ----*/

/**----------------------
 *    useNotFound
 *------------------------**/
const useNotFound = () => {
  const location = useLocation();
  const context = useContext(NotFoundContext);
  if (context === undefined) {
    throw Error("useNotFound must be inside of NotFoundProvider.");
  }
  const { setError } = context;

  return useEvent((error?: ErrorResponse) => {
    // avoid changing the children to different component while rendering currently.
    nextTick(() => setError(error || new ErrorResponse(location.pathname)));
  });
};
/*---- END OF useNotFound ----*/

/**----------------------
 *    NotFoundProvider
 *------------------------**/
interface NotFoundProviderFallbackProps {
  error?: ErrorResponse;
}

type NotFoundProviderProps = PropsWithChildren<{
  fallback?:
    | ComponentType<NotFoundProviderFallbackProps>
    | ReactElement<NotFoundProviderFallbackProps>;
}>;

const NotFoundProvider: FC<NotFoundProviderProps> = ({ children, fallback }) => {
  const location = useLocation();
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    setError(undefined);
  }, [location]);

  if (fallback) {
    if (error) {
      return isValidElement(fallback)
        ? cloneElement(fallback, { error })
        : createElement(fallback, { error });
    } else {
      return <NotFoundContext.Provider value={{ setError }}>{children}</NotFoundContext.Provider>;
    }
  } else if (isValidElement(children)) {
    return children;
  } else {
    return <>{children}</>;
  }
};
/*---- END OF NotFoundProvider ----*/

/**----------------------
 *    notFound
 *------------------------**/
const notFound = () => {
  throw new ErrorResponse();
};
/*---- END OF notFound ----*/

export type { NotFoundProviderProps };
export { NotFoundContext, NotFoundProvider, useNotFound, notFound };
