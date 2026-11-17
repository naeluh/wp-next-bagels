import type { Metadata } from 'next';
import { getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import CheckoutClient from './CheckoutClient';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Checkout`,
  description: `${CMS_NAME} Mămălagels 🥯 Checkout Page`,
};

export default async function CheckoutPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);

  return <CheckoutClient navItems={navItems} />;
}
