import type { MetadataRoute } from 'next';
import { getAllPostsWithSlug } from '../lib/api';

const SITE = 'https://mamalagels.com';
const ROUTES = [
  '',
  '/bagels',
  '/brunch-bag',
  '/checkout',
  '/location-times',
  '/menu',
  '/special-request',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsWithSlug();
  const lastModified = new Date();
  return [...ROUTES, ...posts.map(({ node }) => `/${node.slug}`)].map(path => ({
    url: SITE + path,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}
