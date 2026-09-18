// install-ar-home-url.mjs — run from the repo root:  node install-ar-home-url.mjs
//
// Fix: the Arabic homepage URL was generated as "/ar/" (trailing slash) while
// vercel.json has "trailingSlash": false, so Vercel 308-redirects /ar/ -> /ar.
// Result: sitemap <loc>, <link rel=canonical>, hreflang, og:url and every
// internal link pointed at a URL that redirects, and Search Console listed the
// Arabic homepage as "Page with redirect" + "Alternate page with proper
// canonical tag" — i.e. never indexed under either URL.
//
// After this patch href('ar','home') returns "/ar" (English home stays "/").
// The output file is unchanged (dist/ar/index.html); only the URLs written
// into HTML and sitemap change. /ar/ keeps redirecting to /ar, which is now
// correct: one canonical URL, no redirect in the chain.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = fs.existsSync(path.join(root, "taxcheck-site")) ? path.join(root, "taxcheck-site") : root;
const F = {
  build: path.join(site, "build.mjs"),
  layout: path.join(site, "lib", "layout.mjs"),
};
for (const [k, p] of Object.entries(F)) if (!fs.existsSync(p)) { console.error("STOP: missing " + k + " at " + p); process.exit(1); }

const changed = [];
function patch(file, from, to, label) {
  let s = fs.readFileSync(file, "utf8");
  const crlf = s.includes("\r\n");
  if (crlf) { from = from.replace(/\n/g, "\r\n"); to = to.replace(/\n/g, "\r\n"); }
  if (s.includes(to)) { console.log("OK      " + label + " (already)"); return; }
  const n = s.split(from).length - 1;
  if (n !== 1) { console.error("STOP: " + label + " - expected 1 match, found " + n); process.exit(1); }
  fs.writeFileSync(file, s.replace(from, to), "utf8");
  changed.push(file); console.log("PATCHED " + label);
}

// 1. href(): Arabic home -> "/ar" (no trailing slash). English home stays "/".
patch(F.layout,
  "  const path = route === 'home' ? `${base}/` : `${base}/${route}`;",
  "  // Home: '/' for English, '/ar' for Arabic. vercel.json has trailingSlash:false,\n  // so '/ar/' would 308 to '/ar' — canonical, sitemap and links must use '/ar'.\n  const path = route === 'home' ? (base || '/') : `${base}/${route}`;",
  "layout.mjs href() home path");

// 2. 404 page: the hard-coded Arabic link.
patch(F.build,
  "<a href=\"/ar/\" style=\"color:var(--teal-2)\">النسخة العربية</a>",
  "<a href=\"/ar\" style=\"color:var(--teal-2)\">النسخة العربية</a>",
  "build.mjs 404 page Arabic link");

console.log(changed.length ? "\nDone. Now: cd taxcheck-site && node build.mjs && node ../verify-ar-home-url.mjs" : "\nNothing to do.");
