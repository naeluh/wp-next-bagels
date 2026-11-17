/** @type {import('next-sitemap').IConfig} */
const vercel = process.env.VERCEL_URL;
const siteUrl =
  process.env.SITE_URL ||
  (vercel
    ? vercel.startsWith('http')
      ? vercel
      : `https://${vercel}`
    : 'https://mamalagels.com');

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
};
