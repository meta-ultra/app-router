import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/esm/index.js",
      format: "esm",
    },
    {
      file: "./dist/cjs/index.js",
      format: "commonjs",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    commonjs({
      include: "./node_modules/**",
    }),
    babel({
      runtimeHelpers: true,
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      exclude: "./node_module/**/*",
    }),
  ],
};
