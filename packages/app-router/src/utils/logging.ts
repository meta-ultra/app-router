const log = (type: "info" | "warn", ...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console[type].apply(console, ["[@meta-ultra/app-router]", ...args]);
  }
};

const info = (...args: any[]) => log("info", ...args);
const warn = (...args: any[]) => log("warn", ...args);

export { info, warn };
