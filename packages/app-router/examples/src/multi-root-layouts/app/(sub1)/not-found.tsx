import { Link } from "react-router-dom";

const RootNotFound = () => {
  return (
    <div>
      <h2>Sub1 Nothing to see here!</h2>
      <p>
        <Link to="/sub1-home">Go to the home page</Link>
      </p>
    </div>
  );
};

export default RootNotFound;
