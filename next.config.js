/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i0.wp.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i1.wp.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i2.wp.com', pathname: '/**' },
      { protocol: 'https', hostname: 'wp.mamalagels.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/bagel',
        destination: '/bagels',
        permanent: true,
      },
    ];
  },
};
