// Visualization logic for digit 8: infinity, visualization

/**
 * Visualize vortex and pi patterns
 */

export function visualizeTorusLoop(): string {
  return '1 → 2 → 4 → 8 → 7 → 5 → 1 (closed torus loop)';
}

export function visualizePiPattern(): string {
  const piDigits = [3, 1, 4, 1, 5, 9];
  return piDigits.join(' → ') + ' (π spiral, never closes)';
}

export function visualizePatterns(): string {
  return [
    'Vertical:   1 → 4 → 7 (Structure)',
    'Horizontal: 2 → 5 → 8 (Balance)',
    'Diagonal:   3 → 6 → 9 (Creation)'
  ].join('\n');
} 