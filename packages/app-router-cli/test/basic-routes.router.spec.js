import { join } from "node:path";
import { collectStaticDefaultImports } from "../src/core/collectStaticDefaultImports";
import { collectRoutes } from "../src/core/collectRoutes";
import { generateCodeOnFly } from "../src/core/generateCode";
import collectAppRouterNamedImportsOutput from "./basic-routes/collectAppRouterNamedImportsOutput";
import nomalizeOutput from "./basic-routes/normalizeOutput";

const staticDefaultImports = collectStaticDefaultImports(nomalizeOutput);

test.only("createRouter with basename", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/router.hbs"), {
    isHash: false,
    appRouterNamedImports: collectAppRouterNamedImportsOutput,
    staticDefaultImports,
    basename: "/page/index/index",
    routes: collectRoutes(nomalizeOutput),
  });
  console.log(output);
});
