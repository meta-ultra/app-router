import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`imgs/${index}`} style={{ display: "block" }}>
            Go to (..)imgs/{index}
          </Link>
        ))}
      </div>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`detail/imgs/${index}`} style={{ display: "block" }}>
            Go to detail/(..)(..)imgs/{index}
          </Link>
        ))}
      </div>
      <div>
        {[1, 2].map((index: number) => (
          <Link key={index} to={`detail/more/imgs/${index}`} style={{ display: "block" }}>
            Go to detail/more/(...)imgs/{index}
          </Link>
        ))}
      </div>
    </div>
  );
}
