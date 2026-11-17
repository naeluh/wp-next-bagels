/**
 * Client-side GraphQL — proxied through `/api/graphql` so `WORDPRESS_API_URL`
 * stays server-only (no NEXT_PUBLIC_ exposure required).
 */
export default async function graphqlFetch(body) {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const resJson = await res.json();
  if (resJson.errors) {
    throw new Error(JSON.stringify(resJson.errors));
  }
  return resJson.data;
}
