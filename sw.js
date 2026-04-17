const CACHE_NAME = 'zencv-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});