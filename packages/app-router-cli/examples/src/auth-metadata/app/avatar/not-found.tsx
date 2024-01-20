const AvatarNotFound = ({ error }: any) => {
  return (
    <main>
      <h1>
        The avatar own not-found file you are at the moment, and the error message in JSON shown as
        below.
      </h1>
      <p>{JSON.stringify(error)}</p>
    </main>
  );
};

export default AvatarNotFound;
