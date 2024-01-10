import render from "../src/core/render";
import collectStaticDefaultImportsOutput from "./basic-routes/collectStaticDefaultImportsOutput";
import collectAppRouterNamedImportsOutput from "./basic-routes/collectAppRouterNamedImportsOutput";

test("", () => {
  const output = render(collectAppRouterNamedImportsOutput, collectStaticDefaultImportsOutput);
  console.log(output);
});
