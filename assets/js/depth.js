/* Depth layer: parallax, pointer tilt and depth reveals on top of the existing page.
   Adds html.d3 so depth.css applies; touches no content and no layout.
   Fails safe: on any error the class is removed and the page is exactly as before. */
(function () {
  'use strict';
  var root = document.documentElement;
  try {
    root.classList.add('d3');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

    /* ---------- a tilted ring around the globe, with one satellite ----------
       Projected by hand: the back half of the ring (and the satellite while it is behind) sit in a
       layer under the globe canvas, the front half above it, so occlusion is right in every browser. */
    var gl = document.getElementById('globe');
    var canvasWrap = gl && gl.querySelector('.globe-canvas');
    if (gl && canvasWrap) {
      var NS = 'http://www.w3.org/2000/svg';
      var mk = function (cls) {
        var d = document.createElement('div'); d.className = 'orbit ' + cls; d.setAttribute('aria-hidden', 'true');
        var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'orbit-svg');
        var path = document.createElementNS(NS, 'path'); svg.appendChild(path); d.appendChild(svg);
        return { el: d, svg: svg, path: path };
      };
      var back = mk('orbit-back'), front = mk('orbit-front');
      gl.insertBefore(back.el, canvasWrap);
      canvasWrap.insertAdjacentElement('afterend', front.el);
      // one small satellite travels the ring and passes behind the globe
      var sat = document.createElement('div'); sat.className = 'orbit-sat'; front.el.appendChild(sat);
      var TILT = -11 * Math.PI / 180, geo = { cx: 0, cy: 0, rx: 0, ry: 0 };
      var layout = function () {
        var w = front.el.offsetWidth, h = front.el.offsetHeight;
        geo.cx = w / 2; geo.cy = h / 2;
        var sphere = 1.03 * Math.min(h, w) / 2.44;    // the globe's drawn radius (same fit rule as globe.js)
        // the ring must stay on screen and clear of the hero text on both sides
        var box = front.el.getBoundingClientRect(), mid = box.left + geo.cx;
        var room = Math.min(document.documentElement.clientWidth - mid, mid) - 18;
        if (window.innerWidth > 1040) {
          var sum = document.querySelector('.hero .summary'), h1 = document.querySelector('.hero h1');
          var textRight = Math.max(sum ? sum.getBoundingClientRect().right : 0, h1 ? h1.getBoundingClientRect().right : 0);
          room = Math.min(room, mid - textRight - 18);
        }
        geo.rx = Math.min(sphere * 1.62, w * 0.46, room / 0.985);
        // no room for a ring that clearly circles the globe: show the globe alone, as before
        gl.classList.toggle('orbit-off', geo.rx < sphere * 1.05);
        geo.ry = geo.rx * 0.27;
        [back, front].forEach(function (L, i) {
          L.svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
          L.svg.setAttribute('width', w); L.svg.setAttribute('height', h);
          // back = upper arc (sweep 1 in screen space), front = lower arc
          L.path.setAttribute('d', 'M ' + (geo.cx - geo.rx) + ' ' + geo.cy + ' A ' + geo.rx + ' ' + geo.ry + ' 0 0 ' + (i === 0 ? 1 : 0) + ' ' + (geo.cx + geo.rx) + ' ' + geo.cy);
          L.path.setAttribute('transform', 'rotate(' + (TILT * 180 / Math.PI) + ' ' + geo.cx + ' ' + geo.cy + ')');
        });
      };
      var spin = 1.1, last = 0, running = false, onScreen = true;
      var place = function () {
        var t = spin, x = geo.rx * Math.cos(t), y = geo.ry * Math.sin(t);
        var X = geo.cx + x * Math.cos(TILT) - y * Math.sin(TILT);
        var Y = geo.cy + x * Math.sin(TILT) + y * Math.cos(TILT);
        var depth = Math.sin(t);
        var parent = depth >= 0 ? front.el : back.el;
        if (sat.parentNode !== parent) parent.appendChild(sat);
        sat.style.transform = 'translate3d(' + X.toFixed(1) + 'px,' + Y.toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + (0.7 + 0.45 * (depth + 1) / 2).toFixed(3) + ')';
        sat.style.opacity = (0.55 + 0.45 * (depth + 1) / 2).toFixed(2);
      };
      var frame = function (now) {
        if (!running) return;
        if (last) spin += Math.min(now - last, 50) * 0.00021; // one lap in ~30s
        last = now; place(); raf(frame);
      };
      var relayout = function () { layout(); place(); };
      relayout();
      window.addEventListener('resize', relayout);
      // web fonts change the width of the hero text: measure again once they and the page are in
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
      window.addEventListener('load', relayout);
      if (!calm) {
        var go = function () { if (!running && onScreen && !document.hidden) { running = true; last = 0; raf(frame); } };
        var stop = function () { running = false; };
        if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { onScreen = e[0].isIntersecting; onScreen ? go() : stop(); }).observe(gl);
        document.addEventListener('visibilitychange', function () { document.hidden ? stop() : go(); });
        go();
      }
    }

    /* ---------- the 3D avatar in the contact section (decorative; faces the text) ---------- */
    var contact = document.getElementById('contact');
    if (contact) {
      var fig = document.createElement('div'); fig.className = 'contact-figure'; fig.setAttribute('aria-hidden', 'true');
      var av = new Image(); av.className = 'contact-avatar'; av.src = 'assets/img/pryank-namaste.webp'; av.alt = '';
      av.loading = 'lazy'; av.decoding = 'async'; av.width = 219; av.height = 480;
      fig.appendChild(av); contact.appendChild(fig);
      // phones and tablets: he stands beside the heading, never taller than it, so he can't reach the paragraph
      // the first paragraph keeps clear space on the right (depth.css), so he may stand beside both
      var heading = contact.querySelector('h2');
      var lead = contact.querySelector('h2 + p');
      var sizeFig = function () {
        if (window.innerWidth <= 1040 && heading) {
          var cap = window.innerWidth <= 760 ? 170 : 220;
          var span = lead ? (lead.offsetTop + lead.offsetHeight - heading.offsetTop) : heading.offsetHeight;
          fig.style.height = Math.round(Math.min(cap, span)) + 'px';
        } else { fig.style.height = ''; }
      };
      sizeFig();
      window.addEventListener('resize', sizeFig);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeFig);

      // the floating WhatsApp button steps aside while it would cover a contact or footer link (any screen size)
      var fab = document.getElementById('wa-fab');
      var targets = Array.prototype.slice.call(document.querySelectorAll('#contact .mail, #contact .copy-mail, #contact .ctas .btn, footer a, footer span'));
      if (fab && targets.length) {
        var fabQueued = false;
        var checkFab = function () {
          fabQueued = false;
          var f = fab.getBoundingClientRect();
          var hide = targets.some(function (t) {
            var r = t.getBoundingClientRect();
            return !(r.right < f.left - 6 || r.left > f.right + 6 || r.bottom < f.top - 6 || r.top > f.bottom + 6);
          });
          fab.classList.toggle('fab-aside', hide);
        };
        var queueFab = function () { if (!fabQueued) { fabQueued = true; raf(checkFab); } };
        window.addEventListener('scroll', queueFab, { passive: true });
        window.addEventListener('resize', queueFab);
        // the contact block slides into place as it appears: check again once it has settled
        contact.addEventListener('transitionend', queueFab);
        checkFab();
      }
    }

    if (calm) return; // static depth only

    /* Scroll reveals were removed (Oct 2026): content is always visible the moment it is on screen. */

    /* ---------- hero depth: scroll on every device, pointer on desktop ---------- */
    var hero = document.querySelector('.hero');
    var text = document.querySelector('.hero-text');
    var globe = document.getElementById('globe');
    var px = 0, py = 0, queued = false;
    function paint() {
      queued = false;
      if (!hero || !globe) return;
      var h = hero.offsetHeight || 1;
      var s = Math.max(0, Math.min(1, window.scrollY / h));
      // the globe sits further back: it drifts slower and recedes a little
      globe.style.setProperty('--gy2', (s * 70 + py * 10).toFixed(1) + 'px');
      globe.style.setProperty('--gx2', (px * 14).toFixed(1) + 'px');
      globe.style.setProperty('--gs', (1 - s * 0.08).toFixed(3));
      if (text) {
        text.style.setProperty('--tx', (px * -6).toFixed(1) + 'px');
        text.style.setProperty('--ty', (py * -4 - s * 20).toFixed(1) + 'px');
      }
    }
    function queue() { if (!queued) { queued = true; raf(paint); } }
    window.addEventListener('scroll', function () { if (window.scrollY < (hero ? hero.offsetHeight * 1.2 : 1200)) queue(); }, { passive: true });
    if (fine && hero) {
      hero.addEventListener('pointermove', function (e) {
        if (globe && globe.classList.contains('is-dragging')) return; // never fight the globe drag
        px = (e.clientX / window.innerWidth) * 2 - 1;
        py = (e.clientY / window.innerHeight) * 2 - 1;
        queue();
      });
      hero.addEventListener('pointerleave', function () { px = 0; py = 0; queue(); });
    }

    /* ---------- tilt cards (desktop pointers only; phones keep their tap press) ---------- */
    if (fine) {
      var cards = document.querySelectorAll('.doc, .build.wide, .fit-card');
      Array.prototype.forEach.call(cards, function (el) {
        var strength = el.classList.contains('doc') ? 6 : 2.5; // big panels barely move
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          el.style.transform = 'rotateX(' + ((0.5 - y) * strength).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * strength * 1.3).toFixed(2) + 'deg) translateZ(0)';
          el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
          el.classList.add('is-tilting');
        });
        el.addEventListener('pointerleave', function () { el.style.transform = ''; el.classList.remove('is-tilting'); });
      });
    }
  } catch (err) {
    // any failure: put the page back exactly as it was
    root.classList.remove('d3');
    Array.prototype.forEach.call(document.querySelectorAll('.rv'), function (el) { el.classList.remove('rv'); });
    Array.prototype.forEach.call(document.querySelectorAll('.orbit, .contact-figure'), function (el) { el.parentNode.removeChild(el); });
    var wf = document.getElementById('wa-fab'); if (wf) wf.classList.remove('fab-aside');
  }
})();
