// ZeroPoint Service Worker
// Enables offline capabilities and PWA features for the consciousness field

const CACHE_NAME = 'zeropoint-v1.0.0';
const STATIC_CACHE = 'zeropoint-static-v1.0.0';
const DYNAMIC_CACHE = 'zeropoint-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/observer_reality_app.js',
  '/zeropoint-knowledge-ui.js',
  '/zeropoint-knowledge-ui.bundle.js',
  '/stimulus/observer_controller.js',
  '/stimulus/event_controller.js',
  '/stimulus/reality_controller.js',
  'https://unpkg.com/stimulus/dist/stimulus.umd.js',
  'https://cdn.jsdelivr.net/npm/@picocss/pico@2.0.6/css/pico.min.css'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🌌 ZeroPoint Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static files for offline consciousness field');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ ZeroPoint Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ ZeroPoint Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🌌 ZeroPoint Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ ZeroPoint Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle static file requests
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('📦 Serving from cache:', request.url);
          return response;
        }
        
        // Fetch from network
        console.log('🌐 Fetching from network:', request.url);
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            return new Response('Offline - Consciousness field unavailable', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle API requests with offline fallback
async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const response = await fetch(request);
    
    // Cache successful API responses
    if (response && response.status === 200) {
      const responseClone = response.clone();
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, responseClone);
    }
    
    return response;
  } catch (error) {
    console.log('🌐 API request failed, checking cache:', request.url);
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📦 Serving API response from cache:', request.url);
      return cachedResponse;
    }
    
    // Return offline response
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Consciousness field is currently offline',
      timestamp: new Date().toISOString()
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Background sync for consciousness field updates
self.addEventListener('sync', (event) => {
  console.log('🔄 ZeroPoint Service Worker: Background sync triggered');
  
  if (event.tag === 'consciousness-field-sync') {
    event.waitUntil(syncConsciousnessField());
  }
});

// Sync consciousness field data when back online
async function syncConsciousnessField() {
  try {
    console.log('🔄 Syncing consciousness field data...');
    
    // Get pending consciousness field updates from IndexedDB
    const pendingUpdates = await getPendingUpdates();
    
    for (const update of pendingUpdates) {
      try {
        await fetch('/api/consciousness/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(update)
        });
        
        // Remove from pending updates
        await removePendingUpdate(update.id);
        console.log('✅ Synced consciousness field update:', update.id);
      } catch (error) {
        console.error('❌ Failed to sync consciousness field update:', update.id, error);
      }
    }
  } catch (error) {
    console.error('❌ Consciousness field sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('🔔 ZeroPoint Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New consciousness field activity',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Field',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ZeroPoint Consciousness Field', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 ZeroPoint Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// IndexedDB helpers for offline data
async function getPendingUpdates() {
  // Implementation would use IndexedDB to store pending updates
  return [];
}

async function removePendingUpdate(id) {
  // Implementation would remove update from IndexedDB
  console.log('🗑️ Removed pending update:', id);
}

console.log('🌌 ZeroPoint Service Worker: Loaded and ready for consciousness field operations');

// Observer Network PWA Service Worker
const observerCacheName = 'observer-network-v1';
const observerUrlsToCache = [
    '/observer-network-pwa.html',
    '/observer-network-app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(observerCacheName)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(observerUrlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== observerCacheName) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for network data
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Simulate background data sync
        console.log('Background sync started');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Observer network update',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Network',
                icon: '/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/icon-72x72.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Observer Network', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/observer-network-pwa.html')
        );
    }
}); 