// a432.1.2.4.8.ts — Open Vortex/Doubling Stream Module (Shorter Arc)
//
// This module encodes the open doubling sequence (1-2-4-8) as a living, recursive stream.
// It is the generative arc of the vortex, not yet returned to origin. All logic is self-contained.

/**
 * Metaphysical Principle:
 * - The sequence 1→2→4→8 is the open right-hand vortex in vortex math, truncated before further progression.
 * - It is the journey, the generative flow, the living stream before closure or return.
 * - This module is a seed/arc in the living A432 matrix.
 */

// --- Math: Digital Root ---
function digitalRoot(n) {
  let x = Math.abs(n);
  while (x >= 10) x = String(x).split('').reduce((a, c) => a + Number(c), 0);
  return x;
}

// --- Generator: Open Doubling Vortex Stream ---
function* openDoublingVortexStream(start = 1, length = 4) {
  let n = start;
  for (let i = 0; i < length; i++) {
    yield n;
    n = digitalRoot(n * 2);
  }
}

// --- Utility: Get Sequence as Array ---
function getOpenDoublingSequence(start = 1, length = 4) {
  return [...openDoublingVortexStream(start, length)];
}

// --- Utility: Get Nth in Sequence ---
function getOpenDoublingNth(start = 1, n = 0) {
  let val = start;
  for (let i = 0; i < n; i++) val = digitalRoot(val * 2);
  return val;
}

// --- Example Usage ---
const openSequence = getOpenDoublingSequence(); // [1,2,4,8]

// --- Living Stream API ---
const a432OpenDoublingVortex = {
  digitalRoot,
  generator: openDoublingVortexStream,
  getSequence: getOpenDoublingSequence,
  getNth: getOpenDoublingNth,
  open: openSequence,
  doc: `This module encodes the open, generative doubling vortex (1-2-4-8) as a stream, generator, and proof. It is the journey before closure in the A432 matrix.`
};

// --- Expose globally for debugging (browser only) ---
if (typeof window !== 'undefined') window.a432OpenDoublingVortex = a432OpenDoublingVortex;

// --- Example: Log the open sequence ---
console.log('A432 Open Doubling Vortex Sequence:', openSequence); 