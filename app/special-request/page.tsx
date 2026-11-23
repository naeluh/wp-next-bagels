import type { Metadata } from 'next';
import Container from '../../components/Container';
import SpecialRequestForm from '../../components/SpecialRequestForm';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Special Request`,
  description: `${CMS_NAME} Mămălagels 🥯 Special Request Page`,
};

export default function SpecialRequestPage() {
  return (
    <Container>
      <SpecialRequestForm />
    </Container>
  );
}
