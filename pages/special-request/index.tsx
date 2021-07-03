import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SpecialRequestForm from '../../components/SpecialRequestForm';

const SpecialRequestPage = () => {
  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 Special Request`}
      desc={`${CMS_NAME} Mămălagels 🥯 Special Request Page`}
    >
      <Header />
      <Container>
        <SpecialRequestForm />
      </Container>
    </Layout>
  );
};

export default SpecialRequestPage;
