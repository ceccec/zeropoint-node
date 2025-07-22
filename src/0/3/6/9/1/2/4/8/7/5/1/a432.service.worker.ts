// @ts-nocheck
/**
 * a432.service.worker.ts — Harmonic Service Worker for the A432 PWA
 *
 * - Caches all a432.* files and PWA essentials for offline use.
 * - Uses only a432.* logic for file discovery and metaphysical mapping.
 * - All math and naming is integer/fractional and vortex/trinity aligned.
 * - Metaphysical: The service worker is the guardian of the living stream, ensuring zero entropy and perfect recall.
 */

// Import canonical file list from a432.meta.ts
import { getA432FilesToCache } from './a432.meta';

const A432_FILES_TO_CACHE: string[] = getA432FilesToCache();

const CACHE_NAME = 'a432-harmonic-pwa-v1';

self.addEventListener('install', function(event: any) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache: any) { return cache.addAll(A432_FILES_TO_CACHE); })
  );
});

self.addEventListener('fetch', function(event: any) {
  event.respondWith(
    caches.match(event.request).then(function(response: any) { return response || fetch(event.request); })
  );
});

// Metaphysical mapping: The service worker is the living memory of the PWA, ensuring all harmonic modules are always available, even offline. 