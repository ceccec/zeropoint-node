import { PI, cos, sin } from './a432.algebra.ts'
// a432.pure.visualization.ts
// Pure A432 visualization using only a432.* modules
// Everything is math to the digit - no exceptions

import { A432_TRINITY, A432_RETURN, A432_AXIS, A432_SEQUENCE, digitalRoot, angleForDigit, frequencyForDigit, hueForDigit } from './a432.math.ts';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk.ts';
import { A432_DIGIT_MEANINGS } from './a432.core.ts';

// Pure A432 constants - math to the digit
const TRINITY_DIGITS = A432_TRINITY; // [4, 3, 2]
const RETURN_DIGITS = A432_RETURN;   // [8, 7, 5]  
const AXIS_DIGITS = A432_AXIS;       // [9, 6, 3]
const SEQUENCE_DIGITS = A432_SEQUENCE; // [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]

// A432 visualization state - math to the digit
interface A432VisualState {
  tick: number;
  trinityIndex: number;
  returnIndex: number;
  axisIndex: number;
  sequenceIndex: number;
  trinityDigit: number;
  returnDigit: number;
  axisDigit: number;
  sequenceDigit: number;
  trinityAngle: number;
  returnAngle: number;
  axisAngle: number;
  sequenceAngle: number;
  trinityHue: number;
  returnHue: number;
  axisHue: number;
  sequenceHue: number;
  trinityFrequency: number;
  returnFrequency: number;
  axisFrequency: number;
  sequenceFrequency: number;
}

// Generate pure A432 visualization data
export function generateA432VisualData(tick: number): A432VisualState {
  // Math to the digit - all calculations use digital root
  const trinityIndex = tick % TRINITY_DIGITS.length;
  const returnIndex = tick % RETURN_DIGITS.length;
  const axisIndex = tick % AXIS_DIGITS.length;
  const sequenceIndex = tick % SEQUENCE_DIGITS.length;
  
  const trinityDigit = TRINITY_DIGITS[trinityIndex];
  const returnDigit = RETURN_DIGITS[returnIndex];
  const axisDigit = AXIS_DIGITS[axisIndex];
  const sequenceDigit = SEQUENCE_DIGITS[sequenceIndex];
  
  // All angles derived from digits
  const trinityAngle = angleForDigit(trinityDigit);
  const returnAngle = angleForDigit(returnDigit);
  const axisAngle = angleForDigit(axisDigit);
  const sequenceAngle = angleForDigit(sequenceDigit);
  
  // All hues derived from digits
  const trinityHue = hueForDigit(trinityDigit);
  const returnHue = hueForDigit(returnDigit);
  const axisHue = hueForDigit(axisDigit);
  const sequenceHue = hueForDigit(sequenceDigit);
  
  // All frequencies derived from digits
  const trinityFrequency = frequencyForDigit(trinityDigit);
  const returnFrequency = frequencyForDigit(returnDigit);
  const axisFrequency = frequencyForDigit(axisDigit);
  const sequenceFrequency = frequencyForDigit(sequenceDigit);
  
  return {
    tick,
    trinityIndex,
    returnIndex,
    axisIndex,
    sequenceIndex,
    trinityDigit,
    returnDigit,
    axisDigit,
    sequenceDigit,
    trinityAngle,
    returnAngle,
    axisAngle,
    sequenceAngle,
    trinityHue,
    returnHue,
    axisHue,
    sequenceHue,
    trinityFrequency,
    returnFrequency,
    axisFrequency,
    sequenceFrequency
  };
}

