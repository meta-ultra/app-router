import { random } from "lodash-es";
import { useNavigate } from "react-router-dom";

function CatchAll() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>CatchAll</h2>
      <button
        onClick={() => {
          const count = random(1, 10);
          const path = [];
          for (let i = 0; i < count; i++) {
            path.push(random(0, 100));
          }
          navigate(path.join("/") + `?random=${random(0, 100)}`);
        }}
      >
        Go to random child route
      </button>
    </div>
  );
}

export default CatchAll;
