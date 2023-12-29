import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`gallery/imgs/${index}`} style={{ display: "block" }}>
            Go to gallery/(..)imgs/{index}
          </Link>
        ))}
      </div>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`gallery/detail/imgs/${index}`} style={{ display: "block" }}>
            Go to gallery/detail/(..)(..)imgs/{index}
          </Link>
        ))}
      </div>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`gallery/detail/more/imgs/${index}`} style={{ display: "block" }}>
            Go to gallery/detail/more/(...)imgs/{index}
          </Link>
        ))}
      </div>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`gallery/nested/imgs/${index}`} style={{ display: "block" }}>
            Go to gallery/nested/(group)/(..)(..)imgs/{index}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
