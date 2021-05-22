export const getDataQuery = {
  query: `
  {
    allBagels(first: 50) {
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
    pickupLocations(first: 50) {
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
      allBagelChips(first: 50) {
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
              brunchBagLarge
              brunchBagSmall
            }
          }
        }
      }
      brunchBag(id: "cG9zdDo2ODQy") {
       id
       brunchBagsQuantities {
          large
          small
       }
      }

  }
  `,
};

export const getBagelsQuery = {
  query: `
  {
    allBagels(first: 50) {
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
      allBagels(first: 50) {
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
