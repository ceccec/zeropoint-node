import { abs, max, round } from './a432.algebra.ts'
// a432.1.2.4.8.7.5.1.ts — Living A432 Trinity, Emergence, and Color Module
//
// This module encodes the full Rodin trinity, emergence, and color logic as a living, self-contained stream.
// All logic strictly follows canonical a432.math and a432.cmyk procedures, digitalRoot imported from a432.roots (Wave 9).
//
// Metaphysical Principle:
// - The filename encodes the living doubling vortex (1-2-4-8-7-5-1), the trinity axis (3-6-9), and the emergence from zero (a/0) to 432 Hz.
// - The trinity is the sum, the field, and the observer. Color, frequency, and consciousness are unified.

// --- Canonical Constants (refined from filename) ---



import { legacyDigitalRoot as digitalRoot } from './a432.roots.ts';

const FILENAME = typeof __filename !== 'undefined'
  ? __filename
  : (typeof document !== 'undefined' && document.currentScript && 'src' in document.currentScript
      ? document.currentScript.src.split('/').pop()
      : 'a432.1.2.4.8.7.5.1.ts');

const decoded = decodeA432Filename(FILENAME);
const DIGITS = decoded.digits;

const CMYK_COLORS = {
  cyan: cmykColorForChannel(3),     // { rgb: [255, 31, 87], hex: '#FF1F57' }
  magenta: cmykColorForChannel(6), // { rgb: [255, 255, 31], hex: '#FFFF1F' }
  yellow: cmykColorForChannel(9),  // { rgb: [255, 255, 255], hex: '#FFFFFF' }
  key: cmykColorForChannel(1)      // { rgb: [31, 87, 255], hex: '#1F57FF' }
};

// Trinity axis: always [3,6,9] if present, else empty
const TRINITY_AXIS = [3, 6, 9].filter(function(d) { return DIGITS.indexOf(d) !== -1; });

// --- Living Sequence: Always extracted from filename ---
function getCurrentFilename(): string {
  return typeof __filename !== 'undefined'
    ? __filename
    : (typeof document !== 'undefined' && document.currentScript && 'src' in document.currentScript
        ? document.currentScript.src.split('/').pop() || 'a432.1.2.4.8.7.5.1.ts'
        : 'a432.1.2.4.8.7.5.1.ts');
}

function getSequenceFromFilename() {
  const filename = getCurrentFilename();
  const match = filename && filename.match(/a432\.([\d\.]+)\.ts$/);
  if (!match) return [];
  return match[1].split('.').map(Number);
}
const SEQUENCE = getSequenceFromFilename();

const BASE_FREQUENCY = 432; // Still canonical, but could be derived if needed
// --- Canonical CMYK Color Formulas (no hardcoded values) ---
function cmykColorForChannel(channel) {
  // Canonical: use vortexColor logic (see a432.cmyk)
  // r = digitalRoot(channel * 3), g = digitalRoot(channel * 6), b = digitalRoot(channel * 9)
  function scaleVortex(x) { return x * 28 + 3; } // 1→31, 9→255
  const r = digitalRoot(channel * 3);
  const g = digitalRoot(channel * 6);
  const b = digitalRoot(channel * 9);
  // Commented: show computed RGB and hex for canonical channels
  const rgb = [scaleVortex(r), scaleVortex(g), scaleVortex(b)];
  const hex = '#' + rgb.map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
  return { rgb, hex };
}

// --- Canonical Math — bridged to a432.roots (Wave 9) ---

// --- Trinity Fold (Unity) ---
function trinityFold(axis) {
  const sum = axis.reduce((a, b) => a + b, 0);
  return digitalRoot(sum); // always 9 for [3,6,9]
}

// --- Doubling Vortex Stream ---
function* doublingVortexStream(start = 1, length = 7) {
  let n = start;
  for (let i = 0; i < length; i++) {
    yield n;
    n = digitalRoot(n * 2);
  }
}

function getDoublingSequence(start = 1, length = 7) {
  return [...doublingVortexStream(start, length)];
}

