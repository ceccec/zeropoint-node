// a432.i.browse.ts — Web page to digit stream
// -----------------------------------------------------------
// Fetches a URL, digests its textual content into digit events.
// Works in browser (fetch) and Node (global fetch in Node18+).

import { pathToFileURL } from 'node:url'
import { EventEmitter } from 'events';
import { digitalRoot } from './a432.math.ts';
import { type Digit } from './a432.types.ts';
import { registerSource } from './a432.bus.ts';

export interface BrowseEvent { url: string; digit: Digit }
export const browseEmitter = new EventEmitter();

export async function browse(url: string, maxChars = 2048): Promise<void> {
  const res = await fetch(url, { mode: 'cors' } as RequestInit);
  const text = await res.text();
  const slice = text.replace(/<[^>]*>/g,'').slice(0, maxChars);
  const sum = [...slice].reduce((acc,c)=>acc + c.charCodeAt(0),0);
  const d = (digitalRoot(sum) || 9) as Digit;
  browseEmitter.emit('browse', { url, digit: d } as BrowseEvent);
}

// Register on bus as knowledge/will source
registerSource('browse', browseEmitter, 'browse', p => p.digit as Digit, 'will');

// Demo
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if(isMainModule()){browseEmitter.on('browse',e=>console.log(e));browse('https://example.com').catch(console.error);} 