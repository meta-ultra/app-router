import { useRef, useLayoutEffect, useCallback } from "react";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEvent = <F extends (...args: any[]) => any>(handler: F) => {
  const ref = useRef<F>(handler);
  useLayoutEffect(() => {
    ref.current = handler;
  });

  return useCallback((...args: any[]) => {
    return ref.current.call(null, ...args);
  }, []);
};

export default useEvent;
