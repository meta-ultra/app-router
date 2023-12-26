const DefaultLoading = () => {
  return (
    <>
      <h2>Loading...</h2>
      {process.env.NODE_ENV === "production" ? null : (
        <>
          <p>💿 Hey developer 👋</p>
          <p>
            You can provide a way better UX than this when loading async component by passing your
            own global loading or page specific loading component as prop on{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              RootLayoutRouteElement
            </code>
            ,{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              LayoutRouteElement
            </code>{" "}
            or{" "}
            <code style={{ padding: "2px 4px", backgroundColor: "rgba(200, 200, 200, 0.5)" }}>
              PageRouteElement
            </code>
            , .
          </p>
        </>
      )}
    </>
  );
};

export default DefaultLoading;
