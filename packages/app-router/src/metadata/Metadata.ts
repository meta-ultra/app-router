/**========================================================================
 *                             Metadata
 * A subset of Next.js Metadata. For more detail, please refer to
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#the-metadata-object.
 *========================================================================**/
import { useParamsProxy } from "../dynamic-route";

interface Metadata {
  title?: string;
  description?: string;
  generator?: string;
  applicationName?: string;
  referrer?: string;
  keywords?: string[];
  author?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  formatDetection?: {
    email: boolean;
    address: boolean;
    telephone: boolean;
  };
}

type GenerateMetadataSearchParams = Record<string, string | string[]>;
interface GenerateMetadata {
  (
    props: {
      params: ReturnType<typeof useParamsProxy>;
      searchParams: GenerateMetadataSearchParams;
    },
    parent: Promise<Metadata>
  ): Metadata | Promise<Metadata>;
}

export type { Metadata, GenerateMetadata, GenerateMetadataSearchParams };
