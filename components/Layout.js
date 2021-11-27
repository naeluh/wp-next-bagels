import Footer from './Footer';
import Meta from './Meta';
import { ThemeProvider, createTheme } from '@material-ui/core';

const Layout = ({ preview, children, title, desc }) => {
  const theme = createTheme({
    palette: {
      type: 'light',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Meta title={title} desc={desc} />
      <div className='min-h-screen'>
        <main>{children}</main>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
