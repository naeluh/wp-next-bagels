import Head from 'next/head';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import { CMS_NAME } from '../../lib/constants';
import { getBagelChipsData } from '../../lib/api';
import BagelChipsOrderPage from '../../components/bagelChipsOrderPage';

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
