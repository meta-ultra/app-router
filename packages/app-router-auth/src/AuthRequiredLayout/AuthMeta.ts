interface Authorize {
  (path: string): Promise<boolean> | boolean;
}

interface AuthMeta {
  authorize?: Authorize;
}

interface MakeAuthorizeArg<P> {
  authorize(path: string, permissions: P): boolean;
  getPermissions(): P | Promise<P>;
}

const makeAuthorize =
  <P>({ authorize, getPermissions }: MakeAuthorizeArg<P>) =>
  (path: string) => {
    const permissions = getPermissions();
    if (permissions instanceof Promise) {
      return permissions.then((permissions) => authorize(path, permissions));
    }
    return authorize(path, permissions);
  };

export type { Authorize, AuthMeta, MakeAuthorizeArg };
export { makeAuthorize };
