import { esc, icons } from '../lib/html.mjs';
import { APP_URL, pageHero, ctaBand } from '../lib/layout.mjs';

// Corporate Tax Challenge #1 — a fictional CT return with 8 planted errors.
// Figures and wording come from the same generator as the LinkedIn PDFs
// (claude/marketing-ct-challenge-1-source.md), so page and PDF cannot drift.
// Route-scoped CSS is inlined so /site.css (the site-wide asset hash) is untouched.
// Strings marked "html" in the dictionary (notes, rules, score, hire) carry <b> only
// and are authored in content.json, never user input.

const STYLE = `<style>
.pg-challenge .ch-main { padding: 8px 0 72px; }
.pg-challenge .ch-grid { display: grid; gap: 18px; }
.pg-challenge .ch-status { display: inline-flex; align-items: center; gap: 10px; margin-top: 22px; padding: 8px 14px; border-radius: 999px;
  border: 1px solid rgba(61,220,151,0.35); background: rgba(61,220,151,0.08); color: var(--ink-2); font-size: 14px; }
.pg-challenge .ch-status i { width: 8px; height: 8px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 5px rgba(61,220,151,0.15); flex: none; }
.pg-challenge .ch-k { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-2); font-weight: 600; }
html[lang="ar"] .pg-challenge .ch-k { letter-spacing: 0; font-size: 13.5px; }
.pg-challenge .card h2 { font-size: clamp(22px, 2.4vw, 28px); font-weight: 800; margin: 6px 0 16px; }
.pg-challenge .card h3 { font-size: 16px; color: var(--gold-2); margin: 22px 0 12px; }
.pg-challenge .kv { display: grid; grid-template-columns: minmax(120px, 200px) 1fr; gap: 6px 18px; font-size: 15px; }
.pg-challenge .kv dt { color: var(--muted); }
.pg-challenge .kv dd { margin: 0; color: var(--ink); font-weight: 600; }
.pg-challenge ol.ch-list { margin: 0; padding: 0; list-style: none; counter-reset: n; display: grid; gap: 10px; }
.pg-challenge ol.ch-list li { counter-increment: n; position: relative; padding-inline-start: 38px; font-size: 15px; color: var(--ink-2); line-height: 1.6; }
.pg-challenge ol.ch-list li::before { content: counter(n); position: absolute; inset-inline-start: 0; top: 1px; width: 26px; height: 26px; border-radius: 50%;
  display: grid; place-items: center; font-size: 12.5px; font-weight: 700; color: var(--teal-2); border: 1px solid var(--line-2); background: rgba(255,255,255,0.04); }
.pg-challenge ol.ch-list.steps li::before { border-radius: 8px; background: var(--gold); color: #1A1200; border: 0; }
.pg-challenge ol.ch-list b { color: var(--ink); font-weight: 600; }
.pg-challenge .ch-unit { font-size: 13px; color: var(--muted); margin: -8px 0 14px; }
.pg-challenge table.ch-t { width: 100%; border-collapse: collapse; font-size: 15px; }
.pg-challenge .ch-t td { padding: 10px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
.pg-challenge .ch-t td.v { text-align: end; white-space: nowrap; font-variant-numeric: tabular-nums; direction: ltr; unicode-bidi: isolate; padding-inline-start: 18px; }
.pg-challenge .ch-t tr.in td { font-size: 14px; color: var(--ink-2); padding: 7px 0; }
.pg-challenge .ch-t tr.in td:first-child { padding-inline-start: 18px; }
.pg-challenge .ch-t tr.sub td { font-weight: 700; border-top: 1px solid var(--line-2); }
.pg-challenge .ch-t tr.total td { font-family: var(--display); font-weight: 800; font-size: 19px; color: var(--gold-2); border-top: 1px solid var(--gold); border-bottom: 0; padding-top: 14px; }
.pg-challenge .ch-side { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 18px; }
.pg-challenge .ch-side div { border: 1px solid var(--line-2); border-radius: 14px; padding: 14px 16px; background: rgba(255,255,255,0.03); }
.pg-challenge .ch-side span { display: block; font-size: 13px; color: var(--muted); }
.pg-challenge .ch-side b { font-size: 18px; }
.pg-challenge .ch-two { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.pg-challenge .ch-note { margin-top: 16px; padding: 14px 16px; border-radius: 14px; border: 1px solid var(--line-2); background: rgba(255,255,255,0.03); font-size: 14.5px; color: var(--ink-2); }
.pg-challenge .ch-note b { color: var(--ink); }
.pg-challenge .ch-note.hire { border-color: rgba(46,211,198,0.4); background: rgba(46,211,198,0.07); color: var(--ink); }
.pg-challenge .ch-acts { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
.pg-challenge .ch-disc { font-size: 13px; color: var(--muted); }
@media (max-width: 860px) { .pg-challenge .ch-two { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .pg-challenge .kv { grid-template-columns: 1fr; gap: 2px; } .pg-challenge .kv dd { margin-bottom: 8px; } .pg-challenge .card { padding: 20px; } }
</style>`;

