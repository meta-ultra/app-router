/**
 * Caveat, only the static method "json" is polyfilled, while neither of others is useful to client route handlers.
 */
class NextResponse extends Response {
  static json(data: any, init?: ResponseInit) {
    const headers = Object.assign({"Content-Type": "application/json"}, init && init.headers || {})

    return Response.json(data, { ...(init || {}), headers });
  }

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    super(body, init);
  }
}

export { NextResponse };
