const isLazyElementType = (x: unknown): boolean =>
  x !== null &&
  typeof x === "object" &&
  (x as { $$typeof?: symbol }).$$typeof === Symbol.for("react.lazy");

export default isLazyElementType;
