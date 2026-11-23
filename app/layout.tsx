import type { Metadata } from 'next';
import { Inter, Vollkorn } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getNavItems } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import '../styles/index.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700', '900'],
  variable: '--font-inter',
});
const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-vollkorn',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mamalagels.com'),
  title: `${CMS_NAME} 🥯`,
  description: `${CMS_NAME} Home of the signature Mămălagel 🥯`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await getNavItems();
  return (
    <html lang='en' className={`${inter.variable} ${vollkorn.variable}`}>
      <body>
        <div className='min-h-screen'>
          <main>
            <Header navItems={navItems} />
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
