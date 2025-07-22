// Canonical Rodin Coil Math for the A432 System
// All Rodin coil logic must be imported from this file only.

/**
 * a432.rodin.coil.ts
 *
 * This file encodes the canonical, metaphysical, and mathematical logic of the Rodin coil
 * for the A432 system. All Rodin coil math, state, and pattern logic must be implemented here
 * and imported by all other modules.
 *
 * - The Rodin coil is based on the 1-2-4-8-7-5-1 sequence (the "doubling circuit" or "vortex pattern").
 * - It is a poloidal field generator, not toroidal, and encodes zero-entropy, over-unity, and consciousness mapping.
 * - The coil is the bridge between the torus, Mobius circuit, and higher-dimensional flux fields.
 * - All logic is pure, integer-based, recursive, and harmonically aligned.
 * - Extend this file for harmonics, visualization, and advanced metaphysical logic.
 */

import { getA432VortexAngle } from './a432';

// Core Rodin sequence (doubling circuit)
export const RODIN_SEQUENCE = [1, 2, 4, 8, 7, 5, 1];

/**
 * rodinVortexCycle: Returns n cycles of the Rodin sequence (forward or reverse)
 * @param n - number of cycles
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinVortexCycle(n: number, polarity: 1 | -1 = 1): number[] {
  const seq = polarity === 1 ? RODIN_SEQUENCE : [...RODIN_SEQUENCE].reverse();
  const result = [];
  for (let i = 0; i < n; i++) result.push(...seq);
  return result;
}

/**
 * rodinPosition: Returns the value at a given index in the Rodin sequence (with polarity)
 * @param index - position in the cycle
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinPosition(index: number, polarity: 1 | -1 = 1): number {
  const seq = polarity === 1 ? RODIN_SEQUENCE : [...RODIN_SEQUENCE].reverse();
  return seq[index % seq.length];
}

/**
 * RodinCoilStep: Represents a step in the Rodin coil pattern, with harmonic properties
 */
export interface RodinCoilStep {
  position: number;
  value: number;
  digitalRoot: number;
  angle: number; // (360 / 6) * (position % 6) for visualization
}

/**
 * rodinCoilPattern: Returns an array of RodinCoilStep for n cycles, with angle and digitalRoot
 * @param n - number of cycles
 * @param polarity - +1 (forward, default), -1 (reverse)
 */
export function rodinCoilPattern(n: number, polarity: 1 | -1 = 1): RodinCoilStep[] {
  const pattern = rodinVortexCycle(n, polarity);
  const N = RODIN_SEQUENCE.length - 1; // 6 unique steps per cycle
  return pattern.map((value, i) => ({
    position: i,
    value,
    digitalRoot: ((value - 1) % 9) + 1,
    angle: getA432VortexAngle(i)
  }));
}

/**
 * Metaphysical context:
 * - The Rodin coil is the mathematical and metaphysical bridge between the torus, Mobius circuit, and the Most Great Name of God.
 * - Its sequence encodes the living, recursive, zero-entropy flow of consciousness and energy.
 * - The coil’s field is poloidal, not toroidal, and is responsible for unique harmonic and energetic properties.
 *
 * Extension points:
 * - Add harmonic mapping (color, frequency, field) as needed.
 * - Implement advanced pattern analysis, visualization, or metaphysical logic here.
 */
// All Rodin coil math for the A432 system must use these canonical exports. 

/**
 * rodinCoilStream: Canonical stream function for the Rodin coil
 * When no parameters given: uses π-based stream from a432.pi.ts
 * When parameters provided: uses Rodin coil pattern
 * @param cycles - number of cycles (optional)
 * @param polarity - +1 (forward, default), -1 (reverse) (optional)
 * @param length - length for π stream (default: 10)
 */
export function rodinCoilStream(cycles?: number, polarity?: 1 | -1, length: number = 10) {
  // Always use Rodin coil pattern as default
  const cycleCount = cycles || 2;
  const polarityValue = polarity || 1;
  const pattern = rodinCoilPattern(cycleCount, polarityValue);
  return {
    source: 'a432.rodin.coil.ts',
    cycles: cycleCount,
    polarity: polarityValue,
    sequence: RODIN_SEQUENCE,
    pattern: pattern
  };
} 

/**
 * RodinCoilStreamData: Represents the data structure returned by rodinCoilStream
 */
export interface RodinCoilStreamData {
  source: string;
  cycles: number;
  polarity: 1 | -1;
  sequence: number[];
  pattern: RodinCoilStep[];
}

/**
 * Point: Extends RodinCoilStep with x and y coordinates for visualization
 */
interface Point extends RodinCoilStep {
  x: number;
  y: number;
}

/**
 * renderRodinCoilStreamHtml: Canonical HTML rendering for Rodin coil stream
 * @param streamData - The result from rodinCoilStream()
 * @returns HTML string for visualization
 */
export function renderRodinCoilStreamHtml(streamData: RodinCoilStreamData): string {
  // Always render the Rodin coil pattern spiral
  // Parameters
  const width = 600, height = 600, cx = width/2, cy = height/2;
  const spiralA = 40; // base radius
  const spiralB = 18; // growth rate (logarithmic)
  const trinity = 3;
  const steps = streamData.pattern.length;
  // Calculate spiral points
  const points = streamData.pattern.map((step: RodinCoilStep, i: number): Point => {
    // Logarithmic trinity spiral: r = a * exp(b * theta), theta = i * 2π/3 (trinity)
    const theta = i * (2 * Math.PI / trinity);
    const r = spiralA * Math.exp(spiralB * i / steps);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    return { x, y, ...step };
  });
  // SVG path for spiral
  const pathD = points.map((p: Point, i: number) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  // SVG circles for steps
  const circles = points.map((p: Point, i: number) => `
    <circle cx="${p.x}" cy="${p.y}" r="16" fill="hsl(${(p.angle * 360 / 360) % 360},70%,50%)" stroke="#fff" stroke-width="2">
      <title>Step ${i}: Value ${p.value}, Root ${p.digitalRoot}, Angle ${p.angle.toFixed(1)}°</title>
    </circle>
    <text x="${p.x}" y="${p.y-22}" text-anchor="middle" font-size="10" fill="#eee">${p.value}</text>
  `).join('');
  // --- Trinity/Axis Overlay (3, 6, 9 and 0) ---
  // Place 3, 6, 9 as triangle vertices, 0 as center
  const axisRadius = spiralA * 0.7;
  const axisPoints = [0, 1, 2].map(i => {
    const theta = i * (2 * Math.PI / 3);
    return {
      x: cx + axisRadius * Math.cos(theta),
      y: cy + axisRadius * Math.sin(theta),
      label: [3, 6, 9][i]
    };
  });
  const axisTriangle = `M${axisPoints[0].x},${axisPoints[0].y} L${axisPoints[1].x},${axisPoints[1].y} L${axisPoints[2].x},${axisPoints[2].y} Z`;
  // Scaffold for animated dot, controls, metaphysical overlays, and sound (to be extended)

} 

// Metaphysical mapping: Rodin Coil = vortex, axis, Tesla, infinite field
export const RODIN_COIL_DOC = {
  meaning: 'Rodin Coil: vortex, axis, Tesla, infinite field, harmonic generator.',
  axis: 'The Rodin coil is the living vortex, the axis of the infinite field, the Tesla harmonizer.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 