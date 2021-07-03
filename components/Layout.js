import Footer from './Footer';
import Meta from './Meta';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const Layout = ({ preview, children, title, desc }) => {
  const theme = createMuiTheme({
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
