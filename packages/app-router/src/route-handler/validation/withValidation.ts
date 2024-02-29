import { type AnyObjectSchema, type MixedSchema, type AnyObject} from "yup";
import { type NextRequest } from "../NextRequest";
import { type NextContext } from "../NextContext";
import { type RouteHandler } from "../RouteHandler";
import { objectify } from "../utils";

function withValidation(
  schemas: {
    paramsSchema?: AnyObjectSchema | MixedSchema<any | undefined, AnyObject, undefined, "">;
    searchParamsSchema?: AnyObjectSchema | MixedSchema<any | undefined, AnyObject, undefined, "">;
    bodySchema?: AnyObjectSchema | MixedSchema<any | undefined, AnyObject, undefined, "">;
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
        let data = {};
        const contentType = request.headers.get("Content-Type") || "application/json";
        if (/^\s*application\/(ld+)?json\s*$/i.test(contentType)) {
          data = await request.clone().json();
        }
        else {
          const formData = await request.clone().formData();
          data = Object.fromEntries(formData.entries());
        }
        await schemas.bodySchema.validate(data, {
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
