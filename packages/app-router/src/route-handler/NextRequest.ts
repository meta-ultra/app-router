/**
 * Caveat, only the "nextUrl.pathname" and "nextUrl.searchParams" are polyfilled.
 * - The "basePath" nested property of the native NextRequest is for server, which is useless to route handlers on the client.
 * - Other properties, neither of them is useful to client route handlers.
 */
class NextRequest extends Request {
  #pathname: string;
  #searchParams: URLSearchParams;

  get nextUrl() {
    const self = this;

    return {
      get pathname() {
        return self.#pathname;
      },
      get searchParams() {
        return self.#searchParams;
      }
    }
  }

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);

    const url = new URL(super.url);
    this.#pathname = url.pathname;
    this.#searchParams = url.searchParams;
  }
}

export { NextRequest };
