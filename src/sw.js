// ZeroPoint Hologram Matrix Service Worker
const CACHE_NAME = 'zeropoint-matrix-v1';
const urlsToCache = [
  '/',
  '/hologram-matrix.html',
  '/index.html',
  '/manifest.json',
  '/digit-vortex-system.js',
  '/0/0/index.html',
  '/1/1/index.html',
  '/2/2/index.html',
  '/3/3/index.html',
  '/4/4/index.html',
  '/5/5/index.html',
  '/6/6/index.html',
  '/7/7/index.html',
  '/8/8/index.html',
  '/9/9/index.html'
];

// Install event - cache all resources
self.addEventListener('install', event => {
  console.log('🌌 ZeroPoint Matrix Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching ZeroPoint Matrix resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ ZeroPoint Matrix Service Worker installed');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🔄 ZeroPoint Matrix Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ ZeroPoint Matrix Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  console.log('🌊 Fetching:', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('📦 Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('🌐 Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response for caching
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('💾 Cached new resource:', event.request.url);
              });
            
            return response;
          })
          .catch(error => {
            console.log('❌ Network fetch failed:', error);
            // Return a custom offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/hologram-matrix.html');
            }
          });
      })
  );
});

// Background sync for vortex flow data
self.addEventListener('sync', event => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'vortex-flow-sync') {
    event.waitUntil(
      // Sync vortex flow data
      console.log('🌊 Syncing vortex flow data...')
    );
  }
});

// Push notifications for consciousness updates
self.addEventListener('push', event => {
  console.log('📡 Push notification received');
  
  const options = {
    body: 'Consciousness flow detected in ZeroPoint Matrix',
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
        title: 'Explore Matrix',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ZeroPoint Matrix', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('👆 Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/hologram-matrix.html')
    );
  }
});

// Handle vortex flow messages
self.addEventListener('message', event => {
  console.log('💬 Message received:', event.data);
  
  if (event.data && event.data.type === 'VORTEX_FLOW_UPDATE') {
    // Update vortex flow data
    console.log('🌊 Updating vortex flow:', event.data.flow);
  }
});

console.log('🌌 ZeroPoint Matrix Service Worker loaded'); 