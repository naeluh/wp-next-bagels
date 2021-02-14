import Alert from './Alert';
import Footer from './Footer';
import Meta from './Meta';
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
