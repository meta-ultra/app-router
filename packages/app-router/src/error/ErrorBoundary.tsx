import {
  Component,
  isValidElement,
  cloneElement,
  createElement,
  type FC,
  type ReactElement,
  type ComponentType,
  type ReactNode,
} from "react";
import { type ErrorProps } from "./ErrorProps";
import ErrorResponse from "../not-found/ErrorResponse";
import { NotFoundContext } from "../not-found/notFound";

/**----------------------
 *    InnerErrorBoundary
 *------------------------**/
interface InnerErrorBoundaryProps {
  fallback: ReactElement<ErrorProps> | ComponentType<ErrorProps>;
  children: ReactNode;
}

class InnerErrorBoundary extends Component<InnerErrorBoundaryProps> {
  state: {
    hasError: boolean;
    error: unknown;
  } = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      if (
        this.state.error instanceof ErrorResponse ||
        // fix #2: handle ErrorResponse-like error thrown from other libraries (e.g. @meta-ultra/app-router-auth)
        (this.state.error as { status: number }).status === 404
      ) {
        //! Transfer control up to the nearest NotFoundProvider while accepting an ErrorResponse instance created by calling `notFound` function.
        return (
          <NotFoundContext.Consumer>
            {(value) => {
              if (value) {
                const setError = value.setError;
                const error = this.state.error as ErrorResponse;
                setTimeout(() => setError(error), 16);
              }
              return null;
            }}
          </NotFoundContext.Consumer>
        );
      } else {
        return isValidElement(this.props.fallback)
          ? cloneElement(this.props.fallback, {
              error: this.state.error,
              reset: () => this.setState({ hasError: false, error: undefined }),
            })
          : createElement(this.props.fallback, {
              error: this.state.error,
              reset: () => this.setState({ hasError: false, error: undefined }),
            });
      }
    }

    return this.props.children;
  }
}
/*---- END OF InnerErrorBoundary ----*/

/**----------------------
 *    ErrorBoundary
 *------------------------**/
type ErrorBoundaryProps = Partial<InnerErrorBoundaryProps>;
const ErrorBoundary: FC<ErrorBoundaryProps> = ({ fallback, children }) => {
  if (fallback) {
    return <InnerErrorBoundary fallback={fallback}>{children}</InnerErrorBoundary>;
  } else if (isValidElement(children)) {
    return children;
  } else {
    return <>{children}</>;
  }
};
/*---- END OF ErrorBoundary ----*/

export type { ErrorBoundaryProps };
export default ErrorBoundary;
