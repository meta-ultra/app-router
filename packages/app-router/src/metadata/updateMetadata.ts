import type { Metadata } from "./Metadata";
import { debounce } from "lodash-es";

/**--------------------------------------------
 *               Basic Fields
 *---------------------------------------------**/
const createMetaELement = (name: string): HTMLMetaElement => {
  const el = document.createElement("meta") as HTMLMetaElement;
  el.setAttribute("name", name);
  document.head.appendChild(el);

  return el;
};

const getMetaElement = (name: string): HTMLMetaElement => {
  let el = document.querySelector(`meta[name=${name}]`) as HTMLMetaElement | null;
  if (!el) {
    el = createMetaELement(name);
  }
  return el;
};

const updateSingletonMeta = (name: string, content?: string): void => {
  if (!content) return;

  const el = getMetaElement(name);
  el.setAttribute("content", content);
};

const updateAuthorMeta = (author: Metadata["author"]): void => {
  if (!author) return;

  const metas = Array.from(document.querySelectorAll("meta[name=author]"));
  const links = Array.from(document.querySelectorAll("link[rel=author]"));

  for (let i = 0; i < author.length; i++) {
    const item = author[i];
    if (item) {
      if (typeof item.name === "string") {
        const meta = metas.pop() || createMetaELement("author");
        meta.setAttribute("content", item.name);
      }
      if (typeof item.url === "string") {
        let link = links.pop();
        if (!link) {
          link = document.createElement("link") as HTMLLinkElement;
          link.setAttribute("rel", "author");
          document.head.appendChild(link);
        }
        link.setAttribute("href", item.name);
      }
    }
  }

  metas.forEach((meta) => meta.remove());
  links.forEach((link) => link.remove());
};

const updateFormatDetection = (formatDetection: Metadata["formatDetection"]): void => {
  if (!formatDetection) return;

  const meta = getMetaElement("format-detection");
  const content = Object.entries(formatDetection)
    .reduce((content, [name, value]) => {
      content.push(`${name}=${value ? "yes" : "no"}`);
      return content;
    }, [] as string[])
    .join(", ");
  meta.setAttribute("content", content);
};
/*--------------- END OF Basic Fields --------------*/

const updateMetadata = debounce((metadata: Metadata) => {
  if (metadata.title !== undefined) {
    document.title = metadata.title;
  }
  updateSingletonMeta("description", metadata.description);
  updateSingletonMeta("generator", metadata.generator);
  updateSingletonMeta("application-name", metadata.applicationName);
  updateSingletonMeta("referrer", metadata.referrer);
  updateSingletonMeta(
    "keywords",
    metadata.keywords && metadata.keywords.length ? metadata.keywords.join(",") : undefined
  );
  updateSingletonMeta("creator", metadata.creator);
  updateSingletonMeta("publisher", metadata.publisher);
  updateAuthorMeta(metadata.author);
  updateFormatDetection(metadata.formatDetection);
}, 300);

export default updateMetadata;
