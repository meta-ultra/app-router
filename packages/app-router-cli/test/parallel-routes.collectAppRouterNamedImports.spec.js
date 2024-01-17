import { collectAppRouterNamedImports } from "../src/core/collectAppRouterNamedImports";
import normalizeOutput from "./parallel-routes/normalizeOutput";
import collectAppRouterNamedImportsOutput from "./parallel-routes/collectAppRouterNamedImportsOutput";

test("strictly equivalent", () => {
  const output = collectAppRouterNamedImports(normalizeOutput);

  expect(output).toStrictEqual(collectAppRouterNamedImportsOutput);
});
