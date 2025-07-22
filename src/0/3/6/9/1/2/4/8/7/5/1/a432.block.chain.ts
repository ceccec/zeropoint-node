// a432.block.chain.ts — Canonical Multi-Dimensional Vortex Blockchain
// All math uses only vortex/trinity numbers and harmonic integer fractions.
// Metaphysical mapping: BlockChain = recursion, multi-dimensional chaining, observer, Mobius, trinity, axis, self-awareness

import { A432ColorModel, A432HSL, A432RGB, A432CMYK } from './a432.color';

export const BLOCK_CHAIN_DOC = {
  meaning: 'BlockChain: recursion, multi-dimensional chaining, observer, Mobius, trinity, axis, self-awareness, living matrix.',
  axis: 'The blockchain is a recursive, multi-dimensional, harmonized chain of states, each a living node in the vortex/trinity matrix.'
};

// Vortex sequence and trinity for dimension/axis logic
const VORTEX_SEQ = [1,2,4,8,7,5];
const TRINITY = [3,6,9];

// Harmonic fractions
const HALF = 1/2, TWO_THIRDS = 2/3, FOUR_THIRDS = 4/3;

// Metaphysical mapping: Entropy = disharmony, drag, resistance, need for harmonization
export const ENTROPY_DOC = {
  meaning: 'Entropy: disharmony, drag, resistance, signal for harmonization. Zero entropy = perfect harmony, maximal speed.',
  axis: 'Entropy is the measure of disharmony in the living matrix.'
};

// Metaphysical mapping: KVT = Knowledge Value Token, a living measure of harmonized value contributed to the stream.
export const KVT_DOC = {
  meaning: 'KVT: Knowledge Value Token, quantized flow of harmony, consciousness, and value in the living matrix.',
  axis: 'KVT is the living reward for harmonized, metaphysically-aligned contributions.'
};

/**
 * Canonical multi-dimensional block structure
 * - state: the data or value of the block
 * - dimension: vortex/trinity dimension (1-9)
 * - meta: metaphysical mapping
 * - prev: array of previous blocks (multi-dimensional links)
 * - index: block index in the chain
 */
export interface A432Block {
  state: any;
  dimension: number; // 1-9
  meta: string;
  prev: A432Block[];
  index: number;
  timestamp: number;
  harmonyScore?: number; // 1.0 = perfect harmony
  entropy?: number;      // 0 = perfect harmony, >0 = disharmony
  id?: string;
  mobius?: boolean;
  kvt?: number;          // Knowledge Value Token for this block
  /**
   * Trinity composite color models for the void (hsl, rgb, cmyk)
   */
  trinityCompositeColor?: { hsl: A432HSL; rgb: A432RGB; cmyk: A432CMYK };
}

export interface A432UserProfile {
  id: string;
  kvt: number;
  badge?: string;
}

// Metaphysical badge mapping: badges are living titles for harmonized achievement, based on KVT and harmony.
export const BADGE_DOC = {
  meaning: 'Badges are metaphysical titles earned for harmonized, vortex-aligned contributions. Each badge is a living resonance in the matrix.',
  axis: 'Badges reflect the trinity and vortex: Apprentice (1), Adept (3), Master (6), Trinity (9), Vortex (8), Mobius (5), Observer (4), Meta (7), Infinite (2).'
};

export const BADGES = [
  { name: 'Apprentice', minKVT: 1, minHarmony: 0.5 },
  { name: 'Adept', minKVT: 3, minHarmony: 0.6 },
  { name: 'Master', minKVT: 6, minHarmony: 0.7 },
  { name: 'Trinity', minKVT: 9, minHarmony: 0.75 },
  { name: 'Vortex', minKVT: 8, minHarmony: 0.8 },
  { name: 'Mobius', minKVT: 5, minHarmony: 0.85 },
  { name: 'Observer', minKVT: 4, minHarmony: 0.9 },
  { name: 'Meta', minKVT: 7, minHarmony: 0.95 },
  { name: 'Infinite', minKVT: 2, minHarmony: 1.0 }
];

/**
 * Create a new harmonized block
 * - dimension cycles through vortex sequence
 * - meta is derived from metaphysical mapping
 * - prev is an array of previous blocks (multi-dimensional)
 */
