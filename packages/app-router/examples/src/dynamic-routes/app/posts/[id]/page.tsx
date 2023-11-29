import { FC } from "react";
import { type DynamicRouteProps } from "../../../../../../src";

const Post: FC<DynamicRouteProps> = ({ params, searchParams }) => {
  return (
    <div>
      <h2>Post {params.id}</h2>
      <p>{JSON.stringify(searchParams)}</p>
    </div>
  );
};

export default Post;
