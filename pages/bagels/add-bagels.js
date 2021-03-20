import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';
import { getBagelsData, getPricingData } from '../../lib/api';

export default function Index({ preview, allBagels, allPricing }) {
  const Container = dynamic(import('../../components/Container'));
  const Header = dynamic(import('../../components/Header'));
  const Layout = dynamic(import('../../components/Layout'));
  const BagelSelections = dynamic(import('../../components/BagelSelections'));
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
