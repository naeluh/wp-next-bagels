import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ preview, children, title, desc }) => {
  return (
    <>
      <Meta title={title} desc={desc} />
      <div className='min-h-screen'>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
