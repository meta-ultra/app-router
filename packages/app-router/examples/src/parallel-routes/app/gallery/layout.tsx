import { type ReactNode } from "react";

const Layout = ({ children, list }: { children: ReactNode; list: ReactNode }) => {
  return (
    <>
      {children}
      {list}
    </>
  );
};

export default Layout;
