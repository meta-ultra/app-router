/**
 * A drop-in replacement for `handlebars ./src/templates -e hbs -f ./src/templates/precompiled.js -k each -k if`.
 */
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import ora from "ora";
import Handlebars from "handlebars";

const TEMPLATES_DIR = join(process.cwd(), "src", "templates");
const OPTIONS = {
  knownHelpersOnly: true,
  knownHelpers: {
    unless: false,
    with: false,
    lookup: false,
    log: false,
    nameByFullPath: true,
    undefinable: true,
    generateChildrenRoutes: true,
    preset: true,
    lazyImport: true,
  },
};

/**
 * Pre-compile the handlebars template into handlebars template spec,
 * which can get passed in `Handlebars.template` as the first argument.
 */
const precompileToSpec = ([filename, options]) => {
  const template = readFileSync(join(TEMPLATES_DIR, filename)).toString();
  const spec = Handlebars.precompile(template, options);
  writeFileSync(
    join(TEMPLATES_DIR, filename.replace(".hbs", "") + ".spec.js"),
    "export default " + spec // export the template spec in default export statement of ESM.
  );
};

// Roll up our sleeves now.
const start = new Date().getTime();
const spinner = ora("Pre-compiling...").start();
[
  ["router.hbs", OPTIONS],
  ["childrenRoute.hbs", OPTIONS],
].forEach(precompileToSpec);
const end = new Date().getTime();
spinner.succeed(`Pre-compilation is done(${end - start}ms)!`);
