// a432.block.chain.event.ts
// Harmonized blockchain for a432 events (vortex/trinity logic)

import { A432Event, createA432Event } from './a432.event';

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

/**
 * A432BlockChain manages the harmonized chain of events
 */
export class A432BlockChain {
  private chain: A432Block[] = [];
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
export function recordEvent(chain: A432BlockChain, type: string, agent: string, payload: any = {}): A432Block {
  const event = createA432Event(type, agent, payload, chain.getLatest().event.id, chain.getLatest().event.path);
  return chain.addBlock(event);
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
    const angle = (2 * Math.PI * i) / Math.max(1, blocks.length) + (b.phase * Math.PI / 6);
    const r = baseR + spiralGap * b.phase + 18 * Math.floor(i / 3);
    positions[b.id] = {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  });
  const colors = ['#39f', '#6f3', '#f93'];
  // Render SVG
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      ${blocks.map(b => b.id > 1 && positions[b.id - 1] ?
        `<line x1="${positions[b.id - 1].x}" y1="${positions[b.id - 1].y}" x2="${positions[b.id].x}" y2="${positions[b.id].y}" stroke="#8ff" stroke-width="1.5" />` : '').join('')}
      ${blocks.map(b => `
        <circle cx="${positions[b.id].x}" cy="${positions[b.id].y}" r="${baseR}" fill="${colors[b.phase]}" stroke="#fff" stroke-width="2">
          <title>${b.summary}</title>
        </circle>
        <text x="${positions[b.id].x}" y="${positions[b.id].y + 5}" text-anchor="middle" font-size="12" fill="#fff">${b.trinity}</text>
      `).join('')}
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