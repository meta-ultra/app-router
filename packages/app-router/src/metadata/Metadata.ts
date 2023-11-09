/**========================================================================
 *                             Metadata
 * A subset of Next.js Metadata. For more detail, please refer to
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#the-metadata-object.
 *========================================================================**/
import { type useParams } from "react-router-dom";

interface Metadata {
  title?: string;
}

type GenerateMetadataSearchParams = Record<string, string | string[]>;
interface GenerateMetadata {
  (
    props: {
      params: ReturnType<typeof useParams>;
      searchParams: GenerateMetadataSearchParams;
    },
    parent: Promise<Metadata>
  ): Metadata | Promise<Metadata>;
}

export type { Metadata, GenerateMetadata, GenerateMetadataSearchParams };
