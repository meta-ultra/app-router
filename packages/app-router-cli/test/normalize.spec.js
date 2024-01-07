import normalize from "../src/core/normalize";
import { cloneDeep } from "lodash";
import app1 from "./app1";

let output1 = undefined;
beforeEach(() => {
  output1 = cloneDeep(app1);
});

test("set error of the root route to its global-error if exists", () => {
  normalize(output1);

  expect(!!app1[0].props.error).toBe(true);
  expect(!output1[0].props["global-error"]).toBe(true);
  expect(!!output1[0].props.error).toBe(true);
  const error = output1[0].props.error.split("/");
  expect(error[error.length - 1]).toStrictEqual("global-error.js");
});

test("remove global-error property from the nested routes", () => {
  normalize(output1);

  let node = app1[0].children.find((child) => child.path === "app1/about");
  expect(!!node.props["global-error"]).toBe(true);
  node = output1[0].children.find((child) => child.path === "app1/about");
  expect(node.props["global-error"]).toBe(undefined);
});

test("fulfill a default root layout if it dosen't exist", () => {
  normalize(output1);
  expect(output1[0].props.layout).toStrictEqual("app1/layout.tsx");

  const withoutRootLayout = cloneDeep(app1);
  delete withoutRootLayout[0].props.layout;
  normalize(withoutRootLayout);
  expect(withoutRootLayout[0].props.layout).toStrictEqual("preset::root-layout");
});

test("fulfill a default layout if there is a loading, not-found or error but no layout inside a nested route", () => {
  normalize(output1);

  let aboutNode = app1[0].children.find((node) => node.path === "app1/about");
  let nestedNode = aboutNode.children.find((node) => node.path === "app1/about/nested");
  expect(nestedNode.props.layout).toBe(undefined);

  aboutNode = output1[0].children.find((node) => node.path === "app1/about");
  nestedNode = aboutNode.children.find((node) => node.path === "app1/about/nested");
  expect(nestedNode.props.layout).toStrictEqual("preset::layout");
});

test("remain routes with neither `props.page` nor `props.layout`, but its descendants have", () => {
  normalize(output1);

  expect(app1[0].children.find((node) => node.path === "app1/not-empty")).toBeDefined();
  expect(output1[0].children.find((node) => node.path === "app1/not-empty")).toBeDefined();
});

test("remove routes without `props.page` and `props.layout` and its descendants are with neither `props.page` nor `props.layout`", () => {
  normalize(output1);

  expect(app1[0].children.find((node) => node.path === "app1/empty")).toBeDefined();
  expect(output1[0].children.find((node) => node.path === "app1/empty")).toBeUndefined();
});

test("rename not-found to notFound", () => {
  normalize(output1);

  let aboutNode = app1[0].children.find((node) => node.path === "app1/about");
  let nestedNode = aboutNode.children.find((node) => node.path === "app1/about/nested");
  expect(nestedNode.props["not-found"]).toBeDefined();

  aboutNode = output1[0].children.find((node) => node.path === "app1/about");
  nestedNode = aboutNode.children.find((node) => node.path === "app1/about/nested");
  expect(nestedNode.props["not-found"]).toBeUndefined();
  expect(nestedNode.props["notFound"]).toBeDefined();
});

test("sink the page to the level below if there's layout along with", () => {
  normalize(output1);

  let homeNode = app1[0].children.find((node) => node.path === "app1/home");
  expect(homeNode.props.page).toBeDefined();
  expect(homeNode.children).toHaveLength(0);

  homeNode = output1[0].children.find((node) => node.path === "app1/home");
  expect(homeNode.props.page).toBeUndefined();
  expect(homeNode.children).toHaveLength(1);
  expect(homeNode.children[0].path).toStrictEqual(`${homeNode.path}/`);
  expect(homeNode.children[0].props.page).toBeDefined();
});
