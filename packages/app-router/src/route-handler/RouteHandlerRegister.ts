import { type RouteHandler, type HTTPMethod, HTTP_METHOD } from "./RouteHandler";
import { isFunction } from "lodash-es";

interface RouteHandlerRegister {
  register(path: string, route: object): void;
}

abstract class AbsRouteHandlerRegister implements RouteHandlerRegister {
  abstract doRegister(path: string, handler: RouteHandler, method: HTTPMethod): void;

  register(path: string, route: object) {
    Object.entries(route || {}).forEach(([name, handler]) => {
      if (HTTP_METHOD.indexOf(name as HTTPMethod) !== -1 && isFunction(handler)) {
        this.doRegister(path, handler, name as HTTPMethod);
      }
    });
  }
}

export type { RouteHandlerRegister };
export { AbsRouteHandlerRegister };
