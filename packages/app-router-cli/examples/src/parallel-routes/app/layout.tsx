import { type ReactNode } from "react";
import { Link } from "react-router-dom";

const RootLayout = ({ children, root }: { children: ReactNode; root: ReactNode }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
      {root}
    </div>
  );
};

export default RootLayout;
