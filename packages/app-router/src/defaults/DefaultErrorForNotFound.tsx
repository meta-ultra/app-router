//* The default fallback for ErrorBoundary when the valid notFound property exists to make the calling of `notFound` work properly.
//* The return component will flash on the screen or never display even.
export default function DefaultErrorForNotFound() {
  return process.env.NODE_ENV === "production" ? null : (
    <div>Default Error Fallback for Custom Not Found Fallback.</div>
  );
}
