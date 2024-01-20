import { Link } from "react-router-dom";

export default function Page() {
  return (
    <>
      <div>Page</div>
      {[1, 2, 3, 4].map((index: number) => (
        <Link style={{ display: "block" }} key={index} to={`imgs/${index}`}>
          Go to Image {index}
        </Link>
      ))}
    </>
  );
}
