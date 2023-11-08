/**========================================================================
 *                     NotRoutesMatchedErrorBoundary
 * Catch the 'no routes matched location "xxxx"' error thrown by
 * react-router-dom v6, and transfer control to the root NotFoundProvider,
 * of which responsibility is to display the root not-found component.
 *========================================================================**/
import { type FC } from "react";
import { useRouteError } from "react-router-dom";
import { useNotFound } from "../not-found/notFound";
import ErrorResponse from "../not-found/ErrorResponse";

const NoRoutesMachedErrorBoundary: FC = () => {
  /*======= react-router-dom v6 =======*/
  const error = useRouteError();
  /*======= next.js app router like behaviors =======*/
  const notFound = useNotFound();
  if ((error as { status: number }).status === 404) {
    notFound(error as ErrorResponse);
    return null;
  } else {
    console.warn(`
      For better UX, set the root "element" of router object to an instance of "RouteSegmentElement",
      of which "layout" property is "RouteSegmentElementLayout.ROOT_LAYOUT", and with valid error property.
    `);
    throw error;
  }
};

export default NoRoutesMachedErrorBoundary;
