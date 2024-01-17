import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./parallel-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./parallel-routes/collectStaticDefaultImportsOutput";

test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);

  expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});