const table = (rows) => `<table class="ch-t"><tbody>${rows.map((r) =>
  `<tr class="${esc(r.c)}"><td>${r.l}</td><td class="v">${esc(r.v)}</td></tr>`).join('')}</tbody></table>`;

export function renderChallenge({ lang, t }) {
  const c = t.challenge;

  const ctas = `<a class="btn btn-gold btn-lg" href="${c.pdf}" download>${icons.download(18)} ${esc(c.pdfLabel)}</a>`
             + `<a class="btn btn-ghost btn-lg" href="${c.mailto}">${icons.mail(18)} ${esc(c.sendLabel)}</a>`;

  const status = `<div class="ch-status" role="status"><i></i>${esc(c.status)}</div>`;

  const facts = `
<div class="card">
  <div class="ch-k">${esc(c.factsK)}</div><h2>${esc(c.factsH)}</h2>
  <dl class="kv">${c.profile.map((p) => `<dt>${esc(p.k)}</dt><dd>${esc(p.v)}</dd>`).join('')}</dl>
  <h3>${esc(c.notesH)}</h3>
  <ol class="ch-list">${c.notes.map((n) => `<li>${n}</li>`).join('')}</ol>
</div>`;

  const accounts = `
<div class="ch-two">
  <div class="card">
    <div class="ch-k">${esc(c.plK)}</div><h2>${esc(c.plH)}</h2><p class="ch-unit">${esc(c.unit)}</p>
    ${table(c.pl)}
  </div>
  <div class="card">
    <div class="ch-k">${esc(c.rtK)}</div><h2>${esc(c.rtH)}</h2><p class="ch-unit">${esc(c.unit)}</p>
    ${table(c.rt)}
    <div class="ch-side">${c.side.map((s) => `<div><span>${esc(s.k)}</span><b>${esc(s.v)}</b></div>`).join('')}</div>
  </div>
</div>`;

  const rules = `
<div class="card gold" id="take-part">
  <div class="ch-k">${esc(c.rulesK)}</div><h2>${esc(c.rulesH)}</h2>
  <ol class="ch-list steps">${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>
  <div class="ch-note">${c.score}</div>
  <div class="ch-note hire">${c.hire}</div>
  <div class="ch-acts">${ctas}</div>
</div>`;

  const body = `
<section class="ch-main">
  <div class="wrap ch-grid">
    ${facts}
    ${accounts}
    ${rules}
    <p class="ch-disc">${esc(c.disclaimer)}</p>
  </div>
</section>`;

  return STYLE
    + pageHero({ kicker: c.kicker, title: c.h1Html, sub: c.sub, ctas, extra: status })
    + body
    + ctaBand(lang, t, c.ctaH, c.ctaP, t.ctaDemo, APP_URL, '', '');
}
