import { esc, attr, join, icons } from './html.mjs';

export const SITE_URL = 'https://taxcheck.ae';
export const APP_URL = 'https://app.taxcheck.ae/';
export const PHONE = '+971 50 552 3307';
export const PHONE_E164 = '971505523307';
export const EMAIL = 'info@taxcheck.ae';
export const ZIINA = 'https://pay.ziina.com/taxcheck/D8rt-YjQc';
export const SOCIAL = {
  x: 'https://x.com/TaxcheckUAE',
  linkedin: 'https://www.linkedin.com/company/taxcheck-uae/',
  facebook: 'https://www.facebook.com/profile.php?id=61593565477591',
};

export let ASSET_V = '';
export function setAssetVersion(v) { ASSET_V = v; }
export const GTM_ID = 'GTM-PLSJWP9C';

export const ROUTES = ['home', 'product', 'ai', 'corporate-tax', 'vat', 'review', 'dashboard', 'accountants', 'businesses', 'services', 'einvoicing', 'pricing', 'demo', 'resources', 'security', 'about', 'contact', 'careers', 'privacy', 'terms', 'disclaimer'];

// URL for a route in a language. EN lives at the root, AR under /ar.
export function href(lang, route, hash = '') {
  const base = lang === 'ar' ? '/ar' : '';
  const path = route === 'home' ? `${base}/` : `${base}/${route}`;
  return path + (hash ? `#${hash}` : '');
}

export function fontLinks(lang) {
  const fam = [
    'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800',
    'family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400',
  ];
  if (lang === 'ar') fam.push('family=Tajawal:wght@400;500;700;800');
  return `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fam.join('&')}&display=swap">`;
}

function navLink(lang, t, route, current, cls = '') {
  const on = route === current ? ' on' : '';
  return `<a class="${cls}${on}" href="${href(lang, route)}"${on ? ' aria-current="page"' : ''}>${esc(t.labels[route])}</a>`;
}

export function header(lang, t, route) {
  const other = lang === 'ar' ? 'en' : 'ar';
  const nav = t.navMain.map((r) => navLink(lang, t, r, route)).join('');
  const mnav = ['home', ...t.navMain].map((r) => navLink(lang, t, r, route)).join('');
  return `
<div class="announce" role="region" aria-label="Notice"><div class="wrap"><span class="dot"></span><p>${esc(t.announce)} <a href="${href(lang, 'home', 'riskcheck')}">${esc(t.announceLink)} ${icons.arrow(14)}</a></p></div></div>
<header class="hdr" id="hdr">
  <div class="wrap">
    <a class="brand" href="${href(lang, 'home')}" aria-label="${attr(t.brand)}"><span class="mark">T</span><span>${esc(t.brand)}<em>${esc(t.brandSuffix)}</em></span></a>
    <nav class="nav" aria-label="Primary">${nav}</nav>
    <div class="acts">
      <a class="pill" href="${href(other, route)}" lang="${other}" hreflang="${other}" rel="alternate">${esc(t.langToggle)}</a>
      <a class="btn btn-ghost" href="${APP_URL}">${esc(t.signIn)}</a>
      <a class="btn btn-gold" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(16)}</a>
      <button class="menu" type="button" aria-label="${attr(t.menu)}" aria-expanded="false" aria-controls="mnav" id="menuBtn">${icons.menu(20)}</button>
    </div>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile">
  ${mnav}
  <div class="mnav-acts">
    <a class="btn btn-ghost" href="${APP_URL}">${esc(t.signIn)}</a>
    <a class="btn btn-gold" href="${APP_URL}">${esc(t.ctaDemo)}</a>
    <a class="pill" href="${href(other, route)}" lang="${other}">${esc(t.langToggle)}</a>
  </div>
</nav>`;
}

