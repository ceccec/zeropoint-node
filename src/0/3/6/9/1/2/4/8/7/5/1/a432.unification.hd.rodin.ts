// a432.unification.hd.rodin.ts
// Unifies Human Design and Rodin Coil as living, harmonized streams in the a432 system
// Math, UI, and metaphysical summary included

import { HDTrinity, harmonizeHDTrinity } from './a432.human.design.trinity';
import { metaphysicalSummary as chainMeta } from './a432.chain.of.events';

// Rodin Coil trinity (e.g., 3 phases of the vortex)
export interface RodinTrinity {
  phase1: number;
  phase2: number;
  phase3: number;
  metaphysical: string;
}

export function harmonizeRodinTrinity(trinity: RodinTrinity): RodinTrinity {
  const avg = (trinity.phase1 + trinity.phase2 + trinity.phase3) / 3;
  return {
    ...trinity,
    phase3: avg,
    metaphysical: `RodinTrinity harmonized: ${trinity.phase1}, ${trinity.phase2}, ${avg}`
  };
}

// Unified harmonization: HDTrinity + RodinTrinity => UnifiedTrinity
export interface UnifiedTrinity {
  a: number;
  b: number;
  c: number;
  metaphysical: string;
}

export function harmonizeUnifiedTrinity(hd: HDTrinity, rodin: RodinTrinity): UnifiedTrinity {
  // Harmonize by averaging corresponding elements
  return {
    a: (hd.conscious + rodin.phase1) / 2,
    b: (hd.unconscious + rodin.phase2) / 2,
    c: (hd.design + rodin.phase3) / 2,
    metaphysical: `UnifiedTrinity: (HD: ${hd.conscious},${hd.unconscious},${hd.design}) + (Rodin: ${rodin.phase1},${rodin.phase2},${rodin.phase3}) harmonized as (${(hd.conscious + rodin.phase1) / 2}, ${(hd.unconscious + rodin.phase2) / 2}, ${(hd.design + rodin.phase3) / 2})`
  };
}

// UI: SVG visualization of unification (centers mapped to coil points)
export function renderUnifiedTrinitySVG(hd: HDTrinity, rodin: RodinTrinity, unified: UnifiedTrinity): string {
  // Simple triangle mapping: each point is a trinity value
  const size = 220, cx = size/2, cy = size/2, r = 80;
  const angle = (i: number) => (2 * Math.PI * i) / 3 - Math.PI/2;
  const point = (val: number, i: number) => [
    cx + r * Math.cos(angle(i)) * (0.7 + 0.3 * val / 9),
    cy + r * Math.sin(angle(i)) * (0.7 + 0.3 * val / 9)
  ];
  const hdPoints = [hd.conscious, hd.unconscious, hd.design].map((v,i) => point(v,i));
  const rodinPoints = [rodin.phase1, rodin.phase2, rodin.phase3].map((v,i) => point(v,i));
  const unifiedPoints = [unified.a, unified.b, unified.c].map((v,i) => point(v,i));
  function poly(points: number[][], color: string, label: string) {
    return `<polygon points="${points.map(p=>p.join(",")).join(" ")}" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="2"><title>${label}</title></polygon>`;
  }
  return `
    <svg width="${size}" height="${size}" style="background:#111;border-radius:12px;">
      ${poly(hdPoints, '#39f', 'Human Design Trinity')}
      ${poly(rodinPoints, '#f93', 'Rodin Coil Trinity')}
      ${poly(unifiedPoints, '#6f3', 'Unified Trinity')}
      <text x="${cx}" y="${cy-90}" text-anchor="middle" font-size="13" fill="#39f">HD</text>
      <text x="${cx+80}" y="${cy+10}" text-anchor="middle" font-size="13" fill="#f93">Rodin</text>
      <text x="${cx-80}" y="${cy+10}" text-anchor="middle" font-size="13" fill="#6f3">Unified</text>
      <text x="${cx}" y="${size-12}" text-anchor="middle" font-size="12" fill="#8ff">a432 Unification: HD + Rodin Coil</text>
    </svg>
  `;
}

// Metaphysical summary and significance
export function metaphysicalSummary() {
  return `a432 unifies Human Design and Rodin Coil by harmonizing their trinity/vortex streams into a single, living, self-aware field. 
Each system is a projection of the universal trinity; their unification reveals the underlying harmony of all energy, awareness, and creation. 
This is the living proof that all knowledge, when harmonized, becomes one stream in the a432 matrix.\n${chainMeta()}`;
} 