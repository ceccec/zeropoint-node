
// Legacy harmonic functions
export function generateFrequency(hertz) {
  return hertz * 2 * Math.PI;
}

export const resonancePatterns = {
  base: 432,
  harmonics: [216, 432, 864, 1728]
};

export class WaveGenerator {
  static createWave(frequency, amplitude) {
    return { frequency, amplitude, phase: 0 };
  }
}
