import { decodePiDigits, piDigitStream, angleForDigit } from './a432.math';
import { digitAngleToCMYK, type CMYK } from './a432.cmyk';
import { Digit, AngleDeg, asAngle } from './a432.types';
import { TrinitySwitch, DOT_TRINITY_SWITCH } from './a432.math';

/** Snapshot of a single π digit mapped through metric → imperial → trinity → polarity. */
export interface PiSnapshot {
  index: number;            // position in π stream (0-based)
  metric: Digit;
  imperial: Digit;
  trinity: Digit;
  polarity: -1 | 0 | 1;
  angle: AngleDeg;
  cmyk: CMYK;
}

/** Iterator that yields harmonic snapshots for the first `limit` digits of π. */
export function* piHarmonicStream(limit: number): IterableIterator<PiSnapshot> {
  let idx = 0;
  for (const decoded of decodePiDigits(limit)) {
    const angle = asAngle(angleForDigit(decoded.trinity));
    const cmyk = digitAngleToCMYK(decoded.trinity, angle);
    yield {
      index: idx++,
      metric: decoded.metric,
      imperial: decoded.imperial,
      trinity: decoded.trinity,
      polarity: decoded.polarity,
      angle,
      cmyk,
    };
  }
}

/**
 * Collect π digits in 11-digit blocks (aligns with FULL_PATTERN).
 * Returns an array where each entry is the harmonic stream slice for that block.
 */
export function collectPiBlocks(limit: number): PiSnapshot[][] {
  const blocks: PiSnapshot[][] = [];
  let current: PiSnapshot[] = [];
  for (const snap of piHarmonicStream(limit)) {
    current.push(snap);
    if (current.length === 11) {
      blocks.push(current);
      current = [];
    }
  }
  if (current.length) blocks.push(current);
  return blocks;
}

/** Compute running ratio of trinity-hits (3,6,9) vs total scanned digits. */
export function trinityHitRatios(limit: number): Array<{ idx: number; ratio: number }> {
  let hits = 0;
  const out: Array<{ idx: number; ratio: number }> = [];
  let idx = 0;
  for (const snap of piHarmonicStream(limit)) {
    if (snap.trinity === 3 || snap.trinity === 6 || snap.trinity === 9) hits += 1;
    idx += 1;
    out.push({ idx, ratio: hits / idx });
  }
  return out;
}

/** Detect positions where nine-shock (digital-root of the last 9 digits) equals 9. */
export function nineShockPositions(limit: number): number[] {
  const window: Digit[] = [];
  const positions: number[] = [];
  let idx = 0;
  for (const snap of piHarmonicStream(limit)) {
    window.push(snap.metric);
    if (window.length > 9) window.shift();
    if (window.length === 9) {
      const sum = window.reduce<number>((s, d) => s + (d as number), 0);
      const dr = ((sum % 9) || 9);
      if (dr === 9) positions.push(idx);
    }
    idx += 1;
  }
  return positions;
}

/** Export helper that summarises multiple analyses at once. */
export function piHarmonicReport(limit: number = 1000) {
  return {
    blocks: collectPiBlocks(limit),
    trinityRatios: trinityHitRatios(limit),
    nineShockPositions: nineShockPositions(limit),
  };
}

// ——————————————————————————————————————————
// DOT AS TRINITY TOKEN MODEL
// ---------------------------------------------------------

/** Token emitted by `piTokenStream` representing either a digit snapshot or the decimal point (trinity pulse). */
export type PiToken =
  | { kind: 'digit'; snap: PiSnapshot }
  | TrinitySwitch;

/**
 * piTokenStream — yields the π stream with an explicit trinity-switch token (the decimal dot).
 * The sequence is: first digit (3) → trinity token (dot) → remaining `limit` digits.
 * Existing harmonic logic is untouched; consumers that ignore the 'trinity' kind behave as before.
 */
export function* piTokenStream(limit: number): IterableIterator<PiToken> {
  let first = true;
  for (const snap of piHarmonicStream(limit)) {
    yield { kind: 'digit', snap };
    if (first) {
      // Immediately after the integer part emit the trinity switch (dot)
      yield DOT_TRINITY_SWITCH;
      first = false;
    }
  }
}

// Helper: collect only the tokens (useful for UI timelines)
export function collectPiTokens(limit: number): PiToken[] {
  return Array.from(piTokenStream(limit));
} 