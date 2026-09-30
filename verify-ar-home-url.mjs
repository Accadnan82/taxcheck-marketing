// verify-ar-home-url.mjs — run after the build, from taxcheck-site/ (or repo root):
//   node ../verify-ar-home-url.mjs      (from taxcheck-site/)
//   node verify-ar-home-url.mjs         (from repo root)
// Exits 1 if any "/ar/" URL survives in dist/.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = fs.existsSync(path.join(root, "dist")) ? path.join(root, "dist") : path.join(root, "taxcheck-site", "dist");
if (!fs.existsSync(dist)) { console.error("STOP: dist/ not found — run node build.mjs first"); process.exit(1); }

let fails = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };

// 1. sitemap
const sm = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.includes("https://taxcheck.ae/ar"), "sitemap lists https://taxcheck.ae/ar");
ok(!locs.includes("https://taxcheck.ae/ar/"), "sitemap does not list https://taxcheck.ae/ar/");
ok(!/taxcheck\.ae\/ar\/["']?\s*\/?>/.test(sm) && !sm.includes('href="https://taxcheck.ae/ar/"'), "sitemap hreflang has no /ar/");
ok(locs.length === 46, `sitemap has 46 URLs (found ${locs.length})`);

// 2. Arabic home HTML
const ar = fs.readFileSync(path.join(dist, "ar", "index.html"), "utf8");
ok(ar.includes('<link rel="canonical" href="https://taxcheck.ae/ar">'), "ar/index.html canonical = https://taxcheck.ae/ar");
ok(ar.includes('hreflang="ar" href="https://taxcheck.ae/ar">'), "ar/index.html hreflang ar = https://taxcheck.ae/ar");
ok(ar.includes('<meta property="og:url" content="https://taxcheck.ae/ar">'), "ar/index.html og:url = https://taxcheck.ae/ar");

// 3. English home points to /ar
const en = fs.readFileSync(path.join(dist, "index.html"), "utf8");
ok(en.includes('hreflang="ar" href="https://taxcheck.ae/ar">'), "index.html hreflang ar = https://taxcheck.ae/ar");
ok(!en.includes('href="/ar/"'), "index.html has no link to /ar/");

// 4. nothing in dist still says /ar/
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const bad = walk(dist).filter((f) => /\.(html|xml|txt)$/.test(f)).filter((f) => /(taxcheck\.ae)?\/ar\/["'#?\s<]/.test(fs.readFileSync(f, "utf8")));
ok(bad.length === 0, "no file in dist/ links to /ar/" + (bad.length ? " — " + bad.map((f) => path.relative(dist, f)).join(", ") : ""));

console.log(fails ? `\n${fails} check(s) failed` : "\nAll checks passed.");
process.exit(fails ? 1 : 0);
