import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Inlined into the client bundle: lib/graphqlFetch.ts calls WordPress from the browser.
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
  images: {
    remotePatterns: [
      { hostname: 'i0.wp.com' },
      { hostname: 'i1.wp.com' },
      { hostname: 'i2.wp.com' },
      { hostname: 'wp.mamalagels.com' },
    ],
    qualities: [50, 75, 100],
  },
  async redirects() {
    return [{ source: '/bagel', destination: '/bagels', permanent: true }];
  },
};

export default nextConfig;
