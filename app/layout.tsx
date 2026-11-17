import type { Metadata } from 'next';
import '../styles/index.css';
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants';
import Footer from '../components/Footer';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: `${CMS_NAME} 🥯`,
    template: `%s | ${CMS_NAME}`,
  },
  description: `${CMS_NAME} Home of the signature Mămălagel 🥯`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <div className='min-h-screen'>
            <main>{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
