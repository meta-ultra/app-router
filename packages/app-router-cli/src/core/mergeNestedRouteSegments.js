const doMergeNestedRouteSegments = (children, parent, prevPaths) => {
  let mergeables = [];
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    const paths = (prevPaths || []).concat([child.path]);
    if (child.children && child.children.length && (!child.props || !child.props.layout)) {
      // For route segments without "props.layout" containing descendant route segments.
      mergeables = mergeables.concat(doMergeNestedRouteSegments(child.children, child, paths));
      if (!prevPaths && parent) {
        // Delete the whole route segment if it does not contain a page file, otherwise remove its children only.
        if (child.props.page) {
          delete child.children;
        } else {
          parent.children.splice(
            parent.children.findIndex((x) => x === child),
            1
          );
        }

        // Hoist the nested route segments as the sibling of the route segment without props.layout.
        for (let j = 0; j < mergeables.length; j++) {
          const mergeable = mergeables[j];
          parent.children.push({
            ...mergeable.child,
            path: mergeable.paths.filter((x) => x).join("/"),
          });
        }
      }
    } else {
      // Add mergeable item when a layout or page file has been discovered in the descendant of a route segment without layout file.
      if (prevPaths) {
        mergeables.push({
          paths,
          child,
        });
      }
      // Avoid ineffective recursive calling
      if (child.children && child.children.length) {
        mergeables = mergeables.concat(
          doMergeNestedRouteSegments(child.children, child, prevPaths)
        );
      }
    }
  }

  return mergeables;
};

const mergeNestedRouteSegments = (children) => {
  doMergeNestedRouteSegments(children);
  return children;
};

export { mergeNestedRouteSegments };
