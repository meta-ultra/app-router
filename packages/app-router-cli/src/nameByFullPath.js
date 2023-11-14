import { stripExtension } from "./utils.js";

/**
 * Escape group name with entity name, such as "lp" for "(", "rp" for ")" and "dots" for "..."
 */
const escapeGroupName = (identifier) => {
  return identifier
    .replace(/\(([.]{3})([^)(]+)\)/, "lp-dots-$2-rp")
    .replace(/\(([^)(]+)\)/, "lp-$1-rp");
};

/**
 * Convert kebab-case to Pascal Case or Upper Camel Case, such as "not-found" to "NotFound".
 */
const kebabToPascalCase = (identifier) => {
  const words = [];
  const segs = identifier.split("-");
  for (let i = 0; i < segs.length; ++i) {
    const seg = segs[i];
    if (seg) {
      words.push(seg[0].toUpperCase() + seg.slice(1));
    }
  }

  return words.join("");
};

/**
 * Convert full file path into React component name, for example "./app/not-found.tsx" is converted to "App_NotFound".
 */
const nameByFullPath = (fullPath) => {
  if (!fullPath) return undefined;

  return stripExtension(fullPath)
    .split("/")
    .filter((seg) => !/^\.{1,2}$/.test(seg)) // filter out "." and ".." path segments
    .reduce((accu, seg) => {
      accu.push(kebabToPascalCase(escapeGroupName(seg)));
      return accu;
    }, [])
    .join("_");
};

export { nameByFullPath };
