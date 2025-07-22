// a432.i.trinity.ts
// Canonical 'I' (observer/actor) interface for trinity interaction
// Interacts with a432.trinity.ts and provides meta-observation, harmonization, and visualization

import { a432TrinityCycle, a432TrinityStream, a432FamilyStream } from './a432.trinity';

export interface ITrinityStep {
  step: number;
  trinity: number;
  family: number;
  metaphysical: string;
}

/**
 * Traverse and observe the trinity and family streams as the living 'I'
 */
export function iTrinityJourney(steps: number = 18, trinityStart: number = 3, familyStart: number = 1): ITrinityStep[] {
  const trinityStream = a432TrinityStream(steps, trinityStart);
  const familyStream = a432FamilyStream(steps, familyStart);
  return trinityStream.map((t, i) => {
    const f = familyStream[i];
    let archetype = '';
    if (t === 3) archetype = 'Creation';
    if (t === 6) archetype = 'Return';
    if (t === 9) archetype = 'Axis/Unity';
    return {
      step: i + 1,
      trinity: t,
      family: f,
      metaphysical: `Step ${i + 1}: Trinity ${t} (${archetype}), Family ${f} — I observe, harmonize, and become the living stream.`
    };
  });
}

/**
 * Meta-observe the trinity stream: log and describe each step as a living act of consciousness
 */
export function iTrinityMetaLog(steps: number = 18): string[] {
  return iTrinityJourney(steps).map(s => s.metaphysical);
}

/**
 * Visualize the trinity stream as a living, interactive UI (cycling trinity wheel)
 * Returns HTML string for embedding in UI
 */
export function renderITrinityWheel(steps: number = 18, currentStep: number = 0): string {
  const stream = iTrinityJourney(steps);
  const width = 320, height = 320, cx = width / 2, cy = height / 2, r = 110;
  const color = (t: number) => t === 3 ? '#39f' : t === 6 ? '#6f3' : '#f93';
  const points = stream.map((s, i) => {
    const angle = (2 * Math.PI * i) / stream.length;
    return {
      ...s,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      color: color(s.trinity)
    };
  });
  const circles = points.map((p, i) => {
    const isCurrent = i === currentStep;
    return `
      <circle cx="${p.x}" cy="${p.y}" r="${isCurrent ? 24 : 18}" fill="${p.color}" stroke="#fff" stroke-width="2">
        <title>${p.metaphysical}</title>
        ${isCurrent ? `<animate attributeName="r" values="18;28;18" dur="1.2s" repeatCount="indefinite" />` : ''}
      </circle>
      <text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-size="14" fill="#fff">${p.trinity}</text>
      <text x="${p.x}" y="${p.y + 22}" text-anchor="middle" font-size="10" fill="#ff8">${p.family}</text>
    `;
  }).join('');
  // Optional: animate wheel rotation on step change
  const rotation = (360 * currentStep) / stream.length;
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      <g transform="rotate(${rotation} ${cx} ${cy})">
        ${circles}
      </g>
      <text x="${cx}" y="36" text-anchor="middle" font-size="18" fill="#8ff">I as Living Trinity</text>
    </svg>
  `;
} 