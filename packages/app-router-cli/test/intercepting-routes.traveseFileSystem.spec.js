import { join } from "node:path";
import traverseFileSystem from "../src/core/traverseFileSystem";
import expectedTree from "./intercepting-routes/traverseFileSystemOutput";

test("generate the expected tree", () => {
  const output = traverseFileSystem(
    join(__dirname, "./intercepting-routes"),
    join(__dirname, "./intercepting-routes/app")
  );

  expect(output).toStrictEqual(expectedTree);
});
