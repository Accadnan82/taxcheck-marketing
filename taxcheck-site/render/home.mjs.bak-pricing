import { esc, attr, icons, badge, fmtNum } from '../lib/html.mjs';
import { href, APP_URL, sectionHead, ctaBand, sampleNote } from '../lib/layout.mjs';
import { fmtDate, money } from '../lib/fmt.mjs';

const LOGOS = [
  ['lbmc', 'LBMC Tax Consultant'], ['mtc', 'MTC'], ['nvs', 'NVS'], ['empa', 'EMPA'], ['raseed', 'Raseed'],
];

function heroDash(lang, t, x, data) {
  const h = t.home.panel;
  const tps = data.taxpayers.slice(0, 3);
  const chkRows = t.ct.rows.slice(0, 6);
  const check = (r) => `<div class="chk"${r.s !== 'ok' ? ' data-flag="1"' : ''}><span class="box"><svg viewBox="0 0 24 24" fill="none" stroke="#07111C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="${r.s !== 'ok' ? 'M12 5v9M12 18h.01' : 'M20 6L9 17l-5-5'}"/></svg></span>${esc(r.h)}<span class="st">—</span></div>`;
  const bars = [34, 48, 41, 62, 55, 70, 64, 78, 72, 88, 82, 96].map((v, i) => `<b${i >= 9 ? ' class="g"' : ''} style="height:${v}%"></b>`).join('');
  const months = x.monthLabels.map((m) => `<span>${m}</span>`).join('');
  const dl = tps.map((tp) => {
    const kind = { review: 'warn', ready: 'ok', data: 'muted', overdue: 'bad', filed: 'ok' }[tp.status];
    return `<div><span class="who">${esc(t.tpNames[tp.id])}<small>${esc(t.taxType[tp.type])} · ${esc(t.period[tp.period])} · ${esc(fmtDate(lang, tp.due))}</small></span><span class="tag ${kind}">${esc(t.status[tp.status])}</span></div>`;
  }).join('');
  return `
<div class="stage">
  <div class="dash" id="dash" aria-label="${attr(h.title)}">
    <div class="bar"><i></i><i></i><i></i><span class="url">app.taxcheck.ae · ${esc(h.taxpayerV)}</span><span class="live"><i></i>${esc(x.liveTag)}</span></div>
    <div class="body">
      <aside class="side">
        <a class="on" href="${APP_URL}">${icons.grid()}${esc(t.labels.dashboard)}</a>
        <a href="${APP_URL}">${icons.users()}${esc(t.home.preview.dashCols[0])}</a>
        <a href="${APP_URL}">${icons.doc()}${esc(t.taxType.ct)}</a>
        <a href="${APP_URL}">${icons.cal()}${esc(t.taxType.vat)}</a>
        <a href="${APP_URL}">${icons.chart()}${esc(t.home.preview.tabs[1].l)}</a>
      </aside>
      <div class="main">
        <div class="ttl"><h3>${esc(h.title)}</h3><span>${esc(h.periodV)}</span></div>
        <div class="kpis">
          <div class="kpi" data-lit="1"><label>${esc(h.completion)}</label><div class="v num"><span data-count="82" data-suffix="%">0%</span></div><div class="d">${esc(h.typeV)}</div></div>
          <div class="kpi" data-lit="1"><label>${esc(h.findings)}</label><div class="v num"><span data-count="7"> 0</span> ${esc(x.open)}</div><div class="d w">${esc(h.hi)} · ${esc(h.md)}</div></div>
          <div class="kpi" data-lit="1"><label>${esc(t.acc.cols[7])}</label><div class="v" style="color:var(--danger)">${esc(t.risk.high)}</div><div class="d w">${esc(h.lo)}</div></div>
        </div>
        <div class="row2">
          <div class="dcard" data-lit="3">
            <h4>${esc(t.ct.calcRows[3].l)} <span>${esc(t.period.fy25)}</span></h4>
            <div class="chart" id="chart">${bars}</div>
            <div class="months">${months}</div>
          </div>
          <div class="dcard" data-lit="2">
            <h4>${esc(t.labels.review)} <span id="chkcount">0 / ${chkRows.length}</span></h4>
            <div class="checks" id="checks">${chkRows.map(check).join('')}</div>
          </div>
        </div>
        <div class="dcard" data-lit="3">
          <h4>${esc(t.dash.deadlinesTitle)} <span>${esc(t.sample)}</span></h4>
          <div class="dl">${dl}</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function riskWizard(lang, t, x) {
  const r = t.home.riskCheck;
  const steps = r.questions.map((q, i) => `
    <div class="step" data-step="${i}"${i ? ' hidden' : ''}>
      <p class="q">${esc(q.q)}</p>
      <div class="opts">${q.opts.map((o) => `<button type="button" class="opt" data-p="${o.p}"><i></i><span>${esc(o.l)}</span></button>`).join('')}</div>
    </div>`).join('');
  const levels = ['low', 'med', 'high'].map((k) => `<div class="lv" data-level="${k}" hidden><div class="level ${k}">${esc(r.levels[k].l)}</div><p class="desc">${esc(r.levels[k].d)}</p><h4>${esc(r.next)}</h4><p class="next">${esc(r.nextAction[k])}</p></div>`).join('');
  const reportBody = encodeURIComponent(x.reportSubject);
  return `
<section class="riskcheck" id="riskcheck">
  <div class="wrap">
    <div class="wiz" id="wiz" data-none="${attr(x.areasNone)}" data-total="${r.questions.length}" data-max="${r.questions.reduce((s, q) => s + Math.max(...q.opts.map((o) => o.p)), 0)}">
      <div class="side">
        ${sectionHead(r.kicker, r.title, r.sub)}
        <ul class="list rv" data-rv>${t.home.outcomes.items.map((o) => `<li><span><b>${esc(o.h)}</b><br><span style="color:var(--muted)">${esc(o.p)}</span></span></li>`).join('')}</ul>
      </div>
      <div class="panel rv" data-rv>
        <div class="prog"><span><span class="qn">${esc(r.qOf[0])} <b class="cur">1</b> ${esc(r.qOf[1])} ${r.questions.length}</span></span><span class="pct num">0%</span></div>
        <div class="bar"><b></b></div>
        ${steps}
        <div class="result">
          <div class="prog"><span>${esc(r.resultTitle)}</span><span>${esc(t.preliminary)}</span></div>
          <div class="gauge"><svg viewBox="0 0 200 110"><path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="14" stroke-linecap="round"/><path class="arc" d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="url(#gg)" stroke-width="14" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="283"/><defs><linearGradient id="gg" x1="0" x2="1"><stop offset="0" stop-color="#3DDC97"/><stop offset=".5" stop-color="#FFB35C"/><stop offset="1" stop-color="#FF6B6B"/></linearGradient></defs></svg><div class="val num"><span class="score">0</span>%</div></div>
          ${levels}
          <h4>${esc(r.areas)}</h4>
          <ul class="list areas"></ul>
          <div class="acts2">
            <a class="btn btn-gold report" data-subject="${attr(x.reportSubject)}" href="mailto:info@taxcheck.ae?subject=${reportBody}">${esc(r.ctaReport)}</a>
            <a class="btn btn-ghost" href="${href(lang, 'demo')}">${esc(r.ctaDemo)}</a>
            <button type="button" class="restart">${esc(r.restart)}</button>
          </div>
          <p class="note">${esc(r.note)}</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function preview(lang, t, data) {
  const p = t.home.preview;
  const tabs = p.tabs.map((tb, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-tab="${tb.id}"${i === 0 ? ' class="on"' : ''}>${esc(tb.l)}</button>`).join('');
  const rows = data.taxpayers.map((tp) => `<tr><td><b>${esc(t.tpNames[tp.id])}</b></td><td>${esc(t.taxType[tp.type])}</td><td>${esc(t.period[tp.period])}</td><td class="num">${esc(fmtDate(lang, tp.due))}</td><td>${badge(tp.status, t.status[tp.status])}</td><td>${badge(tp.risk, t.risk[tp.risk])}</td></tr>`).join('');
  const findings = p.findings.map((f) => `<div class="finding"><div>${badge(f.sev, t.risk[f.sev])}</div><div><h5>${esc(f.h)}</h5><div class="ref">${esc(f.ref)}</div><div class="act">${esc(f.act)}</div></div></div>`).join('');
  const em = data.emirates;
  const outA = em.reduce((s, e) => s + e.a, 0), outV = em.reduce((s, e) => s + e.v + e.adj, 0) + data.vat.rcV + data.vat.impV + data.vat.tourist;
  const inV = data.vat.inV + data.vat.impV;
  const vatRows = em.map((e, i) => `<tr><td>${esc(t.vat.emirates[i])}</td><td class="num">${money(e.a)}</td><td class="num">${money(e.v)}</td><td class="num${e.adj < 0 ? ' neg' : ''}">${money(e.adj)}</td></tr>`).join('');
  return `
<section class="preview" id="preview">
  <div class="wrap">
    ${sectionHead(p.kicker, p.title)}
    <div class="tabs rv" data-rv role="tablist">${tabs}</div>
    <div class="frame rv" data-rv>
      <div class="bar"><i></i><i></i><i></i><span class="url">app.taxcheck.ae</span><span class="live"><i></i>${esc(t.sample)}</span></div>
      <div class="fbody">
        <div class="tabpane" data-pane="dash"><div class="tbl-wrap"><table class="tbl"><thead><tr>${p.dashCols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></div>
        <div class="tabpane" data-pane="findings" hidden><div class="findings">${findings}</div></div>
        <div class="tabpane" data-pane="vat" hidden><div class="tbl-wrap"><table class="tbl"><thead><tr>${t.vat.cols.map((c, i) => `<th${i ? ' class="num"' : ''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${vatRows}<tr class="total"><td>${esc(t.vat.totOut)}</td><td class="num">${money(outA)}</td><td class="num">${money(outV)}</td><td></td></tr><tr><td>${esc(t.vat.totIn)}</td><td></td><td class="num">${money(inV)}</td><td></td></tr><tr class="total"><td>${esc(t.vat.net)}</td><td></td><td class="num">${money(outV - inV)}</td><td></td></tr></tbody></table></div></div>
      </div>
    </div>
    ${sampleNote(t, t.pages.product.note)}
  </div>
</section>`;
}

export function renderHome({ lang, t, x, data }) {
  const h = t.home;
  const hero = `
<section class="hero">
  <div class="wrap">
    <div class="copy">
      <div class="eyebrow rv" data-hero><i></i>${esc(h.ftrTag)}</div>
      <h1 class="rv" data-hero>${esc(h.heroL1)} <span class="hl">${esc(h.heroL2)}</span></h1>
      <p class="lede rv" data-hero>${esc(h.heroSub)}</p>
      <div class="cta rv" data-hero>
        <a class="btn btn-gold btn-lg" href="${APP_URL}">${esc(h.ctaStart)}</a>
        <a class="btn btn-ghost btn-lg" href="#riskcheck">${esc(t.ctaCheck)}</a>
      </div>
      <p class="ctanote rv" data-hero>${esc(h.ctaNote)}</p>
      <div class="proof rv" data-hero>
        <div class="avs"><span>LB</span><span>MT</span><span>NV</span><span>EM</span></div>
        <span>${esc(x.proof)}</span>
      </div>
    </div>
    ${heroDash(lang, t, x, data)}
  </div>
</section>
<section class="logos">
  <p>${esc(x.trustedBy)}</p>
  <div class="marq"><div class="track">
    ${LOGOS.map(([k, n]) => `<img src="/logos/logo-${k}.png" alt="${attr(n)}" loading="lazy" height="34">`).join('')}
    ${LOGOS.map(([k]) => `<img src="/logos/logo-${k}.png" alt="" loading="lazy" height="34" aria-hidden="true">`).join('')}
  </div></div>
</section>`;

  const outcomes = `
<section class="outcomes">
  <div class="wrap grid g3">
    ${h.outcomes.items.map((o, i) => `<div class="outcome rv" data-rv><div class="big num">${['1 : 1', '<span data-count="20">0</span> <small style="font-size:16px;color:var(--muted)">/ ' + esc(x.minute) + '</small>', '+<span data-count="15" data-suffix="%">0%</span>'][i]}</div><h3>${esc(o.h)}</h3><p>${esc(o.p)}</p></div>`).join('')}
  </div>
</section>`;

  const answers = `
<section class="answers" id="answers">
  <div class="wrap">
    ${sectionHead(x.qa, h.answers.title)}
    <div class="grid g3">${h.answers.items.map((a) => `<div class="answer rv" data-rv><h3>${esc(a.q)}</h3><p>${esc(a.a)}</p></div>`).join('')}</div>
  </div>
</section>`;

  const scenarios = `
<section class="scenarios" id="scenarios">
  <div class="wrap">
    ${sectionHead(h.scenarios.kicker, h.scenarios.title)}
    <div class="grid g4">${h.scenarios.items.map((s) => `<div class="scenario card spot rv" data-rv><div>${badge(s.r, t.risk[s.r])}</div><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div>`).join('')}</div>
  </div>
</section>`;

  const how = `
<section class="how" id="how">
  <div class="wrap">
    ${sectionHead(h.how.kicker, h.how.plateTitle)}
    <div class="plate rv" data-rv data-plate>
      <div class="ptitle"><span>${esc(h.how.plateTitle)}</span><span>${esc(h.how.doc)}</span><span>${esc(h.how.rev)}</span><span>${esc(h.how.sheet)}</span></div>
      <table><thead><tr>${h.how.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
      <tbody>${h.how.steps.map((s) => `<tr class="pr"><td class="n">${esc(s.n)}</td><td class="h">${esc(s.h)}</td><td class="p">${esc(s.p)}</td></tr>`).join('')}</tbody></table>
      <div class="pfoot">${esc(h.how.note)}</div>
    </div>
  </div>
</section>`;

  const trio = `
<section class="trio">
  <div class="wrap">
    ${sectionHead(h.trio.kicker, h.trio.title)}
    <div class="grid g3">${h.trio.items.map((c, i) => `<a class="card spot rv" data-rv href="${href(lang, c.r)}"><div class="ic">${[icons.doc(20), icons.layers(20), icons.spark(20)][i]}</div><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p><span class="more">${esc(h.trio.link)} ${icons.arrow(14)}</span></a>`).join('')}</div>
  </div>
</section>`;

  const wfRows = data.taxpayers.slice(0, 4).map((tp) => `<tr><td><b>${esc(t.tpNames[tp.id])}</b><span class="sub">${esc(t.taxType[tp.type])} · ${esc(t.period[tp.period])}</span></td><td>${esc(t.reviewers[tp.id])}</td><td>${badge(tp.risk, t.risk[tp.risk])}</td><td class="num">${tp.open}</td></tr>`).join('');
  const workflow = `
<section class="firms" id="firms">
  <div class="wrap workflow">
    <div>
      ${sectionHead(h.workflow.kicker, h.workflow.title, h.workflow.p)}
      <ul class="list rv" data-rv>${h.workflow.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <a class="btn btn-teal rv" data-rv style="margin-top:24px" href="${href(lang, 'accountants')}">${esc(h.workflow.link)} ${icons.arrow(16)}</a>
    </div>
    <div class="frame rv" data-rv>
      <div class="bar"><i></i><i></i><i></i><span class="url">app.taxcheck.ae · ${esc(t.labels.accountants)}</span><span class="live"><i></i>${esc(t.sample)}</span></div>
      <div class="fbody"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(t.acc.cols[1])}</th><th>${esc(t.acc.cols[6])}</th><th>${esc(t.acc.cols[7])}</th><th class="num">${esc(t.acc.cols[8])}</th></tr></thead><tbody>${wfRows}</tbody></table></div></div>
    </div>
  </div>
</section>`;

  const c = h.explain.card;
  const explain = `
<section class="explainer">
  <div class="wrap explain">
    <div>${sectionHead(h.explain.kicker, h.explain.title, h.explain.p)}</div>
    <div class="fcard rv" data-rv>
      ${badge(c.sev, t.risk[c.sev])}
      <h3>${esc(c.h)}</h3>
      <p class="why">${esc(c.why)}</p>
      <dl><dt>${esc(c.refL)}</dt><dd class="ref">${esc(c.ref)}</dd><dt>${esc(c.actL)}</dt><dd>${esc(c.act)}</dd></dl>
    </div>
  </div>
</section>`;

  const services = `
<section class="svc">
  <div class="wrap">
    ${sectionHead(h.services.kicker, h.services.title, h.services.p)}
    <div class="services-list">${h.services.items.map((s) => `<div class="rv" data-rv>${icons.check(18)}<span>${esc(s)}</span></div>`).join('')}</div>
    <a class="btn btn-ghost rv" data-rv style="margin-top:22px" href="${href(lang, 'services')}">${esc(h.services.link)} ${icons.arrow(16)}</a>
  </div>
</section>`;

  const trust = `
<section class="trust">
  <div class="wrap">
    ${sectionHead(h.trust.kicker, h.trust.title)}
    <div class="grid g3">${h.trust.items.map((i, k) => `<div class="card spot rv" data-rv><div class="ic">${[icons.lock(20), icons.shield(20), icons.eye(20)][k]}</div><h3>${esc(i.h)}</h3><p>${esc(i.p)}</p></div>`).join('')}</div>
    <a class="btn btn-ghost rv" data-rv style="margin-top:22px" href="${href(lang, 'security')}">${esc(h.trust.link)} ${icons.arrow(16)}</a>
  </div>
</section>`;

  const pp = t.pricing.plans;
  const pricingPrev = `
<section class="pricing-prev">
  <div class="wrap">
    ${sectionHead(h.pricingPrev.kicker, h.pricingPrev.title, h.pricingPrev.note)}
    <div class="grid g2" style="max-width:860px">
      ${pp.map((p) => `<div class="card ${p.pop ? 'gold' : ''} rv" data-rv><span class="tag ${p.pop ? 'gold' : 'teal'}">${esc(p.pop ? t.pricing.popular : t.labels.review)}</span><h3 style="margin-top:12px">${esc(p.name)}</h3><div class="price" style="margin-top:8px"><span class="amt" style="font-size:38px">${esc(p.pm)}</span>${p.id === 'review' ? `<span class="per">${esc(x.perReturn)}</span>` : ''}</div><p>${esc(p.d)}</p></div>`).join('')}
    </div>
    <a class="btn btn-teal rv" data-rv style="margin-top:22px" href="${href(lang, 'pricing')}">${esc(h.pricingPrev.link)} ${icons.arrow(16)}</a>
  </div>
</section>`;

  const faq = `
<section class="faq" id="faq">
  <div class="wrap grid2">
    <div>${sectionHead(h.faq.kicker, h.faq.title)}</div>
    <div class="rv" data-rv>${h.faq.items.map((q) => `<div class="q"><button type="button" aria-expanded="false"><span>${esc(q.q)}</span>${icons.plus(20)}</button><div class="a"><p>${esc(q.a)}</p></div></div>`).join('')}</div>
  </div>
</section>`;

  const close = ctaBand(lang, t, h.close.title, h.close.sub, h.ctaStart, APP_URL, t.ctaCheck, '#riskcheck');

  return [hero, outcomes, answers, riskWizard(lang, t, x), scenarios, how, preview(lang, t, data), trio, workflow, explain, services, trust, pricingPrev, faq, close].join('\n');
}
