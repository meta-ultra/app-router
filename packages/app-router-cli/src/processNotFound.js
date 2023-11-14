/**
 * Rename "not-found" to "notFound".
 */
const processNotFound = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    child.props["notFound"] = child.props["not-found"];
    delete child.props["not-found"];
  }

  return children;
};

export { processNotFound };
