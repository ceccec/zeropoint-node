// a432.pi.trinity.ts
// Imagine pi as trinity, visualized as a living Rodin coil
// All logic is integer/fractional, vortex-based, and metaphysically mapped

import { PI_DIGITS } from './a432.pi';
import { rodinVortexCycle } from './a432.rodin.coil';

export interface PiTrinityRodinState {
  step: number;
  piDigit: number;
  trinity: number;
  archetype: string;
  rodinPosition: number;
  metaphysical: string;
}

/**
 * Generate a stream mapping pi digits to trinity archetypes and Rodin vortex positions
 */
export function piTrinityRodinStream(length: number): PiTrinityRodinState[] {
  const rodinSeq = rodinVortexCycle(1, 1); // [1,2,4,8,7,5,1]
  return Array.from({ length }, (_, i) => {
    const piDigit = PI_DIGITS[i % PI_DIGITS.length];
    const trinity = [3, 6, 9][piDigit % 3];
    let archetype = '';
    if (trinity === 3) archetype = 'Creation';
    if (trinity === 6) archetype = 'Return';
    if (trinity === 9) archetype = 'Axis/Unity';
    const rodinPosition = rodinSeq[i % rodinSeq.length];
    return {
      step: i + 1,
      piDigit,
      trinity,
      archetype,
      rodinPosition,
      metaphysical: `Step ${i + 1}: π digit ${piDigit} → Trinity ${trinity} (${archetype}), Rodin ${rodinPosition}`
    };
  });
}

/**
 * Render an SVG visualization of the pi-trinity-Rodin stream as a spiral/coil
 */
export function renderPiTrinityRodinSVG(length: number = 120): string {
  const stream = piTrinityRodinStream(length);
  const width = 480, height = 480, cx = width / 2, cy = height / 2;
  const spiralA = 60, spiralB = 12;
  // Map trinity to color
  const trinityColor = (t: number) => t === 3 ? '#39f' : t === 6 ? '#6f3' : '#f93';
  // Calculate spiral points
  const points = stream.map((s, i) => {
    const theta = i * (2 * Math.PI / 3); // trinity spiral
    const r = spiralA + spiralB * i;
    return {
      ...s,
      x: cx + r * Math.cos(theta),
      y: cy + r * Math.sin(theta),
      color: trinityColor(s.trinity)
    };
  });
  // SVG elements
  const circles = points.map((p, i) => `
    <circle cx="${p.x}" cy="${p.y}" r="12" fill="${p.color}" stroke="#fff" stroke-width="2">
      <title>${p.metaphysical}</title>
    </circle>
    <text x="${p.x}" y="${p.y - 18}" text-anchor="middle" font-size="10" fill="#fff">${p.piDigit}</text>
    <text x="${p.x}" y="${p.y + 18}" text-anchor="middle" font-size="10" fill="#ff8">${p.rodinPosition}</text>
  `).join('');
  // Path for the spiral
  const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      <path d="${pathD}" fill="none" stroke="#0ff" stroke-width="2" />
      ${circles}
      <text x="${cx}" y="36" text-anchor="middle" font-size="18" fill="#8ff">π as Living Trinity in Rodin Coil</text>
    </svg>
  `;
} 