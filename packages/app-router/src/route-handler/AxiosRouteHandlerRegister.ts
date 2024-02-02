import { pathToRegexp, match } from "path-to-regexp";
// import type MockAdapter from "axios-mock-adapter";
import { capitalize } from "lodash-es";
import { type RouteHandler, type HTTPMethod } from "./RouteHandler";
import { AbsRouteHandlerRegister } from "./RouteHandlerRegister";
import { joinURL, dynamicRoute2ExpressPathname, objectify } from "./utils";
import { NextRequest } from "./NextRequest";
import { MIME_JSON } from "./MIME";

type AdapterMethodFunction = `on${Capitalize<Lowercase<HTTPMethod>>}`;
type MockAdapter = {
  onPut: (regexp: RegExp) => {
    reply: (config: {url: string}) => Promise<any>
  }
};

class AxiosRouteHandlerRegister extends AbsRouteHandlerRegister {
  #mockAdapter: MockAdapter;
  #baseUrl: string;

  constructor(mockAdapter: MockAdapter, baseUrl?: string) {
    super();

    this.#mockAdapter = mockAdapter;
    this.#baseUrl = typeof baseUrl === "string" ?  baseUrl || "/" : "/";
  }

  protected doRegister(path: string, handler: RouteHandler, method: HTTPMethod): void {
    const { origin, pathname } = joinURL(this.#baseUrl, path);
    let expressPathname = dynamicRoute2ExpressPathname(pathname);
    const regexp = RegExp("^" + origin + pathToRegexp(expressPathname).source.replace(/^[^]/, ""));
    const urlMatch = match(expressPathname, { decode: decodeURIComponent });
// AdapterMethodFunction
    this.#mockAdapter[`on${capitalize(method || handler.name)}` as "onPut"](regexp).reply(async (config) => {
      let params = {};
      const { origin, pathname } = joinURL(config.baseURL || "", config.url || "");
      const urlMatchResult = urlMatch(pathname);
      if (urlMatchResult && urlMatchResult.params) {
        params = urlMatchResult.params;
      }

      const method = config.method || "GET";
      const contentType = config.headers && config.headers["Content-Type"] || MIME_JSON;
      const queryString = new URLSearchParams(config.params || {}).toString();
      const nextRequestUrl = origin + pathname + (queryString ? "?" + queryString : "");
      const nextRequestInit: {
        method: string;
        headers: Record<string, any>;
        body?: string;
      } = { method, headers: objectify(config.headers) };
      nextRequestInit.headers["Content-Type"] = contentType;
      if (["GET", "HEAD"].indexOf(method) !== -1 && config.data) {
        nextRequestInit.body = config.data;
      }
      const request = new NextRequest(nextRequestUrl, nextRequestInit);
      console.info(`[@meta-ultra/app-router] ${request.method} ${request.url} has been intercepted.`)
      const response = await handler(request, { params });

      if (response) {
        let body = undefined;
        const contentType = response.headers && response.headers.get("Content-Type") || MIME_JSON;
        if (contentType === MIME_JSON) {
          body = await response.json();
        }
        else {
          body = await response.text();
        }

        return [
          response.status || 200,
          body,
          response.headers
        ]
      }
      else {
        return [
          200,
          {code: 0},
          {"content-type": "application/json"}
        ]
      }
    });
  }
}

export { AxiosRouteHandlerRegister };
