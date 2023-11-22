import { useMemo, useRef, useState, useEffect } from "react";
import { useParams, useMatches } from "react-router-dom";
import { useGlobalNotFound } from "../../not-found/globalNotFound";
import createProxy from "./createProxy";

const CATCH_ALL_RE = /^\[\.{3}([a-z][a-z0-9-_])\]$/;
const OPTIONAL_CATCH_ALL_RE = /^\[\[\.{3}([a-z][a-z0-9-_])\]\]$/;

const setCatchAllParamFromAsteriskParam = (
  nextParams: Record<string, string | string[]>,
  AsteriskParamValue: string,
  paramName: string
) => {
  delete nextParams["*"];
  const paramValues = AsteriskParamValue.split("/");
  const paramValue = paramValues.length >= 2 ? paramValues : paramValues[0];
  if (paramValue) {
    nextParams[paramName] = paramValue;
    return true;
  } else {
    return false;
  }
};

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
          let match = CATCH_ALL_RE.exec(lastRouteSegment);
          if (match && match[1]) {
            if (!setCatchAllParamFromAsteriskParam(nextParams, params["*"], match[1])) {
              globalNotFound();
            }
          } else {
            // For optional catch-all route
            match = OPTIONAL_CATCH_ALL_RE.exec(lastRouteSegment);
            if (match && match[1]) {
              setCatchAllParamFromAsteriskParam(nextParams, params["*"], match[1]);
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
