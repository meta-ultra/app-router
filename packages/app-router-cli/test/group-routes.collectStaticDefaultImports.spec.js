import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import normalizeOutput from "./group-routes/normalizeOutput";
import collectStaticDefaultImportsOutput from "./group-routes/collectStaticDefaultImportsOutput";

test("strictly equivalent", () => {
  const output = collectStaticDefaultImports(normalizeOutput);

  expect(output).toStrictEqual(collectStaticDefaultImportsOutput);
});

