import { DynamicRouteProps } from "../../../../../../../src";

export default function Page({ params }: DynamicRouteProps) {
  return (
    <div>
      <h1>Dialog</h1>
      <div>Image {params.id}</div>
    </div>
  );
}
