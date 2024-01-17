import { collectRoutes } from "../src/core/collectRoutes";
import normalizeOutput from "./parallel-routes/normalizeOutput";
import collectRoutesOutput from "./parallel-routes/collectRoutesOutput"

test("", () => {
  const output = collectRoutes(normalizeOutput);
  expect(output).toStrictEqual(collectRoutesOutput);
});
