import { isArray } from "lodash-es";

const stripExtension = (name) => name.replace(/\.(t|j)sx?$/, "");

const pipe =
  (...fns) =>
  (...args) => {
    let result = args;
    for (let i = fns.length - 1; i >= 0; --i) {
      const fn = fns[i];
      result = fn.apply(null, isArray(result) ? result : [result]);
    }

    return result;
  };

export { stripExtension, pipe };
