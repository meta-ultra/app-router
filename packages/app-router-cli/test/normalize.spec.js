import normalize from "../src/core/normalize";
import { cloneDeep } from "lodash";
import app1 from "./app1";
import app2 from "./app2";

let output1 = undefined;
let output2 = undefined;
beforeEach(() => {
  output1 = cloneDeep(app1);
  output2 = cloneDeep(app2);
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

test("remove nested routes inside catch-all routes or optional catch-all routes", () => {
  normalize(output1);

  let catchAllNode = app1[0].children.find((node) => node.path === "app1/catch-all");
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[[...id]]").children
  ).toHaveLength(1);
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[...id]").children
  ).toHaveLength(1);
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[id]").children
  ).toHaveLength(1);

  catchAllNode = output1[0].children.find((node) => node.path === "app1/catch-all");
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[[...id]]").children
  ).toHaveLength(0);
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[...id]").children
  ).toHaveLength(0);
  expect(
    catchAllNode.children.find((node) => node.path === "app1/catch-all/[id]").children
  ).toHaveLength(1);
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

test("sort children", () => {
  normalize(output1);
  let catchAllNode = output1[0].children.find((node) => node.path === "app1/catch-all");
  expect(catchAllNode.children[0].path).toStrictEqual("app1/catch-all/");
  expect(catchAllNode.children[1].path).toStrictEqual("app1/catch-all/anything");
  expect(catchAllNode.children[2].path).toStrictEqual("app1/catch-all/[id]");
  expect(catchAllNode.children[3].path).toStrictEqual("app1/catch-all/[...id]");
  expect(catchAllNode.children[4].path).toStrictEqual("app1/catch-all/[[...id]]");
});

test("remove parallel routes without `props.page` and its descendants are without `props.page`", () => {
  normalize(output2);

  const srcDashboardNode = app2[0].children.find((node) => node.path === "app2/dashboard");
  const outputDashboardNode = output2[0].children.find((node) => node.path === "app2/dashboard");
  expect(
    srcDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart2")
  ).toBeDefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart2")
  ).toBeUndefined();
});

test("remove parallel routes `props.layout`", () => {
  normalize(output2);
  const srcDashboardNode = app2[0].children.find((node) => node.path === "app2/dashboard");
  const outputDashboardNode = output2[0].children.find((node) => node.path === "app2/dashboard");
  expect(
    srcDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart1").props.layout
  ).toBeDefined();
  expect(
    srcDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart2").props.layout
  ).toBeDefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart1").props.layout
  ).toBeUndefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app2/dashboard/@chart2")
  ).toBeUndefined();
});

test("remove nested parallel routes inside parallel routes", () => {
  normalize(output2);

  const srcNode = app2[0].children
    .find((node) => node.path === "app2/gallery")
    .children.find((node) => node.path === "app2/gallery/(..)imgs");
  const outputNode = output2[0].children
    .find((node) => node.path === "app2/gallery")
    .children.find((node) => node.path === "app2/gallery/(..)imgs");
  expect(
    srcNode.children.find((node) => node.path === "app2/gallery/(..)imgs/(..)imgs")
  ).toBeDefined();
  expect(
    outputNode.children.find((node) => node.path === "app2/gallery/(..)imgs/(..)imgs")
  ).toBeUndefined();
});

test("remove nested intercepting routes inside parallel routes", () => {
  normalize(output2);

  const srcNode = app2[0].children
    .find((node) => node.path === "app2/gallery")
    .children.find((node) => node.path === "app2/gallery/(..)imgs");
  const outputNode = output2[0].children
    .find((node) => node.path === "app2/gallery")
    .children.find((node) => node.path === "app2/gallery/(..)imgs");
  expect(
    srcNode.children.find((node) => node.path === "app2/gallery/(..)imgs/@test")
  ).toBeDefined();
  expect(
    outputNode.children.find((node) => node.path === "app2/gallery/(..)imgs/@test")
  ).toBeUndefined();
});
