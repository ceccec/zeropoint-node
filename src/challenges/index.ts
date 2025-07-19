// Master Index for All Challenge Cases
// Each challenge case implements complete mathematical harmony system

// Import all challenge cases
import waveParticleDuality from './01-wave-particle-duality';
import quantumEntanglement from './02-quantum-entanglement';
import observerEffect from './03-observer-effect';
import consciousnessOrigin from './04-consciousness-origin';
import freeWill from './05-free-will';
import mathematicalPlatonism from './06-mathematical-platonism';
import zeroPointEnergy from './07-zero-point-energy';
import mathematicalInfinity from './08-mathematical-infinity';
import heisenbergUncertainty from './09-heisenberg-uncertainty';

// Challenge Registry
export const CHALLENGE_REGISTRY = {
  'consciousness_origin': consciousnessOrigin,
  'free_will': freeWill,
  'mathematical_platonism': mathematicalPlatonism,
  'wave_particle_duality': waveParticleDuality,
  'quantum_entanglement': quantumEntanglement,
  'observer_effect': observerEffect,
  'zero_point_energy': zeroPointEnergy,
  'mathematical_infinity': mathematicalInfinity,
  'heisenberg_uncertainty': heisenbergUncertainty
};

// Challenge Metadata
export const CHALLENGE_METADATA = {
  'consciousness_origin': {
    id: 'consciousness_origin',
    name: 'Consciousness Origin',
    category: 'Absolute Foundation',
    mathematicalFoundation: 'Infinite consciousness field',
    consciousnessFlow: 9,
    a432Resonance: 3888,
    teslaCycle: 'completion',
    rodinPosition: 3,
    file: '04-consciousness-origin.ts',
    fundamentalRank: 1
  },
  'free_will': {
    id: 'free_will',
    name: 'Free Will vs Determinism',
    category: 'Absolute Foundation',
    mathematicalFoundation: 'Consciousness choice field',
    consciousnessFlow: 7,
    a432Resonance: 3024,
    teslaCycle: 'harmony',
    rodinPosition: 1,
    file: '05-free-will.ts',
    fundamentalRank: 2
  },
  'mathematical_platonism': {
    id: 'mathematical_platonism',
    name: 'Mathematical Platonism',
    category: 'Absolute Foundation',
    mathematicalFoundation: 'Consciousness mathematical field',
    consciousnessFlow: 2,
    a432Resonance: 864,
    teslaCycle: 'creation',
    rodinPosition: 2,
    file: '06-mathematical-platonism.ts',
    fundamentalRank: 3
  },
  'wave_particle_duality': {
    id: 'wave_particle_duality',
    name: 'Wave-Particle Duality',
    category: 'Quantum Foundation',
    mathematicalFoundation: 'Stream consciousness flow',
    consciousnessFlow: 3,
    a432Resonance: 1296,
    teslaCycle: 'creation',
    rodinPosition: 3,
    file: '01-wave-particle-duality.ts',
    fundamentalRank: 4
  },
  'quantum_entanglement': {
    id: 'quantum_entanglement',
    name: 'Quantum Entanglement',
    category: 'Quantum Foundation',
    mathematicalFoundation: 'Vortex impossibility reversal',
    consciousnessFlow: 6,
    a432Resonance: 2592,
    teslaCycle: 'harmony',
    rodinPosition: 0,
    file: '02-quantum-entanglement.ts',
    fundamentalRank: 5
  },
  'observer_effect': {
    id: 'observer_effect',
    name: 'Observer Effect',
    category: 'Consciousness Foundation',
    mathematicalFoundation: 'A432 harmonic coordination',
    consciousnessFlow: 1,
    a432Resonance: 432,
    teslaCycle: 'completion',
    rodinPosition: 1,
    file: '03-observer-effect.ts',
    fundamentalRank: 6
  },
  'zero_point_energy': {
    id: 'zero_point_energy',
    name: 'Zero-Point Energy',
    category: 'Infinite Foundation',
    mathematicalFoundation: 'Tesla 3-6-9 cycles',
    consciousnessFlow: 9,
    a432Resonance: 3888,
    teslaCycle: 'creation',
    rodinPosition: 3,
    file: '07-zero-point-energy.ts',
    fundamentalRank: 7
  },
  'mathematical_infinity': {
    id: 'mathematical_infinity',
    name: 'Mathematical Infinity',
    category: 'Mathematical Foundation',
    mathematicalFoundation: 'Rodin vortex patterns',
    consciousnessFlow: 4,
    a432Resonance: 1728,
    teslaCycle: 'harmony',
    rodinPosition: 4,
    file: '08-mathematical-infinity.ts',
    fundamentalRank: 8
  },
  'heisenberg_uncertainty': {
    id: 'heisenberg_uncertainty',
    name: 'Heisenberg Uncertainty',
    category: 'Quantum Foundation',
    mathematicalFoundation: 'Consciousness measurement collapse',
    consciousnessFlow: 9,
    a432Resonance: 3888,
    teslaCycle: 'completion',
    rodinPosition: 3,
    file: '09-heisenberg-uncertainty.ts',
    fundamentalRank: 9
  }
};

// Challenge Categories
export const CHALLENGE_CATEGORIES = {
  'absolute_foundation': ['consciousness_origin', 'free_will', 'mathematical_platonism'],
  'quantum_foundation': ['wave_particle_duality', 'quantum_entanglement', 'heisenberg_uncertainty'],
  'consciousness_foundation': ['observer_effect'],
  'infinite_foundation': ['zero_point_energy'],
  'mathematical_foundation': ['mathematical_infinity']
};

// Navigation Functions
export function getAllChallenges(): string[] {
  return Object.keys(CHALLENGE_REGISTRY);
}

