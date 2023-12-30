import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>gallery/layout</div>
      {children}
    </div>
  );
}
