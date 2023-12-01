const DefaultRootRouteSegmentElementNotFound = () => {
  return (
    <>
      <h2>Unexpected Application Error!</h2>
      <h3 style={{ fontStyle: "italic" }}>404 Not Found</h3>
      {process.env.NODE_ENV === "production" ? null : (
        <>
          <p>💿 Hey developer 👋</p>
          <p>
            You can provide a way better UX than this when your app throws errors by passing your
            own global not-found component as prop on{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              RootRouteSegmentElement
            </code>{" "}
            or the top-most{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              RouteSegmentElement
            </code>
            .
          </p>
        </>
      )}
    </>
  );
};

export default DefaultRootRouteSegmentElementNotFound;
