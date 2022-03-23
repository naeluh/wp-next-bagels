import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import ElementsForm from '../../components/ElementsForm';

const CheckoutPage: NextPage = () => {
  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 Checkout`}
      desc={`${CMS_NAME} Mămălagels 🥯 Checkout Page`}
    >
      <Header />
      <Container>
        <h1 className='sr-only'>Checkout</h1>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
