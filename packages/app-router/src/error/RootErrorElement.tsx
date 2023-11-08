/**=======================================================================================================================
 *                                                     RootErrorElement
 *  The only way to capture the error around 'no routes matched location "xxxx"' thrown by react-router-dom v6 is via
 *  the top-most `errorElement` property within router object. Thus, set the root `errorElement` to an instance
 *  of RootErrorElement as below:
 *  {
 *    errorElement: <RootErrorElement notFound={<RootNotFound />} />
 *  }
 *=======================================================================================================================**/
import { type FC } from "react";
import NoRoutesMachedErrorBoundary from "./NoRoutesMatchedErrorBoundary";
import { NotFoundProvider, type NotFoundProviderProps } from "../not-found/notFound";

interface RootErrorElementProps {
  notFound?: NotFoundProviderProps["fallback"];
}
const RootErrorElement: FC<RootErrorElementProps> = ({ notFound }) => (
  <NotFoundProvider fallback={notFound}>
    <NoRoutesMachedErrorBoundary />
  </NotFoundProvider>
);

export type { RootErrorElementProps };
export default RootErrorElement;
