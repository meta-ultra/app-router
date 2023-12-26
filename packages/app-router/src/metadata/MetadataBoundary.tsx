import {
  isValidElement,
  createContext,
  useContext,
  useRef,
  type ReactElement,
  type FC,
  type PropsWithChildren,
  type ComponentType,
} from "react";
import type { Metadata, GenerateMetadata } from "./Metadata";
import { useParamsProxy, useSearchParamsProxy } from "../dynamic-route";
import updateMetadata from "./updateMetadata";

type MetadataBoundaryProps = PropsWithChildren<{
  component: ComponentType | ReactElement;
}>;

interface MetadataContextType {
  getParentMetadata: () => Promise<Metadata>;
}
const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

const MetadataBoundary: FC<MetadataBoundaryProps> = ({ component, children }) => {
  const params = useParamsProxy();
  const searchParams = useSearchParamsProxy();
  const { getParentMetadata } = useContext(MetadataContext) || {};

  const metadataRef = useRef<Metadata>({});
  const parentMetadata = (getParentMetadata && getParentMetadata()) || Promise.resolve({});

  const Component = component as {
    _payload?: {
      _result?: {
        default?: { metadata?: Metadata; generateMetadata?: GenerateMetadata };
        metadata?: Metadata;
        generateMetadata?: GenerateMetadata;
      };
    }; // for lazy component
    metadata?: Metadata; // for normal component
    generateMetadata?: GenerateMetadata;
  };

  /**-----------------------------------------------------------------------------------------------------------------------
   * !                                                     WARNING
   * ! For lazy components, at the first rendering phase, it's possible for the child component to get an uninitialized metadata
   * ! belongs to parent component.
   * ! `isMetadataReady` acts as a switch to make sure that metadata has been initialized before fetched by child component no
   * ! matter which phase it's going on.
   *-----------------------------------------------------------------------------------------------------------------------**/
  let isMetadataReady = Promise.resolve();
  //! DO NOT wrap the following inside `useEffect`, which will execute in different order amongst lazy component tree.
  if (Component && !isValidElement(Component)) {
    let metadata: undefined | Metadata | Promise<Metadata> = undefined;
    if (Component._payload && Component._payload._result) {
      // for lazy component
      const generateMetadata =
        Component._payload._result.generateMetadata ||
        (Component._payload._result.default && Component._payload._result.default.generateMetadata);
      if (generateMetadata) {
        metadata = generateMetadata({ params, searchParams }, parentMetadata);
      } else if (Component._payload._result.metadata !== undefined) {
        metadata = Component._payload._result.metadata;
      } else if (Component._payload._result.default) {
        metadata = Component._payload._result.default.metadata;
      }
    } else {
      // for normal component
      const generateMetadata = Component.generateMetadata;
      if (generateMetadata) {
        metadata = generateMetadata({ params, searchParams }, parentMetadata);
      } else {
        metadata = Component.metadata;
      }
    }

    metadata = metadata instanceof Promise ? metadata : Promise.resolve(metadata || {});
    isMetadataReady = Promise.all([parentMetadata, metadata]).then(([parentMetadata, metadata]) => {
      // merge the parent metadata with its own one as the final metadata
      metadataRef.current = Object.assign({}, parentMetadata, metadata);

      if (metadataRef.current) {
        // optimize #4: delay updating metadata to avoid the document title flash and other performance issue.
        updateMetadata(metadataRef.current);
      }
    });
  }

  return (
    <MetadataContext.Provider
      value={{
        async getParentMetadata() {
          await isMetadataReady;
          return metadataRef.current;
        },
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export type { MetadataBoundaryProps };
export default MetadataBoundary;
