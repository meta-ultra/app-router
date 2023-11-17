import { useMemo, useRef, useState, useEffect } from "react";
import { useParams, useMatches } from "react-router-dom";
import { useNotFound } from "../../not-found/notFound";
import createProxy from "./createProxy";

const useParamsProxy = () => {
  const notFound = useNotFound();
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
      const match = matches[matches.length - 1];
      if (match) {
        const lastRouteSegment = match.id.split("/").pop();
        if (lastRouteSegment) {
          let match = /^\[\.{3}([a-z][a-z0-9-_])\]$/.exec(lastRouteSegment);
          if (match && match[1]) {
            delete nextParams["*"];
            const paramValues = params["*"].split("/");
            const paramValue = paramValues.length > 2 ? paramValues : paramValues[0];
            if (paramValue) {
              nextParams[match[1]] = paramValue;
            } else {
              notFound();
            }
          } else {
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
    // TODO Add "globalNotFound" instead.
  }, [notFound, matches, params]);

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
