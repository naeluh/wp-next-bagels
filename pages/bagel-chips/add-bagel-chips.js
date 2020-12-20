import Head from 'next/head';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Intro from '../../components/intro';
import BagelForm from '../../components/bagelForm';

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
        <h4>add-bagels</h4>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  console.log(preview);
  const allBagels = await getBagelsData(preview);
  return {
    props: { preview, allBagels },
  };
}
