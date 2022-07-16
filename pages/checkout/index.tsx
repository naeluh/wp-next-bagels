import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import ElementsForm from '../../components/ElementsForm';
import { getNavItems } from '../../lib/api';

type Props = {
  navItems: [];
};

const CheckoutPage: NextPage<Props> = ({ navItems }: Props) => {
  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 Checkout`}
      desc={`${CMS_NAME} Mămălagels 🥯 Checkout Page`}
    >
      <Header navItems={navItems} />
      <Container>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;

export async function getStaticProps(preview = false) {
  const { navItems } = await getNavItems(preview);
  return {
    props: { navItems },
  };
}
