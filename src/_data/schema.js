import site from "./site.js";

/**
 * Structured data (schema.org) for search engines, built from site.js.
 * Only confirmed facts are included: no street address, hours, service area or ratings
 * unless they are filled in there.
 */
export default {
  "@context": "https://schema.org",
  "@type": site.seo.schemaType,
  name: site.name,
  description: site.seo.description,
  telephone: site.phone.e164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    ...(site.address?.street && { streetAddress: site.address.street }),
    addressLocality: site.locality,
    addressRegion: site.regionCode,
    ...(site.address?.postalCode && { postalCode: site.address.postalCode }),
    addressCountry: site.country,
  },
  ...(site.url && { url: `${site.url}/`, image: `${site.url}${site.seo.ogImage}` }),
};
