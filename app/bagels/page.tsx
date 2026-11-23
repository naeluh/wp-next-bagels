import type { Metadata } from 'next';
import BagelsOrder from '../../components/BagelsOrder';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Bagels and Bagel Chips`,
  description: `${CMS_NAME} Mămălagel's 🥯 Bagels and Bagel Chips Page`,
};

export default function BagelsPage() {
  return <BagelsOrder />;
}
