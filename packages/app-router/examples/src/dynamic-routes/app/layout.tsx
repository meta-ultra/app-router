import { random } from "lodash-es";
import { type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/catch-all">Catch All</Link>
          </li>
          <li>
            <a
              href="javascript: void 0"
              onClick={() => {
                const count = random(1, 10);
                const path = [];
                for (let i = 0; i < count; i++) {
                  path.push(String(random(0, 100)));
                }
                path[0] += "optional-catch-all";
                navigate(path.join("/") + `?random=${random(0, 100)}`);
              }}
            >
              Optional Catch All
            </a>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
