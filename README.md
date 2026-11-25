# Lion Enterprises

Single-page site for Lion Enterprises, techos e impermeabilización, Hatillo, Puerto Rico. Eleventy writes a static `dist/` folder and inlines the CSS and JavaScript into the page.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

`npm run dev` serves the site at <http://localhost:8080> and reloads when a file changes.

`npm run build` writes the finished site to `dist/`.

## Where to edit

Visible text lives in `src/_data/copy.js`. Phone, email, address, hours, the form, and SEO live in `src/_data/site.js`. A `{phone}` or `{email}` inside a copy string is replaced with the value from `site.js`.

Leave the street address, hours, brand names, warranties, prices, reviews, and any founding date off the page until the business confirms them. `site.address` and `site.hours` stay `null` until then, and those lines stay hidden. Confirmed product lines go in `copy.solutions.productLines`, which is empty until then.

The nav logo is `src/assets/images/lion.jpeg`, shown by the `logo` macro in `src/_includes/macros.njk`. The favicon and the social image in `src/public/` are still the drawn mark.

## Connecting the form

With no endpoint set, the form opens the visitor's own email app with the message already written, and the page says the request is not sent until they send that email. The page shows a success state only after a connected service has accepted the message.

To send from the site, point the form at a service that accepts an `application/x-www-form-urlencoded` POST and answers with JSON:

- the `FORM_ENDPOINT` environment variable, or
- `form.endpoint` in `src/_data/site.js`

The confirmation appears only when the response status is successful and the JSON does not report a problem (`success: false`, `ok: false`, `error`, or `errors`). A non-JSON body is treated as a failure. Formspree, Web3Forms, Formspark, and Basin can do this when they are set to reply with JSON. A service that needs an extra hidden field (Web3Forms uses `access_key`) takes it in `form.extraFields`.

`src/public/_headers` allows that request over HTTPS. Confirm `copy.contact.form.endpoint.privacy` before connecting a service. The mailto privacy line says this site does not store the message.

## Deployment

Set `SITE_URL` to the public address with no trailing slash, for example `https://www.example.com`. The build reads `SITE_URL`, and on Netlify it also reads `URL`. Until one of those is set, the build skips the canonical URL, `sitemap.xml`, and the absolute social-image tags, and prints a reminder.

```bash
npm run build
```

Publish the `dist/` directory. Everything in `src/public/` is copied to the site root: the font, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png` (1200×630), and `_headers`.

`_headers` sets a long cache on the font and adds basic security headers. Netlify and Cloudflare Pages apply that file. On another host, set the same headers in the host's own settings.

## Pre-launch checklist

Confirm each item with the business. Values marked CONFIRM in `site.js` and `copy.js` came from an older listing.

- [ ] Phone (`site.phone`)
- [ ] Email (`site.email`)
- [ ] Legal name (`site.legalName`). Public listings also show "Lion Enterprises, Inc."
- [ ] Street address (`site.address`, hidden while it is `null`)
- [ ] Hours (`site.hours`, hidden while it is `null`)
- [ ] The About paragraph that says the company joined with a manufacturer's technical representative (`copy.about.paragraphs`)
- [ ] Brands and product lines (`copy.solutions.productLines`)
- [ ] The form privacy line, above all if a form service is connected
- [ ] Official logo, then the matching files in `src/public/` (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png`)
- [ ] Domain. Put the address that will actually be served in `SITE_URL`. The old `lionenterprisespr.com` responded with an SSL certificate that did not match that name.
