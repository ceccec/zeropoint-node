// a432.text.ts — Living Text/Meaning Stream for the A432 Matrix
// -------------------------------------------------------------
// Streams context-aware, harmonized meanings for digits, patterns, and states.
// No hardcoded text—only living, dynamic, sequence-aware meaning.

import { getDigitMeaning, getRodinSequence, getTrinityAxis, A432_SEQUENCE } from './a432.math';

export type SequenceContext = 'rodin' | 'trinity' | 'full' | 'custom';

/**
 * textMeaningStream: Yields context-aware meanings for a digit and sequence context.
 * - Streams general, sequence-specific, and poetic/metaphysical meanings.
 */
export function* textMeaningStream(digit: number, context: SequenceContext = 'full'): Generator<string> {
  let sequence: number[];
  if (context === 'rodin') sequence = [...getRodinSequence()];
  else if (context === 'trinity') sequence = [...getTrinityAxis()];
  else if (context === 'full') sequence = [...A432_SEQUENCE];
  else sequence = [];

  // General/archetype meaning
  const general = getDigitMeaning(digit);
  yield `Archetype: ${general.archetype} — ${general.description}`;

  // Sequence-specific meaning
  if (sequence.length && sequence.includes(digit)) {
    const seqMeaning = getDigitMeaning(digit, sequence);
    if (seqMeaning.context) {
      yield `In ${context} sequence: ${seqMeaning.context} — ${seqMeaning.description}`;
    }
  }

  // Poetic/metaphysical stream (example)
  if (context === 'trinity') {
    yield `The trinity breathes: ${digit} is a pulse in the cycle of creation.`;
  } else if (context === 'rodin') {
    yield `The vortex turns: ${digit} is a step in the infinite spiral.`;
  } else {
    yield `Digit ${digit} is a living state in the A432 matrix.`;
  }
}

/**
 * getCurrentMeaning: Returns the first (most relevant) meaning for a digit and context as a string.
 */
export function getCurrentMeaning(digit: number, context: SequenceContext = 'full'): string {
  const stream = textMeaningStream(digit, context);
  const result = stream.next().value;
  return typeof result === 'string' ? result : '';
} 