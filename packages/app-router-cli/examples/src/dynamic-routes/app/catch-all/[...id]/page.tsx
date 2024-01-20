import { FC } from "react";
import { DynamicRouteProps, GenerateMetadata } from "../../../../../../src";

export const generateMetadata: GenerateMetadata = ({ params, searchParams }) => {
  console.log("params", JSON.stringify(params));
  console.log("searchParams", JSON.stringify(searchParams));

  return {};
};

const CatchAllID: FC<DynamicRouteProps> = ({ params, searchParams }) => {
  return (
    <div>
      <h2>Catch-All {JSON.stringify(params.id)}</h2>
      <p>{JSON.stringify(searchParams)}</p>
    </div>
  );
};

export default CatchAllID;
