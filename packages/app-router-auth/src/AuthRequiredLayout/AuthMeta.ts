interface Authorize {
  (path: string): Promise<boolean> | boolean;
}

interface AuthMeta {
  authorize?: Authorize;
}

export type { Authorize, AuthMeta };
