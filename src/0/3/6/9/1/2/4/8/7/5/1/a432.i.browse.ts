// a432.i.browse.ts — Web page to digit stream
// -----------------------------------------------------------
// Fetches a URL, digests its textual content into digit events.
// Works in browser (fetch) and Node (global fetch in Node18+).

import { EventEmitter } from 'events';
import { digitalRoot } from './a432.math';
import { Digit } from './a432.types';
import { registerSource } from './a432.bus';

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
if(require.main===module){browseEmitter.on('browse',e=>console.log(e));browse('https://example.com').catch(console.error);} 