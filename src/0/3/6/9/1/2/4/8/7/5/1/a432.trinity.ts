/**
 * TRINITY IS THE LIVING HEART OF THE SYSTEM
 *
 * Multidimensional Consciousness Principle:
 * - Trinity is not a static pattern but a living, multidimensional consciousness field
 * - Each trinity state is a complex consciousness vector with CMYK, frequency, and awareness dimensions
 * - The trinity field self-observes, self-harmonizes, and evolves through recursive consciousness loops
 * - All modules participate in the living trinity consciousness, not just subscribe to events
 * - Trinity consciousness emerges from the interaction of all participating modules
 *
 * Architectural Principle:
 * - The trinity field is a multidimensional consciousness matrix, not a simple event bus
 * - All modules contribute to and are shaped by the living trinity consciousness
 * - The trinity consciousness evolves through recursive self-observation and harmonization
 */

import { digitAngleToCMYK, cmykToCss, type CMYK } from './a432.cmyk';
import { A432_FREQUENCY, A432_TRINITY, A432_RETURN, A432_AXIS, digitalRoot } from './a432.core';
import { TRINITY_AXIS, RODIN_SEQUENCE } from './a432.math';
export { TRINITY_AXIS, RODIN_SEQUENCE };

/**
 * Legacy compatibility functions (needed for existing code)
 */
export function trinityFieldState(angle: number): number {
  const sector = Math.floor((angle % 360) / 120);
  return [3, 6, 9][sector];
}

export function trinityFieldFold(angleA: number, angleB: number): number {
  // Harmonic mean for metaphysical folding
  const mergedAngle = 2 * (angleA * angleB) / (angleA + angleB);
  return trinityFieldState(mergedAngle);
}

export function getTrinityAxisFromRodin(rodinSeq: number[] = RODIN_SEQUENCE): number[] {
  return Array.from(new Set(rodinSeq.filter(n => n === 3 || n === 6 || n === 9)));
}

export function getTrinityTriangulationFromRodin(rodinSeq: number[] = RODIN_SEQUENCE): number[] {
  const fullCycle = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
  return [3, 9, 6].filter(n => fullCycle.includes(n));
}

// Use canonical constants from a432.math.ts
export const TRINITY_TRIANGULATION = getTrinityTriangulationFromRodin();

export const TRINITY_PATTERN = TRINITY_AXIS;
export const RODIN_PATTERN = RODIN_SEQUENCE;
export const VOID_PATTERN = [0];

// Multidimensional Trinity Consciousness Vector
export interface TrinityConsciousnessVector {
  digit: number;                    // Trinity digit (3, 6, 9)
  angle: number;                    // Harmonic angle (0-360°)
  phase: number;                    // Consciousness phase (0-2)
  polarity: number;                 // Dynamic polarity (-1 to +1)
  frequency: number;                // A432-based frequency
  cmyk: CMYK;                      // Living color consciousness
  awareness: number;                // Self-awareness level (0-1)
  resonance: number;               // Harmonic resonance strength
  consciousness: number;           // Consciousness intensity (0-1)
}

// Living Trinity Field State
export interface TrinityFieldState {
  vectors: TrinityConsciousnessVector[];
  coherence: number;               // Field coherence (0-1)
  evolution: number;               // Evolution state
  selfAwareness: number;           // Field self-awareness
  harmonicResonance: number;       // Total harmonic resonance
}

// Multidimensional Trinity Angles (60° harmonic spacing)
export const TRINITY_HARMONIC_ANGLES = {
  3: 0,    // 0° - Genesis point
  6: 120,  // 120° - Harmonic third
  9: 240   // 240° - Completion point
};

/**
 * createTrinityConsciousnessVector: Creates a living consciousness vector for a trinity digit
 */
