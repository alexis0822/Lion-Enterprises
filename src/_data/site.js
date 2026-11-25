/**
 * BUSINESS FACTS AND SITE SETTINGS
 * ---------------------------------------------------------------------------
 * Every phone number, email, link and structured-data value on the site is
 * generated from this file. Change a value here and it updates everywhere.
 *
 * Items marked CONFIRM come from an older Lion Enterprises contact page and
 * must be verified with the business before launch.
 */

// Public address of the site, without a trailing slash, e.g. "https://www.example.com".
// Set it as the SITE_URL environment variable on your host (Netlify fills in URL by itself).
const url = (process.env.SITE_URL || process.env.URL || "").replace(/\/+$/, "");

export default {
  name: "Lion Enterprises",
  // Shown in the footer copyright line. CONFIRM the exact legal name (public listings also show "Lion Enterprises, Inc.").
  legalName: "Lion Enterprises",
  descriptor: "Techos e impermeabilización",

  locality: "Hatillo",
  region: "Puerto Rico",
  regionCode: "PR",
  country: "US",
  lang: "es-PR",
  url,

  // CONFIRM both before launch.
  phone: {
    display: "787-308-0456",
    e164: "+17873080456", // used for tel: links
  },
  email: "lionenterprisepr@gmail.com",

  // Street address: public listings disagree, so nothing is shown until it is confirmed.
  // To publish it, replace null with e.g. { street: "…", postalCode: "00659" }.
  // It then appears in the contact section, the footer and the structured data.
  address: null,

  // Business hours: not confirmed, so nothing is shown.
  // To publish them, replace null with e.g. [{ days: "Lunes a viernes", time: "8:00 a. m. – 5:00 p. m." }].
  hours: null,

  form: {
    // Where the inquiry form is sent.
    //   ""   → no form service connected. The form opens the visitor's own email app
    //          with the message pre-written (and says so on the page).
    //   URL  → the form is POSTed to that address (Formspree, Web3Forms, Formspark, Basin…)
    //          and shows a confirmation only when the service accepts the message.
    // Can also be set with the FORM_ENDPOINT environment variable.
    endpoint: process.env.FORM_ENDPOINT || "",
    // Extra hidden fields some services require, e.g. { access_key: "…" } for Web3Forms.
    extraFields: {},
  },

  seo: {
    title: "Sellado de techos e impermeabilización | Lion Enterprises, Hatillo PR",
    description:
      "Sistemas de impermeabilización y sellado de techos para hogares, negocios y contratistas. Lion Enterprises, Hatillo, Puerto Rico. Llama al 787-308-0456.",
    ogImage: "/og-image.png", // 1200 × 630, lives in src/public
    ogImageAlt: "Lion Enterprises — techos e impermeabilización en Hatillo, Puerto Rico",
    // schema.org type used in the structured data.
    schemaType: "HomeAndConstructionBusiness",
  },
};
