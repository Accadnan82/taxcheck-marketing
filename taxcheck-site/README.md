# TaxCheck marketing site (taxcheck.ae) — redesigned static site

Dark midnight theme · teal + gold · anime.js motion · English + Arabic (RTL) · all 21 routes of the live site.

## What is in here

```
build.mjs          → builds dist/ (42 pages: 21 routes × EN/AR) + sitemap, robots, vercel.json, 404
preview.mjs        → builds preview.html (single-file, hash-routed preview of the whole site)
content/           → content.json (EN/AR dictionary extracted from the live site) + data.json (sample figures)
lib/               → layout (header / footer / SEO head), html helpers, extra strings, formatters
pages/             → page renderers: home, corporate-tax, vat, ai, accountants, dashboard, pricing,
                     e-invoicing, demo, careers, contact + generic (product, review, businesses,
                     services, resources, security, about, privacy, terms, disclaimer)
public/            → site.css, site.js, anime.umd.min.js, favicons, og.png, logos/
dist/              → the built site (ready to deploy as-is)
```

## Build

```
node build.mjs        # Node 18+ — no npm install needed
node preview.mjs      # optional: single-file preview
```

## Deploy on Vercel

Option A — upload `dist/` as a static site (`vercel deploy dist --prod`, or drag-and-drop in the dashboard).

Option B — connect this folder as a Git repository and set in the Vercel project:
- Framework preset: **Other**
- Build command: `node build.mjs`
- Output directory: `dist`

`dist/vercel.json` already sets clean URLs (`/product`, `/ar/product`) and cache headers.

## Editing content

All copy lives in `content/content.json` (`en` and `ar` keys, same structure). Edit a string, run `node build.mjs`.
Strings that did not exist on the live site (WhatsApp buttons, Ziina labels, "used by 10 companies", …) live in `lib/extra.mjs`.

## Forms

Demo / Careers / Contact validate in the browser and then hand the message to WhatsApp (+971 50 552 3307) or email
(info@taxcheck.ae) — nothing is stored on the site. To also post submissions to a backend, define
`window.TC_FORM_ENDPOINT = 'https://…'` before `site.js` loads; the form will POST JSON `{kind, lang, fields, page}`.

## Links

- Sign in / Start Free → https://app.taxcheck.ae/
- Expert Filing Review → Ziina: https://pay.ziina.com/taxcheck/D8rt-YjQc (handle @taxcheck)
