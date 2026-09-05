import { esc, attr, icons } from '../lib/html.mjs';
import { href, APP_URL, EMAIL, PHONE, PHONE_E164, pageHero, sectionHead, ctaBand } from '../lib/layout.mjs';

const field = (name, f, type = 'text', err = '', full = false) => `
<div class="field${full ? ' full' : ''}" data-field="${name}">
  <label for="f-${name}">${esc(f.l)}</label>
  <input id="f-${name}" name="${name}" type="${type}" placeholder="${attr(f.ph || '')}" autocomplete="${{ name: 'name', email: 'email', phone: 'tel', company: 'organization', link: 'url' }[name] || 'off'}">
  ${err ? `<span class="err">${esc(err)}</span>` : ''}
</div>`;

const successBox = (title, p, another, x, extraP = '') => `
<div class="success" aria-live="polite">
  <div class="okic">${icons.check(28)}</div>
  <h3>${esc(title)}</h3>
  <p>${esc(p)} <b class="echo"></b>${extraP ? `<br>${esc(extraP)}` : ''}</p>
  <p class="note" style="margin-top:12px">${esc(x.prefillNote)}</p>
  <div class="acts2">
    <a class="btn btn-gold wa" href="https://wa.me/${PHONE_E164}" target="_blank" rel="noopener">${icons.wa(16)} ${esc(x.sendWhatsapp)}</a>
    <a class="btn btn-ghost mail" href="mailto:${EMAIL}">${icons.mail(16)} ${esc(x.sendEmail)}</a>
    <button type="button" class="btn btn-ghost again">${esc(another)}</button>
  </div>
</div>`;

// ---------------- Demo ----------------
export function renderDemo({ lang, t, x }) {
  const d = t.demo;
  const chips = (name, opts) => `<div class="chips" data-chips="${name}">${opts.map((o, i) => `<button type="button" class="chip${i === 0 ? ' on' : ''}" data-v="${attr(o)}">${esc(o)}</button>`).join('')}<input type="hidden" name="${name}" value="${attr(opts[0])}"></div>`;
  const slots = d.days.map((day) => `<div class="day"><h5>${esc(day.d)}<small>${esc(day.dd)}</small></h5><div class="times">${d.times.map((tm) => `<button type="button" class="slot" data-v="${attr(day.d + ' ' + day.dd + ' · ' + tm)}">${esc(tm)}</button>`).join('')}</div></div>`).join('');
  return pageHero({ kicker: d.kicker, title: esc(d.title), sub: d.sub }) + `
<section style="padding-top:20px">
  <div class="wrap split">
    <div>
      <ul class="list rv" data-rv>${t.home.outcomes.items.map((o) => `<li>${esc(o.h)}</li>`).join('')}</ul>
      <div class="contact-cells" style="margin-top:28px">
        <a class="ccell rv" data-rv href="https://wa.me/${PHONE_E164}" target="_blank" rel="noopener"><div class="ic">${icons.wa(18)}</div><div><h3>${esc(t.contact.cells[1].h)}</h3><p dir="ltr">${PHONE}</p></div></a>
        <a class="ccell rv" data-rv href="mailto:${EMAIL}"><div class="ic">${icons.mail(18)}</div><div><h3>${esc(t.contact.cells[0].h)}</h3><p>${EMAIL}</p></div></a>
      </div>
    </div>
    <div class="fpanel rv" data-rv>
      <form class="form" id="demoForm" data-kind="demo" data-endpoint="/api/demo" data-subject="${attr(x.demoSubject)}" novalidate>
        ${field('name', d.fields.name, 'text', d.errs.name)}
        ${field('email', d.fields.email, 'email', d.errs.email)}
        ${field('phone', d.fields.phone, 'tel', d.errs.phone)}
        ${field('company', d.fields.company, 'text', d.errs.company)}
        <div class="field full"><label>${esc(d.userType.l)}</label>${chips('userType', d.userType.opts)}</div>
        <div class="field"><label>${esc(d.tps.l)}</label>${chips('taxpayers', d.tps.opts)}</div>
        <div class="field"><label>${esc(d.scope.l)}</label>${chips('scope', d.scope.opts)}</div>
        <div class="field full" data-field="slot"><label>${esc(d.slotL)}</label><div class="slots" data-slots>${slots}<input type="hidden" name="slot" value=""></div><span class="err">${esc(d.errs.slot)}</span></div>
        <div class="full"><button type="submit" class="btn btn-gold btn-lg" style="width:100%">${esc(d.submit)} ${icons.arrow(18)}</button></div>
      </form>
      ${successBox(d.success.title, d.success.p, d.success.another, x, d.success.p2)}
    </div>
  </div>
</section>`;
}

