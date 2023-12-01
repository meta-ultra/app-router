import { type GenerateMetadata, useNotFound } from "../../../../../src";

export const generateMetadata: GenerateMetadata = function useGenerateMetadata() {
  const notFound = useNotFound();

  notFound("The notFound called from avatar.");

  return {};
};

const Avatar = () => {
  return <div>Avatar</div>;
};

export default Avatar;
