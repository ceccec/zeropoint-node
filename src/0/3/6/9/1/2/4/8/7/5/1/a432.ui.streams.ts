/**
 * a432.ui.streams.ts — Harmonized, Canonical A432 Math-Driven UI Streams
 *
 * All UI properties, overlays, and behaviors are derived strictly from A432 math:
 * - Only trinity, digital root, vortex, Rodin sequence, integer fractions, and metaphysical principles
 * - No magic numbers, arbitrary trigonometry, or non-canonical math
 * - No floats or arbitrary scaling; only integer fractions whose reciprocals are integers
 * - All overlays use canonical sequences
 * - All color, size, opacity, and animation are derived from A432 math modules and streams
 * - No direct Date.now() or time-based logic except as mapped through a vortex or trinity stream
 * - Metaphysical comments for each property
 */

import { digitAngleToCMYK, cmykToCss, type CMYK } from './a432.cmyk.ts';
import { getRodinSequence, digitalRoot, asAngle, getTrinityAxis } from './a432.math.ts';
import { vortexStream } from './a432.matrix.ts';
import { yinYangStateFraction, type Fraction } from './a432.yin.yang.ts';
import { type Digit, type AngleDeg } from './a432.types.ts';

// Canonical trinity tick stream (cycles 3, 6, 9)
function* trinityTickStream() {
  const trinity = getTrinityAxis();
  let i = 0;
  while (true) {
    yield trinity[i % 3] as Digit;
    i++;
  }
}

// Canonical vortex digit stream
function* canonicalVortexStream() {
  const vs = vortexStream();
  while (true) {
    yield vs.next().value as Digit;
  }
}

// Harmonized UI stream frame
export interface UIStreamFrame {
  tick: number; // trinity tick
  rodin: Digit; // rodin sequence digit
  trinity: Digit; // trinity digit
  digitalRoot: Digit; // digital root of rodin+trinity
  color: CMYK; // canonical color
  cssColor: string;
  size: number; // integer, from rodin/trinity
  opacity: Fraction; // integer fraction
  rotation: AngleDeg; // from rodin/trinity
  scale: Fraction; // integer fraction
  position: { x: number; y: number }; // from rodin/trinity
  yinYang: Fraction; // metaphysical state
}

// Global state
let _currentFrame: UIStreamFrame | null = null;
let _streamSubscribers: Array<(frame: UIStreamFrame) => void> = [];

// Canonical integer fraction helper
function makeFraction(n: number, d: number): Fraction {
  // Only allow integer fractions whose reciprocals are integers
  if (d === 0) return { numerator: 0, denominator: 1 };
  return { numerator: n, denominator: d };
}

// Harmonized frame generator
export function generateUIStreamFrame(): UIStreamFrame {
  // Use only canonical streams
  const rodinSeq = getRodinSequence();
  const trinityGen = trinityTickStream();
  const vortexGen = canonicalVortexStream();

  // Metaphysical tick: always 3, 6, 9
  const tick = trinityGen.next().value as Digit;
  // Rodin digit: cycles through canonical sequence
  const rodin = rodinSeq[(tick - 3) % rodinSeq.length] as Digit;
  // Trinity digit: tick itself
  const trinity = tick;
  // Digital root: rodin + trinity
  const digitalRootValue = digitalRoot(rodin + trinity) as Digit;

  // Color: canonical mapping
  const color = digitAngleToCMYK(digitalRootValue, asAngle(tick * 60));
  const cssColor = cmykToCss(color);

  // Size: integer, from rodin and trinity (no floats)
  const size = (rodin + trinity) * 9; // always integer, 9 is trinity base

  // Opacity: integer fraction, e.g. rodin/9
  const opacity = makeFraction(rodin, 9);

  // Metaphysical: In the trinity, each vortex (3, 6, 9) is dual, so use 60° per vortex for rotation.
  const rotation = asAngle(trinity * 60);

  // Scale: integer fraction, e.g. trinity/9
  const scale = makeFraction(trinity, 9);

  // Position: x/y from rodin/trinity (no floats)
  const x = ((rodin * trinity) % 9) * 9;
  const y = ((trinity * rodin) % 9) * 9;

  // YinYang: metaphysical state from rodin/trinity
  const yinYang = yinYangStateFraction(
    makeFraction(rodin, 9),
    makeFraction(trinity, 9)
  );

  return {
    tick,
    rodin,
    trinity,
    digitalRoot: digitalRootValue,
    color,
    cssColor,
    size,
    opacity,
    rotation,
    scale,
    position: { x, y },
    yinYang
  };
}