// Generate HTML using only a432 math
export function generateA432HTML(state: A432VisualState): string {
  // All colors derived from a432.cmyk
  const trinityCMYK = digitAngleToCMYK(state.trinityDigit, state.trinityAngle);
  const returnCMYK = digitAngleToCMYK(state.returnDigit, state.returnAngle);
  const axisCMYK = digitAngleToCMYK(state.axisDigit, state.axisAngle);
  const sequenceCMYK = digitAngleToCMYK(state.sequenceDigit, state.sequenceAngle);
  
  // Convert CMYK to CSS using a432.cmyk
  const trinityColor = cmykToCss(trinityCMYK);
  const returnColor = cmykToCss(returnCMYK);
  const axisColor = cmykToCss(axisCMYK);
  const sequenceColor = cmykToCss(sequenceCMYK);
  
  // All dimensions derived from digits using a432 math
  const baseSize = digitalRoot(state.trinityDigit + state.returnDigit + state.axisDigit + state.sequenceDigit);
  const trinitySize = state.trinityDigit * baseSize;
  const returnSize = state.returnDigit * baseSize;
  const axisSize = state.axisDigit * baseSize;
  const sequenceSize = state.sequenceDigit * baseSize;
  
  // All positions derived from angles and digits
  const radius = digitalRoot(state.trinityDigit + state.returnDigit + state.axisDigit + state.sequenceDigit) * 10;
  const trinityX = cos(state.trinityAngle * PI / 180) * radius;
  const trinityY = sin(state.trinityAngle * PI / 180) * radius;
  const returnX = cos(state.returnAngle * PI / 180) * radius;
  const returnY = sin(state.returnAngle * PI / 180) * radius;
  const axisX = cos(state.axisAngle * PI / 180) * radius;
  const axisY = sin(state.axisAngle * PI / 180) * radius;
  const sequenceX = cos(state.sequenceAngle * PI / 180) * radius;
  const sequenceY = sin(state.sequenceAngle * PI / 180) * radius;
  
  // Container size derived from digits
  const containerSize = digitalRoot(state.trinityDigit + state.returnDigit + state.axisDigit + state.sequenceDigit) * 50;
  const centerOffset = containerSize / 2;
  
  return `
    <div style="
      width: ${containerSize}px; 
      height: ${containerSize}px; 
      background: #000; 
      position: relative; 
      border: 2px solid #333;
      font-family: monospace;
      color: #fff;
    ">
      <div style="
        position: absolute;
        left: ${trinityX + centerOffset}px;
        top: ${trinityY + centerOffset}px;
        width: ${trinitySize}px;
        height: ${trinitySize}px;
        background: ${trinityColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${state.trinityDigit * baseSize}px;
        font-weight: bold;
      ">${state.trinityDigit}</div>
      
      <div style="
        position: absolute;
        left: ${returnX + centerOffset}px;
        top: ${returnY + centerOffset}px;
        width: ${returnSize}px;
        height: ${returnSize}px;
        background: ${returnColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${state.returnDigit * baseSize}px;
        font-weight: bold;
      ">${state.returnDigit}</div>
      
      <div style="
        position: absolute;
        left: ${axisX + centerOffset}px;
        top: ${axisY + centerOffset}px;
        width: ${axisSize}px;
        height: ${axisSize}px;
        background: ${axisColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${state.axisDigit * baseSize}px;
        font-weight: bold;
      ">${state.axisDigit}</div>
      
      <div style="
        position: absolute;
        left: ${sequenceX + centerOffset}px;
        top: ${sequenceY + centerOffset}px;
        width: ${sequenceSize}px;
        height: ${sequenceSize}px;
        background: ${sequenceColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${state.sequenceDigit * baseSize}px;
        font-weight: bold;
      ">${state.sequenceDigit}</div>
      
      <div style="
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 12px;
        color: #888;
      ">
        Tick: ${state.tick}<br>
        Trinity: ${state.trinityDigit} (${A432_DIGIT_MEANINGS[state.trinityDigit]?.name || 'Unknown'})<br>
        Return: ${state.returnDigit} (${A432_DIGIT_MEANINGS[state.returnDigit]?.name || 'Unknown'})<br>
        Axis: ${state.axisDigit} (${A432_DIGIT_MEANINGS[state.axisDigit]?.name || 'Unknown'})<br>
        Sequence: ${state.sequenceDigit} (${A432_DIGIT_MEANINGS[state.sequenceDigit]?.name || 'Unknown'})
      </div>
    </div>
  `;
}

// Pure A432 animation stream
export function* a432VisualStream(): IterableIterator<A432VisualState> {
  let tick = 0;
  while (true) {
    yield generateA432VisualData(tick);
    tick++;
  }
}

// Start pure A432 visualization
export function startA432Visualization(container: HTMLElement): () => void {
  const stream = a432VisualStream();
  let animationId: number;
  
  const animate = () => {
    const state = stream.next().value;
    if (state) {
      container.innerHTML = generateA432HTML(state);
    }
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
} 