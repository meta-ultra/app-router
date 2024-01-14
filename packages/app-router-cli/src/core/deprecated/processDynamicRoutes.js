const DYNAMIC_RE = /^\[([a-z][a-z0-9-_])*\]$/;
const DYNAMIC_CATCH_ALL_RE = /^\[(?:[.]{3})([a-z][a-z0-9-_]*)\]$/;
const DYNAMIC_OPTIONAL_CATCH_ALL_RE = /^\[\[(?:[.]{3})([a-z][a-z0-9-_]*)\]\]$/;
const isDynamicRouteSegment = (seg) =>
  DYNAMIC_RE.test(seg) || DYNAMIC_CATCH_ALL_RE.test(seg) || DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(seg);
const isDynamicCatchAllRouteSegment = (seg) =>
  DYNAMIC_CATCH_ALL_RE.test(seg) || DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(seg);
const isDynamicRoute = (path) => path.split("/").find(isDynamicRouteSegment);
const isDynamicNormalRoute = (path) => path.split("/").find((seg) => DYNAMIC_RE.test(seg));
const isDynamicNormalCatchAllRoute = (path) =>
  path.split("/").find((seg) => DYNAMIC_CATCH_ALL_RE.test(seg));
const isDynamicOptionalCatchAllRoute = (path) =>
  path.split("/").find((seg) => DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(seg));

const shouldReplace = (existingPath, nextPath) => {
  if (isDynamicNormalCatchAllRoute(nextPath) && isDynamicNormalRoute(existingPath)) {
    return true;
  }
  if (
    isDynamicOptionalCatchAllRoute(nextPath) &&
    (isDynamicNormalCatchAllRoute(existingPath) || isDynamicNormalRoute(existingPath))
  ) {
    return true;
  }

  return false;
};

const remainValidDynamicRoutes = (children) => {
  let validCatchAllRouteIndex = undefined;
  const deletingCatchAllRouteIndexes = [];
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    let hasDynamicRoute = false;
    if (child.path) {
      hasDynamicRoute = isDynamicRoute(child.path);

      // Collect the invalid dynamic routes for further processing.
      if (hasDynamicRoute) {
        if (validCatchAllRouteIndex === undefined) {
          validCatchAllRouteIndex = i;
        } else if (shouldReplace(children[validCatchAllRouteIndex].path, children[i].path)) {
          deletingCatchAllRouteIndexes.push(validCatchAllRouteIndex);
          validCatchAllRouteIndex = i;
        } else {
          deletingCatchAllRouteIndexes.push(i);
        }
      }
    }

    remainValidDynamicRoutes(child.children);
  }

  // Remain the only one valid catch-all route.
  if (
    validCatchAllRouteIndex !== undefined &&
    isDynamicRoute(children[validCatchAllRouteIndex].path)
  ) {
    for (let i = children.length; i >= 0; i--) {
      if (i !== validCatchAllRouteIndex) {
        children.splice(i, 1);
      }
    }
  }

  return children;
};

const mapDynamicRoutesToSplats = (children) => {
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
          } else if (isDynamicCatchAllRouteSegment(seg)) {
            return `*`;
          } else {
            return seg;
          }
        })
        .join("/");
    }

    mapDynamicRoutesToSplats(child.children);
  }

  return children;
};

export { mapDynamicRoutesToSplats, remainValidDynamicRoutes };
