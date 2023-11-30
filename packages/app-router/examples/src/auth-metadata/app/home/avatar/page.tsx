import { type GenerateMetadata, useGlobalNotFound as useNotFound } from "../../../../../../src";

export const generateMetadata: GenerateMetadata = function useGenerateMetadata() {
  const notFound = useNotFound();

  notFound();

  return {};
};

const Avatar = () => {
  return <div>Avatar</div>;
};

export default Avatar;
