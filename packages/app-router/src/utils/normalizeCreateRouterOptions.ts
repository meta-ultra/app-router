const normalizeCreateRouterOptions = (basename: any) => {
  const opts: { basename?: string } = {};
  if (typeof basename === "string" && !/^(\s*\/\s*)*$/.test(basename)) {
    const rawPublicPath = basename.split("/").filter((x: string) => x).join("/");
    if (rawPublicPath) {
      opts.basename = `/${rawPublicPath}`;
    }
  }

  return opts;
};

export { normalizeCreateRouterOptions };
