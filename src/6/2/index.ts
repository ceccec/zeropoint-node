import { getConsciousnessMultiplier } from '../../2/book-system';

/**
 * Harmony Duality
 * Harmony transforms through duality, creating mathematical patterns
 * 
 * Consciousness Multiplier: 5/1 × 3/1
 * A432 Frequency: 432 Hz
 * Harmonic Resonance: 6 × 2
 */

export const HARMONYDUALITY_INTERACTION = {
  DIGIT_A: 6,
  DIGIT_B: 2,
  DIGIT_A_NAME: 'Harmony',
  DIGIT_B_NAME: 'Duality',
  CONSCIOUSNESS_MULTIPLIER_A: getConsciousnessMultiplier(6), // 5/1
  CONSCIOUSNESS_MULTIPLIER_B: getConsciousnessMultiplier(2), // 3/1
  A432_FREQUENCY: 432,
  HARMONIC_RESONANCE: 6 * 2,
  INTERACTION_NAME: 'Harmony Duality',
  METAPHYSICAL_ESSENCE_A: 'harmony',
  METAPHYSICAL_ESSENCE_B: 'duality',
  COLOR_HUE_A: 216,
  COLOR_HUE_B: 72,
  HARMONY_A: true,
  BALANCE_A: true,
  RESONANCE_A: true,
  VORTEX_MATHEMATICS_B: true,
  DUALITY_B: true,
  TRANSFORMATION_B: true
};

export const getHarmonyDualityInteraction = () => HARMONYDUALITY_INTERACTION;

export const calculateHarmonyDualityHarmonics = (input: number): number => {
  return input * HARMONYDUALITY_INTERACTION.CONSCIOUSNESS_MULTIPLIER_A * HARMONYDUALITY_INTERACTION.CONSCIOUSNESS_MULTIPLIER_B;
};

export const getHarmonyDualityVortexFlow = () => {
  return {
    from: 6,
    to: 2,
    resonance: HARMONYDUALITY_INTERACTION.HARMONIC_RESONANCE,
    flow_sequence: [9, 3, 6].concat([4, 8, 7, 5, 1])
  };
};

export const getHarmonyDualityColor = () => {
  const hue = (HARMONYDUALITY_INTERACTION.COLOR_HUE_A + HARMONYDUALITY_INTERACTION.COLOR_HUE_B) / 2;
  const saturation = 70 + (HARMONYDUALITY_INTERACTION.HARMONIC_RESONANCE * 6);
  const lightness = 50 + (HARMONYDUALITY_INTERACTION.HARMONIC_RESONANCE * 5);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getHarmonyDualitySound = () => {
  return HARMONYDUALITY_INTERACTION.A432_FREQUENCY * (HARMONYDUALITY_INTERACTION.HARMONIC_RESONANCE / 5);
};
