/**
 * Lean Bridge Verification Tests
 *
 * Tests the integration of Lean formal proofs with quantum system
 */

import {
  generateGateCertificate,
  generateAlgorithmCertificate,
  generateECCertificate,
  verifyProofCertificate,
  verifyProofChain,
  verifyQuantumSystem,
  exportProofsForZenodo,
  computeProofHash,
  generateProofTranscript,
} from './lean-bridge.ts'

function testGateCertificates(): void {
  console.log('Test: Gate proof certificates...')

  const hadamard = generateGateCertificate('Hadamard')
  const pauliX = generateGateCertificate('PauliX')

  if (!verifyProofCertificate(hadamard)) {
    throw new Error('Hadamard certificate invalid')
  }
  if (!verifyProofCertificate(pauliX)) {
    throw new Error('PauliX certificate invalid')
  }

  if (hadamard.theorem_name !== 'hadamard_unitary') {
    throw new Error('Hadamard theorem name mismatch')
  }
  if (hadamard.property !== 'unitary') {
    throw new Error('Hadamard property mismatch')
  }

  console.log(`  ✓ Hadamard certificate: ${hadamard.hash}`)
  console.log(`  ✓ Hadamard theorem: ${hadamard.theorem_name}`)
  console.log(`  ✓ PauliX certificate: ${pauliX.hash}`)
}

function testAlgorithmCertificates(): void {
  console.log('Test: Algorithm proof certificates...')

  const grover = generateAlgorithmCertificate('Grover')
  const shor = generateAlgorithmCertificate('Shor')
  const qft = generateAlgorithmCertificate('QFT')

  if (!verifyProofCertificate(grover)) {
    throw new Error('Grover certificate invalid')
  }
  if (!verifyProofCertificate(shor)) {
    throw new Error('Shor certificate invalid')
  }

  if (grover.speedup_factor < 2) {
    throw new Error(`Grover speedup too low: ${grover.speedup_factor}`)
  }
  if (shor.speedup_factor < 1000) {
    throw new Error(`Shor speedup too low: ${shor.speedup_factor}`)
  }

  console.log(`  ✓ Grover speedup: ${grover.speedup_factor.toFixed(1)}x`)
  console.log(`  ✓ Shor speedup: ${shor.speedup_factor.toFixed(0)}x`)
  console.log(`  ✓ Grover complexity: ${grover.complexity_bound}`)
  console.log(`  ✓ Shor complexity: ${shor.complexity_bound}`)
}

function testECCertificates(): void {
  console.log('Test: Error correction proof certificates...')

  const repetition = generateECCertificate('Repetition[3,1,1]')
  const steane = generateECCertificate('Steane[7,1,3]')
  const surface = generateECCertificate('Surface')

  if (!verifyProofCertificate(repetition)) {
    throw new Error('Repetition certificate invalid')
  }
  if (!verifyProofCertificate(steane)) {
    throw new Error('Steane certificate invalid')
  }
  if (!verifyProofCertificate(surface)) {
    throw new Error('Surface certificate invalid')
  }

  if (repetition.threshold <= 0 || repetition.threshold >= 1) {
    throw new Error(`Invalid repetition threshold: ${repetition.threshold}`)
  }

  console.log(`  ✓ Repetition [3,1,1]: threshold ${repetition.threshold}`)
  console.log(`  ✓ Steane [7,1,3]: threshold ${steane.threshold}`)
  console.log(`  ✓ Surface code: threshold ${surface.threshold}`)
}

function testProofChain(): void {
  console.log('Test: Proof chain verification...')

  const certs = [
    generateGateCertificate('Hadamard'),
    generateAlgorithmCertificate('Grover'),
    generateECCertificate('Repetition[3,1,1]'),
  ]

  if (!verifyProofChain(certs)) {
    throw new Error('Proof chain verification failed')
  }

  console.log(`  ✓ ${certs.length} certificates verified`)
  console.log(`  ✓ Proof chain integrity: valid`)
}

