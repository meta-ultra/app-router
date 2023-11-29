import { random } from "lodash-es";
import { useNavigate } from "react-router-dom";

function CatchAll() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>CatchAll</h2>
      <button
        onClick={() => {
          navigate(`${random()}/${random()}?random=${random()}`);
        }}
      >
        Go to random child route
      </button>
    </div>
  );
}

export default CatchAll;
