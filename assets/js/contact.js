/* "Prefer I reach you?" call-back form in the contact section.
   Fallback for visitors who don't have the resume (search, shares). The main paths stay
   WhatsApp, Call, Email and the resume download.
   Delivery: FormSubmit (formsubmit.co) emails each request to the inbox below. No account
   or server. The first ever submission triggers a one-time activation email; until that
   link is clicked, requests are not delivered.
   Sent with each request, never shown to the visitor: the per-application ?ref tag saved
   on landing, the role picked in the fit check, the page and the visitor's time zone. */
(function () {
  var ENDPOINT = 'https://formsubmit.co/ajax/wadherapryank@gmail.com';
  var form = document.getElementById('lead-form');
  var box = document.getElementById('lead');
  if (!form || !box || !window.fetch) return;

  var status = form.querySelector('.lead-status');
  var send = form.querySelector('.lead-send');
  var f = function (n) { return form.elements[n]; };
  var openedAt = 0;

  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }
  function stored(key) { try { return sessionStorage.getItem(key) || ''; } catch (e) { return ''; } }
  function say(msg, kind) { status.textContent = msg; status.setAttribute('data-kind', kind || ''); }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function isPhone(v) {
    var digits = v.replace(/[\s\-().+]/g, '');
    return /^\d{8,15}$/.test(digits) && /^[+\d\s\-().]+$/.test(v);
  }

  box.addEventListener('toggle', function () {
    if (!box.open) return;
    openedAt = Date.now();
    var role = f('role');
    if (role && !role.value) role.value = stored('pw-fit-role');
    track('lead_form_open', { link_location: 'contact' });
    setTimeout(function () { try { f('name').focus({ preventScroll: true }); } catch (e) {} }, 60);
    // let the floating WhatsApp button re-check whether it now covers a field
    try { window.dispatchEvent(new Event('scroll')); } catch (e) {}
  });

  // clear a field's error as soon as it is edited
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true') e.target.removeAttribute('aria-invalid');
    if (status.getAttribute('data-kind') === 'error') say('');
  });

  function invalid(input, msg) {
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    say(msg, 'error');
  }

  function thanks(name) {
    form.reset();
    form.classList.add('is-sent');
    say('Thanks' + (name ? ', ' + name.split(/\s+/)[0] : '') + '. I\'ll get back to you within a day.', 'ok');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (send.disabled) return;

    var name = f('name').value.trim();
    var company = f('company').value.trim();
    var phone = f('phone').value.trim();
    var email = f('email').value.trim();
    var role = f('role').value.trim();

    // bots: honeypot filled, or the form sent within 2 seconds of opening. Look successful, send nothing.
    if (f('_honey').value || (openedAt && Date.now() - openedAt < 2000)) { thanks(name); return; }

    if (name.length < 2) return invalid(f('name'), 'Please add your name.');
    if (company.length < 2) return invalid(f('company'), 'Please add your company.');
    if (!phone && !email) return invalid(f('phone'), 'Please add a phone number or an email, so I can reach you.');
    if (phone && !isPhone(phone)) return invalid(f('phone'), 'That phone number looks incomplete. Add the country code if it\'s outside India.');
    if (email && !EMAIL_RE.test(email)) return invalid(f('email'), 'That email looks incomplete.');
    var kind = phone && email ? 'both' : (phone ? 'phone' : 'email');

    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e2) {}
    var data = {
      name: name,
      company: company,
      phone: phone || '-',
      email: email || '-',
      role: role || '-',
      application_ref: stored('pw-ref') || 'none',
      page: location.pathname,
      visitor_time_zone: tz || '-',
      _subject: 'Portfolio call-back: ' + name + ', ' + company,
      _template: 'table',
      _captcha: 'false'
    };
    if (!email) delete data.email; // a real email becomes the reply-to address in the inbox

    send.disabled = true;
    send.textContent = 'Sending…';
    say('');

    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; });
    }).then(function (res) {
      if (res.ok && String(res.j.success) === 'true') {
        thanks(name);
        track('lead_submit', { link_location: 'contact', contact_given: kind });
      } else {
        throw new Error('not delivered');
      }
    }).catch(function () {
      track('lead_submit_failed', { link_location: 'contact' });
      status.setAttribute('data-kind', 'error');
      status.innerHTML = 'That didn\'t go through. Please <a href="https://wa.me/917397829282" target="_blank" rel="noopener">WhatsApp me</a> or <a href="mailto:wadherapryank@gmail.com">email me</a> instead.';
    }).then(function () {
      clearTimeout(timer);
      send.disabled = false;
      send.textContent = 'Send';
    });
  });
})();
