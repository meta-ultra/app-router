const DYNAMIC_RE = /^\[([a-z][a-z0-9-_])*\]$/;
const DYNAMIC_CATCH_ALL_RE = /^\[(?:[.]{3})([a-z][a-z0-9-_]*)\]$/;
const DYNAMIC_OPTIONAL_CATCH_ALL_RE = /^\[\[(?:[.]{3})([a-z][a-z0-9-_]*)\]\]$/;

const processDynamicRoutes = (children) => {
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    if (child.path) {
      child.id = child.path;
      child.path = child.path
        .split("/")
        .map((seg) => {
          const match = DYNAMIC_RE.exec(seg);
          if (match && match[1]) {
            return `:${match[1]}`;
          } else if (DYNAMIC_CATCH_ALL_RE.test(seg) || DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(seg)) {
            return `*`;
          } else {
            return seg;
          }
        })
        .join("/");
    }

    processDynamicRoutes(child.children);
  }

  return children;
};

export { processDynamicRoutes };
