# Welcome to @meta-ultra/app-router-auth

Out of box authentication perfectly works with `@meta-ultra/app-router`.

Give a ⭐️ if this project helped you!

## 🌟 Features

- Supports periodical revalidation for authorization.
- `@meta-ultra/app-router-auth` is written with type safety in mind through TypeScript.

## 🏠 Install

Install `@meta-ultra/app-router-auth` with your favorite Node.js package manager:

- pnpm: `pnpm add @meta-ultra/app-router-auth@latest`
- yarn: `yarn add -S @meta-ultra/app-router-auth@latest`
- npm: `npm install -S @meta-ultra/app-router-auth@latest`

## ✨ Usage

```ts
import { sealAuthMeta } from "@meta-ultra/app-router-auth"
const sealedAuthMeta = sealAuthMeta({
  authorize(pathname) {
    return /^users/.test(pathname)
  },
  authorizeInterval: 30 * 60 * 1000, // revalidate permissions every 30 minutes.
});

// routes array of react-router-dom v6 
const routes = [{
  element: <>
}]
```

## 👶 Author

- GitHub: <https://github.com/fsjohnhuang>
- LinkedIn: <https://www.linkedin.com/in/fsjohnhuang>
- Blog: <https://fsjohnhuang.cnblogs.com/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/meta-ultra/app-router/issues).
