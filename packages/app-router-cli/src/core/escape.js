const { stripExtension, pipe } = require("./utils.js");

/**
 * Escape kabbe-case to camelCase, like not-found to notFound, global-error to globalError.
 */
const escapeKebabCase = (identifier) => {
  if (identifier.indexOf("-") === -1) return identifier;

  const result = [];
  const segs = identifier.split("-");
  if (segs[0]) {
    result.push(segs[0]);
  }
  for (let i = 1; i < segs.length; ++i) {
    const seg = segs[i];
    if (seg) {
      result.push(seg[0].toUpperCase() + seg.slice(1));
    }
  }

  return result.join("");
};

/**
 * Escape group name with entity name, such as "lp" for "(", "rp" for ")" and "dots" for "..."
 */
const escapeGroupName = (identifier) => {
  return identifier
    .replace(/\(([.]{3})([^)(]+)\)/, "lp-dots-$2-rp")
    .replace(/\(([^)(]+)\)/, "lp-$1-rp");
};

/**
 * Escape @
 */
const escapeIntercepting = (identifier) => identifier.replace(/@/g, "At")

const doEscape = pipe(escapeIntercepting, escapeKebabCase, escapeGroupName);

/**
 * Convert full file path into React component name, for example "./app/not-found.tsx" is converted to "App_NotFound".
 */
const escape = (fullPath) => {
  if (!fullPath) return fullPath;

  const result = [];
  const re = /^\.{1,2}$/; // filter out "." and ".." path segments
  const segs = stripExtension(fullPath).split("/");
  for (let i = 0; i < segs.length; ++i) {
    const seg = segs[i];
    if (!re.test(seg)) {
      result.push(doEscape(seg));
    }
  }
  result[0] = result[0][0].toUpperCase() + result[0].slice(1);

  return result.join("_");
};

module.exports = {
  escape
};
