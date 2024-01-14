import { join } from "node:path";
import { traverseFileSystem } from "../src/core/traverseFileSystem";
import expectedTree from "./group-routes/traverseFileSystemOutput";

test("generate the expected tree", () => {
  const output = traverseFileSystem(
    join(__dirname, "./group-routes"),
    join(__dirname, "./group-routes/app")
  );

  expect(output).toStrictEqual(expectedTree);
});
