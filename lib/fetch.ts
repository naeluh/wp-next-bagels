/** Shared outbound fetch for server code (replaces @zeit/fetch). */
export default function zeitFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, init);
}
