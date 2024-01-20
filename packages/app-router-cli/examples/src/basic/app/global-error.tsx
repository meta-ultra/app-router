import { ReactNode, type FC } from "react";
import type { ErrorProps } from "../../../../src/index";

const DefaultGlobalError: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <>
      <h2>Ops.... Unexpected Application Error!</h2>
      <h3 style={{ fontStyle: "italic" }}>&quot;{error as ReactNode}&quot;</h3>
      <button onClick={() => reset()}>One more try!</button>
    </>
  );
};

export default DefaultGlobalError;
