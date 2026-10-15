/* Sharing, copy-to-clipboard and small page behaviours, shared by the hub and the case-study pages.

   Share buttons: any element with [data-share]. Optional attributes:
     data-share-url    the link to share (defaults to the page's canonical URL)
     data-share-title  the title handed to the share sheet
     data-share-text   one line of context for the message
     data-share-type   GA4 content_type: portfolio | product | case_study
     data-share-id     GA4 item_id, e.g. depotline
   Phones (and desktop browsers that support it) get the system share sheet; everywhere else the
   link is copied. GA4 receives the recommended "share" event only when a share actually happens. */
(function () {
  'use strict';

  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }

  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'share-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2400);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      if (ok) resolve(); else reject(new Error('copy failed'));
    });
  }

  function canonical() {
    var c = document.querySelector('link[rel="canonical"]');
    return c ? c.href : location.href.split('#')[0];
  }

  function share(btn) {
    var url = btn.getAttribute('data-share-url') || canonical();
    var title = btn.getAttribute('data-share-title') || document.title;
    var text = btn.getAttribute('data-share-text') || '';
    var params = {
      content_type: btn.getAttribute('data-share-type') || 'portfolio',
      item_id: btn.getAttribute('data-share-id') || 'portfolio'
    };
    var data = { title: title, url: url };
    if (text) data.text = text;
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      navigator.share(data).then(function () {
        params.method = 'share_sheet'; track('share', params);
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return;   // the visitor closed the sheet
        fallbackCopy(url, params);
      });
    } else {
      fallbackCopy(url, params);
    }
  }

  function fallbackCopy(url, params) {
    copyText(url).then(function () {
      toast('Link copied');
      params.method = 'copy_link'; track('share', params);
    }, function () {
      window.prompt('Copy this link:', url);
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var s = e.target.closest('[data-share]');
    if (s) { e.preventDefault(); share(s); return; }
    var c = e.target.closest('[data-copy]');
    if (c) {
      e.preventDefault();
      var value = c.getAttribute('data-copy');
      var note = document.querySelector('.copy-note');
      copyText(value).then(function () {
        toast('Email copied');
        if (note) note.textContent = 'Copied ' + value + '.';
        track('copy_email', { link_location: 'contact' });
      }, function () {
        if (note) note.textContent = value;
      });
      return;
    }
    // a link to a case study on this page opens that case instead of landing on a closed card
    var a = e.target.closest('a[href^="#"]');
    if (a) openCase(a.getAttribute('href').slice(1));
  });

  function openCase(id) {
    if (!id) return;
    var d = document.getElementById(id);
    if (d && d.tagName === 'DETAILS') d.open = true;
  }
  window.addEventListener('hashchange', function () { openCase(location.hash.slice(1)); });
  if (location.hash) openCase(location.hash.slice(1));

  // phones: the floating WhatsApp button slides away while the page is scrolling, so it never sits on text
  var fab = document.getElementById('wa-fab');
  if (fab && window.matchMedia) {
    var small = window.matchMedia('(max-width: 760px)');
    var idle = null;
    window.addEventListener('scroll', function () {
      if (!small.matches) return;
      fab.classList.add('fab-scrolling');
      clearTimeout(idle);
      idle = setTimeout(function () { fab.classList.remove('fab-scrolling'); }, 650);
    }, { passive: true });
  }
})();
