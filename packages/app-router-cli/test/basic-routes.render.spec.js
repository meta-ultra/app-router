import render from "../src/core/render";
import collectStaticDefaultImportsOutput from "./basic-routes/collectStaticDefaultImportsOutput";

test("", () => {
  const output = render(
    ["RootLayoutRouteElement", "PageRouteElement"],
    collectStaticDefaultImportsOutput
  );
  console.log(output);
});
