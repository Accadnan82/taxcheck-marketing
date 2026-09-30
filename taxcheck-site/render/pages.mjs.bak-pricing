import { esc, attr, icons, badge } from '../lib/html.mjs';
import { href, APP_URL, ZIINA, pageHero, sectionHead, ctaBand, sampleNote } from '../lib/layout.mjs';
import { fmtDate, fmtDay, money } from '../lib/fmt.mjs';

const frameBar = (t, label) => `<div class="bar"><i></i><i></i><i></i><span class="url">app.taxcheck.ae · ${esc(label)}</span><span class="live"><i></i>${esc(t.sample)}</span></div>`;

// ---------------- Corporate Tax ----------------
export function renderCT({ lang, t, x, data }) {
  const c = t.ct;
  const rows = c.rows.map((r) => `<tr class="pr"><td class="n">${esc(r.n)}</td><td class="h">${esc(r.h)}</td><td>${badge(r.s === 'ok' ? 'ok' : r.s === 'warn' ? 'warn' : 'bad', c.statusL[r.s])}</td><td class="p">${esc(r.r)}</td></tr>`).join('');
  const calc = c.calcRows.map((r) => {
    const v = data.ct[r.k];
    const total = r.k === 'tax' || r.k === 'taxable';
    return `<tr${total ? ' class="total"' : ''}><td>${esc(r.l)}</td><td class="num${v < 0 ? ' neg' : ''}">AED <span data-count="${v}">0</span></td></tr>`;
  }).join('');
  return pageHero({ kicker: c.kicker, title: esc(c.title), sub: c.sub, ctas: `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(18)}</a><a class="btn btn-ghost btn-lg" href="#calc">${esc(c.calcTitle)}</a>` }) + `
<section>
  <div class="wrap">
    <div class="plate rv" data-rv data-plate>
      <div class="ptitle"><span>${esc(c.plateTitle)}</span><span>${esc(c.doc)}</span><span>${esc(c.rev)}</span><span>${esc(c.sheet)}</span></div>
      <div class="tbl-wrap" style="border:0;border-radius:0"><table><thead><tr>${c.cols.map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
    </div>
    ${sampleNote(t, t.pages.product.note)}
  </div>
</section>
<section id="calc" style="padding-top:0">
  <div class="wrap">
    <div class="grid g2" style="align-items:start">
      <div>${sectionHead(t.taxType.ct, c.calcTitle, c.calcNote)}</div>
      <div class="frame rv" data-rv>${frameBar(t, c.sheet)}<div class="fbody"><div class="tbl-wrap"><table class="tbl" style="min-width:0"><tbody>${calc}</tbody></table></div></div></div>
    </div>
  </div>
</section>` + ctaBand(lang, t, c.ctaTitle, c.ctaSub, t.labels.demo, href(lang, 'demo'), t.ctaDemo, APP_URL);
}

