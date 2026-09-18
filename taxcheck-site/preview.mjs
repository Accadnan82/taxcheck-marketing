// Builds a single-file, hash-routed preview of the whole site (both languages, all routes)
// so it can be published as one private artifact page. Not used for production.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, href } from './lib/layout.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const b64 = (f, mime) => `data:${mime};base64,${readFileSync(f).toString('base64')}`;
const logos = Object.fromEntries(readdirSync(join(dist, 'logos')).map((f) => [`/logos/${f}`, b64(join(dist, 'logos', f), 'image/png')]));

const pages = {};
for (const lang of ['en', 'ar']) {
  for (const route of ROUTES) {
    const html = readFileSync(join(dist, href(lang, route), 'index.html'), 'utf8');
    let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
    body = body.replace(/<script src="[^"]+" defer><\/script>/g, '');
    // links → hash routes
    body = body.replace(/href="(\/ar\/|\/)#([^"]+)"/g, (m, base, anchor) => `href="#${base}~${anchor}"`);
    body = body.replace(/href="\/(ar\/)?([a-z-]*)"/g, (m, ar, r) => `href="#/${ar || ''}${r}"`);
    for (const [k, v] of Object.entries(logos)) body = body.split(`src="${k}"`).join(`src="${v}"`);
    pages[`${lang}/${route}`] = body;
  }
}
const css = readFileSync(join(dist, 'site.css'), 'utf8');
const anime = readFileSync(join(dist, 'anime.umd.min.js'), 'utf8');
let site = readFileSync(join(dist, 'site.js'), 'utf8');
site = site.replace('(function () {', 'window.TC_INIT = function () {').replace(/\}\)\(\);\s*$/, '};');
const json = JSON.stringify(pages).replace(/<\//g, '<\\/');

const out = `<title>TaxCheck Site Preview</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Tajawal:wght@400;500;700;800&display=swap">
<style>${css}
.pv-bar { position: fixed; bottom: 14px; inset-inline-start: 14px; z-index: 200; display: flex; gap: 6px; align-items: center; padding: 6px 8px; border-radius: 999px; background: rgba(7,17,28,0.85); border: 1px solid rgba(255,255,255,0.16); backdrop-filter: blur(10px); font: 600 12px/1 'Instrument Sans', system-ui, sans-serif; color: #B9C7D6; }
.pv-bar span { padding: 0 6px; letter-spacing: .08em; text-transform: uppercase; color: #7F92A8; }
.pv-bar a { padding: 7px 10px; border-radius: 999px; color: #EEF3F8; }
.pv-bar a:hover { background: rgba(255,255,255,0.08); }
.pv-bar a.on { background: linear-gradient(135deg,#FFD27A,#F5B94A); color: #1A1200; }
</style>
<script>document.documentElement.classList.add('js');</script>
<div id="app"></div>
<div class="pv-bar" id="pvbar"><span>Preview</span><a href="#/" id="pv-en">EN</a><a href="#/ar/" id="pv-ar">AR</a></div>
<script id="pages" type="application/json">${json}</script>
<script>${anime}</script>
<script>${site}</script>
<script>
(function(){
  var PAGES = JSON.parse(document.getElementById('pages').textContent);
  var app = document.getElementById('app');
  var timers = [];
  var _si = window.setInterval; window.setInterval = function(f, t){ var id = _si(f, t); timers.push(id); return id; };
  function parse(){
    var h = location.hash.replace(/^#/, '') || '/';
    var m = h.match(/^\\/(ar\\/)?([a-z-]*)(?:~([\\w-]+))?$/);
    if (!m) return null;
    return { lang: m[1] ? 'ar' : 'en', route: m[2] || 'home', anchor: m[3] || '' };
  }
  function render(){
    var r = parse();
    if (!r) { // plain in-page anchor (#riskcheck etc.)
      var id = location.hash.slice(1), el = id && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    var key = r.lang + '/' + r.route;
    if (!PAGES[key]) { location.hash = '#/'; return; }
    timers.forEach(clearInterval); timers = [];
    document.documentElement.lang = r.lang; document.documentElement.dir = r.lang === 'ar' ? 'rtl' : 'ltr';
    app.innerHTML = PAGES[key];
    window.scrollTo(0, 0);
    document.getElementById('pv-en').className = r.lang === 'en' ? 'on' : '';
    document.getElementById('pv-ar').className = r.lang === 'ar' ? 'on' : '';
    document.getElementById('pv-en').href = '#/' + (r.route === 'home' ? '' : r.route);
    document.getElementById('pv-ar').href = '#/ar/' + (r.route === 'home' ? '' : r.route);
    window.TC_INIT();
    if (r.anchor) setTimeout(function(){ var el = document.getElementById(r.anchor); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250);
  }
  window.addEventListener('hashchange', render);
  render();
})();
</script>`;
writeFileSync(join(root, 'preview.html'), out);
console.log('preview.html', (out.length / 1024 / 1024).toFixed(2) + ' MB');
