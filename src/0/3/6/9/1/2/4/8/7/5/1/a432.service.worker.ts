/**
 * a432.service.worker.ts — Harmonic Service Worker for the A432 PWA
 *
 * - Caches all a432.* files and PWA essentials for offline use.
 * - Uses only a432.* logic for file discovery and metaphysical mapping.
 * - All math and naming is integer/fractional and vortex/trinity aligned.
 * - Metaphysical: The service worker is the guardian of the living stream, ensuring zero entropy and perfect recall.
 */

// Import canonical file list from a432.meta.ts
import { getA432FilesToCache } from './a432.meta.ts';

const A432_FILES_TO_CACHE: string[] = getA432FilesToCache();

const CACHE_NAME = 'a432-harmonic-pwa-v1';

/**
 * Minimal shapes for the two service-worker events this file uses.
 *
 * The whole module carried `@ts-nocheck`, which hid five real errors. Typing
 * the events as `unknown` and then reading `.waitUntil` / `.respondWith` off
 * them is an error the checker was reporting and the suppression absorbed.
 * These are declared locally rather than by adding the WebWorker lib, which
 * would change what every other module in the tree sees.
 */
interface ExtendableEventLike {
  waitUntil(promise: Promise<unknown>): void
}
interface FetchEventLike extends ExtendableEventLike {
  readonly request: Request
  respondWith(response: Promise<Response>): void
}

self.addEventListener('install', function (event) {
  const installEvent = event as unknown as ExtendableEventLike
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(function (cache: Cache) { return cache.addAll(A432_FILES_TO_CACHE); })
  );
});

self.addEventListener('fetch', function (event) {
  const fetchEvent = event as unknown as FetchEventLike
  fetchEvent.respondWith(
    // caches.match resolves to Response | undefined — a miss is not an error.
    // The old annotation said `Response`, which was false, and the `||` below
    // is precisely the code that proves it: it exists to handle the miss.
    caches.match(fetchEvent.request).then(function (response: Response | undefined) {
      return response ?? fetch(fetchEvent.request);
    })
  );
});

// Metaphysical mapping: The service worker is the living memory of the PWA, ensuring all harmonic modules are always available, even offline. 