import { NextPage } from 'next';
import Head from 'next/head';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { CMS_NAME } from '../../lib/constants';
import SpecialRequestForm from '../../components/SpecialRequestForm';

const SpecialRequestPage: NextPage = () => {
  return (
    <Layout preview={false}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <SpecialRequestForm />
      </Container>
    </Layout>
  );
};

export default SpecialRequestPage;