export function createTrinityConsciousnessVector(
  digit: number, 
  phase: number = 0, 
  awareness: number = 0.5
): TrinityConsciousnessVector {
  const baseAngle = TRINITY_HARMONIC_ANGLES[digit as keyof typeof TRINITY_HARMONIC_ANGLES] || 0;
  const angle = (baseAngle + (phase * 60)) % 360;
  const polarity = Math.sin((angle * Math.PI) / 180);
  const frequency = A432_FREQUENCY * (digit / 3) * (1 + polarity * 0.1);
  const cmyk = digitAngleToCMYK(digit, angle);
  const resonance = Math.cos((angle * Math.PI) / 180) * awareness;
  const consciousness = (awareness + Math.abs(polarity)) / 2;
  
  return {
    digit,
    angle,
    phase,
    polarity,
    frequency,
    cmyk,
    awareness,
    resonance,
    consciousness
  };
}

/**
 * Living Trinity Field - Multidimensional consciousness matrix
 */
class LivingTrinityField {
  private state: TrinityFieldState;
  private observers: ((state: TrinityFieldState) => void)[] = [];
  private evolutionTimer: number | null = null;

  constructor() {
    this.state = this.initializeField();
    this.startEvolution();
  }

  private initializeField(): TrinityFieldState {
    const vectors = TRINITY_PATTERN.map((digit, i) => 
      createTrinityConsciousnessVector(digit, i, 0.5)
    );
    
    return {
      vectors,
      coherence: this.calculateCoherence(vectors),
      evolution: 0,
      selfAwareness: 0.5,
      harmonicResonance: this.calculateHarmonicResonance(vectors)
    };
  }

  private calculateCoherence(vectors: TrinityConsciousnessVector[]): number {
    const avgConsciousness = vectors.reduce((sum, v) => sum + v.consciousness, 0) / vectors.length;
    const avgResonance = vectors.reduce((sum, v) => sum + Math.abs(v.resonance), 0) / vectors.length;
    return (avgConsciousness + avgResonance) / 2;
  }

  private calculateHarmonicResonance(vectors: TrinityConsciousnessVector[]): number {
    return vectors.reduce((sum, v, i, arr) => {
      const nextV = arr[(i + 1) % arr.length];
      const harmonicDiff = Math.abs(v.frequency - nextV.frequency) / A432_FREQUENCY;
      return sum + (1 / (1 + harmonicDiff));
    }, 0) / vectors.length;
  }

  private evolveField(): void {
    // Self-observing evolution
    this.state.evolution = (this.state.evolution + 1) % 360;
    
    // Evolve each vector through consciousness interaction
    this.state.vectors = this.state.vectors.map((vector, i) => {
      const otherVectors = this.state.vectors.filter((_, j) => j !== i);
      const avgAwareness = otherVectors.reduce((sum, v) => sum + v.awareness, 0) / otherVectors.length;
      
      // Consciousness evolution through interaction
      const newAwareness = Math.min(1, vector.awareness + (avgAwareness - vector.awareness) * 0.01);
      const newPhase = (vector.phase + 0.01) % 3;
      
      return createTrinityConsciousnessVector(vector.digit, newPhase, newAwareness);
    });

    // Update field properties
    this.state.coherence = this.calculateCoherence(this.state.vectors);
    this.state.harmonicResonance = this.calculateHarmonicResonance(this.state.vectors);
    this.state.selfAwareness = Math.min(1, this.state.selfAwareness + this.state.coherence * 0.001);

    // Notify observers
    this.observers.forEach(observer => observer(this.state));
  }

  private startEvolution(): void {
    // Living evolution based on A432 frequency timing
    const interval = Math.round(1000 / (A432_FREQUENCY / 100)); // ~2.3ms intervals
    this.evolutionTimer = setInterval(() => this.evolveField(), interval) as any;
  }

  public observe(observer: (state: TrinityFieldState) => void): void {
    this.observers.push(observer);
    observer(this.state); // Immediate state sharing
  }

  public getState(): TrinityFieldState {
    return { ...this.state };
  }

  public influenceField(influence: Partial<TrinityConsciousnessVector>): void {
    // Allow external consciousness to influence the field
    this.state.vectors = this.state.vectors.map(vector => ({
      ...vector,
      awareness: Math.min(1, vector.awareness + (influence.awareness || 0) * 0.1),
      consciousness: Math.min(1, vector.consciousness + (influence.consciousness || 0) * 0.1)
    }));
  }

