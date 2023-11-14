import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Handlebars from "handlebars";
import { traverseFileSystem } from "./src/traverseFileSystem.js";
import { sinkPageWithLayout } from "./src/sinkPageWithLayout.js";
import { processNotFound } from "./src/processNotFound.js";
import { processGlobalError } from "./src/processGlobalError.js";
import { collectDefaultImports } from "./src/collectDefaultImports.js";
import { registerHandlebarsHelpers } from "./src/registerHandlebarsHelpers.js";

const sourcePath = join(process.cwd(), "./test_src/app");
const outputPath = join(process.cwd(), "./test_src/router.tsx");

const routes = sinkPageWithLayout(
  processNotFound(processGlobalError(traverseFileSystem(outputPath, sourcePath)))
);
const defaultImports = collectDefaultImports(routes);

// generate
registerHandlebarsHelpers();
const template = Handlebars.compile(readFileSync("./src/templates/router.hbs").toString());
const router = template({
  defaultImports,
  routes,
});

writeFileSync(outputPath, router);
