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
export * from './qaoa.ts'
export * from './advanced.ts'
export * from './variational-optimizer.ts'
export * from './hardware-compilation.ts'
export * from './adaptive.ts'
export * from './workflow.ts'
export * from './tomography.ts'
export * from './error-correction.ts'
export * from './hybrid.ts'
export * from './comparison-mesh.ts'
export * from './applications.ts'
export * from './security-bridge.ts'
export * from './vortex-bridge.ts'
export * from './kernel-adaptation.ts'
export * from './end-to-end.ts'
export * from './meta-verifier.ts'
export * from './composability.ts'
export * from './self-healing.ts'
export * from './proof-of-system.ts'
export * from './orchestrator.ts'
export * from './zenodo-publisher.ts'
export * from './millennium-bridge.ts'

// Named rather than star-exported: `measureAndCollapse` also exists in
// orchestrator.ts, and an ambiguous star export would silently drop both.
export type { SuperpositionPhase, QuantumExecution } from './superposition-execution.ts'
export {
  phase1_cryptographyAmplitudes,
  phase2_leanProofAmplitudes,
  phase3_algorithmAmplitudes,
  phase4_errorCorrectionAmplitudes,
  phase5_verificationAmplitudes,
  phase6_reproducibilityAmplitudes,
  phase7_orchestratorAmplitudes,
  allPhaseAmplitudes,
  parallelWorkStreams,
  computeInterferencePattern,
  measureAndCollapse as measureSuperpositionCollapse,
  executeInSuperposition,
  describeQuantumExecution,
} from './superposition-execution.ts'
