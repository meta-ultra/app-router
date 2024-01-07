import { join } from "node:path";
import traverseFileSystem from "../src/core/traverseFileSystem";
import expectedTree from "./dynamic-routes/traverseFileSystemOutput";

test("generate the expected tree", () => {
  const output = traverseFileSystem(
    join(__dirname, "./dynamic-routes"),
    join(__dirname, "./dynamic-routes/app")
  );

  expect(output).toStrictEqual(expectedTree);
});
