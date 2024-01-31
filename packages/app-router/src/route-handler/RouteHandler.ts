import { NextContext } from "./NextContext";
import { NextRequest } from "./NextRequest";
import { NextResponse } from "./NextResponse";

const HTTP_METHOD = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"] as const;
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
type RouteHandler = (request: NextRequest, context: NextContext) => Promise<NextResponse | undefined>;

export type { HTTPMethod, RouteHandler };
export { HTTP_METHOD };
