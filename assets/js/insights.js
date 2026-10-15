/* Anonymous behaviour events for Google Analytics.
   No names, emails or other personal data are read or sent. Every event
   carries the application tag (window.PW_REF) set in the page head, if any. */
(function () {
  if (window.__pwInsights) return;
  window.__pwInsights = true;

  var page = location.pathname.replace(/index\.html$/, '') || '/';

  function track(name, params) {
    try {
      if (typeof window.gtag !== 'function') return;
      params = params || {};
      params.page = page;
      if (window.PW_REF) params.ref = window.PW_REF;
      window.gtag('event', name, params);
    } catch (e) {}
  }
  window.PWTrack = track;

  function where(el) {
    var sec = el.closest && el.closest('section[id], header[id], details[id], footer, nav, #tabbar');
    if (!sec) return 'top';
    return sec.id || sec.tagName.toLowerCase();
  }

  // clicks on links that show intent
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var loc = where(a);
    if (/\.pdf($|\?)/i.test(href)) return track('resume_download', { link_location: loc });
    if (/^tel:/i.test(href)) return track('phone_click', { link_location: loc });
    if (/linkedin\.com/i.test(href)) return track('linkedin_click', { link_location: loc });
    if (/github\.com/i.test(href)) return track('github_click', { link_location: loc, target: href.replace(/^https?:\/\/github\.com\//, '').slice(0, 80) });
    var m = href.match(/\/docs\/([\w-]+)/);
    if (m) return track('document_open', { item: m[1], link_location: loc });
    m = href.match(/\/work\/([\w-]+)/);
    if (m) return track('case_study_open', { item: m[1], link_location: loc });
    m = href.match(/pryank18\.github\.io\/([\w-]+)\/?$/) || href.match(/^\/?(depotline-fuel-ops|bolt-and-bahi|Msafara|pravesh|dispatch-os|fitnexx)\/?$/);
    if (m && m[1] !== 'docs' && m[1] !== 'work') return track('demo_open', { item: m[1].toLowerCase(), link_location: loc });
  }, true);

  // case studies that open in place on the home page
  Array.prototype.forEach.call(document.querySelectorAll('details[id^="case-"]'), function (d) {
    var sent = false;
    d.addEventListener('toggle', function () {
      if (d.open && !sent) { sent = true; track('case_study_open', { item: d.id.replace('case-', ''), link_location: 'cases' }); }
    });
  });

  // which sections were actually read (half in view for 2 seconds)
  if ('IntersectionObserver' in window) {
    var timers = {}, seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id;
        if (seen[id]) return;
        if (en.isIntersecting) {
          timers[id] = setTimeout(function () { seen[id] = true; io.unobserve(en.target); track('section_read', { section: id }); }, 2000);
        } else { clearTimeout(timers[id]); }
      });
    }, { threshold: 0.35 });
    Array.prototype.forEach.call(document.querySelectorAll('main section[id], section.sec[id], section.contact[id], article section.block'), function (s, i) {
      if (!s.id) s.setAttribute('data-pw-sec', 'block-' + i);
      if (s.id) io.observe(s);
    });
  }

  // scroll depth
  var marks = [25, 50, 75, 90], hit = {};
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = Math.round((window.scrollY / max) * 100);
    marks.forEach(function (m) { if (pct >= m && !hit[m]) { hit[m] = true; track('scroll_depth', { percent: m }); } });
    if (hit[90]) window.removeEventListener('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();
