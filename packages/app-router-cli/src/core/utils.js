/**
 * remove the trailing .jsx, .js, .tsx and .ts.
 * @param {*} name
 * @returns
 */
const stripExtension = (name) => name.replace(/\.(t|j)sx?$/, "");

/**
 * execute fns from right to left, the return value of the previous function will be passed as the argument for the next function.
 * @param  {...any} fns
 * @returns
 */
const pipe =
  (...fns) =>
  (...args) => {
    let result = args;
    for (let i = fns.length - 1; i >= 0; --i) {
      const fn = fns[i];
      result = [fn.apply(null, result)];
    }

    return result[0];
  };

const isRelativePath = (path) => /^\.{1,2}\//.test(path);
/**
 * Return a relative path
 * @param {string} path
 * @returns
 */
const getRelativePath = (path) => (isRelativePath(path) ? path : "./" + path);

module.exports = { stripExtension, pipe, getRelativePath };