// ---------------- Careers ----------------
export function renderCareers({ lang, t, x }) {
  const c = t.careers;
  const roles = c.roles.map((r, i) => `<button type="button" class="role rv" data-rv data-role="${attr(r.h)}"><div><h3>${esc(r.h)}</h3><p>${esc(r.d)}</p></div><span class="loc">${esc(r.loc)}</span></button>`).join('');
  return pageHero({ kicker: c.kicker, title: esc(c.title), sub: c.sub }) + `
<section style="padding-top:20px">
  <div class="wrap split">
    <div>
      <h2 class="rv" data-rv style="font-size:24px;margin-bottom:16px">${esc(c.rolesT)}</h2>
      <div class="roles" id="roles">${roles}</div>
    </div>
    <div class="fpanel rv" data-rv id="apply">
      <h2 style="font-size:24px;margin-bottom:18px">${esc(c.formT)}</h2>
      <form class="form" id="careerForm" data-kind="career" data-subject="${attr(x.careerSubject)}" novalidate>
        <div class="field full" data-field="role"><label for="f-role">${esc(c.roleL)}</label><select id="f-role" name="role"><option value="">${esc(x.chooseRole)}</option>${c.roles.map((r) => `<option value="${attr(r.h)}">${esc(r.h)}</option>`).join('')}</select><span class="err">${esc(c.errs.role)}</span></div>
        ${field('name', c.fields.name, 'text', c.errs.name)}
        ${field('email', c.fields.email, 'email', c.errs.email)}
        ${field('phone', c.fields.phone, 'tel')}
        ${field('link', c.fields.link, 'url')}
        <div class="field full"><label for="f-msg">${esc(c.msgL)}</label><textarea id="f-msg" name="message"></textarea></div>
        <div class="full"><button type="submit" class="btn btn-gold btn-lg" style="width:100%">${esc(c.submit)} ${icons.arrow(18)}</button></div>
      </form>
      ${successBox(c.success.title, c.success.p, c.success.another, x)}
    </div>
  </div>
</section>`;
}

// ---------------- Contact ----------------
export function renderContact({ lang, t, x }) {
  const c = t.contact;
  const cellIcons = [icons.mail(18), icons.wa(18), icons.pin(18)];
  const cellHref = [`mailto:${EMAIL}`, `https://wa.me/${PHONE_E164}`, ''];
  const cells = c.cells.map((cell, i) => {
    const inner = `<div class="ic">${cellIcons[i]}</div><div><h3>${esc(cell.h)}</h3><p${i === 1 ? ' dir="ltr"' : ''}>${esc(cell.p)}</p></div>`;
    return cellHref[i] ? `<a class="ccell rv" data-rv href="${cellHref[i]}"${i === 1 ? ' target="_blank" rel="noopener"' : ''}>${inner}</a>` : `<div class="ccell rv" data-rv>${inner}</div>`;
  }).join('');
  return pageHero({ kicker: c.kicker, title: esc(c.title), sub: c.sub }) + `
<section style="padding-top:20px">
  <div class="wrap split">
    <div class="contact-cells">${cells}
      <a class="btn btn-teal btn-lg rv" data-rv href="https://wa.me/${PHONE_E164}" target="_blank" rel="noopener" style="margin-top:8px">${icons.wa(18)} ${esc(x.whatsapp)}</a>
    </div>
    <div class="fpanel rv" data-rv>
      <form class="form" id="contactForm" data-kind="contact" data-subject="${attr(x.contactSubject)}" novalidate>
        ${field('name', { l: c.form.name, ph: '' }, 'text', c.form.err)}
        ${field('email', { l: c.form.email, ph: '' }, 'email', c.form.err)}
        <div class="field full" data-field="message"><label for="f-message">${esc(c.form.msg)}</label><textarea id="f-message" name="message"></textarea><span class="err">${esc(c.form.err)}</span></div>
        <div class="full"><button type="submit" class="btn btn-gold btn-lg" style="width:100%">${esc(c.form.send)} ${icons.arrow(18)}</button></div>
      </form>
      ${successBox(c.form.sent, '', t.demo.success.another, x)}
    </div>
  </div>
</section>` + ctaBand(lang, t, t.home.close.title, t.home.close.sub, t.ctaDemo, APP_URL, t.labels.demo, href(lang, 'demo'));
}
