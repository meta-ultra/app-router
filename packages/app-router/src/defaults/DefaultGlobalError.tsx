import { ReactNode, type FC } from "react";
import type { ErrorProps } from "../error/ErrorProps";

const DefaultGlobalError: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <>
      <h2>Unexpected Application Error!</h2>
      <h3 style={{ fontStyle: "italic" }}>&quot;{error as ReactNode}&quot;</h3>
      <button onClick={() => reset()}>Try to recover!</button>
      {process.env.NODE_ENV === "production" ? null : (
        <>
          <p>💿 Hey developer 👋</p>
          <p>
            You can provide a way better UX than this when your app throws errors by passing your
            own global error component as prop on the top-most{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              RouteSegmentElement
            </code>
            .
          </p>
        </>
      )}
    </>
  );
};

export default DefaultGlobalError;
