import { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/sub1/nothing-here">Sub1 Nothing Here</Link>
          </li>
        </ul>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
