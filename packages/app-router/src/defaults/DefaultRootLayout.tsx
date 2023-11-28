import { type FC, type PropsWithChildren } from "react";

const DefaultRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default DefaultRootLayout;
