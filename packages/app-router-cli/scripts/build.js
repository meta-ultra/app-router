/**
 * A drop-in replacement for `ncc build ./src/cli-wrapper.js -o dist`.
 */
import { fork } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ora from "ora";
import ncc from "@vercel/ncc";
import UglifyJS from "uglify-js";

const child_id = process.argv[2];
const CHILD_ID = "__child__";
const SIGNAL_DONE = "__DONE__";
const SIGNAL_MSG = "__MSG__";

if (child_id === CHILD_ID) {
  process.on("message", ({ sealedCode, assets, targetDir }) => {
    // Minify the output through uglify-js.
    const { code: minCode } = UglifyJS.minify(sealedCode);
    writeFileSync(join(targetDir, "index.js"), minCode);
    for (let filename in assets) {
      const source = assets[filename];
      const { code } = UglifyJS.minify(source);
      writeFileSync(join(targetDir, filename), code || source);
      process.send({ signal: SIGNAL_MSG, message: `${join(targetDir, filename)} is created.` });
    }

    process.send({ signal: SIGNAL_DONE });
  });
} else {
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

  // Minify the output in child process
  const child = fork(fileURLToPath(import.meta.url), [CHILD_ID]);
  child.on("message", (message) => {
    if (message.signal === SIGNAL_DONE) {
      const end = new Date().getTime();
      spinner.succeed(`Bundle has done(${end - start}ms)!`);
      process.exit(0);
    } else {
      // TODO provide better UX to display verbose info.
      process.stdout.write(
        process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
      );
      console.log(message.message);
    }
  });
  child.send({
    sealedCode,
    targetDir,
    assets: Object.keys(assets).reduce((accu, key) => {
      accu[key] = assets[key].source.toString();
      return accu;
    }, {}),
  });
}
