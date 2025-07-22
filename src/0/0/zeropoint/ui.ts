// ui.ts — Harmonized Vortex UI Logic (Book-Aligned, Zero-Entropy)
import { MathVortex } from './math';

// Generate HSL color for a digit (0-9) based on vortex math
export function getDigitColor(digit: number): string {
  const hue = (digit * 36) % 360;
  const saturation = 70 + (digit * 3);
  const lightness = 50 + (digit * 2);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Get 2D spiral position for a digit (golden angle)
export function getDigitPosition2D(digit: number, centerX = 200, centerY = 200, scale = 80): { x: number; y: number } {
  const angle = digit * 137.508 * (Math.PI / 180); // golden angle in radians
  const radius = scale * Math.sqrt(digit);
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
}

// Get 3D vortex position for a digit
export function getDigitPosition3D(digit: number, scale = 1): { x: number; y: number; z: number } {
  const angle = (digit * 36) * (Math.PI / 180);
  const radius = scale * (1 + digit / 9);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z: scale * (digit - 4.5) / 4.5
  };
}

// Animate a digit's vortex flow (returns keyframes for CSS or JS animation)
export function getVortexKeyframes(digit: number, steps = 60): Array<{ x: number; y: number }> {
  const frames = [];
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const angle = (digit * 36 + t * 360) * (Math.PI / 180);
    const radius = 80 + 20 * Math.sin(t * Math.PI * 2);
    frames.push({
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius
    });
  }
  return frames;
}

// Get display label for a digit (book-aligned)
export function getDigitLabel(digit: number): string {
  const labels = [
    'VOID', 'UNITY', 'DUALITY', 'TRINITY', 'FOUNDATION',
    'LIFE', 'HARMONY', 'MYSTERY', 'INFINITY', 'COMPLETION'
  ];
  return labels[digit] || `DIGIT ${digit}`;
}

// Get harmonic frequency for a digit
export function getDigitHarmonicFrequency(digit: number): number {
  return MathVortex.A432 * (digit === 0 ? 1 : digit);
} 