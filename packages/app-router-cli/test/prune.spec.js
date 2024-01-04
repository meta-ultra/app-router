import { prune } from "../src/core/prune";
import { cloneDeep } from "lodash";
import expectedOutputOfSrcApp from "./expectedOutputOfSrcApp";

test.only("remove error property from the root route", () => {
  const output = cloneDeep(expectedOutputOfSrcApp);
  prune(output);

  expect(!!expectedOutputOfSrcApp[0].props.error).toBe(true);
  expect(!output[0].props["global-error"]).toBe(true);
  expect(!!output[0].props.error).toBe(true);
  const error = output[0].props.error.split("/");
  expect(error[error.length - 1]).toStrictEqual("global-error.js");
});

test("remove global-error property from the nested routes", () => {});

test("fulfill a default root layout if it dosen't exist", () => {});

test("fulfill a default layout if there is a loading, not-found or error inside nested route", () => {});

test("prune routes with neither `props.page` nor `props.layout`", () => {});

test("prune routes descendants of which are with neither `props.page` nor `props.layout`", () => {});
