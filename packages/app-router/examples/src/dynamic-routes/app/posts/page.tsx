import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Posts</h2>
      <button>Create</button>
      <ul>
        {[0, 1, 2, 3, 4].map((value) => (
          <li key={value}>
            Record {value}{" "}
            <button
              onClick={() => {
                navigate(`${value}?random=${Math.random()}`);
              }}
            >
              View
            </button>{" "}
            <button
              onClick={() => {
                navigate(`${value}/edit?random=${Math.random()}`);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
