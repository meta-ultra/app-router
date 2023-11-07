import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/LinkButton.jsx",
  output: [
    {
      file: "./dist/index.js",
      format: "esm",
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
      exclude: "./node_module/**/*",
    }),
  ],
};
