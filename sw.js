/* Service worker for the portfolio hub only.
   - Makes the site installable and readable offline.
   - Handles ONLY this hub's own files. The demo apps share this domain
     (/bolt-and-bahi/, /Msafara/ ...) and are never intercepted.
   - Pages and scripts are network-first, so a deploy shows up immediately;
     the cache is only a fallback when the visitor is offline.
   Bump VERSION when the list of precached files changes. */
const VERSION = 'pw-2026-10-09-readability-v2';
const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/assets/css/refinements.css',
  '/assets/js/theme.js',
  '/assets/js/globe.js',
  '/assets/js/land.js',
  '/assets/vendor/three.module.min.js',
  '/assets/icons/icon-192.png',
  '/assets/img/globe-dawn.webp',
  '/assets/img/globe-day.webp',
  '/assets/img/globe-dusk.webp',
  '/assets/img/globe-night.webp',
  '/depotline-preview.png',
  '/bolt-and-bahi-preview.png'
];

// Exact hub paths, plus prefixes that belong to the hub.
const HUB_EXACT = new Set(['/', '/index.html', '/manifest.webmanifest', '/favicon.svg',
  '/apple-touch-icon.png', '/og-card.png', '/depotline-preview.png', '/bolt-and-bahi-preview.png',
  '/Pryank_Wadhera_Senior_Product_Manager_Resume.pdf']);
const HUB_PREFIX = ['/assets/'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pw-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHub(url) {
  if (url.origin !== self.location.origin) return false;
  return HUB_EXACT.has(url.pathname) || HUB_PREFIX.some((p) => url.pathname.startsWith(p));
}

async function networkFirst(req, cacheKey) {
  const cache = await caches.open(VERSION);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(cacheKey || req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(cacheKey || req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (FONT_HOSTS.includes(url.hostname)) { e.respondWith(cacheFirst(req)); return; }
  if (!isHub(url)) return; // demo apps, analytics and everything else go straight to the network

  // The page itself: always try the network, keyed without the query string.
  if (url.pathname === '/' || url.pathname === '/index.html') {
    e.respondWith(networkFirst(req, '/'));
    return;
  }
  // Large, rarely-changing files: cache first. (The resume PDF stays network-first so an update is never hidden.)
  if (/\.(png|webp|jpg|svg)$/.test(url.pathname) || url.pathname.startsWith('/assets/vendor/')) {
    e.respondWith(cacheFirst(req));
    return;
  }
  e.respondWith(networkFirst(req));
});
