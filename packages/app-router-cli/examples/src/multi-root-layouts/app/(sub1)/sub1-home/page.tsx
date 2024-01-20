import { useNotFound } from "../../../../../../src";

function Home() {
  const notFound = useNotFound();

  return (
    <div>
      <button onClick={() => notFound()}>Fire not found</button>
      <h2>Sub1 Home</h2>
    </div>
  );
}

export default Home;
