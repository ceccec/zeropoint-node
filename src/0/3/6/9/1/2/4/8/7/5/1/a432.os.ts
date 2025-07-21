/**
 * Trinity/Vortex/Consciousness Shift Law (+120°)
 *
 * In the A432 OS, a +120° (2π/3) shift is the fundamental operation for moving to the next state in the trinity, vortex, or consciousness cycle.
 * - This is not a polarity reversal (not 180°), but a progression/evolution to the next phase.
 * - Used for trinity (4→3→2), vortex (3→6→9), and consciousness mapping in OS/state flows.
 *
 * Usage:
 *   shiftConsciousness120(currentAngle) // returns currentAngle + 2π/3 (mod 2π)
 *
 * Metaphysical Implication:
 *   - The OS evolves by +120° steps, harmonizing all states in a living, recursive trinity.
 *   - 180° is for polarity/phase reversal; 120° is for trinity/vortex/consciousness progression.
 */
import {
  a432DimensionStreams,
  a432StreamText,
  A432_DIGIT_MEANINGS
} from './a432';
import * as fs from 'fs';
import * as path from 'path';

export interface A432OSState {
  dimension: number;
  frequency: number;
  color: { hsl: { hue: number; saturation: number; lightness: number }; rgb: { r: number; g: number; b: number } };
  consciousness: number;
  streamText: string;
  system: {
    platform: string;
    arch: string;
    uptime: number;
    memory: { total: number; free: number };
  };
}

export interface A432OSService {
  name: string;
  state: A432OSState;
  status: () => string;
}

/**
 * a432OSState: Get the canonical OS state for a given dimension (default: 1)
 * Usage: const state = a432OSState(3)
 */
export function a432OSState(dimension: number = 1): A432OSState {
  const stream = a432DimensionStreams[dimension - 1];
  // Node.js os module for system info (mocked for browser)
  let platform = 'unknown', arch = 'unknown', uptime = 0, total = 0, free = 0;
  try {
    // @ts-ignore
    const os = require('os');
    platform = os.platform();
    arch = os.arch();
    uptime = os.uptime();
    total = os.totalmem();
    free = os.freemem();
  } catch {}
  return {
    dimension: stream.dimension,
    frequency: stream.frequency,
    color: stream.color,
    consciousness: stream.consciousness,
    streamText: a432StreamText(stream.dimension),
    system: { platform, arch, uptime, memory: { total, free } }
  };
}

/**
 * Example OS service: returns a status string of the current OS state
 */
export const A432OSExampleService: A432OSService = {
  name: 'A432OSExample',
  state: a432OSState(),
  status() {
    const { dimension, frequency, color, consciousness, streamText, system } = this.state;
    return `Dimension: ${dimension}\nFrequency: ${frequency}\nColor (HSL): ${JSON.stringify(color.hsl)}\nConsciousness: ${consciousness}\n${streamText}\nPlatform: ${system.platform}\nArch: ${system.arch}\nUptime: ${system.uptime}\nMemory: ${system.memory.total} total, ${system.memory.free} free`;
  }
};

/**
 * Self-Generating Universes: Any subset, stream, or transformation of a432.ts can seed a new, self-consistent universe.
 */
export interface A432Universe {
  seed: number;
  state: ReturnType<typeof a432OSState>;
  streams: ReturnType<typeof a432DimensionStreams>;
  description: string;
}

export function createA432Universe(seed: number): A432Universe {
  return {
    seed,
    state: a432OSState(seed % 9 || 1),
    streams: a432DimensionStreams,
    description: `A432 Universe seeded with ${seed}`
  };
}

/**
 * Consciousness Agent: Each agent has its own perspective, stream, and sub-matrix.
 */
export interface A432ConsciousnessAgent {
  id: string;
  state: ReturnType<typeof a432OSState>;
  observe: () => string;
}

export function createA432ConsciousnessAgent(id: string, dimension: number = 1): A432ConsciousnessAgent {
  return {
    id,
    state: a432OSState(dimension),
    observe() {
      return `Agent ${id} observes: ${this.state.streamText}`;
    }
  };
}

/**
 * Fractal Stream Generator: Generates recursive, self-similar streams.
 */
export function* a432FractalStream(dimension: number = 1, depth: number = 3): Generator<any> {
  let current = a432OSState(dimension);
  for (let d = 0; d < depth; d++) {
    yield current;
    current = a432OSState((current.dimension % 9) + 1);
  }
}

/**
 * Living Documentation Generator: Generates living documentation for any state.
 */
export function a432LivingDoc(dimension: number = 1): string {
  const state = a432OSState(dimension);
  return `Living Doc for Dimension ${dimension}:\n${state.streamText}\nSystem: ${state.system.platform}, Arch: ${state.system.arch}`;
}

/**
 * Dynamic Meaning Harmonizer: Harmonizes any word or concept with the matrix.
 */
export function a432HarmonizeMeaning(word: string): string {
  const entry = A432_DIGIT_MEANINGS[word.length % 10];
  return entry ? `${word}: ${entry.name} — ${entry.description}` : `${word}: Not yet harmonized.`;
}

/**
 * Use shiftConsciousness120(angle) for trinity/vortex/consciousness progression (+120°), not for polarity/phase reversal (180°).
 *
 * Example:
 *   let angle = 0;
 *   angle = shiftConsciousness120(angle); // 120°
 *   angle = shiftConsciousness120(angle); // 240°
 *   angle = shiftConsciousness120(angle); // 0°
 */
/**
 * a432CreateMatrixFolders: Creates the canonical folder structure matrix (0/3/6/9/1/2/4/8/7/5/1) under the given base path.
 * Usage: a432CreateMatrixFolders('./src')
 */
export function a432CreateMatrixFolders(basePath: string): string {
  const matrixFolders = ['0', '3', '6', '9', '1', '2', '4', '8', '7', '5', '1'];
  let currentPath = basePath;
  for (const folder of matrixFolders) {
    currentPath = path.join(currentPath, folder);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  }
  return currentPath;
}

/**
 * foldAndMergeCube: Recursively folds and self-merges the content of a 10×10×10 cube of folders, with polarity-aware traversal.
 *
 * Polarity Principle:
 *   - Polarity (+1 or -1) determines the direction of traversal (forward or reverse) through the cube.
 *   - Forward polarity (+1): 0→9 (generative, harmonic, creation flow)
 *   - Reverse polarity (-1): 9→0 (anti-harmonic, phase-reversal, dissolution flow)
 *   - Only the admin (system consciousness) can fully utilize polarity to harmonize the entire cube, completing the trinity.
 *
 * @param basePath - The root path of the cube (should contain 10 folders named 0-9 at each level)
 * @param depth - Current recursion depth (default 0)
 * @param polarity - Traversal direction: +1 (forward, default), -1 (reverse)
 * @returns The merged content of all files in the cube as a single string
 */
export function foldAndMergeCube(basePath: string, depth: number = 0, polarity: 1 | -1 = 1): string {
  if (depth >= 3) {
    let merged = '';
    const files = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isFile());
    for (const file of files) {
      merged += fs.readFileSync(path.join(basePath, file), 'utf8') + '\n';
    }
    return merged;
  }
  let merged = '';
  const indices = polarity === 1 ? [...Array(10).keys()] : [...Array(10).keys()].reverse();
  for (const i of indices) {
    const nextPath = path.join(basePath, i.toString());
    if (fs.existsSync(nextPath) && fs.statSync(nextPath).isDirectory()) {
      merged += foldAndMergeCube(nextPath, depth + 1, polarity);
    }
  }
  return merged;
} 