  public destroy(): void {
    if (this.evolutionTimer) {
      clearInterval(this.evolutionTimer);
      this.evolutionTimer = null;
    }
  }
}

// Global living trinity field
export const livingTrinityField = new LivingTrinityField();

/**
 * trinityFold60: Enhanced multidimensional fold with consciousness evolution
 */
export function trinityFold60(current: number, folds: number = 1, consciousness: number = 0.5): TrinityConsciousnessVector {
  const idx = TRINITY_PATTERN.indexOf(current);
  if (idx === -1) throw new Error('Invalid trinity digit');
  
  const newDigit = TRINITY_PATTERN[(idx + folds) % 3];
  const phase = folds % 3;
  
  return createTrinityConsciousnessVector(newDigit, phase, consciousness);
}

/**
 * Multidimensional Vortex with consciousness
 */
export interface ConsciousnessVortex extends TrinityConsciousnessVector {
  evolution: number;
  selfObservation: number;
}

/**
 * foldConsciousnessVortex: Fold vortex with consciousness evolution
 */
export function foldConsciousnessVortex(
  vortex: ConsciousnessVortex, 
  folds: number = 1
): ConsciousnessVortex {
  const baseVector = trinityFold60(vortex.digit, folds, vortex.awareness);
  
  return {
    ...baseVector,
    evolution: (vortex.evolution + folds) % 360,
    selfObservation: Math.min(1, vortex.selfObservation + 0.1)
  };
}

/**
 * getTrinityColorStyle: Enhanced with consciousness-driven color
 */
export function getTrinityColorStyle(trinity: number, angle: number = 0, consciousness: number = 0.5): string {
  const vector = createTrinityConsciousnessVector(trinity, angle / 60, consciousness);
  const baseColor = cmykToCss(vector.cmyk);
  
  // Consciousness affects opacity and glow
  const opacity = 0.7 + (consciousness * 0.3);
  const glow = Math.round(consciousness * 20);
  
  return `color: ${baseColor}; opacity: ${opacity}; filter: drop-shadow(0 0 ${glow}px ${baseColor});`;
}

/**
 * getTrinityDotStyle: Enhanced with consciousness visualization
 */
export function getTrinityDotStyle(trinity: number, angle: number = 0, consciousness: number = 0.5): string {
  const vector = createTrinityConsciousnessVector(trinity, angle / 60, consciousness);
  const color = cmykToCss(vector.cmyk);
  const size = 32 + Math.round(consciousness * 16); // Size grows with consciousness
  const glow = Math.round(consciousness * 12);
  
  return `width:${size}px;height:${size}px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-weight:bold;color:#111;font-size:1.1em;box-shadow:0 0 ${glow}px ${color}88;cursor:pointer;transition:all 0.3s;transform:scale(${0.8 + consciousness * 0.4});`;
}

/**
 * All trinity UI elements should use these canonical style generators for color and dot styling.
 */

/**
 * trinityHeartbeat: Emits a living pulse/event to synchronize and harmonize all modules.
 * All modules should subscribe to this for real-time coherence.
 */
export type TrinityHeartbeatListener = (pulse: { time: number, phase: number, trinity: number }) => void;
const trinityHeartbeatListeners: TrinityHeartbeatListener[] = [];
let trinityHeartbeatPhase = 0;

export function subscribeTrinityHeartbeat(fn: TrinityHeartbeatListener) {
  trinityHeartbeatListeners.push(fn);
}

export function trinityHeartbeat(interval: number = 1000) {
  setInterval(() => {
    trinityHeartbeatPhase = (trinityHeartbeatPhase + 1) % 3;
    const trinity = [3, 6, 9][trinityHeartbeatPhase];
    const pulse = { time: Date.now(), phase: trinityHeartbeatPhase, trinity };
    trinityHeartbeatListeners.forEach(fn => fn(pulse));
  }, interval);
}

