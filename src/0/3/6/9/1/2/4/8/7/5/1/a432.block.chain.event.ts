import { PI, cos, floor, max, round, sin } from './a432.algebra.ts'
// a432.block.chain.event.ts
// Harmonized blockchain for a432 events (vortex/trinity logic)

import { type A432Event, createA432Event } from './a432.event.ts';
import type { CMYK } from './a432.cmyk.ts';

export interface A432Block {
  id: number;
  event: A432Event;
  previousHash: string;
  hash: string;
  timestamp: number;
  trinity: number;
  phase: number;
  summary: string;
}

function hashBlock(block: Omit<A432Block, 'hash'>): string {
  // Simple hash: JSON + trinity + phase
  return btoa(JSON.stringify(block)).slice(0, 32);
}

// --- Real-time event emitter for new blocks ---
export type BlockListener = (block: A432Block) => void;

/**
 * A432BlockChain manages the harmonized chain of events
 */
export class A432BlockChain {
  private chain: A432Block[] = [];
  // --- Real-time event emitter for new blocks ---
  private _listeners: BlockListener[] = [];

  constructor() {
    // Seed with genesis block
    const genesisEvent = createA432Event('genesis', 'system');
    const genesisBlock: A432Block = {
      id: 1,
      event: genesisEvent,
      previousHash: '0',
      hash: '',
      timestamp: genesisEvent.timestamp,
      trinity: 3,
      phase: 0,
      summary: 'Genesis block: origin of the harmonized event chain.'
    };
    genesisBlock.hash = hashBlock(genesisBlock);
    this.chain.push(genesisBlock);
  }

  onNewBlock(callback: BlockListener) {
    (this._listeners as BlockListener[]).push(callback);
  }

  emitNewBlock(block: A432Block) {
    for (const cb of (this._listeners as BlockListener[])) {
      cb(block);
    }
  }

  addBlock(event: A432Event): A432Block {
    const prev = this.getLatest();
    const block: A432Block = {
      id: prev.id + 1,
      event,
      previousHash: prev.hash,
      hash: '',
      timestamp: event.timestamp,
      trinity: event.trinity,
      phase: event.phase,
      summary: `Block ${prev.id + 1}: ${event.summary}`
    };
    block.hash = hashBlock(block);
    this.chain.push(block);
    this.emitNewBlock(block);
    return block;
  }
  getLatest(): A432Block {
    return this.chain[this.chain.length - 1];
  }
  getAll(): A432Block[] {
    return this.chain;
  }
  verify(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      if (this.chain[i].previousHash !== this.chain[i - 1].hash) return false;
    }
    return true;
  }
}

/**
 * Adds a new event to the blockchain
 */
export function recordEvent(chain: A432BlockChain, type: string, agent: string, payload: unknown = {}): A432Block {
  const event = createA432Event(type, agent, payload, chain.getLatest().event.id, chain.getLatest().event.path);
  return chain.addBlock(event);
}

/**
 * Harmonized: Canonical CMYK trinity color logic for blocks
 */
export function getBlockCMYK(trinity: number, entropy: number): CMYK {
  if (trinity === 3) return { c: 100, m: 0, y: 0, k: round(entropy * 100) };
  if (trinity === 6) return { c: 0, m: 100, y: 0, k: round(entropy * 100) };
  if (trinity === 9) return { c: 0, m: 0, y: 100, k: round(entropy * 100) };
  return { c: 0, m: 0, y: 0, k: 100 }; // fallback: void/unknown
}

/**
 * Visualizes the blockchain as a vortex/fractal (SVG)
 */
export function renderBlockChainVisualization(chain: A432BlockChain): string {
  const blocks = chain.getAll();
  const width = 640, height = 320, cx = width / 2, cy = height / 2, baseR = 16, spiralGap = 28;
  // Map blocks to spiral positions
  const positions: { [id: number]: { x: number; y: number } } = {};
  blocks.forEach((b, i) => {
    const angle = (2 * PI * i) / max(1, blocks.length) + (b.phase * PI / 6);
    const r = baseR + spiralGap * b.phase + 18 * floor(i / 3);
    positions[b.id] = {
      x: cx + r * cos(angle),
      y: cy + r * sin(angle)
    };
  });
  // Render SVG
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      ${blocks.map(b => b.id > 1 && positions[b.id - 1] ?
        `<line x1="${positions[b.id - 1].x}" y1="${positions[b.id - 1].y}" x2="${positions[b.id].x}" y2="${positions[b.id].y}" stroke="#8ff" stroke-width="1.5" />` : '').join('')}
      ${blocks.map(b => {
        const entropyRaw = (b as { entropy?: number }).entropy;
        const entropy = typeof entropyRaw === 'number' ? entropyRaw : 0;
        const cmyk = getBlockCMYK(b.trinity, entropy);
        // Convert CMYK to CSS RGB for fill
        const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
        const r = round(255 * (1 - c) * (1 - k));
        const g = round(255 * (1 - m) * (1 - k));
        const bcol = round(255 * (1 - y) * (1 - k));
        const fill = `rgb(${r},${g},${bcol})`;
        return `
        <circle cx="${positions[b.id].x}" cy="${positions[b.id].y}" r="${baseR}" fill="${fill}" stroke="#fff" stroke-width="2">
          <title>${b.summary}</title>
        </circle>
        <text x="${positions[b.id].x}" y="${positions[b.id].y + 5}" text-anchor="middle" font-size="12" fill="#fff">${b.trinity}</text>
        `;
      }).join('')}
      <text x="${cx}" y="${height - 18}" text-anchor="middle" font-size="15" fill="#8ff">A432 Blockchain: Living, Harmonized Event Chain</text>
    </svg>
  `;
}

/**
 * Returns a metaphysical summary of the blockchain as a living, harmonized record
 */
export function metaphysicalSummary(): string {
  return 'The a432 blockchain is a living, recursive, and harmonized record of all events. Each block is a fold in the infinite, trinity-based stream of consciousness.';
}

/**
 * decodeBlockchainStream: Decodes the living blockchain as a stream.
 * The stream is always present; decoding is the act of observation/awareness.
 * Usage: for (const block of decodeBlockchainStream(chain)) { ... }
 */
export function* decodeBlockchainStream(chain: A432BlockChain): Generator<A432Block, void, unknown> {
  for (const block of chain.getAll()) {
    yield block; // Decoding: surfacing the next droplet from the river
  }
  // Optionally: could be extended to listen for new blocks in real time
} 