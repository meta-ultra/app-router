import {
  useEffect,
  isValidElement,
  createContext,
  useContext,
  type ReactElement,
  type FC,
  type PropsWithChildren,
  type ComponentType,
  useRef,
} from "react";
import { Metadata } from "./Metadata";

type MetadataBoundaryProps = PropsWithChildren<{
  component: ComponentType | ReactElement;
}>;

interface MetadataContextType {
  getMetadata: () => Metadata | undefined;
}
const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

const MetadataBoundary: FC<MetadataBoundaryProps> = ({ component, children }) => {
  const metadataRef = useRef<Metadata>();
  const { getMetadata } = useContext(MetadataContext) || {};

  useEffect(() => {
    const Component = component as {
      _payload?: { _result?: { default?: { metadata?: Metadata }; metadata?: Metadata } }; // for lazy component
      metadata?: Metadata; // for normal component
    };
    if (Component && !isValidElement(Component)) {
      let metadata = undefined;
      if (Component._payload && Component._payload._result) {
        // for lazy component
        if (Component._payload._result.metadata !== undefined) {
          metadata = Component._payload._result.metadata;
        } else if (Component._payload._result.default) {
          metadata = Component._payload._result.default.metadata;
        }
      } else {
        // for normal component
        metadata = Component.metadata;
      }
      // merge the parent metadata with its own one as the final metadata
      metadataRef.current = Object.assign({}, getMetadata ? getMetadata() : {}, metadata);

      if (metadataRef.current) {
        if (metadataRef.current.title !== undefined) {
          document.title = metadataRef.current.title;
        }
      }
    }
  });

  return (
    <MetadataContext.Provider
      value={{
        getMetadata() {
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
