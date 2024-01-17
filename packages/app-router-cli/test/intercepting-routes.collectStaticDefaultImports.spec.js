import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./intercepting-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./intercepting-routes/collectStaticDefaultImportsOutput";

test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);
  // console.log(JSON.stringify(output, null, 2))

  expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});
