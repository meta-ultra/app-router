import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import fakeAuthProvider from "./fakeAuthProvider";

interface AuthContextType {
  user: any;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const signIn = (newUser: string, callback: VoidFunction) => {
    fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signOut = (callback: VoidFunction) => {
    fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signOut(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export { AuthProvider, useAuth, AuthStatus };
