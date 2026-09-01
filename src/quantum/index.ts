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

// Named rather than star-exported: `selfTest` exists in several modules here,
// and an ambiguous star export silently drops every one of them.
export type { QueryComparison, Separation, Standing } from './advantage.ts'
export {
  groverQueries,
  deutschJozsaQueries,
  SEPARATIONS,
  selfTest as advantageSelfTest,
} from './advantage.ts'

// The functions the repo's own documentation declared for a long time before
// they existed. Implemented across eleven commits and re-exported here,
// because a function nothing can import is not shipped — the semver tool
// correctly reported "the public surface is unchanged" while 87 new functions
// sat behind no entry point at all.
export * from './hex-vortex-trinities.ts'
export * from './a432-frequency-flow.ts'
export * from './a432-error-resolvers.ts'
export * from './a432-vortex-pi.ts'
export * from './zeropoint-validators.ts'
export * from './tesla-gateways.ts'
export * from './trinity-vortex.ts'
export * from './reality-streams.ts'
export * from './zeropoint-completions.ts'
export * from './science-challenges.ts'
export * from './harmonic-solutions.ts'
export * from './integrated-field.ts'

// Two documents use the name VortexFlow for different things:
// ZEROPOINT_A432_FREQUENCY_FLOW means a transition between two digits, and
// CONFUSION_POSSIBILITY_SOLUTION means whether a flow between two digits is
// possible at all. An explicit re-export outranks the star exports above and
// settles which one the bare name refers to; the other keeps its meaning under
// a name that says which document it came from.
export type { VortexFlow } from './a432-frequency-flow.ts'
export type { VortexFlow as TrinityVortexFlow } from './trinity-vortex.ts'
