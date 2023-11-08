/**========================================================================
 *                             ErrorProps
 *  The data type of props of each error component, for example:
 *  ```ts
 *  import {type FC} from "react"
 *  import {type ErrorProps} from "@meta-ultra/app-router"
 *
 *  const GlobalError: FC<ErrorProps> = ({error, reset}) => {
 *    return <div onClick={() => reset()}>Error: {error.message}(Click for one more try)</div>
 *  }
 *  ```
 *========================================================================**/
interface ErrorProps {
  error: unknown;
  reset: () => void;
}

export type { ErrorProps };
