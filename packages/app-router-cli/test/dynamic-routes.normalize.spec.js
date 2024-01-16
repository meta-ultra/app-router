import { normalize } from "../src/core/normalize";
import { cloneDeep } from "lodash";
import input from "./dynamic-routes/traverseFileSystemOutput";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(input);
});

test("remove nested routes inside catch-all routes or optional catch-all routes", () => {
  normalize(output);

  let catchAllNode = input[0].children.find((node) => node.path === "app/catch-all");
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
    catchAllNode.children.find((node) => node.path === "app/catch-all/[...id]")
  ).toBeUndefined();
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[id]").children
  ).toHaveLength(0);
  expect(
    catchAllNode.children.find((node) => node.path === "app/catch-all/[id]/create")
  ).toBeDefined();
});

test("sort children", () => {
  normalize(output);

  let catchAllNode = output[0].children.find((node) => node.path === "app/catch-all");
  expect(catchAllNode.children[0].path).toStrictEqual("app/catch-all/");
  expect(catchAllNode.children[1].path).toStrictEqual("app/catch-all/anything");
  expect(catchAllNode.children[2].path).toStrictEqual("app/catch-all/[id]/create");
  expect(catchAllNode.children[3].path).toStrictEqual("app/catch-all/[id]");
  expect(catchAllNode.children[4].path).toStrictEqual("app/catch-all/[[...id]]");
  expect(catchAllNode.children).toHaveLength(5);
});
