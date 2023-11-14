const doMergeNestedRouteSegments = (children, parent, prevPaths) => {
  let mergeables = [];
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    if (!child.props || (!child.props.page && !child.props.layout)) {
      // empty folder
      const paths = (prevPaths || []).concat([child.path]);
      mergeables = mergeables.concat(doMergeNestedRouteSegments(child.children, child, paths));
      if (!prevPaths && parent) {
        parent.children.splice(
          parent.children.findIndex((x) => x === child),
          1
        );
        for (let j = 0; j < mergeables.length; j++) {
          const mergeable = mergeables[j];
          parent.children.push({
            ...mergeable.child,
            path: mergeable.path.filter((x) => x).join("/"),
          });
        }
      }
    } else {
      if (prevPaths) {
        mergeables.push({
          path: (prevPaths || []).concat([child.path]),
          child,
        });
      }
      mergeables = mergeables.concat(doMergeNestedRouteSegments(child.children, child, prevPaths));
    }
  }

  return mergeables;
};

const mergeNestedRouteSegments = (children) => {
  doMergeNestedRouteSegments(children);
  return children;
};

export { mergeNestedRouteSegments };
