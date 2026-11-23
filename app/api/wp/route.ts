import { missingCredentials, proxy } from '../../../lib/receipts';

export function GET(req: Request) {
  const denied = missingCredentials();
  if (denied) return denied;
  const q = new URL(req.url).searchParams;
  return proxy(
    'Wordpress',
    `https://wp.mamalagels.com/wp-json/acf/v3/bagel_chips/${q.get('id')}?fields[quantity]=${q.get('quantity')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        Authorization:
          'Basic ' + btoa(process.env.USER + ':' + process.env.PASS),
      },
    }
  );
}
