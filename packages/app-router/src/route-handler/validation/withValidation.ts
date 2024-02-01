import { type AnyObjectSchema } from "yup";
import { type NextRequest } from "../NextRequest";
import { type NextContext } from "../NextContext";
import { type RouteHandler } from "../RouteHandler";
import { objectify } from "../utils";

function withValidation(
  schemas: {
    paramsSchema?: AnyObjectSchema;
    searchParamsSchema?: AnyObjectSchema;
    bodySchema?: AnyObjectSchema;
  },
  handler: RouteHandler
) {
  return async (request: NextRequest, context: NextContext) => {
    if (schemas) {
      if (schemas.paramsSchema) {
        await schemas.paramsSchema.validate(context.params, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      if (schemas.searchParamsSchema) {
        await schemas.searchParamsSchema.validate(objectify(request.nextUrl.searchParams), {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      if (schemas.bodySchema) {
        await schemas.bodySchema.validate(await request.clone().json(), {
          abortEarly: false,
          stripUnknown: true,
          strict: true,
        });
      }
    }
    return handler(request, context);
  }
}

export { withValidation };
