import { normalize } from "../src/core/normalize";
import { cloneDeep } from "lodash";
import input from "./intercepting-routes/traverseFileSystemOutput";
import normalizeOutput from "./intercepting-routes/normalizeOutput";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(input);
});

test("remove nested intercepting routes inside intercepting routes", () => {
  normalize(output);

  const srcNode = input[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  expect(
    srcNode.children.find((node) => node.path === "app/gallery/(..)imgs/(..)imgs")
  ).toBeDefined();
  expect(output[0].children .find((node) => node.path === "app/gallery/(..)imgs")).toBeUndefined();
  expect(output[0].children .find((node) => node.path === "app/gallery/(..)imgs/[id]")).toBeDefined();
});

test("remove nested parallel routes inside intercepting routes", () => {
  normalize(output);

  const srcNode = input[0].children
    .find((node) => node.path === "app/gallery")
    .children.find((node) => node.path === "app/gallery/(..)imgs");
  expect(srcNode.children.find((node) => node.path === "app/gallery/(..)imgs/@test")).toBeDefined();
  expect(output[0].children.find((node) => node.path === "app/gallery/(..)imgs/@test")).toBeUndefined();
});

test.only("strict equal", () => {
  normalize(output);

  console.log(JSON.stringify(output, null, 2))

  // expect(output).toStrictEqual(normalizeOutput);
})
