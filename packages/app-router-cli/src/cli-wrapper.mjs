// at the moment, this is deprecated.
const { writeFileSync } = require("node:fs");
const { join, sep } = require("node:path");
const { debounce } = require("lodash");
const meow = require("meow");
const chalk = require("chalk");
const ora = require("ora");
const cliWelcome = require("cli-welcome");
const { watch } = require("chokidar"); // https://github.com/paulmillr/chokidar
const { format } = require("prettier"); // https://prettier.io/docs/en/api.html
const { getMetaRoutes, generateRouter } = require("./core/index.js");

const helpText = `
Usage
  ${chalk.green("app-router")} ${chalk.yellow("[options]")}

Options
  ${chalk.yellow("--version, -v")} Display the version.
  ${chalk.yellow("--watch, -w")} Enable watch mode.
  ${chalk.yellow("--basename <basename=''>")} Set the basename.
  ${chalk.yellow("--hash")} Use hash instead of history API.
  ${chalk.yellow(
    "--obtuse <milliseconds=300>"
  )} Start to generate router after a specified milliseconds when changes finish.
  ${chalk.yellow("--source, -s <folder=./src/app>")} Specify the folder contains app router.
  ${chalk.yellow(
    "--output, -o <filepath=./src/router.tsx>"
  )} Specify the react-router-dom router file path.
`;

const cli = meow(helpText, {
  description: false,
  autoHelp: false,
  flags: {
    help: {
      type: "boolean",
      default: false,
      shortFlag: "h",
    },
    version: {
      type: "boolean",
      default: false,
      shortFlag: "v",
    },
    watch: {
      type: "boolean",
      default: false,
      shortFlag: "w",
    },
    basename: {
      type: "string",
      default: "",
    },
    hash: {
      type: "boolean",
      default: false,
    },
    obtuse: {
      type: "number",
      default: 100,
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

const main = async () => {
  const spinner = ora("App router configuration is being generated now...").start();

  const segs = outputPath.split(sep);
  segs.pop();
  const routes = getMetaRoutes(segs.join(sep), sourcePath);
  const output = generateRouter(cli.flags.hash, cli.flags.basename, routes);
  writeFileSync(outputPath, await format(output, { parser: "babel" }));

  spinner.succeed("App Router has been ready.");
  if (cli.flags.watch) {
    console.log("app-router is running.");
  }
};

// process now
if (cli.flags.version) {
  console.log(cli.pkg.version);
} else if (cli.flags.help) {
  cliWelcome({
    title: cli.pkg.name,
    tagLine: "Powered by Meta Ultra",
    description: cli.pkg.description,
    version: cli.pkg.version,
    bgColor: "#FADC00",
    color: "#000000",
    bold: true,
    clear: true,
  });

  cli.showHelp();
} else {
  if (cli.flags.watch) {
    const handleChange = debounce(main, cli.flags.obtuse);
    watch(sourcePath).on("add", handleChange);
    watch(sourcePath).on("addDir", handleChange);
    watch(sourcePath).on("unlink", handleChange);
    watch(sourcePath).on("unlinkDir", handleChange);
  } else {
    main();
  }
}
