import type { Metadata } from 'next';
import { getNavItems } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SpecialRequestForm from '../../components/SpecialRequestForm';

export const revalidate = 10;

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Special Request`,
  description: `${CMS_NAME} Mămălagels 🥯 Special Request Page`,
};

export default async function SpecialRequestPage() {
  const preview = false;
  const { navItems } = await getNavItems(preview);

  return (
    <>
      <Header navItems={navItems} />
      <Container>
        <SpecialRequestForm />
      </Container>
    </>
  );
}