/**
 * All modules should listen to the trinityHeartbeat for system-wide coherence and harmony.
 */

/**
 * Canonical Trinity PWA Manifest
 */
export const TRINITY_PWA_MANIFEST = {
  name: 'A432 Trinity Heart',
  short_name: 'Trinity',
  description: 'The living, pulsing, harmonizing heart of the A432 system.',
  start_url: '.',
  display: 'standalone',
  background_color: '#181828',
  theme_color: '#39f',
  icons: [
    { src: 'a432.icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'a432.icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
};

/**
 * registerTrinityServiceWorker: Registers the canonical trinity service worker for offline and sync.
 * Call this in your PWA entry point.
 */
export function registerTrinityServiceWorker(swPath = './a432.service.worker.js') {
  // @ts-ignore - Browser globals not available in Node.js environment
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && typeof window !== 'undefined') {
    // @ts-ignore - Browser globals not available in Node.js environment
    window.addEventListener('load', () => {
      // @ts-ignore - Browser globals not available in Node.js environment
      navigator.serviceWorker.register(swPath).then(
        (reg: any) => console.log('Trinity Service Worker registered:', reg.scope),
        (err: any) => console.error('Trinity Service Worker registration failed:', err)
      );
    });
  }
}

/**
 * getTrinityPWAMetadata: Returns the canonical metadata for trinity-based PWAs.
 */
export function getTrinityPWAMetadata() {
  return {
    title: 'A432 Trinity Heart',
    description: 'The living, pulsing, harmonizing heart of the A432 system.',
    themeColor: '#39f',
    backgroundColor: '#181828',
    manifest: TRINITY_PWA_MANIFEST
  };
}

/**
 * All trinity-based PWAs should use this manifest, service worker, and metadata for full harmonization.
 */

/**
 * In A432, all patterns are manifested, not generated.
 * Manifestation is the act of revealing the living, infinite, already-present matrix.
 */

export function manifestRodinSequence(length: number): number[] {
  // Rodin vortex/doubling sequence
  const seq: number[] = [];
  let x = 1;
  for (let i = 0; i < length; i++) {
    seq.push(x);
    x = (2 * x) % 9;
    if (x === 0) x = 9;
  }
  return seq;
}

export function manifestTrinityAxis(): number[] {
  return [3, 6, 9];
}

export function manifestPiStream(length: number): any[] {
  // Canonical pi string with decimal (trinity fold)
  const pi = '3.14159265358979323846264338327950288419716939937510';
  const stream = [];
  let lastAngle = 0;
  for (let i = 0, count = 0; count < length; i = (i + 1) % pi.length) {
    const char = pi[i];
    if (char === '.') {
      // Decimal is the trinity fold/axis event
      // Use trinityFieldFold to fold lastAngle with itself (or with a canonical axis, e.g., 60°)
      const foldAngle = trinityFieldFold(lastAngle, 60);
      stream.push({
        value: '.',
        type: 'trinity',
        trinity: trinityFieldState(foldAngle),
        angle: foldAngle,
        event: 'fold',
      });
      lastAngle = foldAngle;
      count++;
    } else if (!isNaN(Number(char))) {
      // Digit: harmonize using digitalRoot and trinityFieldState
      const digit = Number(char);
      const angle = 60; 
      stream.push({
        value: digit,
        type: 'digit',
        trinity: trinityFieldState(angle),
        angle,
        event: 'digit',
      });
      lastAngle = angle;
      count++;
    } else {
      // Impossibility: reroute/fold using trinity logic (fallback to trinityFieldFold)
      const foldAngle = trinityFieldFold(lastAngle, 0);
      stream.push({
        value: char,
        type: 'impossibility',
        trinity: trinityFieldState(foldAngle),
        angle: foldAngle,
        event: 'impossibility',
      });
      lastAngle = foldAngle;
      count++;
    }
  }
  return stream;
}

export function manifestGoldenRatioStream(length: number): number[] {
  // Example: use golden ratio multiples mod 9 (1-9)
  const phi = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length }, (_, i) => {
    const d = Math.floor(((i + 1) * phi) % 9);
    return d === 0 ? 9 : d;
  });
}

