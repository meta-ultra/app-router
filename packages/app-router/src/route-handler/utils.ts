import { isNil } from "lodash-es";
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
function objectify(source: any): Record<string, any>;
function objectify(source: URLSearchParams | any): Record<string, string | string[]> | Record<string, any> {
  if (source instanceof URLSearchParams) {
    return objectifyURLSearchParams(source);
  }
  else if (source instanceof Headers) {
    return objectifyHeaders(source);
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
function objectifyAnything(source: any) {
  if (source) {
    return source as Record<string, any>;
  }
  else {
    return {};
  }
}

export { joinURL, dynamicRoute2ExpressPathname, objectify };
