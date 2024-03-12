import { isEmpty, isNil } from "lodash-es";
import qs from "qs";

const joinURL = (...paths: string[]) => {
  let url = paths.reduce((result, path) => {
    result.push(path.replace(/^\/|\/$/g, ""));
    return result;
  }, [] as string[]).join("/");
  url = /^(https?:\/{2}|\/)[^/]+/.test(url) ? url : "/" + url;

  const match = /^https?:\/{2}[^/]+/.exec(url);
  const origin = match ? match[0] : "";
  const pathname = url.replace(origin, "");

  return {
    origin,
    pathname,
  };
};

const dynamicRoute2ExpressPathname = (path: string): string => {
  const match = /\[([a-z][a-z0-9-_]*)\]/i.exec(path);
  if (match) {
    path = path.replace(match[0], `:${match[1]}`);
    return dynamicRoute2ExpressPathname(path);
  }
  else {
    return path;
  }
};

function objectify(source: URLSearchParams): Record<string, string | string[]>;
function objectify(source: Headers): Record<string, string | string[]>;
function objectify(source: FormData): Record<string, any>;
function objectify(source: any): Record<string, any>;
function objectify(source: URLSearchParams | any): Record<string, string | string[]> | Record<string, any> {
  if (source instanceof URLSearchParams) {
    return objectifyURLSearchParams(source);
  }
  else if (source instanceof Headers) {
    return objectifyHeaders(source);
  }
  else if (source instanceof FormData) {
    return objectifyFormData(source);
  }
  else {
    return objectifyAnything(source);
  }
}
function objectifyURLSearchParams(searchParams: URLSearchParams) {
  // parse search params using qs instead of getting it by manual.
  return qs.parse(searchParams.toString());
}
function objectifyHeaders(headers: Headers) {
  const obj: Record<string, string> = {};
  for (const key of headers.keys()) {
    const value = headers.get(key);
    if (!isNil(value)) {
      obj[key] = value;
    }
  }

  return obj;
}
function objectifyFormData(formData: FormData) {
  const obj: Record<string, any> = {};
  for (const key of formData.keys()) {
    const values = formData.getAll(key);
    if (!isEmpty(values)) {
      obj[key] = values.length === 1 ? values[0] : values;
    }
  }

  return obj;
}
function objectifyAnything(source: any) {
  if (source) {
    const obj = {} as Record<string, any>;
    for (const name in source) {
      if (typeof source[name] !== "function") {
        obj[name] = source[name];
      }
    }

    return obj;
  }
  else {
    return {};
  }
}

function toArray(arrayLike: {[name: string | symbol]: any}) {
  if (Object.prototype.toString.call(arrayLike) === "[object Array]") {
    return arrayLike;
  }
  else {
    let length = 0;
    for (const name in arrayLike) {
      if (/^([0-9]|[1-9][0-9]+)$/.test(name)) {
        length += 1;
      }
    }

    return Array.prototype.slice.call(Object.assign({}, arrayLike, {length}));
  }
}

/**
 * Return false if the converted array contains undefined item or the lenght of it is 0.
 * @param arrayLike
 * @returns
 */
function isArrayLike(arrayLike: {[name: string | symbol]: any}) {
  const array = toArray(arrayLike);
  return !(array.length === 0 || Object.values(array).findIndex(x => x === undefined) !== -1);
}


export { joinURL, dynamicRoute2ExpressPathname, objectify, toArray, isArrayLike };
