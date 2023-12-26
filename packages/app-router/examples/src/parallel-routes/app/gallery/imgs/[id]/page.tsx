import { DynamicRouteProps } from "../../../../../../../src";

export default function Page({ params }: DynamicRouteProps) {
  return <div>Image {params.id}</div>;
}