function testProofHash(): void {
  console.log('Test: Proof hash computation...')

  const hash1 = computeProofHash('hadamard_unitary')
  const hash2 = computeProofHash('hadamard_unitary')
  const hash3 = computeProofHash('pauliX_unitary')

  if (hash1 !== hash2) {
    throw new Error('Hash not deterministic')
  }
  if (hash1 === hash3) {
    throw new Error('Different theorems have same hash')
  }
  if (hash1.length !== 16) {
    throw new Error(`Hash wrong length: ${hash1.length}`)
  }

  console.log(`  ✓ Hash deterministic: ${hash1}`)
  console.log(`  ✓ Hash collision-free`)
}

function testQuantumSystemVerification(): void {
  console.log('Test: Complete quantum system verification...')

  const report = verifyQuantumSystem()

  if (report.total_theorems === 0) {
    throw new Error('No theorems verified')
  }
  if (report.overall_confidence < 0.8) {
    throw new Error(`Confidence too low: ${report.overall_confidence}`)
  }
  if (report.gates_verified.length === 0) {
    throw new Error('No gates verified')
  }
  if (report.algorithms_verified.length === 0) {
    throw new Error('No algorithms verified')
  }
  if (report.error_correction_verified.length === 0) {
    throw new Error('No error correction verified')
  }

  console.log(`  ✓ ${report.total_theorems} theorems formalized`)
  console.log(`  ✓ ${report.total_lines_of_proof} proof lines`)
  console.log(`  ✓ Gates: ${report.gates_verified.join(', ')}`)
  console.log(`  ✓ Algorithms: ${report.algorithms_verified.join(', ')}`)
  console.log(`  ✓ Error correction: ${report.error_correction_verified.join(', ')}`)
  console.log(`  ✓ Overall confidence: ${(report.overall_confidence * 100).toFixed(1)}%`)
}

function testProofTranscript(): void {
  console.log('Test: Proof transcript generation...')

  const certs = [
    generateGateCertificate('Hadamard'),
    generateAlgorithmCertificate('Grover'),
  ]

  const transcript = generateProofTranscript(certs)

  if (!transcript.title) {
    throw new Error('Transcript missing title')
  }
  if (transcript.theorems.length === 0) {
    throw new Error('Transcript missing theorems')
  }
  if (transcript.verified_count === 0) {
    throw new Error('Transcript has no verified theorems')
  }
  if (transcript.confidence < 0.5) {
    throw new Error(`Transcript confidence too low: ${transcript.confidence}`)
  }

  console.log(`  ✓ Title: ${transcript.title}`)
  console.log(`  ✓ Theorems: ${transcript.theorems.join(', ')}`)
  console.log(`  ✓ Total proof lines: ${transcript.total_lines}`)
  console.log(`  ✓ Verified: ${transcript.verified_count}/${certs.length}`)
  console.log(`  ✓ Confidence: ${(transcript.confidence * 100).toFixed(1)}%`)
}

function testZenodoExport(): void {
  console.log('Test: Zenodo publication export...')

  const export_data = exportProofsForZenodo()

  if (!export_data.system) {
    throw new Error('Export missing system name')
  }
  if (!export_data.verification_framework) {
    throw new Error('Export missing verification framework')
  }
  if (!export_data.formal_verification_report) {
    throw new Error('Export missing verification report')
  }
  if (!export_data.ready_for_publication) {
    throw new Error('Export not marked ready for publication')
  }

  const report = export_data.formal_verification_report as any
  if (report.overall_confidence < 0.8) {
    throw new Error('System confidence below publication threshold')
  }

  console.log(`  ✓ System: ${export_data.system}`)
  console.log(`  ✓ Framework: ${export_data.verification_framework}`)
  console.log(`  ✓ Confidence: ${(report.overall_confidence * 100).toFixed(1)}%`)
  console.log(`  ✓ Ready for Zenodo: ${export_data.ready_for_publication}`)
}

// ============================================================================
// TEST RUNNER
// ============================================================================

async function runTests(): Promise<void> {
  console.log('🧪 Lean Bridge Verification Tests\n')

  try {
    testGateCertificates()
    testAlgorithmCertificates()
    testECCertificates()
    testProofChain()
    testProofHash()
    testQuantumSystemVerification()
    testProofTranscript()
    testZenodoExport()

    console.log('\n✅ All Lean bridge verification tests passed!')
  } catch (error) {
    console.error(`\n❌ Test failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

runTests()
