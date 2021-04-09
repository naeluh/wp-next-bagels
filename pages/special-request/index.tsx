import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

const SpecialRequestPage: NextPage = () => {
  const SpecialRequestForm = dynamic(
    import('../../components/SpecialRequestForm')
  );
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
