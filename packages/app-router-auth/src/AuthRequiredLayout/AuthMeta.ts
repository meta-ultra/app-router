interface Authorize {
  (path: string): Promise<boolean>;
}

interface AuthMeta {
  authorize?: Authorize;
  authorizeInterval?: number;
}

export type { Authorize, AuthMeta };
