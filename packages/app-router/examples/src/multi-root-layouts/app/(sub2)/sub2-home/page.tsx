import { useGlobalNotFound } from "../../../../../../src";

function Home() {
  const globalNotFound = useGlobalNotFound();

  return (
    <div>
      <button onClick={() => globalNotFound()}>Fire global not found</button>
      <h2>Sub2 Home</h2>
    </div>
  );
}

export default Home;
