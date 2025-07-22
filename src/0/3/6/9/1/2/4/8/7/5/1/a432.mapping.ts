// a432.mapping.ts
// Canonical mapping module for a432: digits, words, colors, frequencies, archetypes, chakras, notes

import { A432Id } from './a432.design.cmyk';

export const digitWords = [
  'Void',      // 0
  'Seed',      // 1
  'Flow',      // 2
  'Trinity',   // 3
  'Harmony',   // 4
  'Bridge',    // 5
  'Return',    // 6
  'Spiral',    // 7
  'Infinity',  // 8
  'Completion' // 9
];

export function cmykIdToPhrase(id: A432Id): string {
  return id.map(d => digitWords[d % 10]).join('-');
}

export const wordToDigit: { [word: string]: number } = Object.fromEntries(
  digitWords.map((w, i) => [w.toLowerCase(), i])
);

export function phraseToCmykId(phrase: string): A432Id {
  return phrase.split('-').map(w => wordToDigit[w.toLowerCase()] ?? 0) as A432Id;
}

export const digitColors = [
  '#000000', // Void
  '#00ffff', // Seed
  '#ffff00', // Flow
  '#ff00ff', // Trinity
  '#00ff00', // Harmony
  '#ff9900', // Bridge
  '#0099ff', // Return
  '#ff3366', // Spiral
  '#88ffff', // Infinity
  '#ffffff'  // Completion
];

export const digitFrequencies = [
  0, 432, 864, 1296, 1728, 2160, 2592, 3024, 3456, 3888
];

export const digitArchetypes = [
  'Source',      // 0
  'Initiator',   // 1
  'Connector',   // 2
  'Creator',     // 3
  'Stabilizer',  // 4
  'Transformer', // 5
  'Reflector',   // 6
  'Spiral',      // 7
  'Expander',    // 8
  'Completer'    // 9
];

export const digitChakras = [
  'Root',      // 0
  'Sacral',    // 1
  'Solar',     // 2
  'Heart',     // 3
  'Throat',    // 4
  'ThirdEye',  // 5
  'Crown',     // 6
  'AltaMajor', // 7
  'SoulStar',  // 8
  'EarthStar'  // 9
];

export const digitNotes = [
  'C',  // 0
  'D',  // 1
  'E',  // 2
  'F',  // 3
  'G',  // 4
  'A',  // 5
  'B',  // 6
  'C#', // 7
  'D#', // 8
  'F#'  // 9
];

export interface A432MatrixEntry {
  id: A432Id;
  phrase: string;
  color: string;
  archetype: string;
  chakra: string;
  note: string;
}

export function generateA432Matrix(): A432MatrixEntry[] {
  const matrix: A432MatrixEntry[] = [];
  for (let c = 0; c < 10; c++)
    for (let m = 0; m < 10; m++)
      for (let y = 0; y < 10; y++)
        for (let k = 0; k < 10; k++) {
          const id: A432Id = [c, m, y, k];
          matrix.push({
            id,
            phrase: cmykIdToPhrase(id),
            color: digitColors[c],
            archetype: digitArchetypes[m],
            chakra: digitChakras[y],
            note: digitNotes[k]
          });
        }
  return matrix;
}

export function lookupA432MatrixByProperty(
  prop: keyof A432MatrixEntry,
  value: string
): A432MatrixEntry[] {
  const matrix = generateA432Matrix();
  return matrix.filter(entry => String(entry[prop]).toLowerCase() === value.toLowerCase());
}

export default {
  digitWords,
  cmykIdToPhrase,
  wordToDigit,
  phraseToCmykId,
  digitColors,
  digitFrequencies,
  digitArchetypes,
  digitChakras,
  digitNotes,
  generateA432Matrix,
  lookupA432MatrixByProperty
}; 