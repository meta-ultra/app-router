const nextTick = (
  (promise: Promise<unknown>) => (fn: () => unknown) =>
    promise.then(() => fn())
)(Promise.resolve());

export default nextTick;