export function footer(lang, t) {
  const cols = t.footerCols
    .map((c) => `<div class="fcol"><h4>${esc(c.h)}</h4>${c.links.map((r) => `<a href="${href(lang, r)}">${esc(t.labels[r])}</a>`).join('')}</div>`)
    .join('');
  const others = t.gcc.others.map((o) => `<span class="jur">${esc(o)} <small>${esc(t.gcc.plannedTag)}</small></span>`).join('');
  const year = new Date().getFullYear();
  return `
<footer class="ftr">
  <div class="wrap">
    <div class="ftop">
      <div class="fbrand">
        <a class="brand" href="${href(lang, 'home')}"><span class="mark">T</span><span>${esc(t.brand)}<em>${esc(t.brandSuffix)}</em></span></a>
        <p class="tagline">${esc(t.home.ftrTag)}</p>
        <div class="fcontact">
          <a href="mailto:${EMAIL}">${icons.mail(16)} ${EMAIL}</a>
          <a href="https://wa.me/${PHONE_E164}" rel="noopener"><span dir="ltr">${icons.wa(16)} ${PHONE}</span></a>
        </div>
        <div class="social">
          <a href="${SOCIAL.linkedin}" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z"/></svg></a>
          <a href="${SOCIAL.x}" rel="noopener" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L6.9 4.7H5.1l11.3 14.5z"/></svg></a>
          <a href="${SOCIAL.facebook}" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg></a>
        </div>
      </div>
      <div class="fcols">${cols}</div>
    </div>
    <div class="gcc">
      <span class="glabel">${esc(t.gcc.label)}</span>
      <span class="jur live"><i></i>${esc(t.gcc.live)}</span>
      <span class="gplanned">${esc(t.gcc.planned)}</span>
      ${others}
    </div>
    <p class="legal">${esc(t.notFTA)}</p>
    <div class="fbottom"><span>© ${year} ${esc(t.brand)} ${esc(t.brandSuffix)}</span><span>${esc(t.reviewed)}</span></div>
  </div>
</footer>`;
}

/**
 * Wrap a page body in the full document.
 * opts: { lang, route, t, title, description, body, jsonLd }
 */
export function shell({ lang, route, t, title, description, body, jsonLd }) {
  const path = href(lang, route);
  const enUrl = SITE_URL + href('en', route);
  const arUrl = SITE_URL + href('ar', route);
  const fullTitle = route === 'home' ? `${t.brand} ${t.brandSuffix} — ${title}` : `${title} — ${t.brand}`;
  const dir = t.dir || (lang === 'ar' ? 'rtl' : 'ltr');
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${SITE_URL}${path}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="ar" href="${arUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(t.brand)}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${SITE_URL}${path}">
<meta property="og:image" content="${SITE_URL}/og.png">
<meta property="og:locale" content="${lang === 'ar' ? 'ar_AE' : 'en_AE'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@TaxcheckUAE">
<meta name="theme-color" content="#07111C">
<script>document.documentElement.classList.add('js')</script>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" sizes="64x64" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${fontLinks(lang)}
<link rel="stylesheet" href="/site.css?v=${ASSET_V}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body data-lang="${lang}" data-route="${route}">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<div class="sky" aria-hidden="true"><div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div></div>
<div class="grain" aria-hidden="true"></div>
<a class="skip" href="#main">${lang === 'ar' ? 'تخطي إلى المحتوى' : 'Skip to content'}</a>
<div class="page">
${header(lang, t, route)}
<main id="main" class="pg pg-${route}">
${body}
</main>
${footer(lang, t)}
</div>
<script src="/anime.umd.min.js?v=4" defer></script>
<script src="/site.js?v=${ASSET_V}" defer></script>
</body>
</html>`;
}

// Reusable section primitives -------------------------------------------

export function pageHero({ kicker, title, sub, ctas = '', extra = '' }) {
  return `
<section class="phero">
  <div class="wrap">
    <div class="eyebrow rv" data-hero><i></i>${esc(kicker)}</div>
    <h1 class="rv" data-hero>${title}</h1>
    ${sub ? `<p class="lede rv" data-hero>${esc(sub)}</p>` : ''}
    ${ctas ? `<div class="cta rv" data-hero>${ctas}</div>` : ''}
    ${extra}
  </div>
</section>`;
}

export function sectionHead(kicker, title, p = '', cls = '') {
  return `<div class="shead ${cls}"><div class="eyebrow rv" data-rv><i></i>${esc(kicker)}</div><h2 class="rv" data-rv>${esc(title)}</h2>${p ? `<p class="rv" data-rv>${esc(p)}</p>` : ''}</div>`;
}

export function ctaBand(lang, t, title, sub, primaryLabel, primaryHref, secondaryLabel, secondaryHref) {
  return `
<section class="cta-band">
  <div class="in rv" data-rv>
    <div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div>
    <div class="cta">
      <a class="btn btn-gold btn-lg" href="${primaryHref}">${esc(primaryLabel)} ${icons.arrow(18)}</a>
      ${secondaryLabel ? `<a class="btn btn-ghost btn-lg" href="${secondaryHref}">${esc(secondaryLabel)}</a>` : ''}
    </div>
  </div>
</section>`;
}

export function sampleNote(t, text) {
  return `<p class="note rv" data-rv><span class="tag muted">${esc(t.sample)}</span> ${esc(text)}</p>`;
}

export { esc, attr, join, icons };
