import { proxy } from '../../../lib/receipts';

const FIELDS = [
  'desc',
  'name',
  'phone',
  'email',
  'time',
  'location',
  'cost',
  'addresOne',
  'addresTwo',
  'city',
  'state',
  'zip',
  'deliveryDate',
  'fee',
];

export function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  // Missing fields are sent as the string "null", as before.
  const query = FIELDS.map(f => `${f}=${q.get(f) || null}`).join('&');
  return proxy(
    'Email',
    encodeURI(`https://receipts.mamalagels.com/receipt?${query}`)
  );
}
