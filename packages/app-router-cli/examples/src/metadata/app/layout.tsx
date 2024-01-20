import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { type Metadata } from "../../../../src";

/**
 * The metadata specified by `metadata` variable or returning from `generateMetadata` function in layout,
 * will be merged as the default value for its own nested layouts or pages.
 */
export const metadata: Metadata = {
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
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
