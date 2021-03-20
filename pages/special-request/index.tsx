import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';

const SpecialRequestPage: NextPage = () => {
  const Container = dynamic(import('../../components/Container'));
  const Header = dynamic(import('../../components/Header'));
  const Layout = dynamic(import('../../components/Layout'));
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
