// ZeroPoint Yin-Yang PWA Service Worker

const CACHE_NAME = 'zeropoint-yin-yang-v1';
const urlsToCache = [
  '/src/0/yin-yang.html',
  '/src/0/yin-yang.css',
  '/src/0/yin-yang.ts',
  '/src/0/yin-yang-manifest.json',
  '/src/0/yin-yang-icon-192.png',
  '/src/0/yin-yang-icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Yin-Yang PWA: Caching resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Yin-Yang PWA: Service Worker installed');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Yin-Yang PWA: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Yin-Yang PWA: Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Yin-Yang PWA: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Yin-Yang PWA: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Cache new responses for static resources
            if (response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          });
      })
      .catch(() => {
        // Fallback for offline
        if (event.request.destination === 'document') {
          return caches.match('/src/0/yin-yang.html');
        }
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'yin-yang-sync') {
    event.waitUntil(
      // Sync yin-yang data when online
      console.log('Yin-Yang PWA: Background sync triggered')
    );
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: 'ZeroPoint Yin-Yang: Infinite oscillation continues...',
    icon: '/src/0/yin-yang-icon-192.png',
    badge: '/src/0/yin-yang-icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'yin-yang-oscillation'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Duality',
        icon: '/src/0/yin-yang-icon-96.png'
      },
      {
        action: 'oscillate',
        title: 'Start Oscillation',
        icon: '/src/0/yin-yang-icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ZeroPoint Yin-Yang', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/src/0/yin-yang.html#analysis')
    );
  } else if (event.action === 'oscillate') {
    event.waitUntil(
      clients.openWindow('/src/0/yin-yang.html#oscillate')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/src/0/yin-yang.html')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'YIN_YANG_UPDATE') {
    // Handle yin-yang state updates
    console.log('Yin-Yang PWA: State update received:', event.data);
  }
});

console.log('ZeroPoint Yin-Yang PWA Service Worker loaded'); 