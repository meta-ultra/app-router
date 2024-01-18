import { collectRoutes } from "../src/core/collectRoutes";
import normalizeOutput from "./intercepting-routes/normalizeOutput";
import collectRoutesOutput from "./intercepting-routes/collectRoutesOutput";

test("", () => {
  const output = collectRoutes(normalizeOutput);
  // console.log(JSON.stringify(output, null, 2));
  expect(output).toStrictEqual(collectRoutesOutput);
});
