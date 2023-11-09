import { type FC, type PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import type { SealedAuthMeta } from "./sealAuthMeta";

type AuthRequiredLayoutProps = PropsWithChildren<{
  meta: SealedAuthMeta;
}>;

const AuthRequiredLayout: FC<AuthRequiredLayoutProps> = ({ meta, children }) => {
  const location = useLocation();
  const { isSignIn, NavigateToSignIn } = useAuth();

  /**----------------------
   *    Authentication
   *------------------------**/
  if (!isSignIn()) {
    return <NavigateToSignIn redirectTo={location.pathname} />;
  }
  /*---- END OF Authentication ----*/

  /**----------------------
   *    Authorization
   *------------------------**/
  if (meta.authorize) {
    meta.authorize(location.pathname);
  }
  /*---- END OF Authorization ----*/

  // return "children" when used with @meta-ultra/app-router, while returning "<Outlet/>" used standalone.
  return children || <Outlet />;
};

export type { AuthRequiredLayoutProps };
export default AuthRequiredLayout;
