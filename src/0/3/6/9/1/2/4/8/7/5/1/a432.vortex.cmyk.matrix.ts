// a432.vortex.cmyk.matrix.ts
// Living vortex flow through the digital CMYK matrix (a432)

import {
  generateA432Matrix,
  A432MatrixEntry,
  cmykIdToPhrase,
  digitColors
} from './a432.mapping';
import { A432Id } from './a432.design.cmyk';

// Rodin vortex sequence for a single channel
const rodinSeq = [1, 2, 4, 8, 7, 5];

export function rodinVortexStep(id: A432Id, channel: 0|1|2|3): A432Id {
  const idx = rodinSeq.indexOf(id[channel]);
  const next = rodinSeq[(idx + 1) % rodinSeq.length];
  const newId = [...id] as A432Id;
  newId[channel] = next;
  return newId;
}

export function traverseVortexMatrix(
  start: A432Id,
  steps: number,
  channel: 0|1|2|3 = 0
): A432MatrixEntry[] {
  const matrix = generateA432Matrix();
  let current = start;
  const path: A432MatrixEntry[] = [];
  for (let i = 0; i < steps; i++) {
    const entry = matrix.find(e => e.id.every((d, j) => d === current[j]));
    if (entry) path.push(entry);
    current = rodinVortexStep(current, channel);
  }
  return path;
}

// Metaphysical overlay for shift vs. oppose
export function metaphysicalShiftOverlay() {
  return `<div style="margin-top:10px;font-size:13px;color:#ff8;white-space:pre-line;">
    <b>Why Shift Lives and Opposition Kills:</b><br>
    In the a432 and Rodin vortex, only the 60-degree shift (the next step in the living sequence) preserves the stream. Opposition (inversion, flipping) breaks the flow, collapses recursion, and leads to stasis or entropy. Shift is life, recursion, and harmony; opposition is death, stasis, and entropy. The living vortex is always shifting, never opposing.
  </div>`;
}

export function renderVortexMatrixSVG(path: A432MatrixEntry[], highlightIndex: number = -1): string {
  // Spiral layout
  const size = 400, cx = size/2, cy = size/2, baseR = 40, spiralGap = 18;
  const n = path.length;
  const points = path.map((entry, i) => {
    const angle = (2 * Math.PI * i) / n * 2;
    const r = baseR + spiralGap * i;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      entry
    };
  });
  const nodes = points.map((p, i) => {
    const color = digitColors[p.entry.id[0]];
    const highlight = i === highlightIndex ? 'filter="url(#glow)"' : '';
    return `<circle cx="${p.x}" cy="${p.y}" r="16" fill="${color}" stroke="#fff" stroke-width="2" ${highlight}>
      <title>${p.entry.phrase}</title></circle>
      <text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="11" fill="#fff">${cmykIdToPhrase(p.entry.id)}</text>`;
  }).join('');
  // Animate a pulse along the spiral (highlight the current node)
  const pulse = points.map((p, i) =>
    `<circle cx="${p.x}" cy="${p.y}" r="${i === highlightIndex ? 22 : 0}" fill="#ff8" fill-opacity="0.18">
      <animate attributeName="r" values="0;22;0" keyTimes="0;0.5;1" dur="1.2s" begin="0s" repeatCount="indefinite"/>
    </circle>`
  ).join('');
  // SVG filter for glow effect
  const glow = `<filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  return `
    <svg width="${size}" height="${size}" style="background:#111;border-radius:16px;">
      ${glow}
      ${pulse}
      ${nodes}
      <text x="${cx}" y="${size-18}" text-anchor="middle" font-size="14" fill="#8ff">a432 Vortex CMYK Matrix: 60° Shift (Rodin)</text>
    </svg>
  `;
} 