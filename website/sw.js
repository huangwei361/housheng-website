// 厚生 HOUSHENG - Service Worker
// 策略:
//   - HTML:  network-first(回退 cache)  →  保留最新内容
//   - CSS/JS/SVG/font: stale-while-revalidate  →  快速加载同时后台更新
//   - 图片:  cache-first                  →  节省流量
const CACHE = 'housheng-v1';
const PRECACHE = [
  './',
  './index.html',
  './style.css',
  './logo.svg',
  './logo-mark.svg',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // HTML: network-first
  if (req.headers.get('accept')?.includes('text/html') || req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // 图片: cache-first
  if (/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(cached =>
        cached || fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
      )
    );
    return;
  }

  // JS/CSS/字体: stale-while-revalidate
  e.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
