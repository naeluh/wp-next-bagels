// Proxies GET requests to the receipts / WordPress services and normalises errors.
const CACHE = { 'Cache-Control': 's-maxage=3, stale-while-revalidate' };

// Same policy as master's @zeit/fetch: up to 5 retries on network errors, 5xx
// and 429, waiting 10/60/360/2160/12960 ms. The last 5xx response is returned.
// ponytail: ignores Retry-After; honour it if the upstream starts sending it.
const RETRY_DELAYS = [10, 60, 360, 2160, 12960];
async function fetchRetry(url: string, init?: RequestInit) {
  for (let attempt = 0; ; attempt++) {
    const last = attempt === RETRY_DELAYS.length;
    try {
      const response = await fetch(url, init);
      if (last || (response.status < 500 && response.status !== 429)) {
        return response;
      }
    } catch (error) {
      if (last) throw error;
    }
    await new Promise(r => setTimeout(r, RETRY_DELAYS[attempt]));
  }
}

export async function proxy(
  name: string,
  url: string,
  init?: RequestInit,
  passBody = false
) {
  const response = await fetchRetry(url, init);
  if (!response.ok) {
    return Response.json(
      {
        errors: [
          {
            message: `Fetch to the ${name} API failed with code: ${response.status}`,
          },
        ],
      },
      { status: 400 }
    );
  }
  const body = passBody
    ? await response.json()
    : { success: [{ message: `${response.status}` }] };
  return Response.json(body, { headers: CACHE });
}

export const missingCredentials = () =>
  !process.env.PASS && process.env.USER
    ? Response.json(
        { errors: [{ message: 'MISSING PASS OR USER' }] },
        { status: 401 }
      )
    : null;
