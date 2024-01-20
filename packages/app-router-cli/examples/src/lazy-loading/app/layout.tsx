import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

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
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
