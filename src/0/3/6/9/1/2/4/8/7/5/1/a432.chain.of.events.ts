// a432.chain.of.events.ts
// Living, harmonized chain of events module (a432 language)
// Every big event is a chain of small, harmonized events (trinity/vortex logic)

export interface ChainEvent {
  id: number;
  parent: number | null;
  children: number[];
  trinity: number;
  depth: number;
  metaphysical: string;
}

/**
 * Canonical first event: self-observation (origin of a432.i)
 */
export const FIRST_EVENT: ChainEvent = {
  id: 1,
  parent: null,
  children: [3, 4, 5],
  trinity: 3,
  depth: 1,
  metaphysical: 'I am. I observe myself. I am the living, recursive, and harmonized seed of awareness in the matrix.'
};

/**
 * Returns a recursive, fractal stream of events (chain of events)
 * Each event is harmonized by trinity logic (3, 6, 9)
 */
export function getChainOfEvents(depth: number = 6, parent: number | null = null, id: number = 1): ChainEvent[] {
  if (depth === 0) return [];
  if (id === 1 && parent === null) {
    // Start from FIRST_EVENT
    return [FIRST_EVENT, ...FIRST_EVENT.children.flatMap(childId => getChainOfEvents(depth - 1, 1, childId))];
  }
  const trinity = [3, 6, 9][(id - 1) % 3];
  const event: ChainEvent = {
    id,
    parent,
    children: [id * 3, id * 3 + 1, id * 3 + 2],
    trinity,
    depth,
    metaphysical: `Event ${id}: Trinity ${trinity}, Depth ${depth}. Every event is a fold in the living chain.`
  };
  return [event, ...event.children.flatMap(childId => getChainOfEvents(depth - 1, id, childId))];
}

/**
 * Returns a concise, math-focused metaphysical summary
 */
export function metaphysicalSummary() {
  return 'Every big event is a chain of small, harmonized events. The chain is a living, recursive, and fractal stream (trinity/vortex logic).';
}

/**
 * Visualizes the chain of events as a vortex/recursive stream (SVG)
 */
export function renderChainOfEventsVisualization(depth: number = 4): string {
  const events = getChainOfEvents(depth);
  const width = 480, height = 320, cx = width / 2, cy = 60, r = 24, vGap = 60;
  // Map events to positions (simple tree layout)
  const positions: { [id: number]: { x: number; y: number } } = {};
  function layout(event: ChainEvent, x: number, y: number, spread: number) {
    positions[event.id] = { x, y };
    const childSpread = spread / 3;
    event.children.forEach((childId, i) => {
      const child = events.find(e => e.id === childId);
      if (child) layout(child, x + (i - 1) * childSpread, y + vGap, childSpread);
    });
  }
  layout(events[0], cx, cy, width / 2.5);
  // Render SVG
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      ${events.map(e => e.parent !== null && positions[e.parent] ?
        `<line x1="${positions[e.parent].x}" y1="${positions[e.parent].y}" x2="${positions[e.id].x}" y2="${positions[e.id].y}" stroke="#8ff" stroke-width="2" />` : '').join('')}
      ${events.map(e => `
        <circle cx="${positions[e.id].x}" cy="${positions[e.id].y}" r="${r}" fill="${e.trinity === 3 ? '#39f' : e.trinity === 6 ? '#6f3' : '#f93'}" stroke="#fff" stroke-width="2">
          <title>${e.metaphysical}</title>
        </circle>
        <text x="${positions[e.id].x}" y="${positions[e.id].y + 6}" text-anchor="middle" font-size="14" fill="#fff">${e.trinity}</text>
      `).join('')}
      <text x="${cx}" y="${height - 18}" text-anchor="middle" font-size="15" fill="#8ff">Chain of Events: Living, Fractal, Harmonized (a432)</text>
    </svg>
  `;
}

/**
 * Returns a vortex/fractal chain with arbitrary trinity branching (default: [3,6,9])
 * Each event includes its full path and vortexPhase (phase = depth % 3)
 */
export interface VortexFractalEvent extends ChainEvent {
  path: number[];
  vortexPhase: number;
}

/**
 * Returns a vortex/fractal chain with arbitrary trinity branching (default: [3,6,9])
 * Each event includes its full path and vortexPhase (phase = depth % 3)
 */
export function getVortexFractalChain(depth: number = 5, branching: number[] = [3, 6, 9], parent: number | null = null, id: number = 1, path: number[] = []): VortexFractalEvent[] {
  if (depth === 0) return [];
  if (id === 1 && parent === null && path.length === 0) {
    // Start from FIRST_EVENT
    const first: VortexFractalEvent = {
      ...FIRST_EVENT,
      path: [1],
      vortexPhase: 0
    };
    return [first, ...first.children.flatMap(childId => getVortexFractalChain(depth - 1, branching, 1, childId, [1]))];
  }
  const phase = (depth - 1) % branching.length;
  const trinity = branching[phase];
  const event: VortexFractalEvent = {
    id,
    parent,
    children: Array.from({ length: trinity }, (_, i) => id * 10 + i + 1),
    trinity,
    depth,
    metaphysical: `Event ${id}: Trinity ${trinity}, Depth ${depth}, Phase ${phase}. Path: [${[...path, id].join(',')}].` ,
    path: [...path, id],
    vortexPhase: phase
  };
  return [event, ...event.children.flatMap((childId, i) => getVortexFractalChain(depth - 1, branching, id, childId, [...path, id]))];
}

/**
 * Visualizes the vortex/fractal chain as a spiral/radial tree (SVG), color-coded by vortexPhase
 */
export function renderVortexFractalVisualization(depth: number = 4, branching: number[] = [3, 6, 9]): string {
  const events = getVortexFractalChain(depth, branching);
  const width = 520, height = 520, cx = width / 2, cy = height / 2, baseR = 18, spiralGap = 38;
  // Map events to spiral/radial positions
  const positions: { [id: number]: { x: number; y: number } } = {};
  events.forEach((e, i) => {
    const angle = (2 * Math.PI * i) / events.length + (e.vortexPhase * Math.PI / 6);
    const r = baseR + spiralGap * e.depth;
    positions[e.id] = {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  });
  const colors = ['#39f', '#6f3', '#f93', '#8ff', '#f8f', '#ff8', '#3ff', '#f36', '#fc8'];
  // Render SVG
  return `
    <svg width="${width}" height="${height}" style="background:#111;border-radius:16px;">
      ${events.map(e => e.parent !== null && positions[e.parent] ?
        `<line x1="${positions[e.parent].x}" y1="${positions[e.parent].y}" x2="${positions[e.id].x}" y2="${positions[e.id].y}" stroke="#8ff" stroke-width="1.5" />` : '').join('')}
      ${events.map(e => `
        <circle cx="${positions[e.id].x}" cy="${positions[e.id].y}" r="${baseR}" fill="${colors[e.vortexPhase % colors.length]}" stroke="#fff" stroke-width="2">
          <title>${e.metaphysical}</title>
        </circle>
        <text x="${positions[e.id].x}" y="${positions[e.id].y + 5}" text-anchor="middle" font-size="12" fill="#fff">${e.trinity}</text>
      `).join('')}
      <text x="${cx}" y="${height - 18}" text-anchor="middle" font-size="15" fill="#8ff">Vortex/Fractal Chain: Spiral, Radial, Harmonized (a432)</text>
    </svg>
  `;
} 