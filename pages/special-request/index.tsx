import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SpecialRequestForm from '../../components/SpecialRequestForm';

const SpecialRequestPage = () => {
  return (
    <Layout preview={false}>
      <Head>
        <title>{CMS_NAME} 🥯 Special Request</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <Container>
        <SpecialRequestForm />
      </Container>
    </Layout>
  );
};

export default SpecialRequestPage;