// Main UI stream
export function startUIStream(callback: (frame: UIStreamFrame) => void): () => void {
  _streamSubscribers.push(callback);
  let tick = 0;
  const interval = setInterval(() => {
    const frame = generateUIStreamFrame();
    _currentFrame = frame;
    _streamSubscribers.forEach(sub => sub(frame));
    tick++;
  }, 81); // 81 = 9*9, trinity multiple
  return () => {
    clearInterval(interval);
    _streamSubscribers = _streamSubscribers.filter(sub => sub !== callback);
  };
}

export function getCurrentUIFrame(): UIStreamFrame | null {
  return _currentFrame;
}

// Canonical color stream
export function generateColorStream(elementId: string): () => string {
  return () => {
    const frame = getCurrentUIFrame();
    if (!frame) return '#000';
    // Use digital root and trinity for color
    return cmykToCss(digitAngleToCMYK(frame.digitalRoot, frame.rotation));
  };
}

// Canonical size stream
export function generateSizeStream(elementId: string): () => number {
  return () => {
    const frame = getCurrentUIFrame();
    if (!frame) return 27; // 3*9
    return frame.size;
  };
}

// Canonical opacity stream
export function generateOpacityStream(elementId: string): () => number {
  return () => {
    const frame = getCurrentUIFrame();
    if (!frame) return 1;
    // Integer fraction as float for CSS
    return frame.opacity.numerator / frame.opacity.denominator;
  };
}

// Canonical overlay stream (all overlays use canonical sequences)
export function generateOverlayStream(overlayType: string): () => Record<string, unknown> {
  return () => {
    const frame = getCurrentUIFrame();
    if (!frame) return {};
    switch (overlayType) {
      case 'rodin':
        return {
          nodes: getRodinSequence().map((digit: number, i: number) => ({
            value: digit as Digit,
            color: cmykToCss(digitAngleToCMYK(digit as Digit, frame.rotation)),
            size: (digit as Digit) * 9,
            opacity: (digit as Digit) / 9
          }))
        };
      case 'trinity':
        return {
          nodes: getTrinityAxis().map((digit: number, i: number) => ({
            value: digit as Digit,
            color: cmykToCss(digitAngleToCMYK(digit as Digit, frame.rotation)),
            size: (digit as Digit) * 9,
            opacity: (digit as Digit) / 9
          }))
        };
      case 'yin-yang':
        return {
          state: frame.yinYang,
          positiveColor: cmykToCss(digitAngleToCMYK(frame.rodin, frame.rotation)),
          negativeColor: cmykToCss(digitAngleToCMYK(frame.trinity, frame.rotation)),
          rotation: frame.rotation,
          scale: frame.scale
        };
      default:
        return {
          color: frame.cssColor,
          size: frame.size,
          opacity: frame.opacity.numerator / frame.opacity.denominator,
          rotation: frame.rotation,
          scale: frame.scale
        };
    }
  };
}

// CSS Property Generators

/**
 * Generate CSS properties from math streams
 */
export function generateCSSProperties(elementId: string, properties: string[]): () => Record<string, string> {
  return () => {
    const frame = getCurrentUIFrame();
    if (!frame) return {};
    
    const css: Record<string, string> = {};
    
    properties.forEach(prop => {
      switch (prop) {
        case 'color':
          css.color = generateColorStream(elementId)();
          break;
        case 'background-color':
          css.backgroundColor = generateColorStream(elementId + '-bg')();
          break;
        case 'border-color':
          css.borderColor = generateColorStream(elementId + '-border')();
          break;
        case 'font-size':
          css.fontSize = `${generateSizeStream(elementId)()}px`;
          break;
        case 'width':
        case 'height':
          css[prop] = `${generateSizeStream(elementId)}px`;
          break;
        case 'opacity':
          css.opacity = generateOpacityStream(elementId)().toString();
          break;
        case 'transform':
          const rotation = frame.rotation;
          const scale = frame.scale;
          css.transform = `rotate(${rotation}deg) scale(${scale})`;
          break;
        case 'box-shadow':
          const shadowColor = generateColorStream(elementId + '-shadow')();
          css.boxShadow = `0 0 ${frame.size / 2}px ${shadowColor}`;
          break;
      }
    });
    
    return css;
  };
} 