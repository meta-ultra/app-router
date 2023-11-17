import { useNotFound } from "../not-found/notFound";
import {
  type MutableRefObject,
  type ReactElement,
  type FC,
  useRef,
  useState,
  useEffect,
  useMemo,
  cloneElement,
} from "react";
import { useMatches, useParams } from "react-router-dom";

const createParamsProxy = (
  hasAccessedProxy: MutableRefObject<boolean>,
  params: Record<string, string | string[]>
): Record<string, string | string[]> => {
  const proxy = new Proxy(
    {},
    {
      get(target, property) {
        hasAccessedProxy.current = true;

        if (property === "toString") {
          return () => "[object Object]";
        } else if (property === "valueOf") {
          return () => params;
        } else {
          if (typeof params === "object") {
            return params[String(property)];
          } else {
            return params;
          }
        }
      },
      has(target, propertyName) {
        hasAccessedProxy.current = true;
        if (typeof params === "object") {
          return propertyName in params;
        }
        return false;
      },
      ownKeys() {
        hasAccessedProxy.current = true;
        return Object.keys(params);
      },
      getPrototypeOf() {
        hasAccessedProxy.current = true;
        return Object.getPrototypeOf(params);
      },
      getOwnPropertyDescriptor(target, prop) {
        hasAccessedProxy.current = true;
        return Object.getOwnPropertyDescriptor(params, prop);
      },
    }
  );

  return proxy;
};

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
  const [paramsProxy, setParamsProxy] = useState(createParamsProxy(hasAccessedProxy, nextParams));

  useEffect(() => {
    if (hasAccessedProxy.current) {
      setParamsProxy(createParamsProxy(hasAccessedProxy, nextParams));
    }
  }, [nextParams]);

  return paramsProxy;
};

interface DynamicRouteWrapperProps {
  children: ReactElement;
}

const DynamicRouteWrapper: FC<DynamicRouteWrapperProps> = ({ children }) => {
  const proxy = useParamsProxy();

  return useMemo(() => cloneElement(children, { params: proxy }), [children, proxy]);
};

interface DynamicRouteProps<
  ParamsOrKey extends string | Record<string, string | undefined> = string
> {
  params: ReturnType<typeof useParams<ParamsOrKey>>;
}

export type { DynamicRouteWrapperProps, DynamicRouteProps };
export default DynamicRouteWrapper;
