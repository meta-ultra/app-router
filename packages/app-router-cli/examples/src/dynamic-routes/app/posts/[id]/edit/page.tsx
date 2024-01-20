import { FC } from "react";
import { DynamicRouteProps } from "../../../../../../../src";

const Post: FC<DynamicRouteProps> = ({ params, searchParams }) => {
  return (
    <div>
      <h2>Editing Post {params.id}</h2>
      <p>{JSON.stringify(searchParams)}</p>
    </div>
  );
};

export default Post;
