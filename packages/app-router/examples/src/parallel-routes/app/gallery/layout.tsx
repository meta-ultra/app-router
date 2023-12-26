import { type ReactNode } from "react";

const Layout = ({
  children,
  list,
  other,
}: {
  children: ReactNode;
  list: ReactNode;
  other: ReactNode;
}) => {
  return (
    <>
      {children}
      {list}
      {other}
    </>
  );
};

export default Layout;
