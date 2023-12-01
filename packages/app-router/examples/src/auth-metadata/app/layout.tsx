import { type FC, type PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { type GenerateMetadata, useNotFound } from "../../../../src";

const getPermissions = (): string[] => ["", "/", "/profile", "/avatar"];

// Naming starts with `use` to pass the validations of using React hooks.
export const generateMetadata: GenerateMetadata = async function useGenerateMetadata() {
  const location = useLocation();
  const notFound = useNotFound();

  /**
   * Be sure the permission fetching is synchronous operation.
   */
  const permissions = getPermissions();
  if (permissions.indexOf(location.pathname) === -1) {
    // deny access
    notFound("NO PERMISSION");
  }

  return {
    title: "auth-metadata",
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
    <div>
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
          <li>
            <Link to="/avatar">Avatar</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
