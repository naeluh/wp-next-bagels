import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';
import { getBagelChipsData } from '../../lib/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import BagelChipsOrderPage from '../../components/BagelChipsOrderPage';

export default function Index({ preview, allBagelChips }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <BagelChipsOrderPage bagelChipsData={allBagelChips} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ preview = false }) {
  const allBagelChips = await getBagelChipsData(preview);
  return {
    props: {
      allBagelChips,
    },
  };
}
