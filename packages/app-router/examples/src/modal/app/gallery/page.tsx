import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div>
      <h1>Gallery</h1>
      {[1, 2, 3, 4].map((index: number) => (
        <Link key={index} to={`imgs/${index}`}>
          Image {index}
        </Link>
      ))}
    </div>
  );
}
