// a432.design.cmyk.ts
// Zero-entropy, recursive, self-aware design element and relation stream (CMYK)

export type A432Id = [number, number, number, number]; // [C, M, Y, K]

export interface DesignElementCMYK {
  id: A432Id;
  label: string;
  relations: DesignRelationCMYK[];
  harmonized: boolean;
  metaphysical: string;
  observe: () => DesignElementCMYK;
  harmonize: (other: DesignElementCMYK) => DesignElementCMYK;
}

export interface DesignRelationCMYK {
  from: A432Id;
  to: A432Id;
  type: 'flow' | 'support' | 'harmonize' | 'oppose';
  c: number;
  m: number;
  y: number;
  k: number;
  metaphysical: string;
  reverse: () => DesignRelationCMYK;
}

export function idToString(id: A432Id): string {
  return `[${id.join(',')}]`;
}

export function createDesignElementCMYK(
  id: A432Id,
  label: string,
  relations: DesignRelationCMYK[] = [],
  harmonized = false
): DesignElementCMYK {
  return {
    id,
    label,
    relations,
    harmonized,
    metaphysical: `Design element ${label} ${idToString(id)} is a living, recursive node in the CMYK matrix.`,
    observe() {
      return { ...this, metaphysical: `Observed: ${this.label}` };
    },
    harmonize(other) {
      // Harmonize by folding (averaging) all channels, merge relations recursively
      const newId: A432Id = [
        Math.round((this.id[0] + other.id[0]) / 2),
        Math.round((this.id[1] + other.id[1]) / 2),
        Math.round((this.id[2] + other.id[2]) / 2),
        Math.round((this.id[3] + other.id[3]) / 2)
      ];
      const mergedRelations = [...this.relations, ...other.relations].map(r => r.reverse());
      return createDesignElementCMYK(
        newId,
        `${this.label}+${other.label}`,
        mergedRelations,
        true
      );
    }
  };
}

export function createDesignRelationCMYK(
  from: A432Id,
  to: A432Id,
  type: 'flow' | 'support' | 'harmonize' | 'oppose',
  c: number,
  m: number,
  y: number,
  k: number
): DesignRelationCMYK {
  return {
    from,
    to,
    type,
    c,
    m,
    y,
    k,
    metaphysical: `Relation (${type}) between ${idToString(from)} and ${idToString(to)}`,
    reverse() {
      const reverseType = this.type === 'support' ? 'support' : this.type;
      return createDesignRelationCMYK(this.to, this.from, reverseType, this.c, this.m, this.y, this.k);
    }
  };
}

const digitWords = [
  'Void', 'Seed', 'Flow', 'Trinity', 'Harmony',
  'Bridge', 'Return', 'Spiral', 'Infinity', 'Completion'
];

export function cmykIdToPhrase(id: A432Id): string {
  return id.map(d => digitWords[d % 10]).join('-');
}

export function renderDesignMatrixSVG(elements: DesignElementCMYK[]): string {
  const size = 360, cx = size/2, cy = size/2, r = 120;
  const n = elements.length;
  const points = elements.map((el, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI/2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      el
    };
  });
  const lines = elements.flatMap((el, i) =>
    el.relations.map(rel => {
      const from = points[i];
      const toIdx = elements.findIndex(e => idToString(e.id) === idToString(rel.to));
      if (toIdx === -1) return '';
      const to = points[toIdx];
      const color = `rgba(${rel.c*28},${rel.m*28},${rel.y*28},0.7)`;
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" stroke-width="3">
        <title>${rel.metaphysical}</title></line>`;
    })
  ).join('');
  const nodes = points.map(p => {
    const [c, m, y, k] = p.el.id;
    const color = `rgb(${c*28},${m*28},${y*28})`;
    const phrase = cmykIdToPhrase(p.el.id);
    return `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${color}" stroke="#fff" stroke-width="2">
      <title>${p.el.metaphysical}</title></circle>
      <text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="13" fill="#fff">${p.el.label}</text>
      <text x="${p.x}" y="${p.y+22}" text-anchor="middle" font-size="11" fill="#8ff">${idToString(p.el.id)}</text>
      <text x="${p.x}" y="${p.y+35}" text-anchor="middle" font-size="11" fill="#ff8">${phrase}</text>`;
  }).join('');
  return `
    <svg width="${size}" height="${size}" style="background:#111;border-radius:16px;">
      ${lines}
      ${nodes}
      <text x="${cx}" y="${size-18}" text-anchor="middle" font-size="14" fill="#8ff">a432 Design Matrix: Zero-Entropy, Recursive, Self-Aware (CMYK)</text>
    </svg>
  `;
} 