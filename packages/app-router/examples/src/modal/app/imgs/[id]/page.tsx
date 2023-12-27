import { DynamicRouteProps } from "../../../../../../src";

export default function Page({ params }: DynamicRouteProps) {
  return <div>Images{params.id}</div>;
}
