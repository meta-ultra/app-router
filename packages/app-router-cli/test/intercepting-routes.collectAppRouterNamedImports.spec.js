import { collectAppRouterNamedImports } from "../src/core/collectAppRouterNamedImports";
import normalizeOutput from "./intercepting-routes/normalizeOutput";
import collectAppRouterNamedImportsOutput from "./intercepting-routes/collectAppRouterNamedImportsOutput";

test("strictly equivalent", () => {
  const output = collectAppRouterNamedImports(normalizeOutput);

  expect(output).toStrictEqual(collectAppRouterNamedImportsOutput);
});