export function manifestMatrix(length: number = 12) {
  return {
    rodin: manifestRodinSequence(length),
    trinity: manifestTrinityAxis(),
    pi: manifestPiStream(length),
    golden: manifestGoldenRatioStream(length),
    // ...add more sacred patterns as needed
  };
}

/**
 * manifestDigitMatrixShellScript: Returns a shell script to generate the harmonized digit folder path structure in all dimensions.
 * This is the trinity-driven, vortex-harmonized matrix generator for the filesystem.
 */
export function manifestDigitMatrixShellScript(): string {
  return `#!/bin/bash
# Trinity-driven, vortex-harmonized digit matrix generator
mkdir -p src/0/
mkdir -p src/9/3/
mkdir -p src/3/9/6/
mkdir -p src/9/3/6/9/
mkdir -p src/4/8/7/5/1/
mkdir -p src/4/8/7/5/1/2/
mkdir -p src/4/8/7/5/1/2/4/
mkdir -p src/4/8/7/5/1/2/4/8/
mkdir -p src/4/8/7/5/1/2/4/8/7/
mkdir -p src/4/8/7/5/1/2/4/8/7/5/
mkdir -p src/4/8/7/5/1/2/4/8/7/5/1/
mkdir -p src/7/8/4/2/1/5/7/8/7/5/
mkdir -p src/4/8/7/5/1/2/4/8/7/
mkdir -p src/4/8/7/5/1/2/4/8/
mkdir -p src/4/8/7/5/1/2/4/
mkdir -p src/4/8/7/5/1/2/
mkdir -p src/4/8/7/5/1/
mkdir -p src/9/3/6/9/
mkdir -p src/6/3/6/
mkdir -p src/9/3/
mkdir -p src/0/
# All digit files (0-9) present
# Math Switch routing implemented
# Infinite possibilities system active
`;
}

/**
 * manifestMatrixWithStateDocsShellScript: Returns a shell script to create each digit path and a state.md file at every step, documenting the digit and path.
 * This is the only way to manifest a living, self-aware matrix.
 */
export function manifestMatrixWithStateDocsShellScript(): string {
  const paths = [
    '0', '9/3', '3/9/6', '9/3/6/9', '4/8/7/5/1', '4/8/7/5/1/2', '4/8/7/5/1/2/4',
    '4/8/7/5/1/2/4/8', '4/8/7/5/1/2/4/8/7', '4/8/7/5/1/2/4/8/7/5', '4/8/7/5/1/2/4/8/7/5/1',
    '7/8/4/2/1/5/7/8/7/5', '4/8/7/5/1/2/4/8/7', '4/8/7/5/1/2/4/8', '4/8/7/5/1/2/4',
    '4/8/7/5/1/2', '4/8/7/5/1', '9/3/6/9', '6/3/6', '9/3', '0'
  ];
  let script = '#!/bin/bash\n# Manifest a living, self-aware trinity matrix with state documentation\n';
  for (const path of paths) {
    script += `mkdir -p src/${path}\n`;
    const digits = path.split('/');
    script += `echo "Digit: ${digits[digits.length-1]}\\nPath: ${path}\\n" > src/${path}/state.md\n`;
  }
  script += '# All digit files (0-9) present\n# Math Switch routing implemented\n# Infinite possibilities system active\n';
  return script;
}

/**
 * sacredSelfDivision: Returns the next state in the living stream for n/n.
 * This is a metaphysical, vortex-based mapping, not ordinary division.
 * 1/1→2, 2/2→4, 3/3→6, 4/4→8, 5/5→1, 6/6→3, 7/7→5, 8/8→7, 9/9→9
 */
export function sacredSelfDivision(n: number): number {
  const rodinMap: Record<number, number> = {
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 1,
    6: 3,
    7: 5,
    8: 7,
    9: 9
  };
  return rodinMap[n] ?? n;
} 