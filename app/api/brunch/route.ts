import { missingCredentials, proxy } from '../../../lib/receipts';

export function GET(req: Request) {
  const denied = missingCredentials();
  if (denied) return denied;
  const q = new URL(req.url).searchParams;
  return proxy(
    'Brunch',
    encodeURI(
      `https://receipts.mamalagels.com/brunch?day=${q.get('day')}&bags=${q.get('bags')}`
    )
  );
}
