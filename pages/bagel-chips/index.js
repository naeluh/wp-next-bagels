import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CMS_NAME } from '../../lib/constants';
import { getBagelChipsData } from '../../lib/api';

export default function Index({ preview, allBagelChips }) {
  const Container = dynamic(import('../../components/Container'));
  const Header = dynamic(import('../../components/Header'));
  const Layout = dynamic(import('../../components/Layout'));
  const BagelChipsOrderPage = dynamic(
    import('../../components/BagelChipsOrderPage')
  );
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
