import Alert from '../components/alert';
import Footer from '../components/footer';
import Meta from '../components/meta';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const Layout = ({ preview, children }) => {
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <div className='min-h-screen'>
        <main>{children}</main>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
