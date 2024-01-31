import { pathToRegexp, match } from "path-to-regexp";
import type MockAdapter from "axios-mock-adapter";
import { capitalize } from "lodash-es";
import { RouteHandler, HTTPMethod } from "./RouteHandler";
import { AbsRouteHandlerRegister } from "./RouteHandlerRegister";
import { joinURL, dynamicRoute2ExpressPathname } from "./utils";
import { NextRequest } from "./NextRequest";

type AdapterMethodFunction = "onGet" | "onPost" | "onPut" | "onPatch" | "onDelete" | "onHead" | "onOptions";

class AxiosRouteHandlerRegister extends AbsRouteHandlerRegister {
  #mockAdapter: MockAdapter;
  #baseUrl: string;

  constructor(mockAdapter: MockAdapter, baseUrl?: string) {
    super();

    this.#mockAdapter = mockAdapter;
    this.#baseUrl = typeof baseUrl === "string" ?  baseUrl || "/" : "/";
  }

  doRegister(path: string, handler: RouteHandler, method: HTTPMethod): void {
    const { origin, pathname } = joinURL(this.#baseUrl, path);
    let expressPathname = dynamicRoute2ExpressPathname(pathname);
    const regexp = RegExp("^" + origin + pathToRegexp(expressPathname).source.replace(/^[^]/, ""));
    const urlMatch = match(expressPathname, { decode: decodeURIComponent });

    this.#mockAdapter[`on${capitalize(method || handler.name)}` as AdapterMethodFunction](regexp).reply(async (config) => {
      let params = {};
      const { origin, pathname } = joinURL(config.baseURL || "", config.url || "");
      const urlMatchResult = urlMatch(pathname);
      if (urlMatchResult && urlMatchResult.params) {
        params = urlMatchResult.params;
      }

      const request = new NextRequest(origin + pathname);
      const response = await handler(request, { params });

      if (response) {
        let body = undefined;
        const contentType = response.headers && response.headers.get("Content-Type") || "application/json";
        if (contentType === "application/json") {
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
