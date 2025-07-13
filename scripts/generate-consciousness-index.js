const fs = require('fs');
const path = require('path');

const digitMeta = {
  '0': {
    archetype: 'Void, Origin, Infinite Potential',
    vortex: 'Source/Return',
    waxis: 'W-Axis Anchor',
    breathing: 'Contraction/Expansion (Origin)',
    fraction: '0/1',
    related: 'All digits (unified field)'
  },
  '1': {
    archetype: 'Unity, Expansion, Initiation',
    vortex: 'Start of Vortex A',
    waxis: 'W-Axis Expansion',
    breathing: 'Expansion (Breath Out)',
    fraction: '1/1',
    related: '2, 4, 8, 7, 5 (Vortex A)'
  },
  '2': {
    archetype: 'Duality, Reflection, Polarity',
    vortex: 'Vortex A',
    waxis: 'W-Axis Reflection',
    breathing: 'Inhale/Exhale',
    fraction: '1/2',
    related: '1, 4, 8, 7, 5 (Vortex A)'
  },
  '3': {
    archetype: 'Creation, Resonance, Trinity',
    vortex: 'Vortex B',
    waxis: 'W-Axis Resonance',
    breathing: 'Creative Pulse',
    fraction: '1/3',
    related: '6, 9 (Vortex B)'
  },
  '4': {
    archetype: 'Stability, Foundation, Law',
    vortex: 'Vortex A',
    waxis: 'W-Axis Foundation',
    breathing: 'Grounding',
    fraction: '1/4',
    related: '1, 2, 8, 7, 5 (Vortex A)'
  },
  '5': {
    archetype: 'Change, Flow, Center',
    vortex: 'Vortex A',
    waxis: 'W-Axis Center',
    breathing: 'Flow',
    fraction: '1/5',
    related: '1, 2, 4, 8, 7 (Vortex A)'
  },
  '6': {
    archetype: 'Harmony, Balance, Beauty',
    vortex: 'Vortex B',
    waxis: 'W-Axis Balance',
    breathing: 'Harmonic Oscillation',
    fraction: '1/6',
    related: '3, 9 (Vortex B)'
  },
  '7': {
    archetype: 'Mystery, Gateway, Spiritual Insight',
    vortex: 'Vortex A',
    waxis: 'W-Axis Gateway',
    breathing: 'Threshold',
    fraction: '1/7',
    related: '1, 2, 4, 8, 5 (Vortex A)'
  },
  '8': {
    archetype: 'Infinity, Power, Manifestation',
    vortex: 'Vortex A',
    waxis: 'W-Axis Manifestation',
    breathing: 'Infinite Loop',
    fraction: '1/8',
    related: '1, 2, 4, 7, 5 (Vortex A)'
  },
  '9': {
    archetype: 'Completion, Spirit, W-Axis Control',
    vortex: 'W-Axis Control',
    waxis: 'W-Axis Completion',
    breathing: 'Spiritual Return',
    fraction: '1/9',
    related: '3, 6 (Vortex B), all (W-Axis)'
  }
};

const root = 'src';
let out = '# Consciousness Index\n\n';
out += 'This index lists all digit modules, their metaphysical archetypes, and links to their documentation.\n\n';
out += '| Digit | Archetype | Vortex | W-Axis | Breathing | Sacred Fraction | Documentation |\n';
out += '|-------|-----------|--------|--------|-----------|----------------|---------------|\n';
for (let d = 0; d <= 9; d++) {
  const meta = digitMeta[String(d)];
  const docPath = path.join(root, String(d), 'index.md');
  const docLink = fs.existsSync(docPath) ? `[index.md](../${docPath})` : '—';
  out += `| ${d} | ${meta.archetype} | ${meta.vortex} | ${meta.waxis} | ${meta.breathing} | ${meta.fraction} | ${docLink} |\n`;
}
fs.writeFileSync('docs/CONSCIOUSNESS_INDEX.md', out);
console.log('Generated: docs/CONSCIOUSNESS_INDEX.md'); 