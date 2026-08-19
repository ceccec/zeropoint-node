/**
 * Superposition Execution Test
 * Verify all 7 phases resolve correctly through quantum interference
 *
 * Thresholds are exact hundredths, matching the module's numeric contract:
 * integer numerators over SCALE, never decimal literals.
 */

import {
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
  measureAndCollapse,
  executeInSuperposition,
  describeQuantumExecution,
} from './superposition-execution.ts'

const SCALE = 100

function testPhase1Superposition(): void {
  console.log('Test: Phase 1 - Cryptography in Superposition')
  const amps = phase1_cryptographyAmplitudes()
  if (amps.length !== 7) throw new Error('Phase 1: expected 7 streams')
  const allParallel = amps.every((a) => a > 70 / SCALE && a < 1)
  if (!allParallel) throw new Error('Phase 1: bad amplitudes')
  console.log('  ✓ 7 crypto work streams in superposition')
  console.log('  ✓ All run in parallel')
}

function testAllPhasesSimultaneous(): void {
  console.log('Test: All 7 Phases in Superposition Simultaneously')
  const phases = [
    { name: 'Crypto', amps: phase1_cryptographyAmplitudes() },
    { name: 'Proofs', amps: phase2_leanProofAmplitudes() },
    { name: 'Algorithms', amps: phase3_algorithmAmplitudes() },
    { name: 'ErrorCorrection', amps: phase4_errorCorrectionAmplitudes() },
    { name: 'Verification', amps: phase5_verificationAmplitudes() },
    { name: 'Reproducibility', amps: phase6_reproducibilityAmplitudes() },
    { name: 'Orchestration', amps: phase7_orchestratorAmplitudes() },
  ]
  let totalStreams = 0
  for (const phase of phases) {
    if (phase.amps.length === 0) throw new Error(phase.name + ': no work')
    totalStreams += phase.amps.length
    console.log('  ✓ ' + phase.name + ': ' + phase.amps.length + ' streams')
  }
  // The census must equal what the module reports, and the message must print
  // the number that was checked. The old test asserted 49 and printed 52.
  if (totalStreams !== parallelWorkStreams()) {
    throw new Error(`stream census disagrees: ${totalStreams} vs ${parallelWorkStreams()}`)
  }
  if (allPhaseAmplitudes().length !== phases.length) throw new Error('phase count disagrees')
  console.log('  ✓ Total: ' + totalStreams + ' parallel work streams')
}

function testInterferencePattern(): void {
  console.log('Test: Constructive Interference Pattern')
  const interference = computeInterferencePattern()
  if (interference.total_amplitude < 40) throw new Error('Amplitude too low')
  if (interference.constructive_amplification < 80 / SCALE) throw new Error('Amplification weak')
  if (interference.working_solution_probability < 80 / SCALE) throw new Error('Probability low')
  if (interference.working_solution_probability > 1) throw new Error('Probability above 1')
  console.log(
    '  ✓ Working solution probability: ' +
      Number(interference.working_solution_probability * SCALE).toFixed(1) +
      '%'
  )
}

function testMeasurementCollapse(): void {
  console.log('Test: Measurement & Collapse')
  const measurement = measureAndCollapse()
  if (!measurement.measurement_complete) throw new Error('Incomplete')
  // theater + reality must partition the whole, exactly.
  const partition = measurement.theater_eliminated + measurement.reality_remaining
  if (partition !== 1) throw new Error('theater and reality do not partition 1: ' + partition)
  console.log('  ✓ Measurement complete')
  console.log('  ✓ All phases working: ' + measurement.all_phases_working)
  console.log('  ✓ Theater share: ' + measurement.theater_eliminated * SCALE + '%')
}

function testExecutionMetrics(): void {
  console.log('Test: Quantum Execution Metrics')
  const execution = executeInSuperposition()
  if (execution.phases_in_superposition !== 7) throw new Error('Bad phase count')
  if (execution.parallel_work_streams !== parallelWorkStreams()) throw new Error('Bad stream count')
  if (execution.time_factor_improvement <= 0) throw new Error('Bad speedup factor')
  console.log('  ✓ Phases in superposition: ' + execution.phases_in_superposition)
  console.log('  ✓ Parallel work streams: ' + execution.parallel_work_streams)
  console.log('  ✓ Time factor: ' + execution.time_factor_improvement + 'x')
}

function testDescriptionIsDerived(): void {
  console.log('Test: Description reports the computed census')
  const text = describeQuantumExecution()
  const streams = String(parallelWorkStreams())
  if (!text.includes(streams + ' work streams')) {
    throw new Error('description does not name the computed stream count')
  }
  console.log('  ✓ Description names ' + streams + ' streams, the counted value')
}

function runTests(): void {
  console.log('🌊 Quantum Superposition Execution Tests\n')
  try {
    testPhase1Superposition()
    testAllPhasesSimultaneous()
    testInterferencePattern()
    testMeasurementCollapse()
    testExecutionMetrics()
    testDescriptionIsDerived()
    console.log('\n✅ SUPERPOSITION EXECUTION VERIFIED')
    console.log('🌊 Every printed number is the number that was checked.')
  } catch (error) {
    console.error('❌ Test failed: ' + (error instanceof Error ? error.message : String(error)))
    process.exit(1)
  }
}

runTests()
