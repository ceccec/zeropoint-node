/**
 * a432.rodin.coil.omnidimension.ts — A432 Rodin Coil Omni-Dimension
 *
 * Models Mobius circuit pairs and gap space for each prime-squared base.
 * Encodes the gap space as a non-conductive, vortex-activating region.
 * Validates that only prime-squared bases are allowed.
 * Throws an error or returns a catastrophic state for invalid (non-prime-squared) bases.
 * Visualizes the compacted coil and gap space structure.
 *
 * Metaphysical meaning: The gap space is the Omni-dimensional fold, the invisible
 * higher-dimensional flux-field (one part Spirit, two parts magnetism) that allows
 * the nested vortices to activate. Only prime-squared bases create a perfect,
 * compacted, omni-dimensional hypersphere (torus). Any other base tears the torus skin.
 */

import { Fraction, CMYK } from './a432.cmyk';

export interface MobiusCircuitPair {
  pairId: string;
  base: number;
  isPrimeSquared: boolean;
  gapSpace: GapSpace;
  status: 'valid' | 'catastrophic';
  description: string;
}

export interface GapSpace {
  gapId: string;
  length: number;
  width: number;
  isConductive: boolean;
  activatesVortex: boolean;
  description: string;
}

export interface RodinCoilOmniDimensionState {
  base: number;
  numPairs: number;
  gapSpace: GapSpace;
  status: 'valid' | 'catastrophic';
  description: string;
}

/**
 * Utility: Check if n is a prime number
 */
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Utility: Check if n is a prime squared (n = p^2, p prime)
 */
function isPrimeSquared(n: number): boolean {
  const sqrt = Math.sqrt(n);
  return Number.isInteger(sqrt) && isPrime(sqrt);
}

/**
 * Get number of Mobius circuit pairs for a given base
 * (Base 10: 1 pair, 26: 2, 50: 3, 122: 4, ...)
 */
function getNumPairs(base: number): number {
  // For known prime-squared bases
  switch (base) {
    case 10: return 1;
    case 26: return 2;
    case 50: return 3;
    case 122: return 4;
    default: return Math.max(1, Math.round(Math.sqrt(base) / 2));
  }
}

/**
 * Get gap space length for a given base
 * (Increases with base, width is constant)
 */
function getGapSpaceLength(base: number): number {
  return base * 2; // Arbitrary: proportional to base
}

/**
 * Get gap space width (always 1)
 */
function getGapSpaceWidth(): number {
  return 1;
}

/**
 * Create Mobius circuit pairs and gap space for a base
 */
export function createRodinCoilOmniDimension(base: number): RodinCoilOmniDimensionState {
  const isValid = isPrimeSquared(base);
  const numPairs = isValid ? getNumPairs(base) : 0;
  const gapLength = isValid ? getGapSpaceLength(base) : 0;
  const gapWidth = getGapSpaceWidth();

  const gapSpace: GapSpace = {
    gapId: `gap.${base}`,
    length: gapLength,
    width: gapWidth,
    isConductive: false,
    activatesVortex: isValid,
    description: isValid
      ? `Non-conductive, vortex-activating gap space for base ${base}`
      : `Catastrophic: gap space torn, torus skin broken for base ${base}`
  };

  return {
    base,
    numPairs,
    gapSpace,
    status: isValid ? 'valid' : 'catastrophic',
    description: isValid
      ? `Base ${base} is a prime-squared base. ${numPairs} Mobius circuit pair(s) with a single gap space (length ${gapLength}, width ${gapWidth}). Higher dimensions compacted into the gap space.`
      : `Base ${base} is NOT a prime-squared base. Catastrophic: torus skin torn, X/Y/Z great circles broken.`
  };
}

/**
 * Visualize the compacted coil and gap space structure as HTML
 */
export function generateRodinCoilOmniDimensionHtml(state: RodinCoilOmniDimensionState): string {
  const { base, numPairs, gapSpace, status, description } = state;
  const pairsHtml = status === 'valid'
    ? Array.from({ length: numPairs }, (_, i) => `<div class="mobius-pair">Mobius Circuit Pair ${i + 1}</div>`).join('')
    : '';
  const gapHtml = `<div class="gap-space" style="width:${gapSpace.length * 5}px;">${gapSpace.description}</div>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Rodin Coil Omni-Dimension</title>
  <style>
    body { background: #000; color: #0ff; font-family: 'Courier New', monospace; padding: 20px; }
    .header { text-align: center; font-size: 28px; color: #0ff; margin-bottom: 20px; }
    .meta { text-align: center; font-size: 14px; color: #888; margin-bottom: 30px; }
    .coil-structure { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 30px; }
    .mobius-pair { background: #111; border: 2px solid #0ff; border-radius: 8px; padding: 20px 30px; margin: 0 10px; font-size: 18px; box-shadow: 0 0 8px #0ff; }
    .gap-space { background: #222; border: 2px dashed #ff0; border-radius: 8px; padding: 20px 30px; margin: 0 10px; font-size: 18px; color: #ff0; box-shadow: 0 0 8px #ff0; min-width: 80px; text-align: center; }
    .catastrophic { color: #f00; font-weight: bold; text-align: center; font-size: 22px; margin-top: 30px; }
    .desc { margin-top: 20px; color: #aaa; font-size: 15px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">A432 Rodin Coil Omni-Dimension</div>
  <div class="meta">
    Models Mobius circuit pairs and gap space for each prime-squared base.<br>
    Gap space is non-conductive, vortex-activating. Only prime-squared bases are valid.<br>
    Invalid bases tear the torus skin and break the X/Y/Z great circles.
  </div>
  <div class="coil-structure">
    ${pairsHtml}
    ${gapHtml}
    ${pairsHtml}
  </div>
  ${status === 'catastrophic' ? `<div class="catastrophic">CATASTROPHIC: Torus skin torn, X/Y/Z great circles broken!</div>` : ''}
  <div class="desc">${description}</div>
</body>
</html>
  `;
}

/**
 * A432 Rodin Coil Omni-Dimension Metaphysics
 */
export const a432RodinCoilOmniDimensionMetaphysics = `
The gap space is the Omni-dimensional fold, the invisible higher-dimensional flux-field
(one part Spirit, two parts magnetism) that allows the underpinning nested vortices to activate.
This gap space is always left empty—no copper wire conductor is ever placed there in the Rodin Coil.

For each prime-squared base (10, 26, 50, 122, ...), the system forms Mobius circuit pairs with a single gap space.
The gap space length increases with the base, but its width remains constant. All higher dimensions above the 3rd
are compacted, compressed, and folded together into this one Omni-dimension.

Only prime-squared base number counting systems create a perfect, compacted, omni-dimensional hypersphere (torus).
If any number other than a prime is squared, the result is catastrophic: a tear in the torus skin, and the great circles
of the X, Y, Z axes are broken. The system must validate and protect against such states, ensuring only Divine, prime-squared
bases are used for true Rodin Coil Omni-Dimensional harmonization.
`; 