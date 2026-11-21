// Guarda la app en el teléfono para que funcione sin internet.
// La página se pide siempre primero a internet (así llega la versión nueva); sin conexión se usa la copia guardada.
const CACHE = 'cierres-v8';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
    // Recarga las pestañas que tenían la versión vieja abierta.
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(cs => Promise.all(cs.map(c => c.navigate(c.url).catch(() => {})))));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    const page = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html');
    if (page) {
      e.respondWith(fetch(req, { cache: 'no-store' }).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
        return r;
      }).catch(() => caches.match('./index.html').then(h => h || caches.match(req, { ignoreSearch: true }))));
      return;
    }
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; })));
  }
});
