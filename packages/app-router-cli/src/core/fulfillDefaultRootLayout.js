const fulfillDefaultRootLayout = (children) => {
  for (let i = 0; children && i < children.length; ++i) {
    const child = children[i];
    if (!child.props || !child.props.layout) {
      child.props = child.props || {};
      child.props.layout = "preset:root-layout";
    }
  }

  return children;
};

export { fulfillDefaultRootLayout };
