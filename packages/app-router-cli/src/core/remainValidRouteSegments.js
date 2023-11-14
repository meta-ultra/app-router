const filterInvalidRouteSegments = (children) => {
  let isValid = false;
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    const isValidChildren = filterInvalidRouteSegments(child.children);
    if (!isValidChildren) {
      delete child.children;
    }

    isValid =
      isValid || isValidChildren || (child.props && (child.props.page || child.props.layout));
  }

  return isValid;
};
const remainValidRouteSegments = (children) => {
  filterInvalidRouteSegments(children);
  return children;
};

export { remainValidRouteSegments };
