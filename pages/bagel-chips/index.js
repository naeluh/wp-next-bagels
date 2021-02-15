import Head from 'next/head';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { CMS_NAME } from '../../lib/constants';
import { getBagelChipsData } from '../../lib/api';
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

export async function getStaticProps({ preview = false }) {
  const allBagelChips = await getBagelChipsData(preview);
  return {
    props: {
      allBagelChips,
    },
  };
}