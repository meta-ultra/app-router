# auth-metadata Example

This example will demonstrate how to restrict access to routes to authenticated users using `generateMetadata` without loading transition.

Be sure to pay attention to the following features:

- `useLocation` and other React Router hooks are available within `generateMetadata`. (Good to know: naming starts with `use` or capital to avoid eslint warning)
- The use of `useNotFound` to get the asynchronous context available `notFound` to redirect to the nearest not-found or the root not-found when access is denied

If you're looking for complete authentication and authorization process, please refer to [auth example](../auth).
