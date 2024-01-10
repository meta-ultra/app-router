import render from "../src/core/render";
import collectStaticDefaultImportsOutput from "./basic-routes/collectStaticDefaultImportsOutput";

test("", () => {
  const output = render(collectStaticDefaultImportsOutput);
  console.log(output);
});
