/**
 * 1. Check if there's a global-error file under app folder rather not an error file as the nested folders.
 * 2. Rename the `global-error` property to `error` property to close the structure of react-router-dom route.
 */
const processGlobalError = (children) => {
  for (let i = 0; i < children.length; ++i) {
    const child = children[i];
    if (child.props["error"]) {
      console.log(
        `Please rename ${child.props["error"]} to ${child.props["error"].replace(
          "error",
          "global-error"
        )}.`
      );
    }

    child.props["error"] = child.props["global-error"];
    delete child.props["global-error"];
  }

  return children;
};

export { processGlobalError };
