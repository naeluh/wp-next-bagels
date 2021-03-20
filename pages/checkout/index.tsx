import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';

const CheckoutPage: NextPage = () => {
  const Container = dynamic(import('../../components/Container'));
  const Header = dynamic(import('../../components/Header'));
  const Layout = dynamic(import('../../components/Layout'));
  const ElementsForm = dynamic(import('../../components/ElementsForm'));

  return (
    <Layout preview={false}>
      <Head>
        <title>{CMS_NAME}</title>
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
