import { oneLine, stripIndent } from 'common-tags';
import Head from 'next/head';
import Script from 'next/script';
import { HOME_OG_IMAGE_URL } from '../lib/constants';

const Meta = ({ title, desc }) => {
  return (
    <></>
    // <Head>
    //   <link
    //     rel='apple-touch-icon'
    //     sizes='180x180'
    //     href='/favicon/apple-touch-icon.png'
    //   />
    //   <link
    //     rel='icon'
    //     type='image/png'
    //     sizes='32x32'
    //     href='/favicon/favicon-32x32.png'
    //   />
    //   <link
    //     rel='icon'
    //     type='image/png'
    //     sizes='16x16'
    //     href='/favicon/favicon-16x16.png'
    //   />
    //   <link rel='manifest' href='/favicon/site.webmanifest' />
    //   <link
    //     rel='mask-icon'
    //     href='/favicon/safari-pinned-tab.svg'
    //     color='#fad113'
    //   />
    //   <link rel='shortcut icon' href='/favicon/favicon.ico' />
    //   <meta name='msapplication-TileColor' content='#fad113' />
    //   <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
    //   <meta name='theme-color' content='#333' />
    //   <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
    //   <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    //   <title>{title}</title>
    //   <meta name='description' content={desc} />
    //   <meta property='og:image' content={HOME_OG_IMAGE_URL} />
    //   <meta property='og:title' content={title} />
    //   <meta property='og:type' content='website' />
    //   <meta property='og:description' content={desc} />
    //   <meta property='og:locale' content='en_US' />
    //   <meta name='twitter:title' content={title} />
    //   <meta name='twitter:description' content={desc} />
    //   <meta name='twitter:image' content={HOME_OG_IMAGE_URL} />
    //   <meta name='twitter:card' content='summary_large_image' />
    //   {/* Global Site Tag (gtag.js) - Google Analytics */}
    //   <Script
    //     async
    //     src='https://www.googletagmanager.com/gtag/js?id=G-2JTX9SXTHM'
    //   ></Script>
    //   <div
    //     dangerouslySetInnerHTML={{
    //       __html: oneLine`${stripIndent`
    //        <script>
    //           window.dataLayer = window.dataLayer || [];
    //           function gtag(){dataLayer.push(arguments);}
    //           gtag('js', new Date());
    //           gtag('config', 'G-2JTX9SXTHM');
    //         </script>
    //       `}`,
    //     }}
    //   />
    // </Head>
  );
};

export default Meta;
