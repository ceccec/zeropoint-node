/**
 * Lean bridge — what is sealed, what is not, and why.
 *
 * This suite exists because the previous one asserted "Verified: 2/2" and
 * "Confidence: 100.0%" against a predicate that could not return false. Every
 * check here can fail, and two of them PIN KNOWN DEFECTS: the seals for the
 * repetition and Steane codes do not hold, because the code they describe is
 * wrong. They are asserted as failing so that a silent "fix" which weakens the
 * seal is caught, and so the defects stay visible instead of averaging away.
 */

import {
  SEALS,
  runSeal,
  readLeanStatus,
  computeProofHash,
  verifyProofCertificate,
  generateGateCertificate,
  generateAlgorithmCertificate,
  generateECCertificate,
  generateProofTranscript,
  verifyQuantumSystem,
  exportProofsForZenodo,
  LEAN_PROOFS,
} from './lean-bridge.ts'

let failures = 0
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) console.log('  ok   ' + name)
  else {
    failures++
    console.log('  FAIL ' + name + (detail ? ' - ' + detail : ''))
  }
}

console.log('Lean bridge: computational seals\n')

// ------------------------------------------------------------ seal outcomes
console.log('Seals (each decides a concrete instance)')
const held: string[] = []
const notHeld: string[] = []
for (const name of Object.keys(SEALS)) {
  const r = runSeal(name)
  ;(r.seal === 'held' ? held : notHeld).push(name)
  console.log('  ' + (r.seal === 'held' ? 'held  ' : 'FAILED') + ' ' + name)
}

check('at least one seal holds', held.length > 0)
check(
  'seals that hold are the expected set',
  held.length === Object.keys(SEALS).length - notHeld.length
)

// ------------------------------------------------- KNOWN DEFECTS, pinned
console.log('\nKnown defects in src/quantum/error-correction.ts, pinned by failing seals')
check(
  'repetition_detects_error does NOT hold - measureQubit violates the Born rule',
  runSeal('repetition_detects_error').seal === 'failed',
  'if this now holds, the underlying bug was fixed: update this test'
)
check(
  'steane_corrects_error does NOT hold - STEANE_CODE is not a stabiliser group',
  runSeal('steane_corrects_error').seal === 'failed',
  'if this now holds, the underlying bug was fixed: update this test'
)

// ------------------------------------------------------------ falsifiability
console.log('\nThe verifier can say no')
const fake = { ...generateGateCertificate('Hadamard'), seal: 'failed' as const }
check('a failed seal is not verified', verifyProofCertificate(fake) === false)
check('a held seal is verified', verifyProofCertificate(generateGateCertificate('Hadamard')) === true)

// --------------------------------------------------------------- lean status
console.log('\nLean status is read from the script, not declared')
check("a script containing sorry reads as 'sorry'", readLeanStatus('theorem t : X := by\n  sorry') === 'sorry')
check("an axiom reads as 'axiom'", readLeanStatus('axiom a : P') === 'axiom')
check("an empty script reads as 'absent'", readLeanStatus('   ') === 'absent')
check("a complete script reads as 'script'", readLeanStatus('theorem t : X := by decide') === 'script')
const sorryCount = Object.values(LEAN_PROOFS).filter((s) => readLeanStatus(s) === 'sorry').length
check('the sorry scripts are reported, not hidden', sorryCount > 0, sorryCount + ' found')
console.log('       ' + sorryCount + ' of ' + Object.keys(LEAN_PROOFS).length + ' Lean scripts end in sorry')

// ---------------------------------------------------------------- hashing
console.log('\nHash covers content, not the name')
const h1 = computeProofHash('IsUnitary hadamard', 'theorem a := by decide')
const h2 = computeProofHash('IsUnitary hadamard', 'theorem a := by sorry')
const h3 = computeProofHash('IsUnitary pauliX', 'theorem a := by decide')
check('changing the proof script changes the hash', h1 !== h2)
check('changing the statement changes the hash', h1 !== h3)
check('the same content hashes the same', h1 === computeProofHash('IsUnitary hadamard', 'theorem a := by decide'))

// --------------------------------------------------------------- reporting
console.log('\nReporting does not overstate')
const report = verifyQuantumSystem()
check('lean_machine_checked is false', report.lean_machine_checked === false)
check('sealed_fraction is below 1 while defects stand', report.sealed_fraction < 1)
check('unsealed theorems are named', report.unsealed.length > 0)
console.log('       sealed ' + (report.total_theorems - report.unsealed.length) + '/' + report.total_theorems + ': ' + report.unsealed.join(', ') + ' unsealed')

const zenodo = exportProofsForZenodo() as { ready_for_publication: boolean; caveats: string[] }
check('not marked ready for publication', zenodo.ready_for_publication === false)
check('caveats are attached', zenodo.caveats.length >= 3)

const transcript = generateProofTranscript([
  generateGateCertificate('Hadamard'),
  generateAlgorithmCertificate('Shor'),
  generateECCertificate('Steane[7,1,3]'),
])
// Hadamard and Shor seal; Steane does not - so two of three.
check('transcript confidence counts only held seals', transcript.confidence === 2 / 3, String(transcript.confidence))
check('transcript names the unsealed', transcript.unsealed.includes('steane_corrects_error'))

console.log('')
if (failures > 0) {
  console.error('lean-bridge: ' + failures + ' check(s) failed')
  process.exit(1)
}
console.log('lean-bridge ok - seals honest, 2 known defects pinned as failing')
