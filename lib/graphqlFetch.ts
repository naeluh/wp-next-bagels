// Client-side WPGraphQL fetch (used with SWR). WORDPRESS_API_URL is inlined by next.config.ts.
export default async function graphqlFetch<T>(body: {
  query: string;
}): Promise<T> {
  const res = await fetch(process.env.WORDPRESS_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.errors) {
    throw JSON.stringify(json.errors);
  }
  return json.data;
}
