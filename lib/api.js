require('dotenv').config();

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
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

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data?.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
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
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPages {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getBagelsData(preview) {
  const data = await fetchAPI(
    `
  {
    allBagels(first: 100) {
      edges {
        node {
          id
          title
          isPreview
          content(format: RAW)
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              uri
              mimeType
              isPreview
              id
              altText
            }
          }
        }
      }
    }
  }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  if (!data) {
    return data;
  }
  return data?.allBagels?.edges;
}

export async function getLocationsTimesData(preview) {
  const data = await fetchAPI(
    `
  {
    locations(first: 100) {
      edges {
        node {
          id
          title
          isPreview
          content(format: RAW)
          dateTime {
            dateAndTime {
              dateAndTime
              textDate
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              uri
              mimeType
              isPreview
              id
              altText
            }
          }
        }
      }
    }
  }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  if (!data) {
    return null;
  }
  return data?.locations?.edges;
}

export async function getLocationsData(preview) {
  const data = await fetchAPI(
    `
    {
      pickupLocations(first: 100) {
        edges {
          node {
          title
          isPreview
          content(format: RAW)
            pickupLocationId
            location {
              locationName
              locationAddress
              blackoutDates
              fieldGroupName
              locationDates {
                locationDate
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  if (!data) {
    return null;
  }
  return data?.pickupLocations?.edges;
}

export async function getBagelChipsData(preview) {
  const data = await fetchAPI(
    `
    {
      allBagelChips(first: 100) {
        edges {
          node {
            id
            databaseId
            title
            isPreview
            content(format: RAW)
            bagelChipsDetails {
              quantity
              isThisBagelChipTypeAvailable
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                srcSet(size: LARGE)
                uri
                mimeType
                isPreview
                id
                altText
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  if (!data) {
    return data;
  }
  return data?.allBagelChips?.edges;
}

export async function getPricingData(preview) {
  const data = await fetchAPI(
    `
    {
      prices {
        edges {
          node {
            prices {
              halfDozenPrice
              dozenPrice
              bagelChipsPrice
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  if (!data) {
    return data;
  }
  return data?.prices?.edges;
}

export async function getHomePageData() {
  const data = await fetchAPI(`
  {
    page(id: "cG9zdDoyNQ==") {
      id
      title
      slug
      isFrontPage
      featuredBagel {
        bagelDescription
        bagelSubtitle
        bagelTitle
        bagelImage {
          sourceUrl
          altText
          mimeType
          srcSet
        }
      }
      bagelList {
        bagelListDescription
        bagelListTitle
        bagelPriceDescription
        bagelPriceTitle
        bagelImage {
          sourceUrl
          altText
          mimeType
          srcSet
        }
      }
      bagelDefinition {
        bagelDescription
        bagelQuote
        bagelTitle
      }
      heroContent {
        heroTitle
        heroDescription
        heroImage {
          sourceUrl
          altText
          mimeType
          srcSet
        }
      }
    }
  }
`);
  if (!data) {
    return data;
  }
  const { page } = data;
  return page ? page : {};
}

export async function getBrunchBagDates() {
  const data = await fetchAPI(`
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
  if (!data) {
    return data;
  }
  return data?.brunchBag?.brunchBagsQuantities?.blackOutDateBrunchBag;
}

export async function getNavItems(preview) {
  const data = await fetchAPI(
    `
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
    `
  );

  if (!data || !data.navItems) {
    data.navItems = [];
    return data;
  }
  // Get items that need to be in nav
  data
    ? (data.navItems = data?.posts?.edges
        .filter(({ node }) => node.postSettings.addToNavigation === true)
        .map(({ node }) => {
          return {
            label: node.title,
            url: node.slug,
          };
        }))
    : [];

  return data;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === 'draft';
  const isRevision = isSamePost && postPreview?.status === 'publish';
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      postSettings {
        addToNavigation
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }

    query PostBySlug($id: ID!, $idType: PostIdType!) {
      posts {
        edges {
          node {
            ...PostFields
          }
        }
      }
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: ASC } }) {
          edges {
            node {
              title
              excerpt
              content
            }
          }
        }
        `
            : ''
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  );
  if (!data) {
    return data;
  }

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);

  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
