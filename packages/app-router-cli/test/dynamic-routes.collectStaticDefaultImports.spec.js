import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./dynamic-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./dynamic-routes/collectStaticDefaultImportsOutput";

test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);

  expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});
