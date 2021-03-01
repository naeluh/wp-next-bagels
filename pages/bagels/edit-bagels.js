import Head from 'next/head';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Intro from '../../components/Intro';
import BagelSelections from '../../components/BagelSelections';

import { getBagelsData } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export default function Index({ preview, allBagels }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Container>
        <Intro />
        <BagelSelections bagelData={allBagels} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allBagels = await getBagelsData(preview);
  return {
    props: { preview, allBagels },
  };
}
