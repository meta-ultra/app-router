import { collectRoutes } from "../src/core/collectRoutes";
import normalizeOutput from "./dynamic-routes/normalizeOutput";
import collectRoutesOutput from "./dynamic-routes/app/collectRoutesOutput";

test("", () => {
  const output = collectRoutes(normalizeOutput);

  expect(output).toStrictEqual(collectRoutesOutput);
});
