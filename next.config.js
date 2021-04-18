// next.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: 'empty',
    };
    config.plugins.push(new Dotenv({ silent: true }));
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
  },
};
