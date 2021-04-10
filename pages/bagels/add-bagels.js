import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import { getBagelsData, getPricingData } from '../../lib/api';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import BagelSelections from '../../components/BagelSelections';

export default function Index({ preview, allBagels, allPricing }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <BagelSelections bagelData={allBagels} pricing={allPricing} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPricing = await getPricingData(preview);
  const allBagels = await getBagelsData(preview);
  return {
    props: { preview, allBagels, allPricing },
  };
}
