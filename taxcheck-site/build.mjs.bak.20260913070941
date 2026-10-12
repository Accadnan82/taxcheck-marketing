import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { shell, href, ROUTES, SITE_URL, setAssetVersion } from './lib/layout.mjs';
import { EXTRA } from './lib/extra.mjs';
import { renderHome } from './render/home.mjs';
import { renderGeneric } from './render/generic.mjs';
import { renderCT, renderVAT, renderAI, renderACC, renderDash, renderPricing, renderEinv } from './render/pages.mjs';
import { renderDemo, renderCareers, renderContact } from './render/forms.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(join(root, 'content/content.json'), 'utf8'));
const data = JSON.parse(readFileSync(join(root, 'content/data.json'), 'utf8'));
const dist = join(root, 'dist');

const renderers = {
  home: renderHome, 'corporate-tax': renderCT, vat: renderVAT, ai: renderAI, accountants: renderACC, dashboard: renderDash,
  pricing: renderPricing, einvoicing: renderEinv, demo: renderDemo, careers: renderCareers, contact: renderContact,
};
const dictKey = { 'corporate-tax': 'ct', accountants: 'acc', dashboard: 'dash', einvoicing: 'einv' };

function meta(t, route) {
  if (route === 'home') return { title: t.home.heroL1 + ' ' + t.home.heroL2, description: t.home.heroSub };
  const d = t[dictKey[route] || route] || t.pages[route];
  return { title: d.title, description: d.sub || t.notFTA };
}

setAssetVersion(createHash('sha1').update(readFileSync(join(root, 'public/site.css'))).update(readFileSync(join(root, 'public/site.js'))).digest('hex').slice(0, 8));
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });

const urls = [];
for (const lang of ['en', 'ar']) {
  const t = content[lang];
  const x = EXTRA[lang];
  for (const route of ROUTES) {
    const render = renderers[route] || renderGeneric;
    const body = render({ lang, t, x, data, route });
    const { title, description } = meta(t, route);
    const jsonLd = route === 'home' ? {
      '@context': 'https://schema.org', '@type': 'Organization', name: 'TaxCheck', url: SITE_URL, logo: SITE_URL + '/apple-touch-icon.png',
      email: 'info@taxcheck.ae', telephone: '+971505523307', address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
      sameAs: ['https://x.com/TaxcheckUAE', 'https://www.linkedin.com/company/taxcheck-uae/'],
    } : null;
    const html = shell({ lang, route, t, title, description, body, jsonLd });
    const path = href(lang, route);
    const outDir = join(dist, path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    urls.push({ path, lang, route });
  }
}

// sitemap + robots + vercel config
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.path}</loc><lastmod>${today}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${href('en', u.route)}"/><xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${href('ar', u.route)}"/></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
// 404
writeFileSync(join(dist, '404.html'), shell({ lang: 'en', route: 'home', t: content.en, title: 'Page not found', description: content.en.notFTA, body: `<section class="phero"><div class="wrap"><div class="eyebrow"><i></i>404</div><h1>Page not found</h1><p class="lede">The page you were looking for does not exist. <a href="/" style="color:var(--teal-2)">Go to the homepage</a> · <a href="/ar/" style="color:var(--teal-2)">النسخة العربية</a></p></div></section>` }));

console.log(`built ${urls.length} pages → dist/`);
