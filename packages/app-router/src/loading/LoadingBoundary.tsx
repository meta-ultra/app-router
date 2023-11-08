import {
  type ComponentType,
  type ReactNode,
  type PropsWithChildren,
  type FC,
  Suspense,
  createElement,
} from "react";
import { isValidElementType } from "react-is";

type LoadingBoundaryProps = PropsWithChildren<{
  fallback?: ComponentType | ReactNode;
}>;

const LoadingBoundary: FC<LoadingBoundaryProps> = ({ children, fallback }) => {
  if (!fallback) {
    return children;
  }

  return (
    <Suspense
      fallback={isValidElementType(fallback) ? createElement(fallback) : (fallback as ReactNode)}
    >
      {children}
    </Suspense>
  );
};

export type { LoadingBoundaryProps };
export default LoadingBoundary;
