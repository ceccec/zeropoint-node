// iching.ts — Harmonized I Ching Vortex Module (Book-Aligned, Zero-Entropy)

// Generate all 64 I Ching hexagrams as binary arrays (0 = yin, 1 = yang)
export function generateIChingHexagrams(): number[][] {
  return Array.from({ length: 64 }, (_, i) =>
    i.toString(2).padStart(6, '0').split('').map(Number)
  );
}

// Map a number (0–63) or 6D state to a hexagram
export function getHexagram(index: number): number[] {
  return index.toString(2).padStart(6, '0').split('').map(Number);
}

// Map a 6D state (array of 6 numbers) to a hexagram (each value mod 2)
export function stateToHexagram(state: number[]): number[] {
  return state.slice(0, 6).map(v => v % 2);
}

// Map user/device input to a hexagram (e.g., x, y, t)
export function userInputToHexagram(x: number, y: number, t: number): number[] {
  // Use vortex math to generate 6 binary values
  const bits = [
    (x % 2), ((x + y) % 2), (y % 2),
    ((y + t) % 2), (t % 2), ((x + t) % 2)
  ];
  return bits;
}

// Get yin/yang lines for UI (1 = yang/solid, 0 = yin/broken)
export function hexagramToLines(hexagram: number[]): string[] {
  return hexagram.map(bit => bit ? 'yang' : 'yin');
}

// Interpret a hexagram (returns a book-aligned meaning placeholder)
export function interpretHexagram(hexagram: number[]): string {
  const index = parseInt(hexagram.join(''), 2);
  // Placeholder: In a full system, map to the actual I Ching text/meaning
  return `Hexagram ${index}: Book-aligned meaning for [${hexagram.join(', ')}]`;
}

// Export all hexagrams with their lines and placeholder meanings
export function getAllHexagramData() {
  return generateIChingHexagrams().map(hex => ({
    hexagram: hex,
    lines: hexagramToLines(hex),
    meaning: interpretHexagram(hex)
  }));
} 