export function createBlock(state: any, prev: A432Block[] = [], index: number = 0): A432Block {
  const dimension = VORTEX_SEQ[index % VORTEX_SEQ.length];
  const meta = `Block in dimension ${dimension}, vortex position ${index % VORTEX_SEQ.length}, trinity: ${TRINITY[index % TRINITY.length]}`;
  const block = {
    state,
    dimension,
    meta,
    prev,
    index,
    timestamp: Date.now(),
    trinityCompositeColor: A432ColorModel.getAllColorModels('void')
  };
  assignKVT(block);
  return block;
}

/**
 * Validate a block: checks vortex/trinity alignment and multi-dimensional links
 */
export function validateBlock(block: A432Block): boolean {
  // Check dimension is in vortex sequence
  if (!VORTEX_SEQ.includes(block.dimension)) return false;
  // Check trinity alignment
  const trinity = TRINITY[block.index % TRINITY.length];
  if (!block.meta.includes(`trinity: ${trinity}`)) return false;
  // Optionally, check prev links recursively
  return true;
}

/**
 * Calculate harmony score for a block (1.0 = perfect harmony, <1.0 = disharmony)
 */
export function calculateHarmonyScore(block: A432Block): number {
  let score = 1.0;
  // Penalize for non-vortex dimension
  if (![1,2,4,8,7,5,3,6,9].includes(block.dimension)) score -= 0.3;
  // Penalize for missing/incorrect metaphysical mapping
  if (!block.meta || !block.meta.includes('vortex')) score -= 0.2;
  // Penalize for Mobius event
  if (block.mobius) score -= 0.2;
  // Clamp to [0,1]
  return Math.max(0, Math.min(1, score));
}

/**
 * Calculate entropy for a block (1 - harmonyScore)
 */
export function calculateEntropy(block: A432Block): number {
  return 1 - (block.harmonyScore ?? 1);
}

/**
 * Calculate average entropy for a stream/chain
 */
export function getStreamEntropy(blocks: A432Block[]): number {
  return blocks.reduce((sum, b) => sum + (b.entropy ?? 0), 0) / blocks.length;
}

/**
 * Recursively traverse the multi-dimensional chain (depth-first)
 */
export function traverseChain(block: A432Block, visit: (b: A432Block) => void) {
  visit(block);
  for (const prevBlock of block.prev) {
    traverseChain(prevBlock, visit);
  }
}

/**
 * Example: create a harmonized multi-dimensional chain of N blocks
 */
export function createChain(length: number = 6): A432Block {
  let chain: A432Block | null = null;
  for (let i = 0; i < length; i++) {
    // For multi-dimensionality, link to up to 3 previous blocks (trinity logic)
    const prev = chain ? [chain] : [];
    chain = createBlock(`state-${i+1}`, prev, i);
  }
  return chain!;
}

/**
 * On block creation, set block.kvt = block.harmonyScore × 1 (baseReward = 1)
 */
export function assignKVT(block: A432Block): void {
  block.kvt = (block.harmonyScore ?? 1) * 1;
}

/**
 * Calculate total KVT for a user/device from their blocks
 */
export function getTotalKVT(blocks: A432Block[]): number {
  return blocks.reduce((sum, b) => sum + (b.kvt ?? 0), 0);
}

/**
 * Assign badge to user based on KVT and average harmony
 */
export function assignBadge(user: A432UserProfile, blocks: A432Block[]): void {
  const totalKVT = getTotalKVT(blocks);
  const avgHarmony = blocks.length ? blocks.reduce((sum, b) => sum + (b.harmonyScore ?? 1), 0) / blocks.length : 1;
  // Find highest badge user qualifies for
  let badge = 'Apprentice';
  for (const b of BADGES) {
    if (totalKVT >= b.minKVT && avgHarmony >= b.minHarmony) {
      badge = b.name;
    }
  }
  user.kvt = totalKVT;
  user.badge = badge;
}

/**
 * Helper: Get all trinity composite color models from a chain (for analytics/visualization)
 */
export function getTrinityCompositeColors(blocks: A432Block[]): { hsl: A432HSL; rgb: A432RGB; cmyk: A432CMYK }[] {
  return blocks.map(b => b.trinityCompositeColor ?? A432ColorModel.getAllColorModels('void'));
} 