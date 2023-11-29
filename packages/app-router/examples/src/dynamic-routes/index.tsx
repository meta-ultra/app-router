import { RouterProvider } from "react-router-dom";
import router from "./router";

const Index = () => {
  console.log("Entering lazy-loading...");

  return <RouterProvider router={router} />;
};

export default Index;