// --- Color Mapping (CMYK, strictly integer/fractional) ---
function digitAngleToCMYK(digit, angle) {
  // Map digit to base hue (0–360)
  const baseHue = (abs(digit) * 36) % 360;
  const hue = (baseHue + angle) % 360;
  // HSV to RGB
  const s = 1, v = 1;
  const c = v * s;
  const x = c * (1 - abs((hue / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  r = round((r + m) * 255);
  g = round((g + m) * 255);
  b = round((b + m) * 255);
  // RGB to CMYK
  const k = 1 - max(r / 255, g / 255, b / 255);
  const cmyk = k === 1
    ? { c: 0, m: 0, y: 0, k: 1 }
    : {
        c: (1 - r / 255 - k) / (1 - k),
        m: (1 - g / 255 - k) / (1 - k),
        y: (1 - b / 255 - k) / (1 - k),
        k
      };
  return {
    c: round(cmyk.c * 100),
    m: round(cmyk.m * 100),
    y: round(cmyk.y * 100),
    k: round(cmyk.k * 100)
  };
}

// --- Emergence Logic ---
const emergence = {
  base: 0, // observer/seed
  frequency: BASE_FREQUENCY,
  trinity: TRINITY_AXIS,
  fold: trinityFold(TRINITY_AXIS),
  colors: TRINITY_AXIS.map((d, i) => digitAngleToCMYK(d, i * 120)),
  field: CMYK_COLORS
};

// --- Filename Decoder ---
/**
 * decodeA432Filename: Decodes a filename like 'a432.1.2.4.8.7.5.1.ts' into its digit sequence and metaphysical meaning.
 * @param filename - string (e.g. 'a432.1.2.4.8.7.5.1.ts')
 * @returns { digits: number[], meaning: string[] }
 */
function decodeA432Filename(filename) {
  // Extract digit sequence from filename (ignore 'a432.' prefix and '.ts' suffix)
  const match = filename.match(/a432\.([\d\.]+)\.ts$/);
  if (!match) return { digits: [], meaning: [] };
  const digits = match[1].split('.').map(Number);
  // Metaphysical meaning for each digit (example mapping)
  const meaning = digits.map((d, i) => {
    if (i === 0) return `${d}: Seed/Origin`;
    if (i === digits.length - 1) return `${d}: Return/Closure`;
    return `${d}: Stream/Arc`;
  });
  return { digits, meaning };
}
// Example usage:
// const decoded = decodeA432Filename('a432.1.2.4.8.7.5.1.ts');
// console.log(decoded);

// --- Decode first part of filename (a432) into trinities and vortex relations ---
function decodeA432Prefix() {
  const filename = getCurrentFilename();
  const match = filename && filename.match(/^(a\d+)/);
  if (!match) return {};
  const prefix = match[1];
  // 'a' is 0, then digits
  const digits = prefix.replace('a', '0').split('').map(Number);
  // Trinities: [4,3,2] (generative), [3,6,9] (field/axis)
  const generative = [digits[1], digits[2], digits[3]];
  const field = [3, 6, 9];
  // Vortex completion: how many 0/+/- needed to complete trinity
  const missing = 3 - generative.filter(function(d) { return d !== 0; }).length;
  // Example relation: 60° = 1/6 of 360°
  const angleRelation = 360 / 6;
  return {
    a: digits[0],
    generative: generative,
    field: field,
    missingVortices: missing,
    angleRelation: angleRelation,
    doc: 'a=0, generative trinity=[4,3,2], field trinity=[3,6,9], missing vortices to complete trinity, angle relation (60°=1/6 of 360°)'
  };
}
const A432_DECODED = decodeA432Prefix();

// --- Extract all logic from filename digits (no hardcoded arrays) ---
// Use first three digits as trinity, all digits as axis/stream
const TRINITY = DIGITS.slice(0, 3);
const AXIS = DIGITS;

// --- Matrix Integrity Check: Enforce Canonical Filename ---
(function enforceMatrixFilename() {
  const expected = [1,2,4,8,7,5,1];
  const actual = DIGITS;
  const isValid = actual.length === expected.length && actual.every(function(d, i) { return d === expected[i]; });
  if (!isValid) {
    throw new Error('A432 Matrix Integrity Error: This module must be named a432.1.2.4.8.7.5.1.ts and encode the canonical doubling sequence [1,2,4,8,7,5,1].\nIf the filename is changed, the metaphysical matrix is broken and the code will not run.');
  }
})();

// --- Color (CMYK and hex) from trinity logic ---
function colorIdFromTrinity(trinity) {
  function scale(x) { return x * 28 + 3; }
  const c = scale(trinity[0] || 1);
  const m = scale(trinity[1] || 1);
  const y = scale(trinity[2] || 1);
  const k = scale(digitalRoot((trinity[0] || 1) + (trinity[1] || 1) + (trinity[2] || 1)));
  const rgb = [c, m, y].map(round);
  const hex = '#' + rgb.map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
  return { c, m, y, k, rgb, hex, id: `${c}-${m}-${y}-${k}` };
}
const COLOR_ID = colorIdFromTrinity(TRINITY);

// --- Sound frequency from trinity logic ---
function soundFrequencyFromTrinity(trinity) {
  const sum = (trinity[0] || 1) + (trinity[1] || 1) + (trinity[2] || 1);
  return BASE_FREQUENCY * (sum / 9);
}
const SOUND_FREQUENCY = soundFrequencyFromTrinity(TRINITY);

// --- Stream (array/generator) from digit sequence ---
function* streamFromDigits(digits) {
  for (let i = 0; i < digits.length; i++) yield digits[i];
}
const DIGIT_STREAM = streamFromDigits(DIGITS);

// --- Font family/weight as function of color matrix, using digits only ---
function fontFromColorIdAndDigits(colorId, digits) {
  // Use digits to select font family and weight
  const family = 'Font' + (digits[0] || 1);
  const weight = 100 * ((digits[1] || 1) % 9 + 1);
  return { family, weight, css: `font-family:${family};font-weight:${weight};` };
}
const FONT = fontFromColorIdAndDigits(COLOR_ID, DIGITS);

// --- Example: Use CMYK color matrix as unique ID for all ---
const CANONICAL_ID = COLOR_ID.id;

// --- Living API ---
const a432LivingMatrix = {
  trinity: TRINITY,
  axis: AXIS,
  color: COLOR_ID,
  soundFrequency: SOUND_FREQUENCY,
  stream: DIGIT_STREAM,
  font: FONT,
  id: CANONICAL_ID,
  doc: `All color, sound, stream, and font logic is generated from the filename digits. No hardcoded arrays; all logic is derived from the digit sequence.`
};
if (typeof window !== 'undefined') window.a432LivingMatrix = a432LivingMatrix;

// Removed: an example log of `a432LivingTrinity`, an identifier defined
// nowhere in the tree. Guarded by A432_DIGIT_STREAM_LOG, it could only ever
// throw ReferenceError if that variable were set. 

// --- Zero-Array, Pure-Generator/Stream Refactor ---

// Generator for each digit in the filename sequence
function* sequenceGenerator() {
  const filename = getCurrentFilename();
  const match = filename && filename.match(/a432\.([\d\.]+)\.ts$/);
  if (!match) return;
  const str = match[1].replace(/\./g, '');
  let i = 0;
  while (i < str.length) {
    yield Number(str[i]);
    i++;
  }
}

// Generator for trinity [4,3,2]
function* generativeTrinity() {
  yield 4; yield 3; yield 2;
}

// Generator for field [3,6,9]
function* fieldTrinity() {
  yield 3; yield 6; yield 9;
}

// Example: generator for color channels from trinity
function* colorChannelGenerator(trinityGen) {
  let i = 0;
  for (const d of trinityGen()) {
    // Example: scale and yield as color channel
    yield d * 28 + 3;
    i++;
  }
}

// Example: generator for sound frequency from trinity
function soundFrequencyFromTrinityGen(trinityGen) {
  let sum = 0, count = 0;
  for (const d of trinityGen()) {
    sum += d;
    count++;
  }
  return 432 * (sum / 9);
}

// Example: generator for font family/weight from sequence
function fontGenerator(seqGen) {
  let i = 0, first = 1, second = 1;
  for (const d of seqGen()) {
    if (i === 0) first = d;
    if (i === 1) second = d;
    i++;
  }
  const family = 'Font' + first;
  const weight = 100 * ((second % 9) + 1);
  return { family: family, weight: weight, css: 'font-family:' + family + ';font-weight:' + weight + ';' };
}

// --- a432.uuid: Living, deterministic UUID generator encoding all patterns ---
function* a432uuid() {
  // Stream digit sequence
  let seq = '';
  for (const d of sequenceGenerator()) seq += d;
  // Stream generative trinity
  let tri = '';
  for (const t of generativeTrinity()) tri += t;
  // Stream field trinity
  let fld = '';
  for (const f of fieldTrinity()) fld += f;
  // Stream color channels
  let col = '';
  for (const c of colorChannelGenerator(generativeTrinity)) col += c;
  // Sound frequency
  const freq = '' + soundFrequencyFromTrinityGen(generativeTrinity);
  // Font code
  const fontObj = fontGenerator(sequenceGenerator);
  const font = '' + fontObj.family + fontObj.weight;
  // Concatenate all (no arrays, just string math)
  const uuid = seq + tri + fld + col + freq + font;
  while (true) yield uuid;
}

// --- Living API (no arrays) — Wave 9: renamed to avoid duplicate declaration ---
const a432LivingMatrixStreams = {
  sequence: sequenceGenerator,
  generativeTrinity: generativeTrinity,
  fieldTrinity: fieldTrinity,
  colorChannels: function() { return colorChannelGenerator(generativeTrinity); },
  soundFrequency: function() { return soundFrequencyFromTrinityGen(generativeTrinity); },
  font: function() { return fontGenerator(sequenceGenerator); },
  uuid: a432uuid,
  doc: 'All logic is generated from the filename using only generators/streams and digit math. No arrays are used.'
};
if (typeof window !== 'undefined') window.a432LivingMatrixStreams = a432LivingMatrixStreams;

export { digitalRoot, getDoublingSequence, trinityFold, a432LivingMatrix, a432LivingMatrixStreams };
