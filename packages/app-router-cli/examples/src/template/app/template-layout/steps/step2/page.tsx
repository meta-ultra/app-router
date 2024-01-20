import { useEffect } from "react";
import { useContext as useLayoutContext } from "../../layoutContext";
import { useContext as useTemplateContext } from "../../templateContext";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const { state: layoutState, setState: setLayoutState } = useLayoutContext();
  const { state: templateState, setState: setTemplateState } = useTemplateContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("step1 mount");
  }, []);

  return (
    <>
      <div>Step 2</div>
      <button onClick={() => setLayoutState(layoutState + 1)}>
        layout {layoutState}-Click to increase!
      </button>
      <button onClick={() => setTemplateState(templateState + 1)}>
        template {templateState}-Click to increase!
      </button>
      <button onClick={() => navigate("/template-layout/steps/step1")}>
        Go to step 1 under layout
      </button>
      <button onClick={() => navigate("/template-layout/other")}>
        Go to other page outside layout
      </button>
    </>
  );
};

export default Page;
