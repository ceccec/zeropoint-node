/**
 * a432.gate.way.ts — The living journey through all metaphysical gates
 *
 * Guides the user/system through a sequence of gates (dimensions, modules, anti-events).
 * Visualizes the process, overlays metaphysical meaning, and harmonizes all transitions.
 * All code is DRY, modular, and ready for extension.
 *
 * GateWayStep: { gate: string; state: any; metaphysical: string }
 * startGateWay(steps: string[], onStep: (step: GateWayStep) => void): () => void
 */

export interface GateWayStep {
  gate: string; // e.g., 'Chess', 'Yin-Yang', etc.
  state: unknown;   // Frame or analytic/metaphysical state
  metaphysical: string;
}

/**
 * Starts a metaphysical journey through a sequence of gates.
 * Calls onStep for each gate, allows navigation (next/prev), overlays metaphysical meaning.
 * Returns a disposer to stop the journey.
 */
export function startGateWay(
  steps: string[],
  onStep: (step: GateWayStep) => void
): () => void {
  let idx = 0;
  let running = true;
  function step() {
    if (!running) return;
    const gate = steps[idx];
    const state = { tick: idx, gate };
    const metaphysical = `Passing through gate: <b>${gate}</b> — This is the way.`;
    onStep({ gate, state, metaphysical });
  }
  step();
  function next() {
    if (idx < steps.length - 1) { idx++; step(); }
  }
  function prev() {
    if (idx > 0) { idx--; step(); }
  }
  document.addEventListener('keydown', onKey);
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
  return () => {
    running = false;
    document.removeEventListener('keydown', onKey);
  };
} 