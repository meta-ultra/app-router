import generateCode from "../src/core/generateCode";
import collectStaticDefaultImportsOutput from "./basic-routes/collectStaticDefaultImportsOutput";
import collectAppRouterNamedImportsOutput from "./basic-routes/collectAppRouterNamedImportsOutput";

test("", () => {
  const output = generateCode(
    collectAppRouterNamedImportsOutput,
    collectStaticDefaultImportsOutput
  );
  console.log(output);
});
