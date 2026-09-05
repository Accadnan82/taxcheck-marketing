import { esc, icons } from '../lib/html.mjs';
import { href, APP_URL, pageHero, ctaBand } from '../lib/layout.mjs';

// Dictionary-driven pages: kicker/title/sub/sections[{h,p,items[{h,p}]}]/note
export function renderGeneric({ lang, t, x, route }) {
  const p = t.pages[route];
  const sections = p.sections.map((s) => {
    const hasItems = s.items && s.items.length;
    return `
<section class="gsec">
  <div class="wrap">
    <div class="grid2">
      <div class="rv" data-rv><h2>${esc(s.h)}</h2>${s.p && hasItems ? `<p class="p">${esc(s.p)}</p>` : ''}</div>
      <div>
        ${hasItems ? `<div class="items">${s.items.map((it) => `<div class="item rv" data-rv><h3>${esc(it.h)}</h3><p>${esc(it.p)}</p></div>`).join('')}</div>` : `<p class="prose rv" data-rv>${esc(s.p)}</p>`}
      </div>
    </div>
  </div>
</section>`;
  }).join('');

  const legal = ['privacy', 'terms', 'disclaimer'].includes(route);
  const cta = legal ? '' : ctaBand(lang, t, t.home.close.title, t.home.close.sub, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
  const ctas = legal ? '' : `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(18)}</a><a class="btn btn-ghost btn-lg" href="${href(lang, 'demo')}">${esc(t.labels.demo)}</a>`;
  const note = p.note ? `<section class="gsec"><div class="wrap"><p class="note rv" data-rv><span class="tag muted">${esc(route === 'product' ? t.sample : t.labels[route])}</span> ${esc(p.note)}</p></div></section>` : '';

  return pageHero({ kicker: p.kicker, title: esc(p.title), sub: p.sub, ctas }) + sections + note + cta;
}
