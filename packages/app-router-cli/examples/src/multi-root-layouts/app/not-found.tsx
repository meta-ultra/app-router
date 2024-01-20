import { Link } from "react-router-dom";

const RootNotFound = () => {
  return (
    <div>
      <h2>
        Nothing to see here! Not matter where you navigate from (such as sub1 or sub2), you will end
        up at the top-most not-found page.
      </h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default RootNotFound;
