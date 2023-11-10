# Welcome to @meta-ultra/app-router-auth

<div>
  <img style="display:inline;" src="https://img.shields.io/github/package-json/v/meta-ultra/app-router?filename=packages%2Fapp-router-auth%2Fpackage.json">
  <img style="display:inline;" src="https://img.shields.io/bundlephobia/min/%40meta-ultra/app-router-auth">
  <img style="display:inline;" src="https://img.shields.io/bundlejs/size/%40meta-ultra/app-router-auth">
  <img style="display:inline;" src="https://img.shields.io/github/license/meta-ultra/app-router">
</div>

Out of box authentication perfectly works with `@meta-ultra/app-router` and also functions well standalone.

Give a ⭐️ if this project helped you!

## 🌟 Features

- Flexible and easy to use with `@meta-ultra/app-router` or by itself.
- Supports periodical revalidation for authorization.
- `@meta-ultra/app-router-auth` is written with type safety in mind through TypeScript.

## 🏠 Installation

Install `@meta-ultra/app-router-auth` with your favorite package manager:

- pnpm: `pnpm add @meta-ultra/app-router-auth@latest`
- yarn: `yarn add -S @meta-ultra/app-router-auth@latest`
- npm: `npm install -S @meta-ultra/app-router-auth@latest`

## ✨ Usage

Let's have a look how to use `@meta-ultra/app-router-auth` without `@meta-ultra/app-router`.

- Defines the root layout wrapping all sub routes within `AuthProvider`

  ```tsx
  import type { FC, PropsWithChildren } from "react";

  const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    const userInfo = cache.get("userInfo");
    const token = cache.get("token");
    let initialState = undefined;
    if (userInfo && token) {
      initialState = {
        token,
        userInfo,
      };
    }

    return (
      <AuthProvider
        initialState={initialState}
        signInPath="/login"
        requireAuthIndexPath="/dashboard"
        onSignIn={(state) => {
          Object.entries(state).forEach(([name, value]) => {
            cache.set(name, value, { persistent: true, expires: 1000 * 60 * 60 * 24 * 30 });
          });
        }}
        onSignOut={() => {
          cache.remove("userInfo");
          cache.remove("token");
        }}
      >
        {children}
      </AuthProvider>
    );
  };

  export default RootLayout
  ```

- Defines the layout and auth metadata for routes those require authorization

  ```tsx
  import type { FC, PropsWithChildren } from "react";
  import { sealAuthMeta, makeAuthorize, AuthRequiredLayout } from "@meta-ultra/app-router-auth";

  // Defines the auth metadata
  const authorize = (path: string, permissions: string[]) => {
    return !!permissions.find(perm => perm === path.replace(/^\//, "")));
  }
  const getPermissions = () => {
    const cachedPerms = cache.get("cachedPerms") as string[];
    if (cachedPerms === undefined) {
      return getPermsFromServer().then((perms) => {
        cache.set("cachedPerms", perms, 30 * 60 * 1000);
        return perms;
      });
    }
    return cachedPerms;
  };

  const meta: AuthMeta = {
    authorize: makeAuthorize({ authorize, getPermissions }),
  };

  // Defines layout
  const sealedAuthMeta = sealAuthMeta(meta);
  const SealedAuthLayout: FC<PropsWithChildren> = ({children}) => {
    return <AuthRequiredLayout meta={sealedAuthMeta}>{children}</AuthRequiredLayout>;
  }
  export default SealedAuthLayout
  ```

- Execute sign in or sign out action

  ```tsx
  import { useAuth } from "@meta-ultra/app-router-auth"

  export default function Login() {
    const { isSignIn, signIn, signOut, NavigateToSignIn, NavigateToRequireAuthIndex } = useAuth()

    if (isSignIn()) return <NavigateToRequireAuthIndex />

    return <button onClick={() => signIn({token: "1234567", userInfo: {name: "hi"}})}>Sign In</button>
  }

  export default function Dashboard() {
    const { isSignIn, signIn, signOut, NavigateToSignIn, NavigateToRequireAuthIndex } = useAuth()

    // Due to dashboard is inside SealedAuthLayout, "isSignIn()" returns true all the time.
    if (!isSignIn()) return <NavigateToSignIn />

    return <button onClick={() => signOut()}>Sign Out</button>
  }
  ```

- Config routes object with components defined above

  ```tsx
  const routes = [
    {
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          element: <SealedAuthLayout/>,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />
            }
          ]
        }
      ]
    }
  ] 
  ```

Except the last step - routes object configuration, previous steps are totally the same when integrating `@meta-ultra/app-router-auth` with `@meta-ultra/app-router`.

## 👶 Author

Hey, friends. I'm John Huang, a full stack developer majorly code with React, Next.js, GraphQL, TailwindCSS, Taro and SpringBoot. Feel free to contact with me 😃

- GitHub: <https://github.com/fsjohnhuang>
- LinkedIn: <https://www.linkedin.com/in/fsjohnhuang>
- Blog: <https://fsjohnhuang.cnblogs.com/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/meta-ultra/app-router/issues).
