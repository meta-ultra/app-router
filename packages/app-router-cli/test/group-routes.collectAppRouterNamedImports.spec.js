import { collectAppRouterNamedImports } from "../src/core/collectAppRouterNamedImports";
import normalizeOutput from "./group-routes/normalizeOutput";
import collectAppRouterNamedImportsOutput from "./group-routes/collectAppRouterNamedImportsOutput";

test("strictly equivalent", () => {
  const output = collectAppRouterNamedImports(normalizeOutput);

  expect(output).toStrictEqual(collectAppRouterNamedImportsOutput);
});
