import {
  createContext,
  useContext,
  useRef,
  useMemo,
  type FC,
  type ComponentType,
  type PropsWithChildren,
} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useEvent from "./useEvent";

/**----------------------
 *    AuthContext
 *------------------------**/
type AuthContextType = {
  // Stores token, user info and other info after sign in, and set it to undefined when sign out.
  state?: object;
  signIn: (state: object) => void;
  signOut: (redirectTo?: string) => void;
  isSignIn: () => boolean;
  // React component for navigating to sign in route.
  NavigateToSignIn: ComponentType<{ redirectTo?: string }>;
  // React component for navigating to the index route of authentication required route.
  NavigateToRequireAuthIndex: ComponentType;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
/*---- END OF AuthContext ----*/

/**----------------------
 *    useAuth
 *------------------------**/
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error(`useAuth must be inside of AuthProvider.`);
  }

  return context;
};
/*---- END OF useAuth ----*/

/**----------------------
 *    AuthProvider
 *------------------------**/
type AuthProviderProps = PropsWithChildren<{
  initialState?: object;
  signInPath?: string;
  requireAuthIndexPath?: string;
  onSignIn?: (state: object) => void;
  onSignOut?: () => void;
}>;

const assembleLoginPath = (loginPath: string, redirectTo?: string) => {
  if (redirectTo) {
    const jointMark = loginPath.indexOf("?") === -1 ? "?" : "&";
    return loginPath + jointMark + new URLSearchParams([["redirectTo", redirectTo]]).toString();
  } else {
    return loginPath;
  }
};

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState,
  signInPath = "/login",
  requireAuthIndexPath = "/dashboard",
  onSignIn,
  onSignOut,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const stateRef = useRef<object | undefined>(initialState);

  const login = useEvent<AuthContextType["signIn"]>((state) => {
    stateRef.current = state;
    navigate(redirectTo || requireAuthIndexPath);
    onSignIn && onSignIn(state);
  });

  const logout = useEvent<AuthContextType["signOut"]>((redirectTo) => {
    stateRef.current = undefined;
    navigate(assembleLoginPath(signInPath, redirectTo));
    onSignOut && onSignOut();
  });

  const isLogin = useEvent<AuthContextType["isSignIn"]>(() => stateRef.current !== undefined);

  const NavigateToSignIn = useMemo(
    () =>
      function NavigateToLogin({ redirectTo }: { redirectTo?: string }) {
        return <Navigate to={assembleLoginPath(signInPath, redirectTo)} />;
      },
    [signInPath]
  );
  const NavigateToRequireAuthIndex = useMemo(
    () =>
      function NavigateToRequireAuth() {
        return <Navigate to={redirectTo || requireAuthIndexPath} />;
      },
    [redirectTo, requireAuthIndexPath]
  );

  return (
    <AuthContext.Provider
      value={{
        state: stateRef.current,
        signIn: login,
        signOut: logout,
        isSignIn: isLogin,
        NavigateToSignIn,
        NavigateToRequireAuthIndex,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
/*---- END OF AuthProvider ----*/

export type { AuthProviderProps, AuthContextType };
export { useAuth, AuthProvider };
