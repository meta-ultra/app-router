import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { type GenerateMetadata } from "../../../../src";
import { AuthProvider, AuthStatus } from "../utils/AuthProvider";

// Naming starts with `use` to pass the validations of using React hooks.
export const generateMetadata: GenerateMetadata = async function useGenerateMetadata() {
  return {
    title: "auth",
    generator: "@meta-ultra/app-router",
    referrer: "none",
    keywords: ["react", "app router"],
    author: [{ name: "fsjohnhuang", url: "fsjohnhuang@hotmail.com" }],
    creator: "fsjohnhuang",
    publisher: "fsjohnhuang",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <div>
        <AuthStatus />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <hr />
        {children}
      </div>
    </AuthProvider>
  );
};

export default RootLayout;
