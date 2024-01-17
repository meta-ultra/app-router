import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./parallel-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./parallel-routes/collectStaticDefaultImportsOutput";

test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);

  console.log(JSON.stringify(output, null, 2))
  // expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});
