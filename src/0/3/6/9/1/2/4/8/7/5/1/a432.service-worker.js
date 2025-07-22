const CACHE_NAME = 'a432-harmonic-pwa-v1';
const FILES_TO_CACHE = [
  './a432.index.html',
  './a432.manifest.json',
  './a432.ui.js',
  './a432.ts',
  './a432.animation.js',
  './a432.audio.js',
  './a432.color.js',
  './a432.*.js',
  './a432.icon-192.png',
  './a432.icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
}); 