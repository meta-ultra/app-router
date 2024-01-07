import normalize from "../src/core/normalize";
import { cloneDeep } from "lodash";
import input from "./intercepting-routes/traverseFileSystemOutput";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(input);
});

test("remove nested intercepting routes inside intercepting routes", () => {
  normalize(output);

  const srcNode = input[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  const outputNode = output[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  expect(
    srcNode.children.find((node) => node.path === "app/gallery/(..)imgs/(..)imgs")
  ).toBeDefined();
  expect(
    outputNode.children.find((node) => node.path === "app/gallery/(..)imgs/(..)imgs")
  ).toBeUndefined();
});

test("remove nested parallel routes inside intercepting routes", () => {
  normalize(output);

  const srcNode = input[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  const outputNode = output[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  expect(srcNode.children.find((node) => node.path === "app/gallery/(..)imgs/@test")).toBeDefined();
  expect(
    outputNode.children.find((node) => node.path === "app/gallery/(..)imgs/@test")
  ).toBeUndefined();
});
