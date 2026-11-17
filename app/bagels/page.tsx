import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import BagelsClient from './BagelsClient';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Bagels and Bagel Chips`,
  description: `${CMS_NAME} Mămălagel's 🥯 Bagels and Bagel Chips Page`,
};

export default async function BagelsPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);

  return (
    <Suspense fallback={null}>
      <BagelsClient navItems={navItems} />
    </Suspense>
  );
}
