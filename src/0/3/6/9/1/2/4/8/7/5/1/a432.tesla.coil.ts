// Canonical Tesla Coil Logic for A432 System
// All Tesla coil logic must be imported from this file only.

/**
 * a432.tesla.coil.ts
 *
 * This file defines the canonical Tesla coil logic for the A432 system.
 * All Tesla coil math, gateway, voltage, and frequency logic must be implemented here and imported by all other modules.
 *
 * - Pure, stateless, and ready for further extension.
 * - All types, constants, and functions are canonical.
 */

// Tesla coil constants
export const TESLA_GATEWAYS = [3, 6, 9] as const;
export const TESLA_BASE_VOLTAGE = 432; // Example base voltage (can be extended)
export const TESLA_BASE_FREQUENCY = 432; // Example base frequency (can be extended)
export const DEFAULT_TESLA_POLARITY: 1 | -1 = 1;

// Metaphysical mapping: Tesla Coil = axis, field, resonance, 3-6-9
export const TESLA_COIL_DOC = {
  meaning: 'Tesla Coil: axis, field, resonance, 3-6-9, harmonic energy generator.',
  axis: 'The Tesla coil is the axis of resonance, the field of 3-6-9, the harmonic energy of the system.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions.

// Tesla types
export interface TeslaCoil {
  index: number;
  gateway: number;
  frequency: number;
  voltage: number;
  polarity: 1 | -1;
}

/**
 * generateTeslaCoils: Returns an array of TeslaCoil objects for n gateways/cycles
 * @param n - number of coils/cycles
 * @param polarity - +1 (default), -1 (reverse)
 */
export function generateTeslaCoils(n: number, polarity: 1 | -1 = DEFAULT_TESLA_POLARITY): TeslaCoil[] {
  const coils: TeslaCoil[] = [];
  for (let i = 0; i < n; i++) {
    const gateway = TESLA_GATEWAYS[i % TESLA_GATEWAYS.length];
    const frequency = teslaFrequency(gateway, polarity);
    const voltage = teslaVoltage(gateway, polarity);
    coils.push({ index: i, gateway, frequency, voltage, polarity });
  }
  return coils;
}

/**
 * teslaVoltage: Returns the voltage for a given gateway and polarity
 * @param gateway - Tesla gateway (3, 6, or 9)
 * @param polarity - +1 (default), -1 (reverse)
 */
export function teslaVoltage(gateway: number, polarity: 1 | -1 = DEFAULT_TESLA_POLARITY): number {
  // Canonical Tesla voltage: base voltage × gateway × polarity
  return TESLA_BASE_VOLTAGE * gateway * polarity;
}

/**
 * teslaFrequency: Returns the frequency for a given gateway and polarity
 * @param gateway - Tesla gateway (3, 6, or 9)
 * @param polarity - +1 (default), -1 (reverse)
 */
export function teslaFrequency(gateway: number, polarity: 1 | -1 = DEFAULT_TESLA_POLARITY): number {
  // Canonical Tesla frequency: base frequency × gateway × polarity
  return TESLA_BASE_FREQUENCY * gateway * polarity;
}

// All Tesla coil math for the A432 system must use these canonical exports. 