export function getChallengesByCategory(category: string): string[] {
  return CHALLENGE_CATEGORIES[category] || [];
}

export function getChallengeMetadata(challengeId: string) {
  return CHALLENGE_METADATA[challengeId];
}

export function getChallengeInstance(challengeId: string) {
  return CHALLENGE_REGISTRY[challengeId];
}

export function getMostFundamentalChallenges(): string[] {
  return Object.values(CHALLENGE_METADATA)
    .sort((a, b) => (a.fundamentalRank || 999) - (b.fundamentalRank || 999))
    .map(challenge => challenge.id);
}

// Mathematical Analysis Functions
export function analyzeAllChallenges(): {
  totalChallenges: number;
  resolvedChallenges: number;
  unresolvedChallenges: number;
  switchActivations: number;
  consciousnessFlows: number[];
  a432Resonances: number[];
  categories: Record<string, number>;
  fundamentalRankings: Record<string, number>;
} {
  const challenges = getAllChallenges();
  const resolvedChallenges = challenges.filter(id => {
    const instance = getChallengeInstance(id);
    // Each challenge has its own create function
    const challenge = id === 'consciousness_origin' ? instance.createConsciousnessOriginChallenge() :
                     id === 'free_will' ? instance.createFreeWillChallenge() :
                     id === 'mathematical_platonism' ? instance.createMathematicalPlatonismChallenge() :
                     id === 'wave_particle_duality' ? instance.createWaveParticleDualityChallenge() :
                     id === 'quantum_entanglement' ? instance.createQuantumEntanglementChallenge() :
                     id === 'observer_effect' ? instance.createObserverEffectChallenge() :
                     id === 'zero_point_energy' ? instance.createZeroPointEnergyChallenge() :
                     id === 'mathematical_infinity' ? instance.createMathematicalInfinityChallenge() :
                     id === 'heisenberg_uncertainty' ? instance.createHeisenbergUncertaintyChallenge() : null;
    return challenge?.isResolved || false;
  }).length;
  
  const consciousnessFlows = challenges.map(id => {
    const metadata = getChallengeMetadata(id);
    return metadata.consciousnessFlow;
  });
  
  const a432Resonances = challenges.map(id => {
    const metadata = getChallengeMetadata(id);
    return metadata.a432Resonance;
  });
  
  const categories = Object.keys(CHALLENGE_CATEGORIES).reduce((acc, category) => {
    acc[category] = CHALLENGE_CATEGORIES[category].length;
    return acc;
  }, {} as Record<string, number>);
  
  const fundamentalRankings = Object.values(CHALLENGE_METADATA).reduce((acc, challenge) => {
    acc[challenge.id] = challenge.fundamentalRank || 999;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalChallenges: challenges.length,
    resolvedChallenges,
    unresolvedChallenges: challenges.length - resolvedChallenges,
    switchActivations: resolvedChallenges, // All resolved challenges have activated switches
    consciousnessFlows,
    a432Resonances,
    categories,
    fundamentalRankings
  };
}

// Guidance System Functions
export function getChallengeGuidance(challengeId: string): Array<{
  targetChallenge: string;
  strength: number;
  relationship: string;
  reason: string;
}> {
  const instance = getChallengeInstance(challengeId);
  if (!instance || !instance.RELATED_CHALLENGES) {
    return [];
  }
  return instance.RELATED_CHALLENGES.map(challenge => ({
    targetChallenge: challenge.id,
    strength: challenge.strength,
    relationship: challenge.relationship,
    reason: challenge.reason
  }));
}

export function getRelatedChallenges(challengeId: string): string[] {
  const guidance = getChallengeGuidance(challengeId);
  return guidance.map(g => g.targetChallenge);
}

export function getStrongestConnection(challengeId: string): string {
  const guidance = getChallengeGuidance(challengeId);
  if (guidance.length === 0) return '';
  
  return guidance.reduce((strongest, current) => 
    current.strength > strongest.strength ? current : strongest
  ).targetChallenge;
}

// Navigation Paths
export function getNavigationPaths(): {
  absolute_foundation: string[];
  quantum_foundation: string[];
  consciousness_foundation: string[];
  infinite_foundation: string[];
  mathematical_foundation: string[];
} {
  return {
    absolute_foundation: ['consciousness_origin', 'free_will', 'mathematical_platonism'],
    quantum_foundation: ['wave_particle_duality', 'quantum_entanglement', 'heisenberg_uncertainty'],
    consciousness_foundation: ['observer_effect'],
    infinite_foundation: ['zero_point_energy'],
    mathematical_foundation: ['mathematical_infinity']
  };
}

// Mathematical Continuity Analysis
export function analyzeMathematicalContinuity(path: string[]): {
  streamConsciousness: number[];
  a432Harmonics: number[];
  teslaCycles: string[];
  rodinPositions: number[];
  continuity: boolean;
} {
  const streamConsciousness = path.map(id => getChallengeMetadata(id).consciousnessFlow);
  const a432Harmonics = path.map(id => getChallengeMetadata(id).a432Resonance);
  const teslaCycles = path.map(id => getChallengeMetadata(id).teslaCycle);
  const rodinPositions = path.map(id => getChallengeMetadata(id).rodinPosition);
  
  // Check continuity (simplified - in reality would check mathematical relationships)
  const continuity = path.length > 1;
  
  return {
    streamConsciousness,
    a432Harmonics,
    teslaCycles,
    rodinPositions,
    continuity
  };
}

// Export all challenge cases
export {
  consciousnessOrigin,
  freeWill,
  mathematicalPlatonism,
  waveParticleDuality,
  quantumEntanglement,
  observerEffect,
  zeroPointEnergy,
  mathematicalInfinity,
  heisenbergUncertainty
};

// Export default registry
export default CHALLENGE_REGISTRY; 