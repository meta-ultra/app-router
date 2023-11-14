/**
 * Rename "not-found" to "notFound".
 */
const processNotFound = (children) => {
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    if (child.props) {
      child.props["notFound"] = child.props["not-found"];
      delete child.props["not-found"];
    }

    processNotFound(child.children);
  }

  return children;
};

export { processNotFound };
