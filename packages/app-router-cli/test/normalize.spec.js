import normalize from "../src/core/normalize";
import { cloneDeep } from "lodash";
import data from "./data";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(data);
});

test("set error of the root route to its global-error if exists", () => {
  normalize(output);

  expect(!!data[0].props.error).toBe(true);
  expect(!output[0].props["global-error"]).toBe(true);
  expect(!!output[0].props.error).toBe(true);
  const error = output[0].props.error.split("/");
  expect(error[error.length - 1]).toStrictEqual("global-error.js");
});

test("remove global-error property from the nested routes", () => {
  normalize(output);

  let node = data[0].children.find((child) => child.path === "app/about");
  expect(!!node.props["global-error"]).toBe(true);
  node = output[0].children.find((child) => child.path === "app/about");
  expect(node.props["global-error"]).toBe(undefined);
});

test("fulfill a default root layout if it dosen't exist", () => {
  normalize(output);
  expect(output[0].props.layout).toStrictEqual("app/layout.tsx");

  const withoutRootLayout = cloneDeep(data);
  delete withoutRootLayout[0].props.layout;
  normalize(withoutRootLayout);
  expect(withoutRootLayout[0].props.layout).toStrictEqual("preset::root-layout");
});

test("fulfill a default layout if there is a loading, not-found or error but no layout inside a nested route", () => {
  normalize(output);

  let aboutNode = data[0].children.find((node) => node.path === "app/about");
  let nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props.layout).toBe(undefined);

  aboutNode = output[0].children.find((node) => node.path === "app/about");
  nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props.layout).toStrictEqual("preset::layout");
});

test("remain routes with neither `props.page` nor `props.layout`, but its descendants have", () => {
  normalize(output);

  expect(data[0].children.find((node) => node.path === "app/not-empty")).toBeDefined();
  expect(output[0].children.find((node) => node.path === "app/not-empty")).toBeDefined();
});

test("remove routes without `props.page` and `props.layout` and its descendants are with neither `props.page` nor `props.layout`", () => {
  normalize(output);

  expect(data[0].children.find((node) => node.path === "app/empty")).toBeDefined();
  expect(output[0].children.find((node) => node.path === "app/empty")).toBeUndefined();
});

test("rename not-found to notFound", () => {
  normalize(output);

  let aboutNode = data[0].children.find((node) => node.path === "app/about");
  let nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props["not-found"]).toBeDefined();

  aboutNode = output[0].children.find((node) => node.path === "app/about");
  nestedNode = aboutNode.children.find((node) => node.path === "app/about/nested");
  expect(nestedNode.props["not-found"]).toBeUndefined();
  expect(nestedNode.props["notFound"]).toBeDefined();
});

test("remove nested routes inside catch-all routes or optional catch-all routes", () => {
  normalize(output);

  let catchAllNode = data[0].children.find((node) => node.path === "app/catch-all");
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[[...id]]").children
  ).toHaveLength(1);
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[...id]").children
  ).toHaveLength(1);
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[id]").children
  ).toHaveLength(1);

  catchAllNode = output[0].children.find((node) => node.path === "app/catch-all");
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[[...id]]").children
  ).toHaveLength(0);
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[...id]").children
  ).toHaveLength(0);
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[id]").children
  ).toHaveLength(1);
});

test("sink the page to the level below if there's layout along with", () => {
  normalize(output);

  let homeNode = data[0].children.find((node) => node.path === "app/home");
  expect(homeNode.props.page).toBeDefined();
  expect(homeNode.children).toHaveLength(0);

  homeNode = output[0].children.find((node) => node.path === "app/home");
  expect(homeNode.props.page).toBeUndefined();
  expect(homeNode.children).toHaveLength(1);
  expect(homeNode.children[0].path).toStrictEqual(`${homeNode.path}/`);
  expect(homeNode.children[0].props.page).toBeDefined();
});
