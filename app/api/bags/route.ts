import { proxy } from '../../../lib/receipts';

export const GET = () =>
  proxy('Bags', 'https://receipts.mamalagels.com/bags', undefined, true);
