import { join } from "node:path";
import { readFileSync } from "node:fs";
import { collectRoutes } from "../src/core/collectRoutes";
import { generateCodeOnFly } from "../src/core/generateCode";
import collectStaticDefaultImportsOutput from "./intercepting-routes/collectStaticDefaultImportsOutput";
import collectAppRouterNamedImportsOutput from "./intercepting-routes/collectAppRouterNamedImportsOutput";
import nomalizeOutput from "./intercepting-routes/normalizeOutput";

test("staticDefaultImports with hash router", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/staticImports.hbs"), {
    isHash: true,
    appRouterNamedImports: collectAppRouterNamedImportsOutput,
    staticDefaultImports: collectStaticDefaultImportsOutput,
  });

  expect(output).toStrictEqual(
    readFileSync(join(__dirname, "./intercepting-routes/staticDefaultImportsOutput.hash.hbs")).toString(
      "utf-8"
    )
  );
});

test("staticDefaultImports with browser router", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/staticImports.hbs"), {
    isHash: false,
    appRouterNamedImports: collectAppRouterNamedImportsOutput,
    staticDefaultImports: collectStaticDefaultImportsOutput,
  });

  expect(output).toStrictEqual(
    readFileSync(join(__dirname, "./intercepting-routes/staticDefaultImportsOutput.browser.hbs")).toString(
      "utf-8"
    )
  );
});

test("createRouter with empty string basename", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/createRouter.hbs"), {
    basename: "",
    routes: collectRoutes(nomalizeOutput),
  });

  console.log(output);
});

test("createRouter with undefined basename", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/createRouter.hbs"), {
    routes: collectRoutes(nomalizeOutput),
  });

  console.log(output);
});

test.only("createRouter with basename", () => {
  const output = generateCodeOnFly(join(__dirname, "../src/templates/createRouter.hbs"), {
    basename: "/page/index/index",
    routes: collectRoutes(nomalizeOutput),
  });
  console.log(output);
});
