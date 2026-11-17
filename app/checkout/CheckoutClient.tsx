'use client';

import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ElementsForm from '../../components/ElementsForm';

type NavItem = { label: string; url: string };

export default function CheckoutClient({
  navItems,
}: {
  navItems: NavItem[];
}) {
  return (
    <>
      <Header navItems={navItems} />
      <Container>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </Container>
    </>
  );
}
