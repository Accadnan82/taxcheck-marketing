/* TaxCheck marketing site — motion + widgets (anime.js v4 UMD global `anime`) */
(function () {
  'use strict';
  var A = window.anime;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rtl = document.documentElement.dir === 'rtl';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
  var on = function (el, ev, fn) { if (el) el.addEventListener(ev, fn); };

  // ---------- header ----------
  var hdr = $('#hdr');
  var onScrollHdr = function () { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', onScrollHdr, { passive: true }); onScrollHdr();
  var menuBtn = $('#menuBtn'), mnav = $('#mnav');
  on(menuBtn, 'click', function () {
    var open = mnav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('#mnav a').forEach(function (a) { on(a, 'click', function () { mnav.classList.remove('open'); }); });

  // ---------- count-up ----------
  function countUp(span, delay) {
    if (span.__done) return; span.__done = true;
    var to = parseFloat(span.getAttribute('data-count')), pre = span.getAttribute('data-prefix') || '', suf = span.getAttribute('data-suffix') || '';
    if (reduced || !A) { span.textContent = pre + fmt(to) + suf; return; }
    var o = { v: 0 };
    A.animate(o, { v: to, duration: 1100, delay: delay || 0, ease: 'outExpo', onUpdate: function () { span.textContent = pre + fmt(o.v) + suf; }, onComplete: function () { span.textContent = pre + fmt(to) + suf; } });
  }
  function growBars(root, delay) {
    $$('[data-w]', root).forEach(function (b, i) {
      var w = b.getAttribute('data-w') + '%';
      if (reduced || !A) { b.style.width = w; return; }
      A.animate(b, { width: [0, w], duration: 900, delay: (delay || 0) + i * 120, ease: 'outCubic' });
    });
  }

  // ---------- hero staged reveal ----------
  var heroEls = $$('[data-hero]');
  if (!reduced && A && heroEls.length) {
    heroEls.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; });
    A.animate(heroEls, { opacity: [0, 1], translateY: [18, 0], duration: 760, delay: A.stagger(95, { start: 100 }), ease: 'outCubic' });
  }

  // ---------- live dashboard (home hero) ----------
  var dash = $('#dash');
  if (dash) {
    var bars = $$('#chart b');
    if (!reduced && A) {
      A.animate(dash, { opacity: [0, 1], translateY: [40, 0], duration: 900, delay: 300, ease: 'outCubic' });
      bars.forEach(function (b) { b.style.transform = 'scaleY(0)'; });
      A.animate(bars, { scaleY: [0, 1], duration: 700, delay: A.stagger(45, { start: 900 }), ease: 'outBack' });
    }
    $$('#dash [data-count]').forEach(function (s, i) { countUp(s, 1000 + i * 120); });
    var checks = $$('#checks .chk'), chkcount = $('#chkcount');
    function runChecks() {
      checks.forEach(function (c) { c.classList.remove('done', 'flag'); $('.st', c).textContent = '—'; });
      chkcount.textContent = '0 / ' + checks.length;
      var done = 0;
      checks.forEach(function (c, i) {
        setTimeout(function () {
          var flag = c.hasAttribute('data-flag');
          c.classList.add(flag ? 'flag' : 'done');
          $('.st', c).textContent = flag ? '!' : '✓';
          done++; chkcount.textContent = done + ' / ' + checks.length;
        }, 1500 + i * 520);
      });
    }
    if (reduced) { checks.forEach(function (c) { c.classList.add(c.hasAttribute('data-flag') ? 'flag' : 'done'); }); chkcount.textContent = checks.length + ' / ' + checks.length; }
    else { runChecks(); setInterval(runChecks, 9000); }
    // scroll-linked straightening
    var stage = $('.stage');
    function tilt() {
      if (reduced || window.innerWidth <= 1100) return;
      var t = Math.min(1, Math.max(0, window.scrollY / 380));
      var e = 1 - Math.pow(1 - t, 3), s = rtl ? -1 : 1;
      dash.style.transform = 'rotateY(' + (s * (-14 + 14 * e)) + 'deg) rotateX(' + (8 - 8 * e) + 'deg) rotateZ(' + (s * (1.5 - 1.5 * e)) + 'deg) scale(' + (0.98 + 0.02 * e) + ')';
    }
    window.addEventListener('scroll', function () { window.requestAnimationFrame(tilt); }, { passive: true });
    window.addEventListener('resize', tilt); tilt();
    if (!reduced) {
      var lits = $$('#dash [data-lit]'), li = 0;
      setInterval(function () { lits.forEach(function (x) { x.classList.remove('lit'); }); lits[li % lits.length].classList.add('lit'); li++; }, 2600);
    }
  }

  // ---------- ambient orbs ----------
  if (!reduced && A) {
    A.animate('.sky .o1', { translateX: [0, 60], translateY: [0, 40], duration: 14000, alternate: true, loop: true, ease: 'inOutSine' });
    A.animate('.sky .o2', { translateX: [0, -50], translateY: [0, 60], duration: 17000, alternate: true, loop: true, ease: 'inOutSine' });
  }

  // ---------- scroll reveals ----------
  var rvs = $$('[data-rv]');
  function revealed(el) {
    $$('[data-count]', el).forEach(function (s, i) { countUp(s, 150 + i * 60); });
    if (el.hasAttribute('data-count')) countUp(el, 150);
    growBars(el, 200);
    if (el.hasAttribute('data-plate')) {
      var rows = $$('tr.pr', el);
      if (reduced || !A) { rows.forEach(function (r) { r.style.opacity = '1'; }); }
      else A.animate(rows, { opacity: [0, 1], translateX: [rtl ? 24 : -24, 0], duration: 600, delay: A.stagger(90, { start: 200 }), ease: 'outCubic' });
    }
    if (el.classList.contains('plan')) {
      $$('.list li', el).forEach(function (l, i) { setTimeout(function () { l.classList.add('in'); }, 250 + i * 90); });
    }
  }
  if (!reduced && A && 'IntersectionObserver' in window) {
    rvs.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(22px)'; });
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      var batch = [];
      entries.forEach(function (en) { if (en.isIntersecting && !seen.has(en.target)) { seen.add(en.target); batch.push(en.target); io.unobserve(en.target); } });
      if (batch.length) {
        batch.forEach(revealed);
        A.animate(batch, { opacity: [0, 1], translateY: [22, 0], duration: 700, delay: A.stagger(80), ease: 'outCubic' });
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    rvs.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rvs.forEach(function (el) { if (!seen.has(el)) { seen.add(el); el.style.opacity = '1'; el.style.transform = 'none'; revealed(el); } }); }, 5000);
  } else {
    rvs.forEach(revealed);
  }

  // ---------- spotlight cards ----------
  $$('.spot').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---------- FAQ ----------
  $$('.faq .q button').forEach(function (btn) {
    on(btn, 'click', function () {
      var q = btn.parentElement, open = q.classList.contains('open');
      $$('.faq .q').forEach(function (x) { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
      if (!open) { q.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  // ---------- tabs ----------
  $$('.tabs').forEach(function (tabs) {
    var scope = tabs.parentElement;
    $$('button[data-tab]', tabs).forEach(function (b) {
      on(b, 'click', function () {
        $$('button[data-tab]', tabs).forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
        b.classList.add('on'); b.setAttribute('aria-selected', 'true');
        $$('.tabpane', scope).forEach(function (p) {
          var show = p.getAttribute('data-pane') === b.getAttribute('data-tab');
          p.hidden = !show;
          if (show && !reduced && A) A.animate(p, { opacity: [0, 1], translateY: [10, 0], duration: 400, ease: 'outCubic' });
        });
      });
    });
  });

  // ---------- modal ----------
  $$('[data-open]').forEach(function (b) {
    on(b, 'click', function () {
      var m = document.getElementById(b.getAttribute('data-open'));
      if (!m) return; m.hidden = false; m.classList.add('open');
      if (!reduced && A) A.animate($('.box', m), { opacity: [0, 1], scale: [0.94, 1], duration: 380, ease: 'outCubic' });
      var x = $('[data-close]', m); if (x) x.focus();
    });
  });
  $$('.modal').forEach(function (m) {
    var close = function () { m.classList.remove('open'); m.hidden = true; };
    $$('[data-close]', m).forEach(function (x) { on(x, 'click', close); });
    on(m, 'click', function (e) { if (e.target === m) close(); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape') close(); });
  });

  // ---------- risk wizard ----------
  var wiz = $('#wiz');
  if (wiz) {
    var steps = $$('.step', wiz), total = steps.length, max = +wiz.getAttribute('data-max') || 1;
    var cur = 0, answers = [];
    var curEl = $('.cur', wiz), pctEl = $('.pct', wiz), barEl = $('.bar b', wiz);
    function setProg(i) {
      curEl.textContent = Math.min(i + 1, total);
      var pct = Math.round((i / total) * 100);
      pctEl.textContent = pct + '%'; barEl.style.width = pct + '%';
    }
    function showStep(i) {
      steps.forEach(function (s, j) { s.hidden = j !== i; });
      if (!reduced && A) A.animate(steps[i], { opacity: [0, 1], translateX: [rtl ? -24 : 24, 0], duration: 420, ease: 'outCubic' });
      setProg(i);
    }
    function finish() {
      var score = Math.round((answers.reduce(function (s, a) { return s + a.p; }, 0) / max) * 100);
      var level = score <= 25 ? 'low' : score <= 55 ? 'med' : 'high';
      wiz.classList.add('done');
      barEl.style.width = '100%'; pctEl.textContent = '100%';
      $$('.lv', wiz).forEach(function (l) { l.hidden = l.getAttribute('data-level') !== level; });
      var areas = $('.areas', wiz); areas.innerHTML = '';
      var flagged = answers.filter(function (a) { return a.p > 0; });
      flagged.forEach(function (a) { var li = document.createElement('li'); li.textContent = a.q; areas.appendChild(li); });
      if (!flagged.length) { var li0 = document.createElement('li'); li0.textContent = wiz.getAttribute('data-none') || '—'; areas.appendChild(li0); }
      var arc = $('.arc', wiz), sc = $('.score', wiz);
      var off = 283 * (1 - score / 100);
      if (reduced || !A) { arc.style.strokeDashoffset = off; sc.textContent = score; }
      else {
        A.animate(arc, { strokeDashoffset: [283, off], duration: 1200, ease: 'outCubic', delay: 200 });
        var o = { v: 0 }; A.animate(o, { v: score, duration: 1200, delay: 200, ease: 'outCubic', onUpdate: function () { sc.textContent = Math.round(o.v); } });
        A.animate($('.result', wiz), { opacity: [0, 1], translateY: [16, 0], duration: 500, ease: 'outCubic' });
      }
      // mailto report
      var rep = $('.report', wiz);
      var lvl = $('.lv[data-level="' + level + '"] .level', wiz).textContent;
      var body = lvl + ' — ' + score + '%\n\n' + flagged.map(function (a) { return '• ' + a.q + ' — ' + a.l; }).join('\n') + '\n\n' + window.location.href;
      rep.href = 'mailto:info@taxcheck.ae?subject=' + encodeURIComponent(rep.getAttribute('data-subject') || document.title) + '&body=' + encodeURIComponent(body);
    }
    steps.forEach(function (s, i) {
      $$('.opt', s).forEach(function (opt) {
        on(opt, 'click', function () {
          $$('.opt', s).forEach(function (o) { o.classList.remove('on'); });
          opt.classList.add('on');
          answers[i] = { p: +opt.getAttribute('data-p'), q: $('.q', s).textContent, l: $('span', opt).textContent };
          setTimeout(function () { if (i + 1 < total) { cur = i + 1; showStep(cur); } else finish(); }, 320);
        });
      });
    });
    on($('.restart', wiz), 'click', function () {
      answers = []; cur = 0; wiz.classList.remove('done');
      $$('.opt', wiz).forEach(function (o) { o.classList.remove('on'); });
      showStep(0);
    });
    setProg(0);
  }

  // ---------- AI assistant demo ----------
  var ask = $('#ask'), acard = $('#acard');
  if (ask && acard) {
    var input = $('#askInput'), rows = $$('.row', acard);
    function runAsk() {
      ask.classList.add('busy'); acard.classList.remove('show');
      rows.forEach(function (r) { r.classList.remove('in'); r.style.opacity = ''; });
      var conf = $('[data-w]', acard); if (conf) conf.style.width = '0';
      var cnt = $('[data-count]', acard); if (cnt) { cnt.__done = false; cnt.textContent = '0%'; }
      setTimeout(function () {
        ask.classList.remove('busy'); acard.classList.add('show');
        if (reduced || !A) { rows.forEach(function (r) { r.classList.add('in'); }); growBars(acard, 0); if (cnt) countUp(cnt, 0); return; }
        A.animate(acard, { opacity: [0, 1], translateY: [16, 0], duration: 500, ease: 'outCubic' });
        rows.forEach(function (r, i) { setTimeout(function () { r.classList.add('in'); A.animate(r, { opacity: [0, 1], translateY: [10, 0], duration: 420, ease: 'outCubic' }); if (i === 3) { growBars(acard, 100); if (cnt) countUp(cnt, 100); } }, 200 + i * 180); });
      }, reduced ? 50 : 1400);
    }
    on($('#askBtn'), 'click', runAsk);
    on(input, 'keydown', function (e) { if (e.key === 'Enter') runAsk(); });
    $$('.chip', ask).forEach(function (c) { on(c, 'click', function () { input.value = c.getAttribute('data-q'); runAsk(); }); });
    setTimeout(runAsk, 900);
  }

  // ---------- accountants table ----------
  var tpTable = $('#tpTable');
  if (tpTable) {
    var search = $('#tpSearch'), filter = $('#tpFilter'), selEl = $('#tpSel b'), assign = $('#tpAssign'), exp = $('#tpExport'), toast = $('#tpToast'), empty = $('#tpEmpty');
    var trs = $$('tbody tr', tpTable);
    var reviewers = trs.map(function (r) { return r.children[6].textContent; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    function applyFilter() {
      var q = (search.value || '').toLowerCase().trim(), f = filter.value;
      var shown = 0;
      trs.forEach(function (r) {
        var ok = (!q || r.getAttribute('data-name').indexOf(q) >= 0 || r.textContent.toLowerCase().indexOf(q) >= 0) && (!f || r.getAttribute('data-risk') === f);
        r.hidden = !ok; if (ok) shown++;
      });
      empty.hidden = shown > 0;
    }
    function updateSel() {
      var n = 0;
      trs.forEach(function (r) { var c = $('input', r); r.classList.toggle('sel', c.checked); if (c.checked) n++; });
      selEl.textContent = n; assign.disabled = exp.disabled = n === 0;
    }
    on(search, 'input', applyFilter); on(filter, 'change', applyFilter);
    trs.forEach(function (r) { on($('input', r), 'change', updateSel); });
    on(assign, 'click', function () {
      trs.forEach(function (r) {
        if (!$('input', r).checked) return;
        var cell = r.children[6], i = reviewers.indexOf(cell.textContent);
        cell.textContent = reviewers[(i + 1) % reviewers.length];
        if (!reduced && A) A.animate(cell, { backgroundColor: ['rgba(46,211,198,0.35)', 'rgba(46,211,198,0)'], duration: 900 });
      });
    });
    on(exp, 'click', function () { toast.classList.add('show'); setTimeout(function () { toast.classList.remove('show'); }, 3200); });
  }

  // ---------- e-invoicing readiness ----------
  var einv = $('#einvCheck'), score = $('#einvScore');
  if (einv && score) {
    var boxes = $$('input', einv), arcE = $('.arc', score), pctE = $('.pct', score), msg = $('.msg', score);
    var last = 0;
    function updateScore() {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      var pct = Math.round((n / boxes.length) * 100);
      var off = 327 * (1 - pct / 100);
      if (reduced || !A) { arcE.style.strokeDashoffset = off; pctE.textContent = pct; }
      else {
        A.animate(arcE, { strokeDashoffset: off, duration: 700, ease: 'outCubic' });
        var o = { v: last }; A.animate(o, { v: pct, duration: 700, ease: 'outCubic', onUpdate: function () { pctE.textContent = Math.round(o.v); } });
      }
      last = pct;
      msg.textContent = score.getAttribute(pct < 34 ? 'data-low' : pct < 84 ? 'data-mid' : 'data-high');
    }
    boxes.forEach(function (b) { on(b, 'change', updateScore); });
  }

  // ---------- forms ----------
  $$('[data-chips]').forEach(function (g) {
    var hidden = $('input[type=hidden]', g);
    $$('.chip', g).forEach(function (c) { on(c, 'click', function () { $$('.chip', g).forEach(function (x) { x.classList.remove('on'); }); c.classList.add('on'); hidden.value = c.getAttribute('data-v'); }); });
  });
  $$('[data-slots]').forEach(function (g) {
    var hidden = $('input[type=hidden]', g);
    $$('.slot', g).forEach(function (s) { on(s, 'click', function () { $$('.slot', g).forEach(function (x) { x.classList.remove('on'); }); s.classList.add('on'); hidden.value = s.getAttribute('data-v'); var f = g.closest('.field'); if (f) f.classList.remove('bad'); }); });
  });
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('form[data-kind]').forEach(function (form) {
    var kind = form.getAttribute('data-kind');
    var box = form.nextElementSibling;
    var required = { demo: ['name', 'email', 'phone', 'company', 'slot'], career: ['role', 'name', 'email'], contact: ['name', 'email', 'message'] }[kind] || [];
    function val(name) { var el = form.querySelector('[name="' + name + '"]'); return el ? el.value.trim() : ''; }
    function labelOf(name) { var f = form.querySelector('[data-field="' + name + '"] label, [name="' + name + '"]'); var fld = form.querySelector('[name="' + name + '"]'); var wrap = fld && fld.closest('.field'); var l = wrap && wrap.querySelector('label'); return l ? l.textContent.trim() : name; }
    on(form, 'submit', function (e) {
      e.preventDefault();
      var ok = true;
      required.forEach(function (n) {
        var v = val(n), bad = !v || (n === 'email' && !emailRe.test(v));
        var wrap = form.querySelector('[data-field="' + n + '"]') || (form.querySelector('[name="' + n + '"]') || {}).closest && form.querySelector('[name="' + n + '"]').closest('.field');
        if (wrap) wrap.classList.toggle('bad', bad);
        if (bad) ok = false;
      });
      if (!ok) { var first = $('.field.bad', form); if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      var lines = [];
      $$('input[name], select[name], textarea[name]', form).forEach(function (el) { if (el.value.trim()) lines.push(labelOf(el.name) + ': ' + el.value.trim()); });
      var subject = form.getAttribute('data-subject') || document.title;
      var text = subject + '\n' + lines.join('\n');
      var wa = $('.wa', box), mail = $('.mail', box);
      if (wa) wa.href = 'https://wa.me/971505523307?text=' + encodeURIComponent(text);
      if (mail) mail.href = 'mailto:info@taxcheck.ae?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      var echo = $('.echo', box); if (echo) echo.textContent = val('email');
      var endpoint = form.getAttribute('data-endpoint') || window.TC_FORM_ENDPOINT;
      if (endpoint) {
        // Demo requests also go to the site backend (Resend e-mail + HubSpot); the hand-off buttons stay as a fallback.
        var extra = lines.filter(function (l) { return !/^(Full name|Work email|Phone \/ WhatsApp|Company|الاسم الكامل|البريد|الهاتف|الشركة)/i.test(l); });
        var payload = { name: val('name'), email: val('email'), phone: val('phone'), company: val('company'), message: (subject + ' · ' + document.documentElement.lang.toUpperCase() + '\n' + extra.join('\n')).trim() };
        var btn = form.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
          .then(function (r) { box.setAttribute('data-backend', r.ok ? 'ok' : 'fail'); })
          .catch(function () { box.setAttribute('data-backend', 'fail'); })
          .then(function () { if (btn) btn.disabled = false; });
      }
      form.classList.add('sent');
      if (!reduced && A) A.animate(box, { opacity: [0, 1], translateY: [14, 0], duration: 500, ease: 'outCubic' });
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $$('input, select, textarea', form).forEach(function (el) { on(el, 'input', function () { var w = el.closest('.field'); if (w) w.classList.remove('bad'); }); });
    on($('.again', box), 'click', function () { form.reset(); form.classList.remove('sent'); $$('.slot.on', form).forEach(function (s) { s.classList.remove('on'); }); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  });

  // ---------- careers: pick a role ----------
  $$('#roles .role').forEach(function (r) {
    on(r, 'click', function () {
      var sel = $('#f-role'); if (sel) { sel.value = r.getAttribute('data-role'); sel.closest('.field').classList.remove('bad'); }
      var apply = $('#apply'); if (apply) apply.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var name = $('#f-name'); if (name) setTimeout(function () { name.focus(); }, 500);
    });
  });
})();
