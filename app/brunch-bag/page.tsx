import type { Metadata } from 'next';
import BrunchBagOrder from '../../components/BrunchBagOrder';
import { getBrunchBagDates } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Brunch Bags`,
  description: `${CMS_NAME} Mămălagel's 🥯 Brunch Bags Page`,
};

export default async function BrunchBagPage() {
  return <BrunchBagOrder bbDates={await getBrunchBagDates()} />;
}
