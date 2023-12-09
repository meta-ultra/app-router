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
            <Link to="/static-workflow/step1">Static Workflow Step1</Link>
          </li>
          <li>
            <Link to="/template/step1">Template Step1</Link>
          </li>
          <li>
            <Link to="/template-layout/steps/step1">Template Layout Step1</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {children}
    </div>
  );
};

export default RootLayout;
