import type { Metadata } from "./Metadata";
import { debounce } from "lodash-es";

const updateMetadata = debounce((metadata: Metadata) => {
  console.log(metadata);
  if (metadata.title !== undefined) {
    document.title = metadata.title;
  }
}, 300);

export default updateMetadata;
