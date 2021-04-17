export const getDataQuery = {
  query: `
  {
    allBagels {
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
    pickupLocations {
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
            }
          }
        }
      }
      allBagelChips {
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
};

export const getBagelsQuery = {
  query: `
  {
    allBagels {
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
};

export const getLocationsQuery = {
  query: `
  {
      pickupLocations {
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
            }
          }
        }
      }
    }
  `,
};

export const getBagelChipsQuery = {
  query: `
  {
      allBagelChips {
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
};

export const getPricingQuery = {
  query: `
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
};
