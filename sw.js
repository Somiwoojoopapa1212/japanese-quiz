// v:2026-04-27T06:14:36
const CACHE = 'japanese-quiz-v:2026-04-27T06:14:36';
const ASSETS = [
  '/japanese-quiz/',
  '/japanese-quiz/index.html',
  '/japanese-quiz/manifest.json',
  '/japanese-quiz/sentences.json',
  '/japanese-quiz/icons/icon-192.png',
  '/japanese-quiz/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
