import { join } from "node:path";
import traverseFileSystem from "../src/core/traverseFileSystem";
import expectedTree from "./parallel-routes/traverseFileSystemOutput";

test("generate the expected tree", () => {
  const output = traverseFileSystem(
    join(__dirname, "./parallel-routes"),
    join(__dirname, "./parallel-routes/app")
  );

  expect(output).toStrictEqual(expectedTree);
});
