# Welcome to @meta-ultra/app-router

<div>
  <img style="display:inline;" src="https://img.shields.io/github/package-json/v/meta-ultra/app-router?filename=packages%2Fapp-router%2Fpackage.json">
  <img style="display:inline;" src="https://img.shields.io/bundlephobia/min/%40meta-ultra/app-router">
  <img style="display:inline;" src="https://img.shields.io/bundlejs/size/%40meta-ultra/app-router">
  <img style="display:inline;" src="https://img.shields.io/github/license/meta-ultra/app-router">
</div>

With `@meta-ultra/app-router`, it's not only possible to structure the application routing in a meaningful, intuitive and highly-maintainable way as the Next.js App Router does, but also improves user experience effortlessly.

If you're familiar to Next.js 13 or later version, or you've got stuck in providing great UX with react-router, `@meta-ultra/app-router` will be the place where you're looking forward.

Give a ⭐️ if this project helped you!

## 🌟 Features

- Follows the name conventions and functionalities of Next.js App Router, such as `page`, `layout`, `loading`, `not-found`, `error`.
- Besides the context free `notFound` as Next.js does, an extra `notFound` with context created by `useNotFound()` is available.
- It's capable of setting the `document.title`, and other metadata like `description`, `keywords` and `author` through `metadata` or `generateMetadata` APIs as Next.js does on Server Components.<span style="font-size: 12px; color: #888;">(At this moment, only basic fields are supported)</span>
- Based on [React Router v6](https://reactrouter.com/), it's free to structure the application routing and project file-system hierarchy, although it's recommended to abide by the rules of Next.js App Router.
- `@meta-ultra/app-router` is written with type safety in mind through TypeScript.

## 🏠 Installation

Install `@meta-ultra/app-router` with your favorite package manager:

- pnpm: `pnpm add @meta-ultra/app-router@latest`
- yarn: `yarn add -S @meta-ultra/app-router@latest`
- npm: `npm install -S @meta-ultra/app-router@latest`

## ✨ Usage

Let's demonstrate how to use `@meta-ultra/app-router` with Next.js App Router conventions.

- Project structure:

  ```yaml
  /src
   - router.tsx
   - /app
    - global-error.tsx
    - layout.tsx
    - loading.tsx
    - not-found.tsx
    - page.tsx
    - (system)
      - layout.tsx
      - /users
        - page.tsx
      - /posts
        - error.tsx
        - loading.tsx
        - page.tsx
  ```

- Defines routes object with `RouteSegmentElement`:

  ```tsx
  // ./src/router.tsx
  import { lazy } from "react";
  import { createHashRouter } from "react-router-dom";
  import {
    RouteSegmentElementLayout,
    RootErrorElement,
    RouteSegmentElement,
  } from "@meta-ultra/app-router";
  import RootLoading from "./app/loading"
  import RootNotFound from "./app/not-found"
  import GLobalError from "./app/global-error"
  import PostsLoading from "./app/(system)/posts/loading"
  import PostsError from "./app/(system)/posts/error"

  const router = createHashRouter([
    {
      element: (
        <RouteSegmentElement 
          layout={RouteSegmentElementLayout.ROOT_LAYOUT} 
          loading={RootLoading} 
          error={GlobalError}
          notFound={RootNotFound}
        >
          {lazy(() => import("./app/layout"))}
        </RouteSegmentElement>
      ),
      errorElement: (<RootErrorElement notFound={RootNotFound} />)
      children: [
        {
          index: true,
          element: (<RouteSegmentElement>{lazy(() => import("./app/page"))}</RouteSegmentElement>),
        },
        {
          element: (
            <RouteSegmentElement layout={RouteSegmentElementLayout.LAYOUT}>
              {lazy(() => import("./app/(system)/layout"))}
            </RouteSegmentElement>
          ),
          children: [
            {
              path: "users",
              element: (<RouteSegmentElement>{lazy(() => import("./app/(system)/users/page"))}</RouteSegmentElement>),
            },
            {
              path: "posts"
              element: (<RouteSegmentElement loading={PostsLoading} error={PostsError}>{lazy(() => import("./app/(system)/posts/page"))}</RouteSegmentElement>),
            }
          ]
        }
      ]
    }
  ])
  export default router
  ```

- Defines the root layout, loading, not-found and global-error.

  ```tsx
  // ./src/app/layout.tsx
  import { type FC } from "react"
  import { type GenerateMetadata, useNotFound } from "@meta-ultra/app-router"
  import { useLocation } from "react-router-dom"

  // Naming starts with `use` to pass the validations of using React hooks.
  export const generateMetadata = async function useGenerateMetadata(
    { params, searchParams }, 
    parentMetadataPromise
  ) {
    const location = useLocation()
    const notFound = useNotFound()

    // Notice that, the second parameter is an instance of Promise here, 
    // rather not Metadata plain old object in Next.js.
    const parentMetadata = await parentMetadataPromise

    // It's able to do some authorization works, except changing application metadata.
    const perms = await getPermissions()
    const perm = permissions.find(perm => perm.pathname === location.pathname)
    if (!perm) {
      return notFound()
    }

    return {
      title: perm.title,
      description: perm.description,
      keys: parentMetadata.keys,
    }
  } 

  const RootLayout: FC<PropsWithChildren> = ({children}) => {
    return children
  }
  export default RootLayout

  // ./src/loading.tsx
  export default function RootLoading() {
    return <div>Loading...</div>
  }

  // ./src/not-found.tsx
  import { type FC } from "react"
  import { type ErrorResponse } from "@meta-ultra/app-router"
  import { useNavigate } from "react-router-dom"

  const RootNotFound: FC<{error: ErrorResponse}> = ({error}) => {
    const navigate = useNavigate()
    const onReset = () => {
      /**
       * NOTE:
       * Due to the client router has been broken when not found occurs,
       * change the client router to home page first, and then refresh browser 
       * to reinitialize the whole client router from scratch.
       */ 
      navigate("/")
      location.reload()
    }

    return (
      <main>
        <p>{error.message}</p>
        <button onClick={onReset}>Go to home page!</button>
      </main>
    )
  }
  export default RootNotFound

  // ./src/global-error.tsx
  import { type FC } from "react"
  import { type ErrorProps } from "@meta-ultra/app-router"

  const GlobalError: FC<ErrorProps> = ({error, reset}) => {
    return (
      <main>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Click to reset!</button>
      </main>
    )
  }
  export default GlobalError
  ```

## 👶 Author

Hey, friends. I'm John Huang, a full stack developer majorly code with React, Next.js, GraphQL, TailwindCSS, Taro and SpringBoot. Feel free to contact with me 😃

- GitHub: <https://github.com/fsjohnhuang>
- LinkedIn: <https://www.linkedin.com/in/fsjohnhuang>
- Blog: <https://fsjohnhuang.cnblogs.com/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/meta-ultra/app-router/issues).
