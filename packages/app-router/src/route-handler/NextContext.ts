/**
 * The only value of context is params, which is an object containing the dynamic route parameters for the current route.
 */
type NextContext = {
  params: Record<string, string>;
};

export type { NextContext };
