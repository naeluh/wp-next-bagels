import type { Metadata } from 'next';
import { getBrunchBagDates, getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import BrunchBagClient from './BrunchBagClient';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Brunch Bags`,
  description: `${CMS_NAME} Mămălagel's 🥯 Brunch Bags Page`,
};

export default async function BrunchBagPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);
  const bbDates = await getBrunchBagDates();

  return <BrunchBagClient navItems={navItems} bbDates={bbDates} />;
}
