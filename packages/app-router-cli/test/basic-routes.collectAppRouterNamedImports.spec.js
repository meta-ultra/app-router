import { collectAppRouterNamedImports } from "../src/core/collectAppRouterNamedImports";
import normalizeOutput from "./basic-routes/normalizeOutput";
import collectAppRouterNamedImportsOutput from "./basic-routes/collectAppRouterNamedImportsOutput";

test("strictly equivalent", () => {
  const output = collectAppRouterNamedImports(normalizeOutput);

  expect(output).toStrictEqual(collectAppRouterNamedImportsOutput);
});
