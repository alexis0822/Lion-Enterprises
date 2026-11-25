// A sitemap needs absolute URLs, so it is only written once the site address is known (SITE_URL).
export default {
  eleventyComputed: {
    permalink: (data) => (data.site.url ? "/sitemap.xml" : false),
  },
};
