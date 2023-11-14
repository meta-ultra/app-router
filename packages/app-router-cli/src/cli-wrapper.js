import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { debounce } from "lodash-es";
import meow from "meow";
import chalk from "chalk";
import { watch } from "chokidar"; // https://github.com/paulmillr/chokidar
import { format } from "prettier"; // https://prettier.io/docs/en/api.html
import { getRoutesFromFileSystem, generateRouterOutput } from "./core/index.js";

const helpText = `
  Usage
    ${chalk.green("npx app-router")} ${chalk.yellow("[options]")}
    ${chalk.green("pnpm dlx app-router")} ${chalk.yellow("[options]")}

  Options
    ${chalk.yellow("--watch, -w")} Enable watch mode.
    ${chalk.yellow(
      "--obtuse <milliseconds=300>"
    )} Start to generate router after a specified milliseconds when changes finish.
    ${chalk.yellow("--source, -s <folder=./src/app>")} Specify the folder contains app router.
    ${chalk.yellow(
      "--output, -o <filepath=./src/router.tsx>"
    )} Specify the react-router-dom router file path.
`;

const cli = meow(helpText, {
  importMeta: import.meta,
  description: false,
  flags: {
    help: {
      type: "boolean",
      default: false,
      shortFlag: "h",
    },
    watch: {
      type: "boolean",
      default: false,
      shortFlag: "w",
    },
    obtuse: {
      type: "number",
      default: 300,
    },
    source: {
      type: "string",
      default: "./src/app",
      shortFlag: "s",
    },
    output: {
      type: "string",
      default: "./src/router.tsx",
      shortFlag: "o",
    },
  },
});

const sourcePath = join(process.cwd(), cli.flags.source);
const outputPath = join(process.cwd(), cli.flags.output);

const handleChange = debounce(async () => {
  console.log("Generating app router...");

  const routes = getRoutesFromFileSystem(outputPath, sourcePath);
  const output = generateRouterOutput(routes);
  writeFileSync(outputPath, await format(output, { parser: "babel" }));

  console.log("Generating app router is done.");
}, cli.flags.obtuse);

if (cli.flags.watch) {
  watch(sourcePath).on("add", handleChange);
  watch(sourcePath).on("addDir", handleChange);
  watch(sourcePath).on("unlink", handleChange);
  watch(sourcePath).on("unlinkDir", handleChange);
} else {
  handleChange();
}
