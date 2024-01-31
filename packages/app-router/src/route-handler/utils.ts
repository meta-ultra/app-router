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
  const match = /\[([a-z][a-z0-9-_]*)\]/.exec(path);
  if (match) {
    path = path.replace(match[0], `:${match[1]}`);
    return dynamicRoute2ExpressPathname(path);
  }
  else {
    return path;
  }
};

export { joinURL, dynamicRoute2ExpressPathname };
