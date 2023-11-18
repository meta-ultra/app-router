import { useMemo, useRef, useState, useEffect } from "react";
import { useParams, useMatches } from "react-router-dom";
import { useGlobalNotFound } from "../../not-found/globalNotFound";
import createProxy from "./createProxy";

const useParamsProxy = () => {
  const globalNotFound = useGlobalNotFound();
  const params = useParams();
  const matches = useMatches();
  const nextParams = useMemo(() => {
    const nextParams = Object.keys(params).reduce<Record<string, string | string[]>>(
      (accu, key) => {
        if (params[key] !== undefined) {
          accu[key] = params[key] as string;
        }
        return accu;
      },
      {}
    );
    // Map React Router's splats to catch-all and optional catch-all segments in Next.js
    if (params["*"] !== undefined) {
      /**
       ** NOTE, the first route configuration will take effect,
       ** when there're multiple route configurations with the same "path" value.
       */
      const match = matches[matches.length - 1];
      if (match) {
        const lastRouteSegment = match.id.split("/").pop();
        if (lastRouteSegment) {
          // For catch-all route
          let match = /^\[\.{3}([a-z][a-z0-9-_])\]$/.exec(lastRouteSegment);
          if (match && match[1]) {
            delete nextParams["*"];
            const paramValues = params["*"].split("/");
            const paramValue = paramValues.length > 2 ? paramValues : paramValues[0];
            if (paramValue) {
              nextParams[match[1]] = paramValue;
            } else {
              globalNotFound();
            }
          } else {
            // For optional catch-all route
            match = /^\[\[\.{3}([a-z][a-z0-9-_])\]\]$/.exec(lastRouteSegment);
            if (match && match[1]) {
              delete nextParams["*"];
              const paramValues = params["*"].split("/");
              const paramValue = paramValues.length > 2 ? paramValues : paramValues[0];
              if (paramValue) {
                nextParams[match[1]] = paramValue;
              }
            }
          }
        }
      }
    }

    return nextParams;
  }, [globalNotFound, matches, params]);

  const hasAccessedProxy = useRef(false);
  const [paramsProxy, setParamsProxy] = useState(createProxy(hasAccessedProxy, nextParams));

  useEffect(() => {
    if (hasAccessedProxy.current) {
      setParamsProxy(createProxy(hasAccessedProxy, nextParams));
    }
  }, [nextParams]);

  return paramsProxy;
};

export default useParamsProxy;
