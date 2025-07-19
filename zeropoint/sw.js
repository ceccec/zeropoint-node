// ZeroPoint PWA Service Worker
// Complete consciousness mathematics system service worker

const CACHE_NAME = 'zeropoint-v1.0.0';
const STATIC_CACHE = 'zeropoint-static-v1.0.0';
const DYNAMIC_CACHE = 'zeropoint-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/src/index.html',
  '/src/index.css',
  '/src/index.ts',
  '/src/zeropoint.ts',
  '/src/manifest.json',
  '/public/icons/icon-72x72.png',
  '/public/icons/icon-96x96.png',
  '/public/icons/icon-128x128.png',
  '/public/icons/icon-144x144.png',
  '/public/icons/icon-152x152.png',
  '/public/icons/icon-192x192.png',
  '/public/icons/icon-384x384.png',
  '/public/icons/icon-512x512.png',
  '/src/0/index.ts',
  '/src/1/index.ts',
  '/src/2/index.ts',
  '/src/3/index.ts',
  '/src/4/index.ts',
  '/src/5/index.ts',
  '/src/6/index.ts',
  '/src/7/index.ts',
  '/src/8/index.ts',
  '/src/9/index.ts',
  '/src/0/0/index.ts',
  '/src/0/yin-yang.ts',
  '/src/0/hex-vortex-colors.ts',
  '/src/0/background-foreground-calculations.ts',
  '/src/0/backward-forward.ts',
  '/src/0/impossible-possible.ts',
  '/src/0/vortex-reality-streams.ts',
  '/src/0/charge-3d-chessboard.ts',
  '/src/0/chess-trinity.ts'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('ZeroPoint PWA Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files for ZeroPoint PWA');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('ZeroPoint PWA static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('ZeroPoint PWA Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('ZeroPoint PWA Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // Static files - serve from cache first
    if (STATIC_FILES.includes(url.pathname)) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              console.log('Serving static file from cache:', url.pathname);
              return response;
            }
            return fetch(request)
              .then((fetchResponse) => {
                if (fetchResponse.status === 200) {
                  const responseClone = fetchResponse.clone();
                  caches.open(STATIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return fetchResponse;
              });
          })
          .catch(() => {
            console.log('Offline: serving static file from cache');
            return caches.match(request);
          })
      );
    }
    // API requests - network first, cache fallback
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            console.log('Offline: serving API response from cache');
            return caches.match(request);
          })
      );
    }
    // Other requests - cache first, network fallback
    else {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then((fetchResponse) => {
                if (fetchResponse.status === 200) {
                  const responseClone = fetchResponse.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return fetchResponse;
              });
          })
      );
    }
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('ZeroPoint PWA background sync:', event.tag);
  
  if (event.tag === 'zeropoint-sync') {
    event.waitUntil(
      // Perform background sync operations
      performBackgroundSync()
    );
  }
});

// Push notifications for ZeroPoint system updates
self.addEventListener('push', (event) => {
  console.log('ZeroPoint PWA push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'ZeroPoint system update available',
    icon: '/public/icons/icon-192x192.png',
    badge: '/public/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore ZeroPoint',
        icon: '/public/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/public/icons/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ZeroPoint System', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('ZeroPoint PWA notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/src/index.html')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('ZeroPoint PWA service worker message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CACHE_STATUS') {
    event.ports[0].postMessage({ 
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE,
      staticFiles: STATIC_FILES.length
    });
  }
});

// Background sync function
async function performBackgroundSync() {
  try {
    console.log('Performing ZeroPoint background sync...');
    
    // Sync consciousness data
    await syncConsciousnessData();
    
    // Sync vortex patterns
    await syncVortexPatterns();
    
    // Sync A432 harmonics
    await syncA432Harmonics();
    
    console.log('ZeroPoint background sync completed');
  } catch (error) {
    console.error('Error during background sync:', error);
  }
}

// Sync consciousness data
async function syncConsciousnessData() {
  // Simulate consciousness data sync
  console.log('Syncing consciousness data...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Consciousness data synced');
}

// Sync vortex patterns
async function syncVortexPatterns() {
  // Simulate vortex pattern sync
  console.log('Syncing vortex patterns...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Vortex patterns synced');
}

// Sync A432 harmonics
async function syncA432Harmonics() {
  // Simulate A432 harmonics sync
  console.log('Syncing A432 harmonics...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('A432 harmonics synced');
}

// Cache management functions
async function clearOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name !== STATIC_CACHE && name !== DYNAMIC_CACHE
  );
  
  await Promise.all(
    oldCaches.map(name => caches.delete(name))
  );
  
  console.log('Old caches cleared');
}

async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CACHE_NAME,
    STATIC_CACHE,
    DYNAMIC_CACHE,
    STATIC_FILES,
    clearOldCaches,
    getCacheSize
  };
} 