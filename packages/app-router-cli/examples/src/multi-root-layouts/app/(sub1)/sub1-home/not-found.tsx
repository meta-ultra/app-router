import { useNavigate } from "react-router-dom";

const RootNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Sub1 Nothing to see here!</h2>
      <p>
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              navigate("/sub1-home");
            }, 0);
          }}
        >
          Go to the home page
        </button>
      </p>
    </div>
  );
};

export default RootNotFound;
