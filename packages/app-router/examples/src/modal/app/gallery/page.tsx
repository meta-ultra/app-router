import { type FC } from "react";
import { type LayoutRouteProps, Link } from "react-router-dom";

const Page: FC<LayoutRouteProps> = ({ children }) => {
  return (
    <>
      <div>Page</div>
      <Link to="img/123">Image</Link>
      {children}
    </>
  );
};

export default Page;
