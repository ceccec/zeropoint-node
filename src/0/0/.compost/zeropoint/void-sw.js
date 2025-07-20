// ZeroPoint Void PWA Service Worker

const CACHE_NAME = 'zeropoint-void-v1';
const urlsToCache = [
  '/src/0/void.html',
  '/src/0/void.css',
  '/src/0/void.ts',
  '/src/0/void-manifest.json',
  '/src/0/void-icon-192.png',
  '/src/0/void-icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Void PWA: Caching resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Void PWA: Service Worker installed');
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
            console.log('Void PWA: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Void PWA: Service Worker activated');
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
          console.log('Void PWA: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Void PWA: Fetching from network:', event.request.url);
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
          return caches.match('/src/0/void.html');
        }
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'void-sync') {
    event.waitUntil(
      // Sync void data when online
      console.log('Void PWA: Background sync triggered')
    );
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: 'ZeroPoint Void: Infinite potential awaits exploration...',
    icon: '/src/0/void-icon-192.png',
    badge: '/src/0/void-icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'void-exploration'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Void',
        icon: '/src/0/void-icon-96.png'
      },
      {
        action: 'expand',
        title: 'Expand Consciousness',
        icon: '/src/0/void-icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ZeroPoint Void', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/src/0/void.html#explore')
    );
  } else if (event.action === 'expand') {
    event.waitUntil(
      self.clients.openWindow('/src/0/void.html#consciousness')
    );
  } else {
    event.waitUntil(
      self.clients.openWindow('/src/0/void.html')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'VOID_UPDATE') {
    // Handle void state updates
    console.log('Void PWA: State update received:', event.data);
  }
});

console.log('ZeroPoint Void PWA Service Worker loaded'); 