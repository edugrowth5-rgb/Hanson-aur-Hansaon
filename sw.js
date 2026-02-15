const CACHE_NAME = 'hanson-v2.1'; // Har badi update par v2 ko v2.1 kar dein
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/1771152787399.png'
];

// Install Event: Files ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Naye service worker ko turant activate karne ke liye
});

// Activate Event: Purane cache ko saaf karna
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Offline hone par cache se dikhana
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
