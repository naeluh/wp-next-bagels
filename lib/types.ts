// Shapes of the WordPress (WPGraphQL) data this site reads. Only fields the UI uses.

export type Edge<T> = { node: T };

export type WPImage = {
  sourceUrl: string;
  altText?: string;
  srcSet?: string;
  mimeType?: string;
};

export type Bagel = {
  id: string;
  title: string;
  content?: string;
  featuredImage?: { node: WPImage } | null;
};

export type BagelChip = {
  id: string;
  databaseId: number;
  title: string;
  bagelChipsDetails: {
    quantity: number | null;
    isThisBagelChipTypeAvailable: boolean | null;
  };
};

export type PickupLocation = {
  title: string;
  pickupLocationId?: string;
  location: {
    locationName: string;
    locationAddress: string;
    blackoutDates?: string | null;
    locationDates?: { locationDate: string }[] | null;
  };
};

export type Prices = {
  halfDozenPrice: number;
  dozenPrice: number;
  dozenName?: string | null;
  bagelChipsPrice: number;
  brunchBagLarge?: number;
  brunchBagSmall?: number;
};

export type LocationTime = {
  id: string;
  title: string;
  content?: string;
  dateTime?: {
    dateAndTime?:
      { dateAndTime?: string | null; textDate?: string | null }[] | null;
  } | null;
  featuredImage?: { node: WPImage } | null;
};

export type HomePage = {
  featuredBagel?: {
    bagelTitle: string;
    bagelSubtitle: string;
    bagelDescription: string;
    bagelImage: WPImage;
  } | null;
  bagelList?: {
    bagelListTitle: string;
    bagelListDescription: string;
    bagelPriceTitle: string;
    bagelPriceDescription: string;
  } | null;
  bagelDefinition?: {
    bagelTitle: string;
    bagelQuote: string;
    bagelDescription: string;
  } | null;
};

export type Post = { title: string; slug: string; content: string };

export type NavItem = { label: string; url: string };

export type BlackOutDate = { blackOutDate: string };

/** Payload of `getDataQuery`, fetched client-side on /bagels and /brunch-bag. */
export type OrderData = {
  allBagels: { edges: Edge<Bagel>[] };
  pickupLocations: { edges: Edge<PickupLocation>[] };
  allBagelChips: { edges: Edge<BagelChip>[] };
  prices: { edges: Edge<{ prices: Prices }>[] };
};

/** One day of brunch-bag bookings from the receipts API (`/api/bags`). */
export type BookedDay = { day?: string; bags?: { type: string }[] };

export type Option = { label: string; value: string };
