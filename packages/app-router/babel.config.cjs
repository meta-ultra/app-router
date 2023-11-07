module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
      },
    ],
    [
      "@babel/preset-react",
      {
        /**
         * With default true "classic" which would transform jsx to React.createElement,
         * that requires us put `import React from "react"` import statement in each jsx or tsx file.
         * With "automatic", babel will do that for us.
         */
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules: true,
        corejs: 3,
      },
    ],
  ],
  env: {
    production: {
      plugins: ["@babel/plugin-transform-react-constant-elements"],
    },
  },
};
