// next.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: false,
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    WORDPRESS_AUTH_REFRESH_TOKEN: process.env.WORDPRESS_AUTH_REFRESH_TOKEN,
    WORDPRESS_PREVIEW_SECRET: process.env.WORDPRESS_PREVIEW_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    USER: process.env.USER,
    PASS: process.env.PASS,
    PREVIEW: process.env.PREVIEW,
  },
  images: {
    domains: ['i2.wp.com', 'i1.wp.com', 'i0.wp.com', 'wp.mamalagels.com'],
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
