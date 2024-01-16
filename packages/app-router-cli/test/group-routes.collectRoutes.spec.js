import { collectRoutes } from "../src/core/collectRoutes";
import normalizeOutput from "./group-routes/normalizeOutput";

test("", () => {
  const output = collectRoutes(normalizeOutput);

  console.log(JSON.stringify(output, null, 2));
});
