/* Role fit check.
   A recruiter answers four questions about the role. Every answer maps to
   evidence from Pryank's work (resume facts, public case studies and builds),
   so the result is a brief-specific proof of fit with links into the page.
   No answers are saved; only anonymous start/complete events go to analytics; the summary only leaves the page if the
   visitor chooses WhatsApp, email or copy. */
(function () {
  'use strict';

  var PHONE = '917397829282';
  var EMAIL = 'wadherapryank@gmail.com';
  var SITE = 'https://pryank18.github.io/';
  var RESUME = 'Pryank_Wadhera_Senior_Product_Manager_Resume.pdf';
  var SESSION_KEY = 'pw-fit-seen-v2';

  /* Every option carries a match level, so the result reads as an honest brief:
     'direct'   = done in a paid role, on the resume
     'adjacent' = transferable, or shown in personal builds rather than at work
     Wording and figures follow the resume, which is the source of truth. */
  var QUESTIONS = [
    {
      id: 'role', short: 'Role', title: 'What are you hiring for?', type: 'one',
      options: [
        { id: 'spm', label: 'Product Manager or Senior PM', link: '#shipped', fit: 'direct',
          ev: 'Seven-plus years in total, five-plus in product. In India I shipped a vendor management system now serving 150+ vendors, UPI checkout, and an IoT fuel-management system piloted at a major steel producer; then I launched a new market and now run it as Country Head and Product Manager.',
          ask: 'how I took a vendor platform from 300+ pump-owner interviews to 150+ vendors' },
        { id: 'head', label: 'Lead PM, Group PM or Head of Product', link: '#leadership', fit: 'direct',
          ev: 'I set Zimbabwe release priorities for two platforms on the central roadmap, tracked against North Star KPIs, and write the requirements taking them into Zambia and Nigeria. I worked directly with the CEO, CTO and MD in India, and today lead an 8-person team alongside a country P&L.',
          ask: 'how I set roadmap priorities against North Star KPIs across three markets' },
        { id: 'tpm', label: 'Technical or Platform PM', link: '#shipped', fit: 'direct',
          ev: '100+ requirements defined for an IoT system (tank gauges, flow meters, RFID), REST API integrations, UPI Intent and QR checkout, and root-causing IoT order-sync failures. I work in SQL, Postman and Supabase, and build with Python and LangGraph.',
          ask: 'how the IoT fuel-management system was specified and piloted' },
        { id: 'ai', label: 'AI Product Manager', link: '#builds', fit: 'adjacent',
          ev: 'Shown in personal builds rather than at work so far: Msafara, a multi-agent prototype where LLM agents decide through tool calls inside price limits enforced in code, with LangGraph, RAG and a human approval gate; on 100 synthetic trips it completed 100% vs 86% for a rules baseline, with 0 price-limit breaches. Also ARA, an AI assistant inside Bolt & Bahi. MBA in AI for Business (expected Dec 2026).',
          ask: 'how I bound an AI agent\'s autonomy and designed its escalation rules' },
        { id: 'growth', label: 'Growth PM', link: '#shipped', fit: 'adjacent',
          ev: 'Transferable rather than a growth title: A/B-tested onboarding flows, delivery time cut from 60 to 55 minutes with A/B-tested fixes, funnel metrics in Amplitude and Tableau, and 50+ enterprise and regional clients won from a 400+ network.',
          ask: 'how I turned a 400+ network into 50+ enterprise and regional clients' },
        { id: 'proj', label: 'Project Manager', link: '#path', fit: 'direct',
          ev: 'Took a web and mobile MVP from Figma wireframes to launch within 8 months, ran the six-month IoT pilot from 100+ requirements, and launched a business in a new country under written SOPs. Certified Agile Scrum Master; backlog and sprints in Jira.',
          ask: 'how the six-month IoT pilot was planned and measured' },
        { id: 'prog', label: 'Program or Delivery Manager', link: '#path', fit: 'direct',
          ev: 'Launched a new market by bringing suppliers, banks, transporters and an 8-person team onto one plan, introduced Agile/Scrum with standard PRDs and sprint planning (time-to-market down 25%), and coordinate 50+ colleagues across Mozambique, Zambia, the UAE and India.',
          ask: 'how I ran a country launch to plan with suppliers, banks and regulators' },
        { id: 'gm', label: 'Country Head, GM or business leader', link: '#cases', fit: 'direct',
          ev: 'I run a country P&L today across pricing, procurement, logistics and sales, plus customer credit and collections, within ZERA and ZIMRA rules. I took the market from zero to 8 active depots and 50+ enterprise and regional clients, with zero stock-outs.',
          ask: 'how I built the operating model before the product in a new market' },
        { id: 'strat', label: 'Strategy, founder\'s office or chief of staff', link: '#cases', fit: 'direct',
          ev: 'I led the market and competitive evaluation of Zimbabwe, Zambia and Nigeria, and partnered with the GM and CEO on Project Arjun, mapping EV and oil & gas retail infrastructure from 100+ fleet and EV operator interviews (plan approved by leadership).',
          ask: 'how I evaluated three countries and picked the one we launched in' }
      ]
    },
    {
      id: 'product', short: 'Product', title: 'What will they own?', type: 'many', max: 3,
      hint: 'Pick up to three.',
      options: [
        { id: 'b2b', label: 'B2B SaaS or platform', link: '#shipped', fit: 'direct',
          ev: 'A vendor management system serving 150+ vendors, and a LegalTech SaaS MVP taken to launch. On my own time, Dispatch OS, a multi-tenant distribution SaaS used in distributor pitches.' },
        { id: 'pay', label: 'Payments, fintech or lending', link: '#shipped', fit: 'direct',
          ev: 'Specified and shipped UPI Intent and QR checkout (2,000+ transactions in month one), and own customer credit and collections in a country P&L today.' },
        { id: 'iot', label: 'IoT or hardware-linked', link: '#shipped', fit: 'direct',
          ev: 'Defined 100+ requirements for an IoT fuel-management system (tank gauges, flow meters, RFID); its six-month pilot at a major Indian steel producer cut loss, theft and spillage by about 20 paise per litre, a ~₹4 lakh a month run-rate by months 5–6.' },
        { id: 'ops', label: 'Marketplace, logistics or supply chain', link: '#shipped', fit: 'direct',
          ev: 'Delivery time cut from 60 to 55 minutes through tested fixes to order sync, routing and slot booking, and supplier volumes allocated across 8 depots from a daily demand forecast with zero stock-outs.' },
        { id: 'ai', label: 'AI or agentic products', link: '#builds', fit: 'adjacent',
          ev: 'From personal builds: Msafara, a multi-agent vendor-coordination prototype (LangGraph, tool calling, RAG, human approval gate), evaluated on 100 synthetic trips against a rules baseline (100% vs 86% task completion, 0 price-limit breaches), and ARA, an AI assistant inside a GST ledger app. MBA in AI for Business, expected Dec 2026.' },
        { id: 'b2c', label: 'Consumer app', link: '#builds', fit: 'adjacent',
          ev: 'B2C products at FuelBuddy alongside B2B, plus personal builds: Pravesh, a live exam-prep app with a free model and voluntary UPI support, and FitNexx, a subscription fitness app.' },
        { id: 'retail', label: 'E-commerce, retail or distribution', link: '#builds', fit: 'adjacent',
          ev: 'Secured FuelBuddy\'s first Indian Oil (IOCL) retail station lease; a Shopify app integrated with 3+ merchant stores for freelance clients; and Dispatch OS for FMCG distributors.' },
        { id: 'energy', label: 'Energy, mobility or EV', link: '#path', fit: 'direct',
          ev: 'Fuel-tech from vendor platform to IoT tank monitoring to a bulk-fuel business run end to end, plus EV and oil & gas retail infrastructure mapping from 100+ fleet and EV operator interviews.' }
      ]
    },
    {
      id: 'years', short: 'Experience', title: 'How much experience does the role ask for?', type: 'one',
      options: [
        { id: 'y3', label: '3 to 5 years', link: '#path', fit: 'adjacent',
          ev: 'Seven-plus years in total and five-plus in product, so more than this role asks. Worth agreeing scope and level early in the conversation.' },
        { id: 'y5', label: '5 to 8 years', link: '#path', fit: 'direct',
          ev: 'Seven-plus years in total and five-plus in product, with a country P&L and an 8-person team on top.' },
        { id: 'y8', label: '8 to 12 years', link: '#path', fit: 'adjacent',
          ev: 'Seven-plus years in total and five-plus in product, so a little under the number. The scope is at that level: a country P&L, an 8-person team, a 0-to-1 vendor platform and a market launched from zero.' }
      ]
    },
    {
      id: 'where', short: 'Location', title: 'Where and how will they work?', type: 'one',
      options: [
        { id: 'remote', label: 'Remote', link: '#top', fit: 'direct',
          ev: 'I already work with colleagues across Mozambique, Zambia, the UAE and India without sharing an office.' },
        { id: 'india', label: 'On-site or hybrid in India', link: '#top', fit: 'direct',
          ev: 'Home base New Delhi, open to relocation within India, and available to join immediately.' },
        { id: 'uae', label: 'UAE or the Middle East', link: '#top', fit: 'direct',
          ev: 'I coordinate with colleagues in the UAE today and I\'m open to relocating.' },
        { id: 'africa', label: 'Africa', link: '#top', fit: 'direct',
          ev: 'I launched and run a B2B business in Zimbabwe and write the requirements for the next rollouts in Zambia and Nigeria.' },
        { id: 'abroad', label: 'Elsewhere, with relocation', link: '#top', fit: 'direct',
          ev: 'I moved country for work in 2025 (India to Zimbabwe) and I\'m open to relocating again.' }
      ]
    }
  ];

  /* ---------- scoring (pure, testable) ---------- */
  function find(q, id) {
    for (var i = 0; i < q.options.length; i++) if (q.options[i].id === id) return q.options[i];
    return null;
  }
  function score(answers) {
    var rows = [], asks = [];
    QUESTIONS.forEach(function (q) {
      (answers[q.id] || []).forEach(function (id) {
        var o = find(q, id);
        if (!o) return;
        rows.push({ q: q, o: o });
        if (o.ask) asks.push(o.ask);
      });
    });
    var direct = rows.filter(function (r) { return r.o.fit !== 'adjacent'; }).length;
    return { rows: rows, asks: asks, total: rows.length, direct: direct };
  }

  /* ---------- dialog ---------- */
  var dlg, body, stepEl, bar, backBtn, nextBtn, opener = null;
  var step = 0, answers = {}, tapped = null, tappedAt = 0;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }
  function seen(v) {
    try { if (v === undefined) return sessionStorage.getItem(SESSION_KEY) === '1'; sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { return false; }
  }

  function renderIntro() {
    body.textContent = '';
    stepEl.textContent = 'For recruiters and hiring managers';
    bar.style.width = '0%';
    dlg.setAttribute('data-view', 'intro');
    backBtn.hidden = true; nextBtn.hidden = true;

    var wrap = el('div', 'fit-intro');
    var note = el('div', 'fit-note');
    var av = document.createElement('img');
    av.src = 'assets/img/pryank-namaste.webp'; av.alt = ''; av.width = 301; av.height = 660; av.decoding = 'async';
    note.appendChild(av);
    var bub = el('div', 'fit-bubble');
    var h = el('h2', 'fit-title', 'Hiring a product leader? Check the fit in 60 seconds.');
    h.id = 'fit-title'; h.tabIndex = -1;
    bub.appendChild(h);
    bub.appendChild(el('p', 'fit-hint', 'Four quick questions about your role. For every answer you get the matching evidence from my work, marked as direct or adjacent, with links to see it on this page and a summary you can send to the hiring manager.'));
    bub.appendChild(el('span', 'fit-sign', 'Pryank'));
    note.appendChild(bub);
    wrap.appendChild(note);
    var ul = el('ul', 'fit-intro-pts');
    ['Takes about a minute', 'Evidence, not adjectives', 'No sign-up, no contact details'].forEach(function (t) { ul.appendChild(el('li', null, t)); });
    wrap.appendChild(ul);
    var acts = el('div', 'fit-intro-acts');
    var go = el('button', 'btn btn-primary', 'Start the fit check');
    go.type = 'button';
    go.addEventListener('click', function () { step = 0; renderQuestion(); });
    var skip = el('button', 'btn btn-ghost', 'Browse the site first');
    skip.type = 'button';
    skip.addEventListener('click', close);
    acts.appendChild(go); acts.appendChild(skip);
    wrap.appendChild(acts);
    body.appendChild(wrap);
    setTimeout(function () { go.focus({ preventScroll: true }); }, 30);
  }

  function renderQuestion() {
    var q = QUESTIONS[step];
    var picked = answers[q.id] || [];
    body.textContent = '';
    tapped = null;
    stepEl.textContent = 'Question ' + (step + 1) + ' of ' + QUESTIONS.length;
    bar.style.width = ((step) / QUESTIONS.length * 100) + '%';
    dlg.setAttribute('data-view', 'question');

    var fs = el('fieldset', 'fit-q');
    var lg = el('legend', 'fit-title', q.title);
    lg.id = 'fit-title'; lg.tabIndex = -1;
    fs.appendChild(lg);
    if (q.hint) fs.appendChild(el('p', 'fit-hint', q.hint));

    var list = el('div', 'fit-opts');
    q.options.forEach(function (o) {
      var lab = el('label', 'fit-opt');
      var inp = document.createElement('input');
      inp.type = q.type === 'one' ? 'radio' : 'checkbox';
      inp.name = 'fit-' + q.id; inp.value = o.id;
      inp.checked = picked.indexOf(o.id) > -1;
      lab.appendChild(inp);
      lab.appendChild(el('span', null, o.label));
      // auto-advance after a tap or click on a single-choice question; arrow keys never advance
      lab.addEventListener('pointerdown', function () { tapped = inp; tappedAt = Date.now(); });
      inp.addEventListener('change', function () {
        collect(q);
        if (q.type === 'one' && tapped === inp && Date.now() - tappedAt < 1500) {
          tapped = null;
          var at = step;
          setTimeout(function () { if (step === at && answers[q.id] && answers[q.id][0] === o.id) next(); }, 200);
        }
      });
      list.appendChild(lab);
    });
    fs.appendChild(list);
    body.appendChild(fs);
    collect(q);

    backBtn.hidden = false;
    nextBtn.textContent = step === QUESTIONS.length - 1 ? 'See the result' : 'Next';
    nextBtn.hidden = false;
    setTimeout(function () { lg.focus({ preventScroll: true }); }, 30);
    body.scrollTop = 0;
  }

  function collect(q) {
    var boxes = body.querySelectorAll('input[name="fit-' + q.id + '"]');
    var vals = [];
    Array.prototype.forEach.call(boxes, function (b) { if (b.checked) vals.push(b.value); });
    answers[q.id] = vals;
    if (q.type === 'many' && q.max) {
      Array.prototype.forEach.call(boxes, function (b) {
        b.disabled = !b.checked && vals.length >= q.max;
        b.parentNode.classList.toggle('is-off', b.disabled);
      });
    }
    nextBtn.disabled = vals.length === 0;
  }

  function next() {
    var q = QUESTIONS[step];
    if (!answers[q.id] || !answers[q.id].length) return;
    if (step < QUESTIONS.length - 1) { step++; renderQuestion(); }
    else renderResult();
  }
  function back() {
    if (step > 0) { step--; renderQuestion(); }
    else renderIntro();
  }

  function withArticle(t) { return (/^[aeiou]/i.test(t) ? 'an ' : 'a ') + t; }
  function labels(id) {
    var q = QUESTIONS.filter(function (x) { return x.id === id; })[0];
    return (answers[id] || []).map(function (a) { var o = find(q, a); return o ? o.label : ''; }).filter(Boolean);
  }
  function summaryLine() {
    var role = labels('role')[0] || 'product';
    var bits = [labels('product').join(', '), labels('years')[0], labels('where')[0]].filter(Boolean);
    return { role: role, text: role + ' (' + bits.join('; ') + ')' };
  }

  function renderResult() {
    var r = score(answers);
    var s = summaryLine();
    body.textContent = '';
    stepEl.textContent = 'Your result';
    bar.style.width = '100%';
    dlg.setAttribute('data-view', 'result');
    backBtn.hidden = false; nextBtn.hidden = true;

    var note = el('div', 'fit-note');
    var av = document.createElement('img');
    av.src = 'assets/img/pryank-namaste.webp'; av.alt = ''; av.width = 301; av.height = 660; av.loading = 'lazy'; av.decoding = 'async';
    note.appendChild(av);
    var bub = el('div', 'fit-bubble');
    bub.appendChild(el('p', null, 'Thank you for taking the minute. For ' + withArticle(s.role) + ' role, this is what I\'d put in front of you. Every line below links to the work behind it, and I\'m one message away if you want the details.'));
    bub.appendChild(el('span', 'fit-sign', 'Pryank'));
    note.appendChild(bub);
    body.appendChild(note);

    var head = el('div', 'fit-res-head');
    var h = el('h2', 'fit-title', 'How my work maps to your role');
    h.id = 'fit-title'; h.tabIndex = -1;
    head.appendChild(h);
    head.appendChild(el('p', 'fit-res-sub', 'For your ' + s.role + ' role. Direct means I have done it in a paid role; adjacent means transferable, or shown in my own builds. Each line links to the work behind it.'));
    body.appendChild(head);

    var ul = el('ul', 'fit-rows');
    r.rows.forEach(function (row) {
      var li = el('li', 'fit-row');
      var top = el('div', 'fit-row-top');
      top.appendChild(el('span', 'fit-crit', row.q.short + ': ' + row.o.label));
      var adj = row.o.fit === 'adjacent';
      top.appendChild(el('span', 'fit-chip' + (adj ? ' fit-chip-adj' : ''), adj ? 'Adjacent' : 'Direct'));
      li.appendChild(top);
      var p = el('p', null, row.o.ev + ' ');
      var a = el('a', 'fit-see', 'See it');
      a.href = row.o.link;
      a.addEventListener('click', function () { close(); });
      p.appendChild(a);
      li.appendChild(p);
      ul.appendChild(li);
    });
    body.appendChild(ul);

    if (r.asks.length) {
      var pr = el('div', 'fit-probe');
      pr.appendChild(el('h3', null, 'Ask me in the first call'));
      var pl = el('ul');
      r.asks.forEach(function (t) { pl.appendChild(el('li', null, 'Ask me ' + t + '.')); });
      pr.appendChild(pl);
      body.appendChild(pr);
    }

    var msg = 'Hi Pryank, I\'m hiring for ' + withArticle(s.text) + '. I went through your fit check and would like to talk.';
    var acts = el('div', 'fit-acts');
    var wa = el('a', 'btn btn-primary fit-wa', 'Message me on WhatsApp');
    wa.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.addEventListener('click', function () { track('whatsapp_click', { link_location: 'fit_result' }); });
    var em = el('a', 'btn btn-ghost', 'Email me');
    em.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Role: ' + s.role) + '&body=' + encodeURIComponent(msg);
    var cv = el('a', 'btn btn-ghost', 'Download resume');
    cv.href = RESUME; cv.setAttribute('download', '');
    var cp = el('button', 'btn btn-ghost', 'Copy summary');
    cp.type = 'button';
    cp.addEventListener('click', function () {
      var lines = ['Pryank Wadhera: evidence for ' + s.text, ''];
      r.rows.forEach(function (row) { lines.push('- ' + row.q.short + ' (' + row.o.label + ', ' + (row.o.fit === 'adjacent' ? 'adjacent' : 'direct') + '): ' + row.o.ev); });
      if (r.asks.length) { lines.push('', 'Ask him:'); r.asks.forEach(function (t) { lines.push('- ' + t.charAt(0).toUpperCase() + t.slice(1)); }); }
      lines.push('', 'Resume: ' + SITE + RESUME, 'Portfolio: ' + SITE, 'WhatsApp: +91 7397829282 | ' + EMAIL);
      copy(lines.join('\n'), cp);
    });
    [wa, em, cv, cp].forEach(function (b) { acts.appendChild(b); });
    body.appendChild(acts);

    var again = el('button', 'fit-again', 'Start over');
    again.type = 'button';
    again.addEventListener('click', function () { answers = {}; step = 0; renderQuestion(); });
    body.appendChild(again);

    try { sessionStorage.setItem('pw-fit-role', s.role); } catch (e) {}
    track('fit_check_complete', { role: (answers.role || [''])[0], product: (answers.product || []).join(','), years: (answers.years || [''])[0], work_mode: (answers.where || [''])[0], points: r.total });
    setTimeout(function () { h.focus({ preventScroll: true }); }, 30);
    body.scrollTop = 0;
  }

  function copy(text, btn) {
    var done = function () { var t = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = t; }, 1600); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = el('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      dlg.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      dlg.removeChild(ta);
    }
  }

  function show() {
    document.documentElement.classList.add('fit-open');
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute('open', '');
  }
  function open(prefRole, source) {
    if (!dlg) return;
    opener = document.activeElement;
    answers = {}; step = 0;
    seen(true);
    // A preselected role (the role buttons in the Fit section) goes straight to question 2.
    // Every other entry point shows the intro first: the avatar, the promise, and a Start button.
    if (prefRole && find(QUESTIONS[0], prefRole)) { answers.role = [prefRole]; step = 1; renderQuestion(); }
    else renderIntro();
    show();
    track('fit_check_start', { role: prefRole || '', source: source || 'button' });
  }
  function close() {
    if (!dlg) return;
    if (typeof dlg.close === 'function' && dlg.open) dlg.close();
    else dlg.removeAttribute('open');
  }

  function init() {
    dlg = document.getElementById('fit-dialog');
    if (!dlg) return;
    body = dlg.querySelector('.fit-body');
    stepEl = dlg.querySelector('.fit-step');
    bar = dlg.querySelector('.fit-bar i');
    backBtn = dlg.querySelector('.fit-back');
    nextBtn = dlg.querySelector('.fit-next');
    backBtn.addEventListener('click', function () {
      if (dlg.getAttribute('data-view') === 'result') renderQuestion(); else back();
    });
    nextBtn.addEventListener('click', next);
    dlg.querySelector('.fit-x').addEventListener('click', close);
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('fit-open');
      if (opener && opener.focus) { try { opener.focus({ preventScroll: true }); } catch (e) {} }
    });
    dlg.addEventListener('cancel', function () { seen(true); });
    // click on the dimmed backdrop closes
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-fit-open]');
      if (!t) return;
      e.preventDefault();
      open(t.getAttribute('data-fit-role'), 'button');
    });

    // inline role picker in the section: list the same roles
    var pick = document.getElementById('fit-roles');
    if (pick) {
      pick.textContent = '';
      QUESTIONS[0].options.forEach(function (o) {
        var b = el('button', 'fit-role', o.label);
        b.type = 'button';
        b.setAttribute('data-fit-open', '');
        b.setAttribute('data-fit-role', o.id);
        pick.appendChild(b);
      });
    }
    document.documentElement.classList.add('fit-ready');

    // First visit in this session, landing on the page itself (not a deep link): open the intro once,
    // after the first paint so the page is visible behind it. Later visits in the same session don't repeat it.
    // This auto-open is a standing owner requirement; do not switch it to opt-in.
    var deepLink = location.hash && location.hash !== '#top' && location.hash !== '#fit-check';
    if (location.hash === '#fit-check') open(null, 'link');
    else if (!deepLink && !seen() && typeof dlg.showModal === 'function') {
      setTimeout(function () { if (!dlg.open) open(null, 'auto'); }, 1100);
    }
  }

  window.PortfolioFit = { QUESTIONS: QUESTIONS, score: score, open: open };
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }
})();
