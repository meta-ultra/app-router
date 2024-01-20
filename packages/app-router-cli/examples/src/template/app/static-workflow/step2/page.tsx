import { useContext } from "../context";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const { state, setState } = useContext();
  const navigate = useNavigate();

  return (
    <>
      <div>Step 2</div>
      <button onClick={() => setState(state - 1)}>{state}-Click to decrease!</button>
      <button onClick={() => navigate("/static-workflow/step1")}>Go to step 1</button>
    </>
  );
};

export default Page;
