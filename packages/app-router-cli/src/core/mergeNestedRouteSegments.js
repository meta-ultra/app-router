const doMergeNestedRouteSegments = (children, prevPaths) => {
  let mergeables = [];
  let deletingChildrenIndexes = [];
  let addingMergeables = [];
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    const paths = (prevPaths || []).concat([child.path]);
    if (child.children && child.children.length && (!child.props || !child.props.layout)) {
      // For route segments without "props.layout" containing descendant route segments.
      mergeables = mergeables.concat(doMergeNestedRouteSegments(child.children, paths));
      if (!prevPaths) {
        // Delete the whole route segment if it does not contain a page file, otherwise remove its children only.
        if (child.props && child.props.page) {
          delete child.children;
        } else {
          deletingChildrenIndexes.push(children.findIndex((x) => x === child));
        }

        addingMergeables = mergeables;
      } else if (child.props && child.props.page) {
        delete child.children;
        mergeables.push({
          paths,
          child,
        });
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
        mergeables = mergeables.concat(doMergeNestedRouteSegments(child.children, prevPaths));
      }
    }
  }

  for (const i of deletingChildrenIndexes.sort().reverse()) {
    children.splice(i, 1);
  }

  // Hoist the nested route segments as the sibling of the route segment without props.layout.
  for (let j = 0; j < addingMergeables.length; j++) {
    const mergeable = addingMergeables[j];
    const path = mergeable.paths.filter((x) => x).join("/");
    if (path) {
      children.push({
        ...mergeable.child,
        path,
      });
    } else {
      children.push(mergeable.child);
    }
  }

  return mergeables;
};

const mergeNestedRouteSegments = (children) => {
  doMergeNestedRouteSegments(children);
  return children;
};

export { mergeNestedRouteSegments };
