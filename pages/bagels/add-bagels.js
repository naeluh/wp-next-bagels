import Head from 'next/head';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Intro from '../../components/intro';
import BagelForm from '../../components/bagelSelections';
import { CMS_NAME } from '../../lib/constants';
import { getBagelsData, getPricingData } from '../../lib/api';

export default function Index({ preview, allBagels, allPricing }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <Intro />
        <BagelForm bagelData={allBagels} pricing={allPricing} />
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
