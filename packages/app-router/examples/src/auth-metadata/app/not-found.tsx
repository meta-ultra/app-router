const RootNotFound = ({ error }: any) => {
  return (
    <main>
      <h1>
        The root not-found file you are at the moment, and the error message in JSON shown as below.
      </h1>
      <p>{JSON.stringify(error)}</p>
    </main>
  );
};

export default RootNotFound;
