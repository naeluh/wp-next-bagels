// log the pageview with their URL
export const pageview = url => {
  if (typeof window !== 'undefined') {
    if (!process.env.PREVIEW) {
      window.gtag('config', 'G-2JTX9SXTHM', {
        page_path: url,
      });
    }
  }
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params);
};