// ---------------- VAT ----------------
export function renderVAT({ lang, t, x, data }) {
  const v = t.vat, d = data.vat, em = data.emirates;
  const th = v.cols.map((k, i) => `<th${i ? ' class="num"' : ''}>${esc(k)}</th>`).join('');
  const cell = (n, neg) => n == null ? '<td class="num">—</td>' : `<td class="num${n < 0 ? ' neg' : ''}"><span data-count="${n}">0</span></td>`;
  const emRows = em.map((e, i) => `<tr><td>${esc(v.emirates[i])}</td>${cell(e.a)}${cell(e.v)}${cell(e.adj)}</tr>`).join('');
  const other = v.otherRows.map((r) => {
    const a = r.kind === 'v' ? null : (r.kind === 'a' ? d[r.k] : d[r.k + 'A']);
    const vv = r.kind === 'a' ? 0 : (r.kind === 'v' ? d[r.k] : d[r.k + 'V']);
    return `<tr><td>${esc(r.l)}</td>${cell(a)}${cell(vv)}<td class="num">—</td></tr>`;
  }).join('');
  const outA = em.reduce((s, e) => s + e.a, 0) + d.rcA + d.zero + d.exempt + d.impA;
  const outV = em.reduce((s, e) => s + e.v + e.adj, 0) + d.tourist + d.rcV + d.impV;
  const inRows = `<tr><td>${esc(v.inRows[0].l)}</td>${cell(d.inA)}${cell(d.inV)}<td class="num">—</td></tr><tr><td>${esc(v.inRows[1].l)}</td>${cell(d.impA)}${cell(d.impV)}<td class="num">—</td></tr>`;
  const inV = d.inV + d.impV, net = outV - inV;
  return pageHero({ kicker: v.kicker, title: esc(v.title), sub: v.sub, ctas: `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(18)}</a><a class="btn btn-ghost btn-lg" href="${href(lang, 'demo')}">${esc(t.labels.demo)}</a>` }) + `
<section>
  <div class="wrap">
    <div class="frame rv" data-rv>${frameBar(t, 'VAT 201 · ' + t.period.q2)}
      <div class="fbody">
        <h3 style="font-size:16px;margin:4px 0 12px">${esc(v.outTitle)}</h3>
        <div class="tbl-wrap"><table class="tbl"><thead><tr>${th}</tr></thead><tbody>${emRows}${other}<tr class="total"><td>${esc(v.totOut)}</td>${cell(outA)}${cell(outV)}<td></td></tr></tbody></table></div>
        <h3 style="font-size:16px;margin:22px 0 12px">${esc(v.inTitle)}</h3>
        <div class="tbl-wrap"><table class="tbl"><thead><tr>${th}</tr></thead><tbody>${inRows}<tr class="total"><td>${esc(v.totIn)}</td>${cell(d.inA + d.impA)}${cell(inV)}<td></td></tr><tr class="total"><td>${esc(net >= 0 ? v.net : v.netRefund)}</td><td></td>${cell(Math.abs(net))}<td></td></tr></tbody></table></div>
      </div>
    </div>
    ${sampleNote(t, v.note)}
  </div>
</section>` + ctaBand(lang, t, v.ctaTitle, v.ctaSub, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
}

// ---------------- AI assistant ----------------
export function renderAI({ lang, t, x }) {
  const a = t.ai, c = a.card;
  const row = (l, body, cls = '') => `<div class="row ${cls}"><div class="l">${esc(l)}</div>${body}</div>`;
  return pageHero({ kicker: a.kicker, title: esc(a.title), sub: a.sub }) + `
<section style="padding-top:20px">
  <div class="wrap ai-demo">
    <div class="ask rv" data-rv id="ask">
      <div class="l" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">${esc(a.chipLabel)}</div>
      <div class="chips"><button type="button" class="chip on" data-q="${attr(a.chip)}">${esc(a.chip)}</button></div>
      <div class="inp"><input type="text" value="${attr(a.chip)}" aria-label="${attr(a.chipLabel)}" id="askInput"><button type="button" class="btn btn-gold" id="askBtn">${esc(a.ask)} ${icons.arrow(16)}</button></div>
      <div class="think"><i></i><i></i><i></i><span>${esc(a.thinking)}</span></div>
      <div class="grid" style="margin-top:20px;gap:10px">${a.props.map((p) => `<div class="answer"><p style="margin:0;color:var(--ink-2)">${icons.spark(14)} ${esc(p)}</p></div>`).join('')}</div>
    </div>
    <div class="acard" id="acard" aria-live="polite">
      ${row(c.ansL, `<p class="ans">${esc(c.ans)}</p>`)}
      ${row(c.whyL, `<p class="txt">${esc(c.why)}</p>`)}
      ${row(c.missL, `<ul>${c.miss.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`)}
      ${row(c.confL, `<div class="conf"><div class="track"><b data-w="${c.confPct}"></b></div><span class="num"><b>${esc(c.conf)}</b> · <span data-count="${c.confPct}" data-suffix="%">0%</span></span></div>`)}
      ${row(c.srcL, `<ul>${c.src.map((s) => `<li class="src">${esc(s)}</li>`).join('')}</ul>`)}
      ${row(c.effL, `<p class="txt">${esc(c.eff)}</p>`)}
      ${row(c.actL, `<p class="txt" style="color:var(--ink)">${esc(c.act)}</p>`)}
      <p class="disc row">${esc(c.disc)}</p>
    </div>
  </div>
</section>` + ctaBand(lang, t, t.home.close.title, t.home.close.sub, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
}

// ---------------- Accountants ----------------
export function renderACC({ lang, t, x, data }) {
  const a = t.acc;
  const rows = data.taxpayers.map((tp) => `<tr data-name="${attr(t.tpNames[tp.id].toLowerCase())}" data-risk="${tp.risk}"><td><input type="checkbox" aria-label="${attr(t.tpNames[tp.id])}"></td><td><b>${esc(t.tpNames[tp.id])}</b></td><td>${esc(t.taxType[tp.type])}</td><td>${esc(t.period[tp.period])}</td><td class="num">${esc(fmtDate(lang, tp.due))}</td><td>${badge(tp.status, t.status[tp.status])}</td><td>${esc(t.reviewers[tp.id])}</td><td>${badge(tp.risk, t.risk[tp.risk])}</td><td class="num">${tp.open}</td></tr>`).join('');
  const cal = [...data.taxpayers].sort((p, q) => p.due.localeCompare(q.due)).map((tp) => `<div class="ev ${tp.status === 'overdue' ? 'bad' : tp.risk === 'high' ? 'warn' : ''} rv" data-rv><div class="dt">${esc(fmtDay(lang, tp.due))}</div><div class="who">${esc(t.tpNames[tp.id])}</div><div class="what">${esc(t.taxType[tp.type])} · ${esc(t.period[tp.period])}</div></div>`).join('');
  return pageHero({ kicker: a.kicker, title: esc(a.title), sub: a.sub, ctas: `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(18)}</a><a class="btn btn-ghost btn-lg" href="${href(lang, 'demo')}">${esc(t.labels.demo)}</a>` }) + `
<section style="padding-top:20px">
  <div class="wrap">
    <div class="frame rv" data-rv id="book">${frameBar(t, t.labels.accountants)}
      <div class="fbody">
        <div class="toolbar">
          <label class="search">${icons.search(16)}<input type="search" id="tpSearch" placeholder="${attr(a.searchPh)}" aria-label="${attr(a.searchPh)}"></label>
          <select id="tpFilter" aria-label="${attr(a.filterAll)}"><option value="">${esc(a.filterAll)}</option><option value="high">${esc(t.risk.high)}</option><option value="med">${esc(t.risk.med)}</option><option value="low">${esc(t.risk.low)}</option></select>
          <span class="sel" id="tpSel"><b>0</b> ${esc(a.selected)}</span>
          <button type="button" class="btn btn-ghost" id="tpAssign" disabled>${esc(a.actAssign)}</button>
          <button type="button" class="btn btn-teal" id="tpExport" disabled>${icons.download(16)} ${esc(a.actExport)}</button>
          <span class="toast" id="tpToast">${esc(a.exportDone)}</span>
        </div>
        <div class="tbl-wrap"><table class="tbl" id="tpTable"><thead><tr>${a.cols.map((c, i) => `<th${i === 8 ? ' class="num"' : ''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table><div class="empty" id="tpEmpty" hidden>${esc(a.empty)}</div></div>
      </div>
    </div>
    ${sampleNote(t, t.pages.product.note)}
  </div>
</section>
<section style="padding-top:0">
  <div class="wrap">
    ${sectionHead(t.labels.dashboard, a.calTitle)}
    <div class="cal">${cal}</div>
  </div>
</section>
<section style="padding-top:0">
  <div class="wrap grid g3">${a.workflow.map((w, i) => `<div class="card spot rv" data-rv><div class="ic">${[icons.users(20), icons.doc(20), icons.chart(20)][i]}</div><h3>${esc(w.h)}</h3><p>${esc(w.p)}</p></div>`).join('')}</div>
</section>` + ctaBand(lang, t, t.home.workflow.title, t.home.workflow.p, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
}

// ---------------- Dashboard ----------------
export function renderDash({ lang, t, x, data }) {
  const d = t.dash;
  const total = d.sevRows.reduce((s, r) => s + r.n, 0);
  const tiles = d.kpis.map((k) => `<div class="tile rv" data-rv><label>${esc(k.l)}</label><div class="v num"><span data-count="${k.v}">0</span></div></div>`).join('');
  const dl = [...data.taxpayers].sort((p, q) => p.due.localeCompare(q.due)).map((tp) => `<tr><td><b>${esc(t.tpNames[tp.id])}</b><span class="sub">${esc(t.taxType[tp.type])} · ${esc(t.period[tp.period])}</span></td><td class="num">${esc(fmtDate(lang, tp.due))}</td><td>${badge(tp.status, t.status[tp.status])}</td></tr>`).join('');
  const sev = d.sevRows.map((r) => `<div class="row ${r.k}"><span>${esc(r.l)}</span><div class="track"><b data-w="${Math.round((r.n / total) * 100)}"></b></div><span class="n"><span data-count="${r.n}">0</span></span></div>`).join('');
  return pageHero({ kicker: d.kicker, title: esc(d.title), sub: d.sub, ctas: `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(t.ctaDemo)} ${icons.arrow(18)}</a>` }) + `
<section style="padding-top:20px">
  <div class="wrap">
    <div class="kpi-tiles">${tiles}</div>
    <div class="grid g2" style="margin-top:16px;align-items:start">
      <div class="frame rv" data-rv>${frameBar(t, d.deadlinesTitle)}<div class="fbody"><div class="tbl-wrap"><table class="tbl" style="min-width:0"><tbody>${dl}</tbody></table></div></div></div>
      <div class="card rv" data-rv><h3>${esc(d.findingsTitle)}</h3><div class="sev" style="margin-top:18px">${sev}</div><p class="note" style="margin-top:20px"><span class="tag muted">${esc(t.sample)}</span> ${esc(t.pages.product.note)}</p></div>
    </div>
  </div>
</section>` + ctaBand(lang, t, t.home.close.title, t.home.close.sub, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
}

// ---------------- Pricing ----------------
export function renderPricing({ lang, t, x }) {
  const p = t.pricing;
  const plan = (pl) => `
<div class="plan ${pl.pop ? 'pop' : ''} rv" data-rv>
  ${pl.pop ? `<span class="ribbon">${esc(p.popular)}</span>` : ''}
  <div><h3>${esc(pl.name)}</h3><p class="d">${esc(pl.d)}</p></div>
  <div class="price"><span class="amt">${esc(pl.pm)}</span>${pl.id === 'review' ? `<span class="per">${esc(x.perReturn)}</span>` : ''}</div>
  <ul class="list">${pl.f.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
  ${pl.id === 'review'
    ? `<button type="button" class="btn btn-gold btn-lg" data-open="planModal">${esc(pl.cta)} ${icons.arrow(16)}</button><span class="ziina">${icons.lock(14)} ${esc(x.payZiina)} · <b>@taxcheck</b></span>`
    : `<a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(p.cta)} ${esc(pl.name)} ${icons.arrow(16)}</a><span class="ziina">${esc(t.home.ctaNote)}</span>`}
</div>`;
  const comp = p.compRows.map((r) => `<tr><td>${esc(r.l)}</td>${r.v.map((v) => `<td class="num" style="text-align:start">${esc(v)}</td>`).join('')}</tr>`).join('');
  const rev = p.plans.find((q) => q.id === 'review');
  return pageHero({ kicker: p.kicker, title: esc(p.title), sub: p.sub }) + `
<section style="padding-top:24px">
  <div class="wrap">
    <div class="plans">${p.plans.map(plan).join('')}</div>
    <div class="comp">
      <h3 class="rv" data-rv>${esc(p.compTitle)}</h3>
      <div class="tbl-wrap rv" data-rv><table class="tbl"><thead><tr>${p.compCols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${comp}</tbody></table></div>
      <p class="note rv" data-rv>${esc(p.note)}</p>
      <a class="btn btn-ghost rv" data-rv style="margin-top:16px" href="${href(lang, 'contact')}">${esc(p.ctaEnt)} ${icons.arrow(16)}</a>
    </div>
  </div>
</section>
<div class="modal" id="planModal" role="dialog" aria-modal="true" aria-labelledby="planModalT" hidden>
  <div class="box">
    <button type="button" class="x" data-close aria-label="${attr(t.close)}">${icons.close(18)}</button>
    <span class="tag gold">${esc(rev.name)}</span>
    <h3 id="planModalT" style="margin-top:12px">${esc(rev.pm)} <small style="font-size:15px;color:var(--muted);font-weight:500">${esc(x.perReturn)}</small></h3>
    <p>${esc(rev.d)}</p>
    <p class="ziina" style="margin-top:14px">${icons.lock(14)} ${esc(x.ziinaHandle)}: <b>@taxcheck</b></p>
    <div class="acts2">
      <a class="btn btn-gold btn-lg" href="${ZIINA}" rel="noopener" target="_blank">${esc(x.payZiina)} ${icons.arrow(16)}</a>
      <a class="btn btn-ghost btn-lg" href="${href(lang, 'contact')}">${esc(p.ctaEnt)}</a>
    </div>
  </div>
</div>` + ctaBand(lang, t, t.home.pricingPrev.title, t.home.pricingPrev.note, t.ctaDemo, APP_URL, p.ctaEnt, href(lang, 'contact'));
}

// ---------------- e-Invoicing ----------------
export function renderEinv({ lang, t, x }) {
  const e = t.einv;
  return pageHero({ kicker: e.kicker, title: esc(e.title), sub: e.sub, ctas: `<a class="btn btn-gold btn-lg" href="#check">${esc(e.check.h)} ${icons.arrow(18)}</a><a class="btn btn-ghost btn-lg" href="${href(lang, 'demo')}">${esc(e.ctaTitle)}</a>` }) + `
<section style="padding-top:20px">
  <div class="wrap">
    ${sectionHead(e.kicker, e.concept.h, e.concept.p)}
    <div class="fields-grid">${e.concept.fields.map((f) => `<div class="rv" data-rv>${icons.check(14)} ${esc(f)}</div>`).join('')}</div>
  </div>
</section>
<section id="check" style="padding-top:0">
  <div class="wrap split">
    <div>
      ${sectionHead(e.score.l, e.check.h)}
      <div class="checklist rv" data-rv id="einvCheck">${e.check.items.map((it, i) => `<label><input type="checkbox" value="1"><span>${esc(it)}</span></label>`).join('')}</div>
    </div>
    <div class="score rv" data-rv id="einvScore" data-low="${attr(e.score.low)}" data-mid="${attr(e.score.mid)}" data-high="${attr(e.score.high)}">
      <div class="l" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">${esc(e.score.l)}</div>
      <div class="ring" style="margin-top:14px"><svg viewBox="0 0 120 120" width="150" height="150"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/><circle class="arc" cx="60" cy="60" r="52" fill="none" stroke="url(#rg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="327" stroke-dashoffset="327"/><defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#2ED3C6"/><stop offset="1" stop-color="#F5B94A"/></linearGradient></defs></svg><div class="val num"><span class="pct">0</span>%</div></div>
      <p class="msg">${esc(e.score.low)}</p>
    </div>
  </div>
</section>
<section style="padding-top:0">
  <div class="wrap">
    ${sectionHead(e.kicker, e.timeline.h)}
    <div class="timeline">${e.timeline.phases.map((p) => `<div class="ph rv" data-rv><div class="t">${esc(p.t)}</div><h3>${esc(p.h)}</h3><p>${esc(p.p)}</p></div>`).join('')}</div>
    <p class="note rv" data-rv>${esc(e.note)}</p>
  </div>
</section>` + ctaBand(lang, t, e.ctaTitle, e.ctaSub, t.labels.demo, href(lang, 'demo'), t.ctaDemo, APP_URL);
}
