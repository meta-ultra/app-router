/**
 * Caveat, only the static method "json" is polyfilled, while neither of others is useful to client route handlers.
 */
class NextResponse extends Response {
  static json(data: any, init?: ResponseInit): Response {
    const headers = Object.assign({"Content-Type": "application/json"}, init && init.headers || {})

    // Before tsc 5.2, creating JSON response through "Response.json(data, { ...(init || {}), headers })" will throw error TS2339.
    // For more details, refers to https://github.com/microsoft/TypeScript/issues/52841.
    return new Response(JSON.stringify(data), { ...(init || {}), headers });
  }

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    super(body, init);
  }
}

export { NextResponse };
