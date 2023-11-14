/**
 * The page locates along with a layout file should be sunk to child level.
 */
const sinkPageWithLayout = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    sinkPageWithLayout(child.children);
    if (child.props.page && child.props.layout) {
      child.children.push({
        index: true,
        props: {
          page: child.props.page,
        },
        children: [],
      });
      delete child.props.page;
    }
  }

  return children;
};

export { sinkPageWithLayout };
