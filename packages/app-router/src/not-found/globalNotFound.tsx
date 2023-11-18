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
} from "react";
import { useLocation } from "react-router-dom";
import ErrorResponse from "./ErrorResponse";
import useEvent from "../utils/useEvent";
import nextTick from "../utils/nextTick";

/**----------------------
 *    GlobalNotFoundContext
 *------------------------**/
interface GlobalNotFoundContextType {
  setError: ReturnType<typeof useState<ErrorResponse>>[1];
}
const GlobalNotFoundContext = createContext<GlobalNotFoundContextType | undefined>(undefined);
/*---- END OF GlobalNotFoundContext ----*/

/**----------------------
 *    useNotFound
 *------------------------**/
const useGlobalNotFound = () => {
  const location = useLocation();
  const context = useContext(GlobalNotFoundContext);
  if (context === undefined) {
    throw Error("useGlobalNotFound must be inside of GlobalNotFoundProvider.");
  }
  const { setError } = context;

  return useEvent((error?: ErrorResponse) => {
    nextTick(() => setError(error || new ErrorResponse(location.pathname)));
  });
};
/*---- END OF useNotFound ----*/

/**----------------------
 *    NotFoundProvider
 *------------------------**/
interface GlobalNotFoundProviderFallbackProps {
  error?: ErrorResponse;
}

type GlobalNotFoundProviderProps = PropsWithChildren<{
  fallback?:
    | ComponentType<GlobalNotFoundProviderFallbackProps>
    | ReactElement<GlobalNotFoundProviderFallbackProps>;
}>;

const GlobalNotFoundProvider: FC<GlobalNotFoundProviderProps> = ({ children, fallback }) => {
  const [error, setError] = useState<ErrorResponse>();

  if (fallback) {
    if (error) {
      return isValidElement(fallback)
        ? cloneElement(fallback, { error })
        : createElement(fallback, { error });
    } else {
      return (
        <GlobalNotFoundContext.Provider value={{ setError }}>
          {children}
        </GlobalNotFoundContext.Provider>
      );
    }
  } else {
    return children;
  }
};
/*---- END OF NotFoundProvider ----*/

export type { GlobalNotFoundProviderProps };
export { GlobalNotFoundContext, GlobalNotFoundProvider, useGlobalNotFound };
