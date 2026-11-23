import type { Metadata } from 'next';
import Container from '../../components/Container';
import ElementsForm from '../../components/ElementsForm';
import { CMS_NAME } from '../../lib/constants';

export const metadata: Metadata = {
  title: `${CMS_NAME} 🥯 Checkout`,
  description: `${CMS_NAME} Mămălagels 🥯 Checkout Page`,
};

export default function CheckoutPage() {
  return (
    <Container>
      <ElementsForm />
    </Container>
  );
}
