const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const pkg = require("./package.json");

const extensions = [".tsx", ".ts", ".jsx", ".js"];

module.exports = {
  input: "./src/index.ts",
  output: [
    pkg.main && {
      file: pkg.main,
      format: "cjs",
    },
    pkg.module && {
      file: pkg.module,
      format: "esm",
    },
    pkg.unpkg && {
      file: pkg.unpkg,
      format: "iife",
      name: "MetaUltraAppRouter",
      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
  ],
  external: ["react", "react-dom", "react-router-dom"],
  plugins: [
    resolve({
      extensions,
      modulesOnly: true,
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: "./node_module/**/*",
      extensions,
    }),
  ],
};
