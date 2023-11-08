/**========================================================================
 *                             ErrorResponse
 * A custom error similar to ErrorResponse provided by react-router-dom v6,
 * which narrows to just represent 404 NOT FOUND error.
 *========================================================================**/
class ErrorResponse extends Error {
  #status = 404;
  #statusText = "Not Found";
  #path?: string;

  get status() {
    return this.#status;
  }

  get statusText() {
    return this.#statusText;
  }

  get data() {
    return super.message;
  }

  get error() {
    return this;
  }

  getPath() {
    return this.#path;
  }

  constructor(path?: string) {
    super(path ? `Error: No route matches URL "${path}"` : "");
    this.#path = path;
  }
}

export default ErrorResponse;
