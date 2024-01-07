import normalize from "../src/core/normalize";
import { cloneDeep } from "lodash";
import input from "./group-routes/traverseFileSystemOutput";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(input);
});

test("remain routes with neither `props.page` nor `props.layout`, but its descendants have", () => {
  normalize(output);

  expect(input[0].children.find((node) => node.path === "app/(group)")).toBeDefined();
  expect(output[0].children.find((node) => node.path === "app/(group)")).toBeDefined();
});

test("remove routes without `props.page` and `props.layout` and its descendants are with neither `props.page` nor `props.layout`", () => {
  normalize(output);

  expect(input[0].children.find((node) => node.path === "app/(...empty)")).toBeDefined();
  expect(output[0].children.find((node) => node.path === "app/(...empty)")).toBeUndefined();
});
