import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import ElementsForm from '../../components/ElementsForm';

const CheckoutPage: NextPage = () => {
  return (
    <Layout preview={false}>
      <Head>
        <title>{CMS_NAME} 🥯 Checkout </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <Container>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
