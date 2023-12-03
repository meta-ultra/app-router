import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/sub1/home">Sub1 Home</Link>
          </li>
          <li>
            <Link to="/sub1/about">Sub1 About</Link>
          </li>
          <li>
            <Link to="/sub1/nothing-here">Sub1 Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
