import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SpecialRequestForm from '../../components/SpecialRequestForm';
import { getNavItems } from '../../lib/api';

const SpecialRequestPage = ({ navItems }: { navItems: [] }) => {
  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 Special Request`}
      desc={`${CMS_NAME} Mămălagels 🥯 Special Request Page`}
    >
      <Header navItems={navItems} />
      <Container>
        <SpecialRequestForm />
      </Container>
    </Layout>
  );
};

export default SpecialRequestPage;

export async function getStaticProps({ preview = false }) {
  const { navItems } = await getNavItems(preview);
  return {
    props: {
      preview,
      navItems,
    },
  };
}
