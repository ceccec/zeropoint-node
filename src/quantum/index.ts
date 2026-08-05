/**
 * The quantum module — a real quantum-circuit simulator.
 *
 *   simulator  — complex amplitudes, unitary gates, Born-rule measurement
 *   gates      — SWAP, Toffoli / multi-controlled X, controlled-phase, adjoint
 *   algorithms — QFT / inverse QFT, Grover search, seeded measurement sampling
 *
 * Everything is externally checkable (scripts/quantum-sim.mjs): H² = I, Bell and
 * GHZ entanglement, unitarity, iqft∘qft = I, Grover’s success probability, and
 * sampled frequencies converging to |amplitude|².
 */

export * from './simulator.ts'
export * from './gates.ts'
export * from './algorithms.ts'
export * from './circuit.ts'
export * from './density.ts'
export * from './variational.ts'
