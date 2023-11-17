import { type MutableRefObject } from "react";

const createProxy = (
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

export default createProxy;
