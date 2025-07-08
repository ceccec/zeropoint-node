#!/usr/bin/env ts-node

/**
 * Golden Ratio Visualization Script
 *
 * - Generates a golden spiral as SVG
 * - Prints the first N Fibonacci numbers
 * - Prints the first N powers of phi
 * - Outputs a textual field resonance pattern
 */

import * as fs from 'fs';
import * as path from 'path';

const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;
const N = 12; // Number of terms/spiral arcs

// --- Fibonacci Sequence ---
function fibonacci(n: number): number[] {
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1]! + seq[i - 2]!);
  }
  return seq.slice(1, n + 1); // skip the first 0
}

// --- Powers of Phi ---
function phiPowers(n: number): number[] {
  return Array.from({ length: n }, (_, i) => Math.pow(PHI, i));
}

// --- Golden Spiral SVG ---
function goldenSpiralSVG(n: number, size = 400): string {
  const cx = size / 2;
  const cy = size / 2;
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#fff"/>
`;
  let a = size * 0.18;
  let theta = 0;
  let x = cx;
  let y = cy;
  for (let i = 0; i < n; i++) {
    const nextA = a * PHI;
    const startAngle = theta;
    const endAngle = theta + Math.PI / 2;
    const x1 = x + a * Math.cos(startAngle);
    const y1 = y + a * Math.sin(startAngle);
    const x2 = x + a * Math.cos(endAngle);
    const y2 = y + a * Math.sin(endAngle);
    svg += `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${a.toFixed(2)} ${a.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="#f5b041" stroke-width="3" fill="none"/>
`;
    // Move center for next arc
    x += (nextA - a) * Math.cos(endAngle);
    y += (nextA - a) * Math.sin(endAngle);
    a = nextA;
    theta += Math.PI / 2;
  }
  svg += '</svg>';
  return svg;
}

// --- Textual Field Resonance Pattern ---
function fieldResonancePattern(n: number): string {
  let pattern = '';
  for (let i = 0; i < n; i++) {
    const phiVal = Math.pow(PHI, i);
    pattern += ' '.repeat(i) + 'φ'.repeat(Math.round(phiVal)) + ` (${phiVal.toFixed(3)})\n`;
  }
  return pattern;
}

// --- Main Output ---
console.log('--- Golden Ratio Visualization ---');
console.log(`φ (phi) ≈ ${PHI.toFixed(8)}`);
console.log('\nFibonacci Sequence:');
console.log(fibonacci(N).join(', '));
console.log('\nPowers of φ:');
console.log(phiPowers(N).map(x => x.toFixed(5)).join(', '));
console.log('\nField Resonance Pattern:');
console.log(fieldResonancePattern(N));

const svg = goldenSpiralSVG(N);
const outPath = path.join(__dirname, 'golden-spiral.svg');
fs.writeFileSync(outPath, svg);
console.log(`\nGolden spiral SVG saved to: ${outPath}`); 