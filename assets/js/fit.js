/* Role fit check.
   A recruiter answers six questions about the role; each answer maps to evidence
   taken only from the resume. Weights: 3 = meets, 2 = largely meets, 1 = partly meets.
   Anything below 3 carries an honest note on what to probe in interview.
   Nothing is stored or sent anywhere; the summary only leaves the page if the
   visitor chooses WhatsApp, email or copy. */
(function () {
  'use strict';

  var PHONE = '917397829282';
  var EMAIL = 'wadherapryank@gmail.com';
  var SITE = 'https://pryank18.github.io/';
  var RESUME = 'Pryank_Wadhera_Senior_Product_Manager_Resume.pdf';

  var QUESTIONS = [
    {
      id: 'role', short: 'Role', title: 'What are you hiring for?', type: 'one',
      options: [
        { id: 'spm', label: 'Senior or Lead Product Manager', w: 3, link: '#shipped',
          ev: 'Over five years in product. I built two 0-to-1 platforms (vendor management and IoT fuel management) and still own product today as Country Head and Product Manager.' },
        { id: 'head', label: 'Product Lead or Head of Product', w: 2, link: '#leadership',
          ev: 'I own a product roadmap alongside a country P&L and an eight-person team, and worked directly with the CEO, CTO and MD as one of four PMs.',
          probe: 'I haven\'t yet managed a team of PMs. Ask how I\'d build one.' },
        { id: 'tpm', label: 'Technical or Platform PM', w: 3, link: '#shipped',
          ev: 'I wrote 100+ requirements for an IoT system (tank gauges, flow meters, RFID tags) and specified REST API integrations, UPI Intent and QR checkout, and IoT-server order sync.' },
        { id: 'growth', label: 'Growth PM', w: 2, link: '#shipped',
          ev: 'I A/B-tested onboarding flows as site visitors grew from about 120 to 1,000+, cut delivery time from 60 to 55 minutes with tested fixes, and converted 50+ repeat B2B customers in nine months.',
          probe: 'My growth work is B2B and operational. Ask about consumer growth loops at scale.' },
        { id: 'prog', label: 'Project, Program or Delivery Manager', w: 3, link: '#path',
          ev: 'I launched a business in a new country under written SOPs, took an MVP from wireframes to launch in 6–8 months, and set up an Agile process that cut time-to-market by 25%. Certified Agile Scrum Master.' },
        { id: 'gm', label: 'Country Head, GM or business owner', w: 3, link: '#cases',
          ev: 'I run a country P&L today: pricing, procurement, customer credit, regulators and an eight-person team. The market went from zero to 1.5M litres a month by month ten.' }
      ]
    },
    {
      id: 'product', short: 'Product', title: 'What will they own?', type: 'many', max: 3,
      hint: 'Pick up to three.',
      options: [
        { id: 'b2b', label: 'B2B SaaS or platform', w: 3, link: '#shipped',
          ev: 'A vendor platform with 150+ vendors live, a LegalTech B2B SaaS MVP taken to launch, and Dispatch OS, a multi-tenant distribution SaaS I built myself.' },
        { id: 'pay', label: 'Payments or fintech', w: 2, link: '#shipped',
          ev: 'I specified UPI Intent and QR checkout (2,000+ transactions in month one) and run a customer credit book with collections and credit risk.',
          probe: 'No card-network or regulated lending product yet. Ask how I\'d ramp up.' },
        { id: 'iot', label: 'IoT or hardware-linked', w: 3, link: '#shipped',
          ev: 'An IoT fuel-management system with tank gauges, dispensers, flow meters and RFID nozzle tags. It reached a ₹4 lakh a month saving run-rate at a steel producer.' },
        { id: 'ops', label: 'Marketplace, logistics or operations', w: 3, link: '#shipped',
          ev: 'Delivery time cut from 60 to 55 minutes through tested routing, slot-booking and order-sync fixes, vendor onboarding under half a day, and procurement and dispatch run in a new market.' },
        { id: 'ai', label: 'AI or agentic products', w: 2, link: '#builds',
          ev: 'I built Msafara, a multi-agent prototype with LangGraph, RAG, evals and human-in-the-loop escalation, and I\'m finishing an MBA in AI for Business (2026).',
          probe: 'My AI work is prototypes, not production at scale. Ask what I\'d do in the first 90 days.' },
        { id: 'b2c', label: 'Consumer (B2C) app', w: 2, link: '#builds',
          ev: 'I led the 0-to-1 roadmap for a B2C fuel-retail app and built Pravesh (exam prep) and FitNexx (subscription fitness) end to end.',
          probe: 'I haven\'t run a B2C app at scale. Ask about my consumer product judgment.' }
      ]
    },
    {
      id: 'stage', short: 'Stage', title: 'Where is the product today?', type: 'one',
      options: [
        { id: 'zero', label: 'New, going from 0 to 1', w: 3, link: '#cases',
          ev: 'Two 0-to-1 platforms in India and a market launched from zero. I start from the field: 300+ pump-owner interviews and 40+ market interviews shaped what got built.' },
        { id: 'scale', label: 'Growing, from 1 to 10', w: 3, link: '#cases',
          ev: 'I took a new market from launch to 1.5M litres a month, scaled the vendor platform to 150+ vendors, and now write the requirements taking both systems into Zambia and Nigeria.' },
        { id: 'mature', label: 'Mature, being optimised', w: 2, link: '#shipped',
          ev: 'I optimised a live delivery operation with A/B tests (60 to 55 minutes) and cut loss at an industrial site by 20 paise a litre.',
          probe: 'Most of my work is new or growing products. Ask how I\'d prioritise in a large legacy portfolio.' },
        { id: 'expand', label: 'Expanding into a new market', w: 3, link: '#cases',
          ev: 'I evaluated Zimbabwe, Zambia and Nigeria, launched in Zimbabwe with ~15 suppliers live in month one, and set up cross-border USD settlement.' }
      ]
    },
    {
      id: 'outcome', short: 'Year one', title: 'What must they get done in year one?', type: 'many', max: 2,
      hint: 'Pick up to two.',
      options: [
        { id: 'discover', label: 'Find out what to build', w: 3, link: '#cases',
          ev: '300+ pump-owner interviews became the vendor platform; 40+ market interviews became the fuel-management and vendor requirements.' },
        { id: 'ship', label: 'Ship with engineering', w: 3, link: '#shipped',
          ev: 'PRDs, user stories and the backlog in Jira with a 15-engineer team, and an MVP taken from Figma wireframes to launch in 6–8 months.' },
        { id: 'metric', label: 'Move a business metric', w: 3, link: '#shipped',
          ev: 'Delivery time from 60 to 55 minutes, vendor onboarding from over a day to under half a day, and 20 paise a litre saved on ~2M litres a month.' },
        { id: 'pnl', label: 'Own revenue or a P&L', w: 3, link: '#leadership',
          ev: 'I own a country P&L across pricing, procurement, credit, logistics and sales.' },
        { id: 'team', label: 'Build and lead a team', w: 2, link: '#leadership',
          ev: 'I lead an eight-person team, including a business-development manager I hired, and coordinate 50+ colleagues across four countries.',
          probe: 'I haven\'t led a team of PMs or designers. Ask how I\'d hire and coach one.' },
        { id: 'process', label: 'Set up how product works', w: 3, link: '#path',
          ev: 'I set up a startup\'s first Agile product process (standard PRDs and sprint planning), which cut time-to-market by 25%.' }
      ]
    },
    {
      id: 'years', short: 'Experience', title: 'How much experience does the role ask for?', type: 'one',
      options: [
        { id: 'y3', label: '3 to 5 years', w: 3, link: '#path',
          ev: 'Over seven years in total and over five in product, so above the bar.' },
        { id: 'y5', label: '5 to 8 years', w: 3, link: '#path',
          ev: 'Over seven years in total, including over five in product.' },
        { id: 'y8', label: '8 to 12 years', w: 2, link: '#path',
          ev: 'Over seven years in total and over five in product, with a country P&L and team that usually sit with more senior roles.',
          probe: 'My total years are just under the range. Judge the scope against it.' },
        { id: 'y12', label: '12 years or more', w: 1, link: '#path',
          ev: 'Over seven years in total. The scope is broader than the years suggest (a country P&L, a team and two 0-to-1 platforms).',
          probe: 'I\'m below the stated range. Worth a call only if scope matters more than years.' }
      ]
    },
    {
      id: 'where', short: 'Location', title: 'Where and how will they work?', type: 'one',
      options: [
        { id: 'remote', label: 'Remote', w: 3, link: '#top',
          ev: 'I already work across India, Africa and the UAE without sharing an office. 30-day notice.' },
        { id: 'india', label: 'On-site or hybrid in India', w: 3, link: '#top',
          ev: 'Based in New Delhi and open to any Indian city. 30-day notice.' },
        { id: 'uae', label: 'UAE or the Middle East', w: 3, link: '#top',
          ev: 'I work with teams in the UAE today and I\'m open to relocating there. 30-day notice.' },
        { id: 'abroad', label: 'Elsewhere, with relocation', w: 3, link: '#top',
          ev: 'I\'ve moved country for work before (India to Zimbabwe in 2025) and I\'m open to relocating again. 30-day notice.' }
      ]
    }
  ];

  var STATUS = { 3: 'Meets', 2: 'Largely meets', 1: 'Partly meets' };

  /* ---------- scoring (pure, testable) ---------- */
  function find(q, id) {
    for (var i = 0; i < q.options.length; i++) if (q.options[i].id === id) return q.options[i];
    return null;
  }
  function score(answers) {
    var rows = [], qMeans = [], probes = [];
    QUESTIONS.forEach(function (q) {
      var picked = (answers[q.id] || []).map(function (id) { return find(q, id); }).filter(Boolean);
      if (!picked.length) return;
      var sum = 0;
      picked.forEach(function (o) {
        sum += o.w;
        rows.push({ q: q, o: o });
        if (o.probe) probes.push(o.probe);
      });
      qMeans.push(sum / picked.length);
    });
    var mean = qMeans.reduce(function (a, b) { return a + b; }, 0) / (qMeans.length || 1);
    var met = rows.filter(function (r) { return r.o.w === 3; }).length;
    var level = mean >= 2.75 ? 'strong' : mean >= 2.25 ? 'good' : 'partial';
    return { rows: rows, probes: probes, mean: mean, met: met, total: rows.length, level: level };
  }
  var HEADLINE = { strong: 'Strong match', good: 'Good match', partial: 'Partial match' };

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
    if (step === 0) fs.appendChild(el('p', 'fit-hint', 'Six quick questions about the role. You get my evidence for each answer, plus what to probe in interview. Nothing is stored.'));
    else if (q.hint) fs.appendChild(el('p', 'fit-hint', q.hint));

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

    backBtn.hidden = step === 0;
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
  function back() { if (step > 0) { step--; renderQuestion(); } }

  function summaryLine(r) {
    var role = find(QUESTIONS[0], answers.role[0]).label;
    var bits = ['product', 'stage', 'years', 'where'].map(function (id) {
      var q = QUESTIONS.filter(function (x) { return x.id === id; })[0];
      return (answers[id] || []).map(function (a) { return find(q, a).label; }).join(', ');
    }).filter(Boolean);
    return { role: role, text: role + ' (' + bits.join('; ') + ')', level: HEADLINE[r.level] };
  }

  function renderResult() {
    var r = score(answers);
    var s = summaryLine(r);
    body.textContent = '';
    stepEl.textContent = 'Your result';
    bar.style.width = '100%';
    dlg.setAttribute('data-view', 'result');
    backBtn.hidden = false; nextBtn.hidden = true;

    var head = el('div', 'fit-res-head fit-' + r.level);
    var h = el('h2', 'fit-title', HEADLINE[r.level]);
    h.id = 'fit-title'; h.tabIndex = -1;
    head.appendChild(h);
    head.appendChild(el('p', 'fit-res-sub', 'for a ' + s.role + ' role. ' + r.met + ' of ' + r.total + ' requirements fully met' + (r.met < r.total ? ', the rest largely or partly.' : '.')));
    body.appendChild(head);

    var ul = el('ul', 'fit-rows');
    r.rows.forEach(function (row) {
      var li = el('li', 'fit-row w' + row.o.w);
      var top = el('div', 'fit-row-top');
      top.appendChild(el('span', 'fit-crit', row.q.short + ': ' + row.o.label));
      top.appendChild(el('span', 'fit-chip', STATUS[row.o.w]));
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

    var pr = el('div', 'fit-probe');
    pr.appendChild(el('h3', null, 'Worth asking in interview'));
    if (r.probes.length) {
      var pl = el('ul');
      r.probes.forEach(function (t) { pl.appendChild(el('li', null, t)); });
      pr.appendChild(pl);
    } else {
      pr.appendChild(el('p', null, 'Nothing flagged for this brief. Ask me for the numbers behind any line above.'));
    }
    body.appendChild(pr);

    var msg = 'Hi Pryank, I\'m hiring for a ' + s.text + '. Your site\'s fit check came back as: ' + s.level + '. Can we talk?';
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
      var lines = ['Pryank Wadhera, fit check: ' + s.level + ' for ' + s.text, ''];
      r.rows.forEach(function (row) { lines.push('- ' + row.q.short + ' (' + row.o.label + '): ' + STATUS[row.o.w] + '. ' + row.o.ev); });
      if (r.probes.length) { lines.push('', 'Worth asking:'); r.probes.forEach(function (t) { lines.push('- ' + t); }); }
      lines.push('', SITE);
      copy(lines.join('\n'), cp);
    });
    [wa, em, cv, cp].forEach(function (b) { acts.appendChild(b); });
    body.appendChild(acts);

    var again = el('button', 'fit-again', 'Start over');
    again.type = 'button';
    again.addEventListener('click', function () { answers = {}; step = 0; renderQuestion(); });
    body.appendChild(again);

    track('fit_check_complete', { role: answers.role[0], result: r.level });
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

  function open(prefRole) {
    if (!dlg) return;
    opener = document.activeElement;
    answers = {}; step = 0;
    if (prefRole && find(QUESTIONS[0], prefRole)) { answers.role = [prefRole]; step = 1; }
    renderQuestion();
    document.documentElement.classList.add('fit-open');
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute('open', '');
    track('fit_check_start', { role: prefRole || '' });
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
    // click on the dimmed backdrop closes
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-fit-open]');
      if (!t) return;
      e.preventDefault();
      open(t.getAttribute('data-fit-role'));
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
    if (location.hash === '#fit-check') open();
  }

  window.PortfolioFit = { QUESTIONS: QUESTIONS, score: score, open: open };
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }
})();
