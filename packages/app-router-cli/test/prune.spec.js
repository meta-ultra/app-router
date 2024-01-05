import { prune } from "../src/core/prune";
import { cloneDeep } from "lodash";
import expectedOutputOfSrcApp from "./expectedOutputOfSrcApp";

test("set error of the root route to its global-error if exists", () => {
  const output = cloneDeep(expectedOutputOfSrcApp);
  prune(output);

  expect(!!expectedOutputOfSrcApp[0].props.error).toBe(true);
  expect(!output[0].props["global-error"]).toBe(true);
  expect(!!output[0].props.error).toBe(true);
  const error = output[0].props.error.split("/");
  expect(error[error.length - 1]).toStrictEqual("global-error.js");
});

test("remove global-error property from the nested routes", () => {
  const output = cloneDeep(expectedOutputOfSrcApp);
  prune(output);

  let node = expectedOutputOfSrcApp[0].children.find((child) => child.path === "app/about");
  expect(!!node.props["global-error"]).toBe(true);
  node = output[0].children.find((child) => child.path === "app/about");
  expect(node.props["global-error"]).toBe(undefined);
});

test("fulfill a default root layout if it dosen't exist", () => {
  const withRootLayout = cloneDeep(expectedOutputOfSrcApp);
  prune(withRootLayout);
  expect(withRootLayout[0].props.layout).toStrictEqual("app/layout.tsx");

  const withoutRootLayout = cloneDeep(expectedOutputOfSrcApp);
  delete withoutRootLayout[0].props.layout;
  prune(withoutRootLayout);
  expect(withoutRootLayout[0].props.layout).toStrictEqual("preset::root-layout");
});

test("fulfill a default layout if there is a loading, not-found or error inside nested route", () => {});

test("prune routes with neither `props.page` nor `props.layout`", () => {});

test("prune routes descendants of which are with neither `props.page` nor `props.layout`", () => {});
