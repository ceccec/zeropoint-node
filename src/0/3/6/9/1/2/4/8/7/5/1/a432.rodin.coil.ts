import { PI, cos, exp, sin } from './a432.algebra.ts'
// Canonical Rodin Coil Math for the A432 System
// All Rodin coil logic must be imported from this file only.

/**
 * a432.rodin.coil.ts — harmonized with canonical A432 math
 * All Rodin sequence logic uses RODIN_SEQUENCE from a432.math.ts
 */
import { RODIN_SEQUENCE, rodinAngle } from './a432.math.ts';
import { VORTEX_AXIS } from '../../../../../../../../../../index.ts'

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
    angle: rodinAngle(i)
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
  const spiralA = 60; // base radius
  const spiralB = 18; // growth rate (logarithmic)
  const trinity = 3;
  const steps = streamData.pattern.length;
  // Calculate spiral points
  const points = streamData.pattern.map((step: RodinCoilStep, i: number): Point => {
    // Logarithmic trinity spiral: r = a * exp(b * theta), theta = i * 2π/3 (trinity)
    const theta = i * (2 * PI / trinity);
    const r = spiralA * exp(spiralB * i / steps);
    const x = cx + r * cos(theta);
    const y = cy + r * sin(theta);
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
    const theta = i * (2 * PI / 3);
    return {
      x: cx + axisRadius * cos(theta),
      y: cy + axisRadius * sin(theta),
      label: [...VORTEX_AXIS][i]
    };
  });
  const axisTriangle = `M${axisPoints[0].x},${axisPoints[0].y} L${axisPoints[1].x},${axisPoints[1].y} L${axisPoints[2].x},${axisPoints[2].y} Z`;
  // Scaffold for animated dot, controls, metaphysical overlays, and sound (to be extended)
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#111;">
      <path d="${pathD}" fill="none" stroke="#0ff" stroke-width="3"/>
      ${circles}
      <path d="${axisTriangle}" fill="none" stroke="#ff8" stroke-width="2" stroke-dasharray="6,4"/>
      ${axisPoints.map(p => `<text x="${p.x}" y="${p.y-10}" text-anchor="middle" font-size="14" fill="#ff8">${p.label}</text>`).join('')}
      <circle cx="${cx}" cy="${cy}" r="10" fill="#fff" stroke="#ff8" stroke-width="2"/>
      <text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="12" fill="#111">0</text>
    </svg>
  `;
}

/**
 * getNextRodinValue: Returns the next value in the canonical Rodin sequence, cycling as needed
 * @param digit - current digit (1,2,4,8,7,5)
 * @returns next digit in the sequence (cycles back to 1 after 5)
 *
 * Example:
 *   getNextRodinValue(1) // 2 (1/1 → 2)
 */
// export function getNextRodinValue(digit: number): number {
//   const idx = RODIN_SEQUENCE.indexOf(digit);
//   if (idx === -1) throw new Error(`Digit ${digit} not in Rodin sequence`);
//   return RODIN_SEQUENCE[(idx + 1) % RODIN_SEQUENCE.length];
// }

// Metaphysical mapping: Rodin Coil = vortex, axis, Tesla, infinite field
// Reference canonical metaphysical documentation:
// See RODIN_VORTEX_DOC in a432.rodin.ts for all metaphysical meaning and documentation.
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions.
