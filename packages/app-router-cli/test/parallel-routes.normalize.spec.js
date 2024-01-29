import { normalize } from "../src/core/normalize";
import { cloneDeep } from "lodash";
import input from "./parallel-routes/traverseFileSystemOutput";

let output = undefined;
beforeEach(() => {
  output = cloneDeep(input);
});

test("remove parallel routes without `props.page` and its descendants are without `props.page`", () => {
  normalize(output);

  const srcDashboardNode = input[0].children.find((node) => node.path === "app/dashboard");
  const outputDashboardNode = output[0].children.find((node) => node.path === "app/dashboard");
  expect(
    srcDashboardNode.children.find((node) => node.path === "app/dashboard/@chart2")
  ).toBeDefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app/dashboard/@chart2")
  ).toBeUndefined();
});

test("remove parallel routes `props.layout`", () => {
  normalize(output);

  const srcDashboardNode = input[0].children.find((node) => node.path === "app/dashboard");
  const outputDashboardNode = output[0].children.find((node) => node.path === "app/dashboard");

  expect(
    srcDashboardNode.children.find((node) => node.path === "app/dashboard/@chart1").props.layout
  ).toBeDefined();
  expect(
    srcDashboardNode.children.find((node) => node.path === "app/dashboard/@chart2").props.layout
  ).toBeDefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app/dashboard/@chart1")
  ).toBeUndefined();
  expect(
    outputDashboardNode.children.find((node) => node.path === "app/dashboard/@chart2")
  ).toBeUndefined();
});

test("remove nested parallel routes inside parallel routes", () => {
  normalize(output);

  const srcNode = input[0].children
    .find((node) => node.path === "app/dashboard")
    .children.find((node) => node.path === "app/dashboard/@chart2");
  const outputNode = output[0].children.find((node) => node.path === "app/dashboard");

  expect(
    srcNode.children.find((node) => node.path === "app/dashboard/@chart2/@chart2-children")
  ).toBeDefined();
  expect(outputNode.children.find((node) => node.path === "app/dashboard/@chart2")).toBeUndefined();
});

test("move the template down a layer", () => {
  normalize(output);

  expect(
    output[0].children[0].children.find((node) => node.path === "app/dashboard/").props.template
  ).toStrictEqual("app/dashboard/template.js");
  expect(
    output[0].children.find((node) => node.path === "app/dashboard").props.parallelRoutes.chart1.props.template
  ).toStrictEqual("app/dashboard/template.js")
})

// test.only("", () => {
//   normalize(output);

//   console.log(JSON.stringify(output, null, 2))
// })
