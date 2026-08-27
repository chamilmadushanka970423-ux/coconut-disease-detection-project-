const CACHE_NAME = 'cocoshield-ai-cache-v10';

// Core assets to cache (small files that must succeed)
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Large assets cached individually (failure won't break the SW)
const LARGE_ASSETS = [
  './tf.min.js',
  './kaggle/working/tfjs_model/model.json',
  './kaggle/working/tfjs_model/group1-shard1of3.bin',
  './kaggle/working/tfjs_model/group1-shard2of3.bin',
  './kaggle/working/tfjs_model/group1-shard3of3.bin'
];
// Note: model-data.js is NOT cached by SW — it is only needed for file:// mode
// On http:// the model loads from kaggle/ folder via fetch()

// Install Event - cache assets individually so one failure doesn't break everything
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets...');
        // Cache core assets first (these must all succeed)
        return cache.addAll(CORE_ASSETS).then(() => {
          console.log('[Service Worker] Core assets cached. Caching model files...');
          // Cache large assets one by one — failures are non-fatal
          return Promise.allSettled(
            LARGE_ASSETS.map((url) =>
              cache.add(url).catch((err) => {
                console.warn(`[Service Worker] Failed to cache ${url}: ${err.message}`);
              })
            )
          );
        });
      })
      .then(() => {
        console.log('[Service Worker] Installation complete.');
        return self.skipWaiting();
      })
  );
});

// Activate Event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache...', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // Try network first, fall back to cache
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          // Cache successful responses for offline use
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          console.log('[Service Worker] No cache available for:', event.request.url);
        });
      })
  );
});
