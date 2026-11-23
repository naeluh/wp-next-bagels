// Server-side WPGraphQL queries (build/ISR time).
import { cache } from 'react';
import type {
  Bagel,
  BlackOutDate,
  Edge,
  HomePage,
  LocationTime,
  NavItem,
  Post,
} from './types';

async function fetchAPI<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<Partial<T>> {
  try {
    const res = await fetch(process.env.WORDPRESS_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

const IMAGE_FIELDS = `
  featuredImage {
    node {
      sourceUrl(size: LARGE)
      srcSet(size: LARGE)
      mimeType
      altText
    }
  }`;

export async function getAllPostsWithSlug() {
  const data = await fetchAPI<{ posts: { edges: Edge<{ slug: string }>[] } }>(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data.posts?.edges ?? [];
}

export async function getBagelsData() {
  const data = await fetchAPI<{ allBagels: { edges: Edge<Bagel>[] } }>(`
    {
      allBagels(first: 100) {
        edges {
          node {
            id
            title
            content(format: RAW)
            ${IMAGE_FIELDS}
          }
        }
      }
    }
  `);
  return data.allBagels?.edges;
}

export async function getLocationsTimesData() {
  const data = await fetchAPI<{ locations: { edges: Edge<LocationTime>[] } }>(`
    {
      locations(first: 100) {
        edges {
          node {
            id
            title
            content(format: RAW)
            dateTime {
              dateAndTime {
                dateAndTime
                textDate
              }
            }
            ${IMAGE_FIELDS}
          }
        }
      }
    }
  `);
  return data.locations?.edges;
}

export async function getHomePageData() {
  const image = `bagelImage { sourceUrl altText mimeType srcSet }`;
  const data = await fetchAPI<{ page: HomePage }>(`
    {
      page(id: "cG9zdDoyNQ==") {
        featuredBagel {
          bagelDescription
          bagelSubtitle
          bagelTitle
          ${image}
        }
        bagelList {
          bagelListDescription
          bagelListTitle
          bagelPriceDescription
          bagelPriceTitle
        }
        bagelDefinition {
          bagelDescription
          bagelQuote
          bagelTitle
        }
      }
    }
  `);
  return data.page ?? {};
}

export async function getBrunchBagDates() {
  const data = await fetchAPI<{
    brunchBag: {
      brunchBagsQuantities: { blackOutDateBrunchBag: BlackOutDate[] | null };
    };
  }>(`
    {
      brunchBag(id: "cG9zdDo2ODQy") {
        brunchBagsQuantities {
          blackOutDateBrunchBag {
            blackOutDate
          }
        }
      }
    }
  `);
  return data.brunchBag?.brunchBagsQuantities?.blackOutDateBrunchBag ?? [];
}

/** WordPress posts flagged "Add to navigation" become extra header links. */
export async function getNavItems(): Promise<NavItem[]> {
  const data = await fetchAPI<{
    posts: {
      edges: Edge<{
        title: string;
        slug: string;
        postSettings: { addToNavigation: boolean | null };
      }>[];
    };
  }>(`
    {
      posts {
        edges {
          node {
            title
            slug
            postSettings {
              addToNavigation
            }
          }
        }
      }
    }
  `);
  return (data.posts?.edges ?? [])
    .filter(({ node }) => node.postSettings?.addToNavigation === true)
    .map(({ node }) => ({ label: node.title, url: node.slug }));
}

// cache(): generateMetadata and the page share one request per render.
export const getPost = cache(async (slug: string) => {
  const data = await fetchAPI<{ post: Post | null }>(
    `
    query PostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        slug
        content
      }
    }
  `,
    { id: slug }
  );
  // fetchAPI returns {} when WordPress fails: throw so a 10s refresh keeps
  // serving the last good page instead of caching a 404.
  if (data.post === undefined) throw new Error(`Failed to fetch post ${slug}`);
  return data.post;
});
