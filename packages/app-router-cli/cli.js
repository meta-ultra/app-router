import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getRoutesFromFileSystem, generateRouterOutput } from "./src/index.js";
import { format } from "prettier";

const sourcePath = join(process.cwd(), "./logs/app");
const outputPath = join(process.cwd(), "./logs/router.tsx");

const output = generateRouterOutput(getRoutesFromFileSystem(outputPath, sourcePath));

writeFileSync(outputPath, await format(output, { parser: "babel" }));
