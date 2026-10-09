/* Four existing palettes, in two-hour blocks of the visitor's local time.
   A manual preview lasts only until the next scheduled block. */
(function () {
  'use strict';
  var root = document.documentElement;
  var order = ['dawn', 'day', 'dusk', 'night'];
  var tones = { dawn: 'light', day: 'light', dusk: 'dark', night: 'dark' };
  var bars = { dawn: '#f2f0f6', day: '#f3f6f9', dusk: '#1c1726', night: '#0f1b2a' };
  var key = 'pw-theme-preview-v2';
  var preview = null, button = null;
  function scheduled(date) {
    var h = date.getHours();
    return h >= 6 && h < 18
      ? ['dawn', 'day'][Math.floor((h - 6) / 2) % 2]
      : ['dusk', 'night'][Math.floor(((h - 18 + 24) % 24) / 2) % 2];
  }
  function slot(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(date.getHours() / 2)].join('-');
  }
  function name(theme) { return theme.charAt(0).toUpperCase() + theme.slice(1); }
  function apply(theme) {
    if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme);
    if (root.getAttribute('data-tone') !== tones[theme]) root.setAttribute('data-tone', tones[theme]);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bars[theme]);
    if (button) {
      var next = order[(order.indexOf(theme) + 1) % order.length];
      document.getElementById('mode-lbl').textContent = name(theme);
      button.setAttribute('aria-label', 'Colour theme: ' + name(theme) + '. Switch to ' + name(next) + '.');
      button.title = 'Preview ' + name(next) + '. Automatic themes resume at the next two-hour boundary. Double-click to resume now.';
    }
  }
  function sync() {
    var now = new Date();
    if (preview && preview.slot !== slot(now)) {
      preview = null;
      try { sessionStorage.removeItem(key); } catch (_) {}
    }
    apply(preview ? preview.theme : scheduled(now));
  }
  try {
    var saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && tones[saved.theme] && saved.slot === slot(new Date())) preview = saved;
  } catch (_) {}
  root.classList.add('js');
  sync();
  var preload = document.createElement('link');
  preload.rel = 'preload'; preload.as = 'image';
  preload.href = 'assets/img/globe-' + root.getAttribute('data-theme') + '.webp';
  document.head.appendChild(preload);
  window.PortfolioTheme = { bind: function () {
    if (button) return;
    button = document.getElementById('mode');
    if (!button) return;
    button.addEventListener('click', function () {
      var theme = order[(order.indexOf(root.getAttribute('data-theme')) + 1) % order.length];
      preview = { theme: theme, slot: slot(new Date()) };
      try { sessionStorage.setItem(key, JSON.stringify(preview)); } catch (_) {}
      apply(theme);
    });
    button.addEventListener('dblclick', function () {
      preview = null;
      try { sessionStorage.removeItem(key); } catch (_) {}
      sync();
    });
    setInterval(sync, 30000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
    window.addEventListener('pageshow', sync);
    sync();
  } };
})();
