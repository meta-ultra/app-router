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

test("fulfill a default layout if there is a loading, not-found or error but no layout inside a nested route", () => {
  const tree = cloneDeep(expectedOutputOfSrcApp);
  prune(tree);

  let aboutNode = expectedOutputOfSrcApp[0].children.find((node) => node.path === "app/about");
  let nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props.layout).toBe(undefined);

  aboutNode = tree[0].children.find((node) => node.path === "app/about");
  nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props.layout).toStrictEqual("preset::layout");
});

test("remain routes with neither `props.page` nor `props.layout`, but its descendants have", () => {
  const tree = cloneDeep(expectedOutputOfSrcApp);
  prune(tree);

  expect(
    expectedOutputOfSrcApp[0].children.find((node) => node.path === "app/not-empty")
  ).toBeDefined();
  expect(tree[0].children.find((node) => node.path === "app/not-empty")).toBeDefined();
});

test("prune routes without `props.page` and `props.layout` and its descendants are with neither `props.page` nor `props.layout`", () => {
  const tree = cloneDeep(expectedOutputOfSrcApp);
  prune(tree);

  expect(
    expectedOutputOfSrcApp[0].children.find((node) => node.path === "app/empty")
  ).toBeDefined();
  expect(tree[0].children.find((node) => node.path === "app/empty")).toBeUndefined();
});
