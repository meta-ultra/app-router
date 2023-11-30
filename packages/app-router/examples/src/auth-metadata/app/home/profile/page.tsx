import { type GenerateMetadata, useGlobalNotFound } from "../../../../../../src";

export const generateMetadata: GenerateMetadata = function useGenerateMetadata() {
  const globalNotFound = useGlobalNotFound();

  globalNotFound();

  return {};
};

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
