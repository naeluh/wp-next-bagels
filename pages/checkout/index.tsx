import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../utils/get-stripejs';
import ElementsForm from '../../components/ElementsForm';
import Head from 'next/head';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { CMS_NAME } from '../../lib/constants';

const DonatePage: NextPage = () => {
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

export default DonatePage;
