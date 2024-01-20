import { DynamicRouteProps } from "../../../../../../../src";

export default function Page({ params }: DynamicRouteProps) {
  return (
    <div style={{ border: "solid 1px #999", padding: 10 }}>
      <h1>Pretend I&apos;m a Gallery Dialog</h1>
      <div>You&apos;re in /gallery/(..)imgs/{params.id} at the moment.</div>
      <div>Press F5 to refresh and redirect to the intercepting route /imgs/{params.id}.</div>
    </div>
  );
}
