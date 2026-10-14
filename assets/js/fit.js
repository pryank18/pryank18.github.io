/* Role fit check.
   A recruiter answers seven questions about the role. Every answer maps to
   evidence from Pryank's work (resume facts, public case studies and builds),
   so the result is a brief-specific proof of fit with links into the page.
   Nothing is stored or sent anywhere; the summary only leaves the page if the
   visitor chooses WhatsApp, email or copy. */
(function () {
  'use strict';

  var PHONE = '917397829282';
  var EMAIL = 'wadherapryank@gmail.com';
  var SITE = 'https://pryank18.github.io/';
  var RESUME = 'Pryank_Wadhera_Senior_Product_Manager_Resume.pdf';
  var SESSION_KEY = 'pw-fit-seen-v2';

  var QUESTIONS = [
    {
      id: 'role', short: 'Role', title: 'What are you hiring for?', type: 'one',
      options: [
        { id: 'spm', label: 'Senior or Lead Product Manager', link: '#shipped',
          ev: 'Over seven years of experience, over five in product. Two 0-to-1 platforms built in India (a vendor management system for 150+ vendors and an IoT fuel-management system), then a new market launched and run. I own product today as Country Head and Product Manager.',
          ask: 'how I took a product from 300+ field interviews to 150+ vendors live' },
        { id: 'head', label: 'Product Lead, Group PM or Head of Product', link: '#leadership',
          ev: 'I set release priorities for two platforms across three countries, work directly with the CEO, CTO and MD, and lead an eight-person team alongside a country P&L. I coordinate 50+ colleagues across Mozambique, Zambia, the UAE and India.',
          ask: 'how I set roadmap priorities against North Star metrics across three markets' },
        { id: 'tpm', label: 'Technical or Platform PM', link: '#shipped',
          ev: '100+ requirements for an IoT system (tank gauges, dispensers, flow meters, RFID nozzle tags), REST API and webhook integrations, UPI Intent and QR checkout, and IoT-server order sync. I work in SQL, Postman and Supabase, and build with Python and LangGraph.',
          ask: 'how the IoT fuel-management system was specified and piloted' },
        { id: 'ai', label: 'AI Product Manager', link: '#builds',
          ev: 'I built Msafara, a multi-agent product with LangGraph, RAG, evals and human-in-the-loop escalation, and ARA, an AI assistant inside Bolt & Bahi. MBA in AI for Business (2026) and the AI-First Product Leader certification.',
          ask: 'how I bound an AI agent\'s autonomy and designed its escalation rules' },
        { id: 'growth', label: 'Growth PM', link: '#shipped',
          ev: 'A/B-tested onboarding as website visitors grew from around 120 to 1,000+, cut delivery time from 60 to 55 minutes with tested fixes, and won 50+ enterprise and regional B2B clients in nine months from a 400+ prospect network.',
          ask: 'how I turned a 400+ prospect network into 50+ enterprise and regional clients' },
        { id: 'prog', label: 'Project, Program or Delivery Manager', link: '#path',
          ev: 'Launched a business in a new country under written SOPs, took an MVP from wireframes to launch in 6–8 months, and set up an Agile process that cut time-to-market by 25%. Certified Agile Scrum Master; backlog and sprints run in Jira.',
          ask: 'how I ran a country launch to plan with suppliers, banks and regulators' },
        { id: 'gm', label: 'Country Head, GM or business leader', link: '#cases',
          ev: 'I run a country P&L today: pricing, procurement, customer credit, logistics, sales, regulators and an eight-person team. The market went from zero to 1.5M litres a month by month ten.',
          ask: 'how I built the operating model before the product in a new market' },
        { id: 'strat', label: 'Strategy, founder\'s office or chief of staff', link: '#cases',
          ev: 'I led the market-entry evaluation of Zimbabwe, Zambia and Nigeria for the CEO, drove the 0-to-1 strategy for a B2C fuel-retail app with the GM and CEO, and turned research into product and GTM inputs. Guest mentor at IIM Raipur.',
          ask: 'how I evaluated three countries and picked the one we launched in' }
      ]
    },
    {
      id: 'product', short: 'Product', title: 'What will they own?', type: 'many', max: 3,
      hint: 'Pick up to three.',
      options: [
        { id: 'b2b', label: 'B2B SaaS or platform', link: '#shipped',
          ev: 'A vendor platform with 150+ vendors live, a LegalTech B2B SaaS MVP taken to launch, and Dispatch OS, a multi-tenant distribution SaaS I built myself.' },
        { id: 'pay', label: 'Payments, fintech or lending', link: '#shipped',
          ev: 'I specified UPI Intent and QR checkout (2,000+ transactions in month one of an internal pilot), run a six-figure USD customer credit book with collections and credit risk, and designed Kids Wallet, a UPI product with parental controls.' },
        { id: 'iot', label: 'IoT or hardware-linked', link: '#shipped',
          ev: 'An IoT fuel-management system with tank gauges, dispensers, flow meters and RFID nozzle tags, piloted at a major steel producer: 20 paise a litre saved on ~2M litres a month.' },
        { id: 'ops', label: 'Marketplace, logistics or supply chain', link: '#shipped',
          ev: 'Delivery time cut from 60 to 55 minutes through tested routing, slot-booking and order-sync fixes; vendor and customer delivery SOPs; procurement, dispatch and supplier allocation run against a demand forecast in a new market.' },
        { id: 'ai', label: 'AI or agentic products', link: '#builds',
          ev: 'Msafara, a multi-agent vendor-coordination product (LangGraph, RAG, evals, human-in-the-loop), and ARA, an AI assistant inside a GST ledger app. MBA in AI for Business, 2026.' },
        { id: 'b2c', label: 'Consumer app', link: '#builds',
          ev: 'Led the 0-to-1 roadmap and PRDs for a B2C fuel-retail app with the CEO and GM, and built Pravesh (exam prep with guardian consent flows) and FitNexx (subscription fitness) end to end.' },
        { id: 'retail', label: 'E-commerce, retail or distribution', link: '#builds',
          ev: 'Dispatch OS for FMCG distributors (ordering, credit limits, stock, SKU catalogue) and Bolt & Bahi for textile traders (billing, stock, receivables), plus trading-area analysis for retail fuel sites and the company\'s first retail station lease with a national oil company.' },
        { id: 'energy', label: 'Energy, mobility or EV', link: '#path',
          ev: 'Fuel-tech from vendor platform to IoT tank monitoring to a bulk-fuel business run end to end, plus EV-charging and fuel-retail infrastructure mapping with 100+ fleet and EV operator interviews.' }
      ]
    },
    {
      id: 'company', short: 'Company', title: 'What kind of company is it?', type: 'one',
      options: [
        { id: 'early', label: 'Early-stage startup', link: '#cases',
          ev: 'I joined a fuel-tech startup as a research associate and was a product manager within six months, then launched its new-country business from zero with no suppliers, banking or customers in place.' },
        { id: 'scale', label: 'Growth-stage or scale-up', link: '#shipped',
          ev: 'One of four PMs with a 15-engineer team, shipping a vendor platform, IoT FMS and UPI checkout while the business expanded into Africa.' },
        { id: 'ent', label: 'Large enterprise or global capability centre', link: '#leadership',
          ev: 'Compliance rules and SOPs that scale, work with regulators (ZERA, ZIMRA), cross-border USD settlement with global suppliers, and stakeholder management across the CEO, CTO, MD and 50+ colleagues in four countries.' },
        { id: 'svc', label: 'Consulting, services or agency', link: '#cases',
          ev: 'Policy research and stakeholder engagement for the Delhi Government, a scoped on-site FMS for a major beverage bottler, and case studies written the way I run reviews: problem, evidence, scope.' }
      ]
    },
    {
      id: 'stage', short: 'Stage', title: 'Where is the product today?', type: 'one',
      options: [
        { id: 'zero', label: 'New, going from 0 to 1', link: '#cases',
          ev: 'Two 0-to-1 platforms in India and a market launched from zero. I start from the field: 300+ pump-owner interviews and 40+ market interviews shaped what got built.' },
        { id: 'grow', label: 'Growing, from 1 to 10', link: '#cases',
          ev: 'I took a new market from launch to 1.5M litres a month, scaled the vendor platform to 150+ vendors, and now write the requirements taking both systems into Zambia and Nigeria.' },
        { id: 'mature', label: 'Established, being optimised', link: '#shipped',
          ev: 'I optimised a live delivery operation with A/B tests (60 to 55 minutes), took vendor onboarding from over a day to under half, and cut fuel loss at an industrial site by 20 paise a litre, measured against baselines.' },
        { id: 'expand', label: 'Expanding into a new market', link: '#cases',
          ev: 'I evaluated Zimbabwe, Zambia and Nigeria, launched in Zimbabwe with ~15 suppliers live in month one, set up cross-border USD settlement, and run the P&L there today.' }
      ]
    },
    {
      id: 'skills', short: 'Must-have', title: 'Which skills matter most?', type: 'many', max: 3,
      hint: 'Pick up to three.',
      options: [
        { id: 'tech', label: 'Technical fluency: APIs, SQL, data', link: '#shipped',
          ev: 'SQL and Excel for demand forecasting, REST APIs and webhooks, Postman, Supabase, and Python with LangGraph and an LLM API. 100+ IoT requirements written and shipped.' },
        { id: 'exp', label: 'Analytics and experimentation', link: '#shipped',
          ev: 'Funnel analytics in Amplitude and Tableau, A/B-tested delivery fixes (60 to 55 minutes) and onboarding flows, and every goal set against a baseline.' },
        { id: 'aiskill', label: 'Hands-on AI and LLMs', link: '#builds',
          ev: 'LLM agent orchestration, prompt design, RAG, evals and human-in-the-loop design, shipped in Msafara and ARA. MBA in AI for Business.' },
        { id: 'stake', label: 'Stakeholder and executive management', link: '#leadership',
          ev: 'Day-to-day work with the CEO, CTO and MD, reporting to the Business Head, and alignment across suppliers, banks, regulators and 50+ colleagues in four countries.' },
        { id: 'pnl', label: 'Commercial or P&L ownership', link: '#leadership',
          ev: 'A country P&L across pricing, procurement, credit, logistics and sales, with a six-figure USD credit book managed on a 4–5-day cycle.' },
        { id: 'lead', label: 'Team leadership and hiring', link: '#leadership',
          ev: 'An eight-person team led directly, including a business-development manager I hired, plus six student groups mentored at IIM Raipur.' },
        { id: 'disc', label: 'Discovery and user research', link: '#cases',
          ev: '300+ pump-owner interviews, 100+ fleet and EV operator interviews, 40+ market interviews, and a live customer feedback loop into the backlog.' },
        { id: 'proc', label: 'Process and Agile delivery', link: '#path',
          ev: 'Set up a company\'s first Agile product process with standard PRDs and sprint planning (time-to-market down 25%). Certified Agile Scrum Master; Jira and Confluence daily.' }
      ]
    },
    {
      id: 'years', short: 'Experience', title: 'How much experience does the role ask for?', type: 'one',
      options: [
        { id: 'y3', label: '3 to 5 years', link: '#path',
          ev: 'Over seven years in total and over five in product, well above the bar, with leadership scope already in hand.' },
        { id: 'y5', label: '5 to 8 years', link: '#path',
          ev: 'Over seven years in total, over five in product, and a country P&L and team on top.' },
        { id: 'y8', label: '8 to 12 years', link: '#path',
          ev: 'Over seven years in total and over five in product, with scope usually seen at this level: a country P&L, an eight-person team, two 0-to-1 platforms and a market launched from zero.' },
        { id: 'y12', label: '12 years or more', link: '#leadership',
          ev: 'Over seven years in total, with the scope this level asks for: full P&L ownership, team leadership, regulators and multi-country expansion, plus an MBA in AI for Business in progress.' }
      ]
    },
    {
      id: 'where', short: 'Location', title: 'Where and how will they work?', type: 'one',
      options: [
        { id: 'remote', label: 'Remote', link: '#top',
          ev: 'I already work across India, Africa and the UAE without sharing an office. 30-day notice.' },
        { id: 'india', label: 'On-site or hybrid in India', link: '#top',
          ev: 'Based in New Delhi and open to any Indian city. 30-day notice.' },
        { id: 'uae', label: 'UAE or the Middle East', link: '#top',
          ev: 'I work with teams in the UAE today and I\'m ready to relocate there. 30-day notice.' },
        { id: 'africa', label: 'Africa', link: '#top',
          ev: 'Based in Harare today, running a business across Zimbabwe with expansion into Zambia and Nigeria. 30-day notice.' },
        { id: 'abroad', label: 'Elsewhere, with relocation', link: '#top',
          ev: 'I\'ve moved country for work before (India to Zimbabwe in 2025) and I\'m ready to relocate again. 30-day notice.' }
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
    return { rows: rows, asks: asks, total: rows.length, level: 'strong' };
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
    bub.appendChild(el('p', 'fit-hint', 'Seven quick questions about your role. For every answer you get the matching evidence from my work, with links to see it on this page, and a summary you can send to the hiring manager.'));
    bub.appendChild(el('span', 'fit-sign', 'Pryank'));
    note.appendChild(bub);
    wrap.appendChild(note);
    var ul = el('ul', 'fit-intro-pts');
    ['Takes about a minute', 'Evidence, not adjectives', 'Nothing is stored'].forEach(function (t) { ul.appendChild(el('li', null, t)); });
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
    var bits = [labels('product').join(', '), labels('company')[0], labels('stage')[0], labels('skills').join(', '), labels('years')[0], labels('where')[0]].filter(Boolean);
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
    var h = el('h2', 'fit-title', 'Strong match');
    h.id = 'fit-title'; h.tabIndex = -1;
    head.appendChild(h);
    head.appendChild(el('p', 'fit-res-sub', 'for your ' + s.role + ' role. All ' + r.total + ' requirements are backed by evidence from my work. Each line links to where you can see it.'));
    body.appendChild(head);

    var ul = el('ul', 'fit-rows');
    r.rows.forEach(function (row) {
      var li = el('li', 'fit-row');
      var top = el('div', 'fit-row-top');
      top.appendChild(el('span', 'fit-crit', row.q.short + ': ' + row.o.label));
      top.appendChild(el('span', 'fit-chip', 'Evidence'));
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

    var msg = 'Hi Pryank, I\'m hiring for ' + withArticle(s.text) + '. Your fit check came back as a strong match on all ' + r.total + ' points. Can we talk?';
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
      var lines = ['Pryank Wadhera: strong match for ' + s.text, ''];
      r.rows.forEach(function (row) { lines.push('- ' + row.q.short + ' (' + row.o.label + '): ' + row.o.ev); });
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

    track('fit_check_complete', { role: (answers.role || [''])[0], points: r.total });
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
