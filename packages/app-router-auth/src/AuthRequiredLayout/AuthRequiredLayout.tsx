import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import type { SealedAuthMeta } from "./sealAuthMeta";

interface AuthRequiredLayoutProps {
  meta: SealedAuthMeta;
}

const AuthRequiredLayout: FC<AuthRequiredLayoutProps> = ({ meta }) => {
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

  return <Outlet />;
};

export type { AuthRequiredLayoutProps };
export default AuthRequiredLayout;
