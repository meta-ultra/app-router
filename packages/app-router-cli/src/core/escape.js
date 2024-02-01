const { stripExtension, pipe } = require("./utils.js");
const { DYNAMIC_RE, CATCH_ALL_RE, OPTIONAL_CATCH_ALL_RE } = require("./constants.js");

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
const escapeIntercepting = (identifier) => identifier.replace(/@/g, "At");

const LOOSE_DYNAMIC_RE = RegExp(DYNAMIC_RE.source.replace(/^[^]|[$]$/, ""));
const LOOSE_CATCH_ALL_RE = RegExp(CATCH_ALL_RE.source.replace(/^[^]|[$]$/, ""));
const LOOSE_OPTIONAL_CATCH_ALL_RE = RegExp(OPTIONAL_CATCH_ALL_RE.source.replace(/^[^]|[$]$/, ""));
const escapeDynamicRouteParameters = (identifier) => {
  return identifier
    .replace(LOOSE_OPTIONAL_CATCH_ALL_RE, "ls-opt-$2-rs")
    .replace(LOOSE_CATCH_ALL_RE, "ls-cat-$1-rs")
    .replace(LOOSE_DYNAMIC_RE, "ls-$1-rs");
};

const doEscape = pipe(escapeIntercepting, escapeKebabCase, escapeDynamicRouteParameters, escapeGroupName);

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
