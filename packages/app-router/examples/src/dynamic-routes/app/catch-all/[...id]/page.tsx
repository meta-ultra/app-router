import { FC } from "react";
import { DynamicRouteProps } from "../../../../../../src";

const CatchAllID: FC<DynamicRouteProps> = ({ params, searchParams }) => {
  return (
    <div>
      <h2>Post {params.id}</h2>
      <p>{JSON.stringify(searchParams)}</p>
    </div>
  );
};

export default CatchAllID;
