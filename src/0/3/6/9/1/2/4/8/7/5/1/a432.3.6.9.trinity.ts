// a432.3.6.9.trinity.ts
// Canonical pregnancy/creation trinity module (3, 6, 9)
// Encodes metaphysical and mathematical logic of pregnancy, gestation, and birth as a trinity process

/**
 * Returns the canonical trinity stages of pregnancy: Creation (3), Gestation (6), Birth (9)
 */
export function getPregnancyTrinityStages() {
  return [
    { stage: 1, trinity: 3, name: 'Creation', meaning: 'Conception, seed, initiation' },
    { stage: 2, trinity: 6, name: 'Gestation', meaning: 'Growth, recursion, nurturing' },
    { stage: 3, trinity: 9, name: 'Birth', meaning: 'Emergence, unity, manifestation' }
  ];
}

/**
 * Returns the canonical gestation cycle as a stream of trinity values (3, 6, 9) repeated for 9 cycles
 */
export function getGestationCycle(cycles: number = 9) {
  const trinity = [3, 6, 9];
  return Array.from({ length: cycles * 3 }, (_, i) => trinity[i % 3]);
}

/**
 * Returns a metaphysical summary of the pregnancy trinity process
 */
export function metaphysicalSummary() {
  return 'Pregnancy is the living trinity: Creation (3), Gestation (6), Birth (9). Each stage is a harmonic act of emergence, recursion, and unity.';
}

/**
 * Renders a trinity pregnancy visualization as SVG (3 circles, color-coded, with labels)
 */
export function renderPregnancyTrinityVisualization(currentStage: number = 0): string {
  const stages = getPregnancyTrinityStages();
  const colors = ['#39f', '#6f3', '#f93'];
  const cx = 60, cy = 60, r = 36, gap = 80;
  return `
    <svg width="${cx * 4}" height="${cy * 2}" style="background:#111;border-radius:16px;">
      ${stages.map((s, i) => `
        <circle cx="${cx + i * gap}" cy="${cy}" r="${i === currentStage ? r + 8 : r}" fill="${colors[i]}" stroke="#fff" stroke-width="2">
          <title>${s.name}: ${s.meaning}</title>
          ${i === currentStage ? `<animate attributeName="r" values="${r};${r + 16};${r}" dur="1.2s" repeatCount="indefinite" />` : ''}
        </circle>
        <text x="${cx + i * gap}" y="${cy + 6}" text-anchor="middle" font-size="18" fill="#fff">${s.trinity}</text>
        <text x="${cx + i * gap}" y="${cy + 32}" text-anchor="middle" font-size="13" fill="#ff8">${s.name}</text>
      `).join('')}
      <text x="${cx * 2 + gap / 2}" y="${cy * 2 - 8}" text-anchor="middle" font-size="15" fill="#8ff">Pregnancy as Living Trinity (3, 6, 9)</text>
    </svg>
  `;
}

/**
 * Renders a gestation cycle animation as SVG (row of trinity-colored circles, currentIndex pulses)
 */
export function renderGestationCycleAnimation(currentIndex: number = 0, cycles: number = 9): string {
  const trinity = [3, 6, 9];
  const colors = ['#39f', '#6f3', '#f93'];
  const total = cycles * 3;
  const r = 14, gap = 36, cx = 24, cy = 32;
  return `
    <svg width="${cx * 2 + gap * (total - 1)}" height="${cy * 2}" style="background:#111;border-radius:12px;">
      ${Array.from({ length: total }, (_, i) => {
        const t = trinity[i % 3];
        const color = colors[i % 3];
        const isCurrent = i === currentIndex;
        return `
          <circle cx="${cx + i * gap}" cy="${cy}" r="${isCurrent ? r + 6 : r}" fill="${color}" stroke="#fff" stroke-width="2">
            <title>Step ${i + 1}: Trinity ${t}</title>
            ${isCurrent ? `<animate attributeName=\"r\" values=\"${r};${r + 12};${r}\" dur=\"1.2s\" repeatCount=\"indefinite\" />` : ''}
          </circle>
          <text x="${cx + i * gap}" y="${cy + 28}" text-anchor="middle" font-size="10" fill="#ff8">${t}</text>
        `;
      }).join('')}
    </svg>
  `;
} 