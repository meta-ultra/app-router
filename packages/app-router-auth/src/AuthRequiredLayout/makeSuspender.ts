interface Suspender {
  read: () => unknown;
}

const enum SuspenderStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

const makeSuspender = (promise: Promise<unknown>, dispose?: () => void): Suspender => {
  let status = SuspenderStatus.PENDING;
  let result: unknown = undefined;
  promise
    .then(
      (value) => {
        status = SuspenderStatus.FULFILLED;
        result = value;
      },
      (error) => {
        status = SuspenderStatus.REJECTED;
        result = error;
      }
    )
    .finally(dispose);

  return {
    read(): unknown {
      if (status === SuspenderStatus.PENDING) {
        throw Promise.resolve();
      } else if (status === SuspenderStatus.FULFILLED) {
        return result;
      } else {
        throw result;
      }
    },
  };
};

export type { Suspender };
export default makeSuspender;
