import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import createProxy from "./createProxy";

const useSearchParamsProxy = () => {
  const [searchParams] = useSearchParams();
  const nextSearchParams = useMemo(() => {
    const nextSearchParams = Array.from(searchParams.keys()).reduce<
      Record<string, string | string[]>
    >((accu, key) => {
      const values = searchParams.getAll(key);
      if (values.length > 0) {
        const value = values.length > 1 ? values : values[0];
        if (value) {
          accu[key] = value;
        }
      }
      return accu;
    }, {});

    return nextSearchParams;
  }, [searchParams]);

  const hasAccessedProxy = useRef(false);
  const [searchParamsProxy, setSearchParamsProxy] = useState(
    createProxy(hasAccessedProxy, nextSearchParams)
  );

  useEffect(() => {
    if (hasAccessedProxy.current) {
      setSearchParamsProxy(createProxy(hasAccessedProxy, nextSearchParams));
    }
  }, [nextSearchParams]);

  return searchParamsProxy;
};

export default useSearchParamsProxy;
