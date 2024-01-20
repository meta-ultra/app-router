import { type Metadata, type GenerateMetadata } from "../../../../../src";

/**
 * The generateMetadata has priority over metadata.
 */

export const metadata: Metadata = {
  title: "Home",
  description: "this example is used to illustrate the usage of @meta-ultra/app-router metadata",
  applicationName: "metadata example",
};

export const generateMetadata: GenerateMetadata = async ({ params, searchParams }, parent) => {
  console.log("params", params);
  console.log("searchParams", searchParams);
  console.log("parent metadata", await parent);

  return {
    title: "About",
    description:
      "this example is used to illustrate the usage of @meta-ultra/app-router generateMetadata",
    applicationName: "generateMetadata example",
  };
};

const About = () => {
  return <div>About</div>;
};

export default About;
