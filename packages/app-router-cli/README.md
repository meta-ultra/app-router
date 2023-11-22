# Welcome to @meta-ultra/app-router-cli

<div>
  <img style="display:inline;" src="https://img.shields.io/github/package-json/v/meta-ultra/app-router?filename=packages%2Fapp-router-cli%2Fpackage.json">
  <!-- <img style="display:inline;" src="https://img.shields.io/bundlephobia/min/%40meta-ultra/app-router-cli">
  <img style="display:inline;" src="https://img.shields.io/bundlejs/size/%40meta-ultra/app-router-cli"> -->
  <img style="display:inline;" src="https://img.shields.io/github/license/meta-ultra/app-router">
</div>

With `@meta-ultra/app-router` and `@meta-ultra/app-router-auth`, we can structure our project in Next.js App Router convention by setting up the router configuration manually. Are you looking for a more effective way to automate the configure processing. There we are! `@meta-ultra/app-router-cli` is exact what you want.

Give a ⭐️ if this project helped you!

## 🌟 Features

- Supports group route segments, including extended group route segment `(...name)`.
- Supports dynamic routes including catch-all and optional catch-all segments.
- Supports nested route segments.
- Generates root layout automatically if no root layout is found.
- Supports watch mode, easy to integrate to your building workflow.

## :alien: Prerequisites

Due to the output of processing which is code snippet will depend on `@meta-ultra/app-router`, please run `pnpm add @meta-ultra/app-router@latest` to install it first.

## 🏠 Installation

Install `@meta-ultra/app-router` with your favorite package manager:

- pnpm: `pnpm add -D @meta-ultra/app-router-cli@latest`
- yarn: `yarn add -D @meta-ultra/app-router-cli@latest`
- npm: `npm install -D @meta-ultra/app-router-cli@latest`

## ✨ Usage

- Show the help text

  ```bash
  > app-router -h

  Usage
    app-router [options]

  Options
    --version, -w Display the version.
    --watch, -w Enable watch mode.
    --obtuse <milliseconds=100> Start to generate router after a specified milliseconds when changes finish.
    --source, -s <folder=./src/app> Specify the folder contains app router.
    --output, -o <filepath=./src/router.tsx> Specify the react-router-dom router file path.
  ```

- Run in watch mode

  ```bash
  app-router -w -s ./src/app -o ./src/router.tsx
  ```

## 👶 Author

Hey, friends. I'm John Huang, a full stack developer majorly code with React, Next.js, GraphQL, TailwindCSS, Taro and SpringBoot. Feel free to contact with me 😃

- GitHub: <https://github.com/fsjohnhuang>
- LinkedIn: <https://www.linkedin.com/in/fsjohnhuang>
- Blog: <https://fsjohnhuang.cnblogs.com/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/meta-ultra/app-router/issues).
