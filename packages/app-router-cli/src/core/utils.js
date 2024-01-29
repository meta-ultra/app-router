const {
  INTERCEPTING_SAME_LEVEL_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
} = require("./constants");
const {
  groupBy,
} = require("lodash");

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

const findInterceptingIndex = (segs) => {
  let index = -1;
  segs.find((seg, i) => {
    const result = [INTERCEPTING_ONE_LEVEL_UP_RE, INTERCEPTING_TWO_LEVEL_UP_RE, INTERCEPTING_ROOT_LEVEL_UP_RE].find((re) => re.test(seg))
    if (result) {
      index = i;
    }
    return result;
  });

  return index;
}
const isIntercepting = (segs) => segs.find((seg) => [INTERCEPTING_ONE_LEVEL_UP_RE, INTERCEPTING_TWO_LEVEL_UP_RE, INTERCEPTING_ROOT_LEVEL_UP_RE].find((re) => re.test(seg)));
const isIntercepted = (segs) => segs.find((seg) => INTERCEPTING_SAME_LEVEL_RE.test(seg));

const collectSlugs = (path, slugs = []) => {
  const match = /\[([a-z][a-z0-9_]*)\]/.exec(path);
  if (match) {
    slugs.push(match[1]);
    return collectSlugs(path.substring(match.index + match[0].length), slugs);
  }
  else {
    return slugs;
  }
}
const getRepeatedSlugs = (slugs) => {
  const repeatedSlugs = [];
  for (const [slug, value] of Object.entries(groupBy(slugs))) {
    if (value.length > 1) {
      repeatedSlugs.push(slug);
    }
  }

  return repeatedSlugs;
}
const assertNoRepeatedSlugs = (path) => {
  const slugs = pipe(getRepeatedSlugs, collectSlugs)(path);
  if (slugs.length > 0) {
    throw Error(`You cannot have the same slug name ${slugs.map((slug) => '"' + slug + '"').join(',')} repeat within a single dynamic path.`)
  }
}

module.exports = { stripExtension, pipe, getRelativePath, isIntercepting, isIntercepted, findInterceptingIndex, assertNoRepeatedSlugs };
