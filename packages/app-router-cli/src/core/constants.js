const PRESET_ROOT_LAYOUT = "preset::root-layout";
const PRESET_LAYOUT = "preset::layout";

const GLOBAL_ERROR = "global-error";
const NOT_FOUND = "not-found";

const INDEX_RE = /^\s*$/; // index page route
const NORMAL_RE = /^[a-z][a-z0-9_-]*$/; // normal route
const GROUP_RE = /^\(([.]{3})?[a-z][a-z0-9-_]*\)$/;
const DYNAMIC_RE = /^\[([a-z][a-z0-9_]*)\]$/; // dynamic route
const CATCH_ALL_RE = /^\[\.{3}([a-z][a-z0-9_]*)\]$/; // catch-all route
const OPTIONAL_CATCH_ALL_RE = /^\[\[\.{3}([a-z][a-z0-9_]*)\]\]$/; // optional catch-all route
const PARALLEL_RE = /^@[a-z][a-z0-9-_]*$/; // parallel route
const INTERCEPTING_SAME_LEVEL_RE = /^\(\.\)[a-z][a-z0-9-_]*$/; // intercepting route for the same level
const INTERCEPTING_ONE_LEVEL_UP_RE = /^\(\.\.\)[a-z][a-z0-9-_]*$/; // intercepting route for one level up
const INTERCEPTING_TWO_LEVEL_UP_RE = /^\(\.\.\)\(\.\.\)[a-z][a-z0-9-_]*$/; // intercepting route for two level up
const INTERCEPTING_ROOT_LEVEL_UP_RE = /^\(\.\.\.\)[a-z][a-z0-9-_]*$/; // intercepting route for the root level up

module.exports = {
  PRESET_ROOT_LAYOUT,
  PRESET_LAYOUT,
  GLOBAL_ERROR,
  NOT_FOUND,
  INDEX_RE,
  NORMAL_RE,
  GROUP_RE,
  DYNAMIC_RE,
  CATCH_ALL_RE,
  OPTIONAL_CATCH_ALL_RE,
  PARALLEL_RE,
  INTERCEPTING_SAME_LEVEL_RE,
  INTERCEPTING_ONE_LEVEL_UP_RE,
  INTERCEPTING_TWO_LEVEL_UP_RE,
  INTERCEPTING_ROOT_LEVEL_UP_RE,
};
