import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/sub1-home">Sub1 Home</Link>
          </li>
          <li>
            <Link to="/about">Sub 1About</Link>
          </li>
          <li>
            <Link to="/sub2-home">Sub2 Home</Link>
          </li>
          <li>
            <Link to="/about">Sub2 1About</Link>
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
