import { useEffect } from "react";
import { useContext } from "../context";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const { state, setState } = useContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("step1");
  }, []);

  return (
    <>
      <div>Step 1</div>
      <button onClick={() => setState(state + 1)}>{state}-Click to increase!</button>
      <button onClick={() => navigate("/template/step2")}>Go to step 2</button>
    </>
  );
};

export default Page;
