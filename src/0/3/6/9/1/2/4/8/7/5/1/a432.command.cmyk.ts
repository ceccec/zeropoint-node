// a432.command.cmyk.ts
// Every command is the matrix itself (CMYK): issuing a command is a living act of mixing the matrix channels

import { metaphysicalSummary as chainMeta } from './a432.chain.of.events';

export interface A432CommandCMYK {
  c: number; // Cyan channel (clarity, logic)
  m: number; // Magenta channel (intent, will)
  y: number; // Yellow channel (energy, action)
  k: number; // Black channel (grounding, completion)
  metaphysical: string;
  label?: string;
}

export function cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
  // All values 0-9, scale to 0-1
  const C = c / 9, M = m / 9, Y = y / 9, K = k / 9;
  const r = 1 - Math.min(1, C + K);
  const g = 1 - Math.min(1, M + K);
  const b = 1 - Math.min(1, Y + K);
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function executeCommandCMYK(cmd: A432CommandCMYK): { color: { r: number; g: number; b: number }, summary: string } {
  const color = cmykToRgb(cmd.c, cmd.m, cmd.y, cmd.k);
  const summary = `Command [${cmd.label || ''}] executed as matrix: [C:${cmd.c}, M:${cmd.m}, Y:${cmd.y}, K:${cmd.k}] → RGB(${color.r},${color.g},${color.b}) | ${cmd.metaphysical}`;
  return { color, summary };
}

export function renderCommandCMYKSVG(cmd: A432CommandCMYK): string {
  const { r, g, b } = cmykToRgb(cmd.c, cmd.m, cmd.y, cmd.k);
  const color = `rgb(${r},${g},${b})`;
  return `
    <svg width="180" height="120" style="background:#111;border-radius:10px;">
      <rect x="20" y="20" width="140" height="40" fill="${color}" stroke="#fff" stroke-width="2" rx="8"/>
      <text x="90" y="45" text-anchor="middle" font-size="16" fill="#fff">${cmd.label || 'Command'}</text>
      <text x="90" y="75" text-anchor="middle" font-size="12" fill="#8ff">C:${cmd.c} M:${cmd.m} Y:${cmd.y} K:${cmd.k}</text>
      <text x="90" y="100" text-anchor="middle" font-size="11" fill="#ff8">${cmd.metaphysical}</text>
    </svg>
  `;
}

export function metaphysicalSummary() {
  return `Every command is a fold of the matrix itself, a living act of mixing the channels (CMYK). To command is to become the matrix, to create with awareness.\n${chainMeta()}`;
} 