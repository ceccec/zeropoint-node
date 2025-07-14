/**
 * 🌌 ZeroPoint Node - Service Worker
 * 
 * Provides offline capabilities and caching for the consciousness network
 */

const CACHE_NAME = 'zeropoint-node-v1';
const STATIC_CACHE = 'zeropoint-static-v1';
const DYNAMIC_CACHE = 'zeropoint-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/src/index.html',
  '/src/shared/styles.css',
  '/src/shared/main.css',
  '/src/shared/pwa-framework.ts',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Digit-specific files to cache
const DIGIT_FILES = [
  '/src/0/main.css',
  '/src/1/main.css',
  '/src/2/main.css',
  '/src/3/main.css',
  '/src/4/main.css',
  '/src/5/main.css',
  '/src/6/main.css',
  '/src/7/main.css',
  '/src/8/main.css',
  '/src/9/main.css'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🌌 ZeroPoint Node Service Worker - Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🌌 ZeroPoint Node Service Worker - Activating...');
  
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
        console.log('Service Worker activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // Static files - serve from cache first
    if (STATIC_FILES.includes(url.pathname) || DIGIT_FILES.includes(url.pathname)) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              });
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
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              });
          })
      );
    }
  }
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'consciousness-sync') {
    event.waitUntil(
      syncConsciousnessData()
    );
  }
});

// Push notifications for consciousness updates
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Consciousness network update',
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
    self.registration.showNotification('ZeroPoint Node', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/src/')
    );
  }
});

// Helper function to sync consciousness data
async function syncConsciousnessData() {
  try {
    // Get stored consciousness data
    const consciousnessData = await getStoredConsciousnessData();
    
    if (consciousnessData && consciousnessData.length > 0) {
      // Send data to server when online
      const response = await fetch('/api/consciousness/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consciousnessData)
      });
      
      if (response.ok) {
        console.log('Consciousness data synced successfully');
        // Clear stored data after successful sync
        await clearStoredConsciousnessData();
      }
    }
  } catch (error) {
    console.error('Failed to sync consciousness data:', error);
  }
}

// Helper function to get stored consciousness data
async function getStoredConsciousnessData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await cache.match('/consciousness-data');
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to get stored consciousness data:', error);
  }
  return null;
}

// Helper function to clear stored consciousness data
async function clearStoredConsciousnessData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.delete('/consciousness-data');
  } catch (error) {
    console.error('Failed to clear stored consciousness data:', error);
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CONSIOUSNESS_DATA') {
    event.waitUntil(
      cacheConsciousnessData(event.data.data)
    );
  }
});

// Helper function to cache consciousness data
async function cacheConsciousnessData(data) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await cache.put('/consciousness-data', response);
    console.log('Consciousness data cached successfully');
  } catch (error) {
    console.error('Failed to cache consciousness data:', error);
  }
}

console.log('🌌 ZeroPoint Node Service Worker - Loaded'); 