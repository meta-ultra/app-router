import { collectAppRouterNamedImports } from "../src/core/collectAppRouterNamedImports";
import normalizeOutput from "./dynamic-routes/normalizeOutput";
import collectAppRouterNamedImportsOutput from "./dynamic-routes/collectAppRouterNamedImportsOutput";

test("strictly equivalent", () => {
  const output = collectAppRouterNamedImports(normalizeOutput);

  expect(output).toStrictEqual(collectAppRouterNamedImportsOutput);
});
