import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./basic-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./basic-routes/collectStaticDefaultImportsOutput";
test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);

  expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});
