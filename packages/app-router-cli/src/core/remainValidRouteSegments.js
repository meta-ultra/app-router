const DYNAMIC_CATCH_ALL_RE = /^\[(?:[.]{3})([a-z][a-z0-9-_]*)\]$/;
const DYNAMIC_OPTIONAL_CATCH_ALL_RE = /^\[\[(?:[.]{3})([a-z][a-z0-9-_]*)\]\]$/;
const isDynamicCatchAllRoute = (path) =>
  path &&
  path
    .split("/")
    .find((seg) => DYNAMIC_CATCH_ALL_RE.test(seg) || DYNAMIC_OPTIONAL_CATCH_ALL_RE.test(seg));

/**
 * Filter out the route segments contain neither its own "props.page" nor "props.layout" and its descendant route segments don't either.
 */
const filterInvalidRouteSegments = (children) => {
  let isValid = false;
  const invalidChildrenIndex = [];
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    const isValidChildren = filterInvalidRouteSegments(child.children);
    if (!isValidChildren) {
      if (child.props && (child.props.page || child.props.layout)) {
        delete child.children;
      } else {
        invalidChildrenIndex.push(i);
      }
    } else if (isDynamicCatchAllRoute(child.path)) {
      // The catch-all and optional catch-all routes must have page or layout file, and no children routes.
      delete child.children;
      if (!child.props || !(child.props.page || child.props.layout)) {
        invalidChildrenIndex.push(i);
      }
    }

    isValid =
      isValid || isValidChildren || (child.props && (child.props.page || child.props.layout));
  }

  for (let i of invalidChildrenIndex.sort().reverse()) {
    children.splice(i, 1);
  }

  return isValid;
};
const remainValidRouteSegments = (children) => {
  filterInvalidRouteSegments(children);
  return children;
};

export { remainValidRouteSegments };
