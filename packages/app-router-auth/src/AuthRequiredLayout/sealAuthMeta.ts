import makeSuspender, { type Suspender } from "./makeSuspender";
import type { AuthMeta } from "./AuthMeta";
import { ErrorResponse } from "@meta-ultra/app-router";

interface SingleThreadAuthorize {
  (path: string): unknown;
  suspender?: Suspender;
}

interface SealedAuthMeta {
  authorize?: SingleThreadAuthorize;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sealAuthMeta = (meta?: AuthMeta): SealedAuthMeta => {
  const sealedAuthMeta: SealedAuthMeta = {};

  if (meta && meta.authorize) {
    const authorize = meta.authorize;
    const singleThreadAuthorize: SingleThreadAuthorize = (path: string) => {
      // make async data fetching to be able to be nested inside Suspense
      let result: unknown = undefined;
      const authorizeResult = authorize(path);
      if (authorizeResult instanceof Promise) {
        // loading
        if (!singleThreadAuthorize.suspender) {
          const promiseInstance = authorizeResult.then((value) => {
            if (value) {
              return value;
            } else {
              //* Throw an ErrorResponse like error instance, which will be thrown by react-router-dom v6 when there's no route matching expected URL.
              throw new ErrorResponse(path);
            }
          });
          singleThreadAuthorize.suspender = makeSuspender(promiseInstance, async () => {
            //! IMPORTANT: Hold the thread until the next round of event loop to avoid endless loop.
            await sleep(16);
            singleThreadAuthorize.suspender = undefined;
          });
        }
        result = singleThreadAuthorize.suspender.read();
      } else if (authorizeResult) {
        // success
        result = authorizeResult;
      } else {
        // fail
        throw new ErrorResponse(path);
      }

      return result;
    };

    sealedAuthMeta.authorize = singleThreadAuthorize;
  }

  return sealedAuthMeta;
};

export type { SealedAuthMeta };
export default sealAuthMeta;
