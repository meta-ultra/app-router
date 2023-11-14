import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { debounce } from "lodash-es";
import { watch } from "chokidar"; // https://github.com/paulmillr/chokidar
import { format } from "prettier"; // https://prettier.io/docs/en/api.html
import { getRoutesFromFileSystem, generateRouterOutput } from "./core/index.js";

const sourcePath = join(process.cwd(), "./logs/app");
const outputPath = join(process.cwd(), "./logs/router.tsx");

const handleChange = debounce(async () => {
  console.log("Generating app router...");
  const output = generateRouterOutput(getRoutesFromFileSystem(outputPath, sourcePath));
  writeFileSync(outputPath, await format(output, { parser: "babel" }));
  console.log("Generating app router is done.");
}, 500);

watch(sourcePath).on("add", handleChange);
watch(sourcePath).on("addDir", handleChange);
watch(sourcePath).on("unlink", handleChange);
watch(sourcePath).on("unlinkDir", handleChange);
