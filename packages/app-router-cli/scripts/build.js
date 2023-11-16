/**
 * A drop-in replacement for `ncc build ./src/cli-wrapper.js -o dist`.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import ora from "ora";
import ncc from "@vercel/ncc";
import UglifyJS from "uglify-js";

const SOURCE = "./src/cli-wrapper.js";
const TARGET_DIR = "dist";

/**
 * Remove `require.extensions` related code, which is not allowed existing in ESM.
 */
const removeRequireExtensions = (code) => {
  code = code
    .replace("if ( true && require.extensions) {", "")
    .replace("require.extensions['.handlebars'] = extension;", "");
  const index = code.indexOf("require.extensions['.hbs'] = extension;");
  code = code.replace("require.extensions['.hbs'] = extension;", "");
  code = code.slice(0, index) + code.slice(index).replace("}", "");

  return code;
};

// Roll up our sleeves now.
const start = new Date().getTime();
const spinner = ora("Bundling...").start();

// Create the target directory if it's not existing.
const targetDir = join(process.cwd(), TARGET_DIR);
if (!existsSync(targetDir)) {
  mkdirSync(targetDir);
}

// Call ncc to compile the scripts
const { code, assets } = await ncc(join(process.cwd(), SOURCE), { quiet: true });
const sealedCode = removeRequireExtensions(code);

// Minify the output through uglify-js.
// TODO Fork a child process to execute minification.
const { code: minCode } = UglifyJS.minify(sealedCode);
writeFileSync(join(targetDir, "index.js"), minCode);
for (let filename in assets) {
  const { source } = assets[filename];
  const { code } = UglifyJS.minify(source);
  writeFileSync(join(targetDir, filename), code || source);
}

const end = new Date().getTime();
spinner.succeed(`Bundle has done(${end - start}ms)!`);
