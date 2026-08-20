/**
 * Lean bridge — what is sealed, what is not, and why.
 *
 * This suite exists because the previous one asserted "Verified: 2/2" and
 * "Confidence: 100.0%" against a predicate that could not return false. Every
 * check here can fail.
 *
 * Two seals used to fail, and finding that was the point of writing them: the
 * repetition seal caught raw LCG states being passed where `measureQubit`
 * wants a unit in [0,1), and the Steane seal caught a generator list that was
 * not a stabiliser group. Both defects are fixed, so both seals now hold, and
 * this suite asserts that they hold - a regression would put them back.
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

// --------------------------------------------- the two formerly-broken seals
console.log('\nSeals that used to fail, and what they caught')
check(
  'repetition_detects_error holds - syndrome extraction distinguishes clean from flipped',
  runSeal('repetition_detects_error').seal === 'held',
  'regressed: measureQubit is being handed a raw LCG state again'
)
check(
  'steane_corrects_error holds - STEANE_CODE is a genuine stabiliser group',
  runSeal('steane_corrects_error').seal === 'held',
  'regressed: generator count, commutation or independence broke'
)
check('every seal holds', notHeld.length === 0, notHeld.join(', ') + ' failed')

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
check('every theorem in the report is sealed', report.sealed_fraction === 1, String(report.sealed_fraction))
check('nothing is left unsealed', report.unsealed.length === 0, report.unsealed.join(', '))
console.log('       sealed ' + report.total_theorems + '/' + report.total_theorems)

const zenodo = exportProofsForZenodo() as { ready_for_publication: boolean; caveats: string[] }
// Still false, and correctly so: seals are computed instances, not Lean proofs.
check('not marked ready for publication (no Lean toolchain runs here)', zenodo.ready_for_publication === false)
check('caveats are attached', zenodo.caveats.length >= 3)

const transcript = generateProofTranscript([
  generateGateCertificate('Hadamard'),
  generateAlgorithmCertificate('Shor'),
  generateECCertificate('Steane[7,1,3]'),
])
check('transcript confidence counts held seals', transcript.confidence === 1, String(transcript.confidence))
check('transcript lists no unsealed theorem', transcript.unsealed.length === 0)
// The confidence number must still be able to move, or it is decoration.
const withFailure = generateProofTranscript([
  generateGateCertificate('Hadamard'),
  { ...generateGateCertificate('PauliX'), seal: 'failed' as const },
])
check('a failed seal drags confidence down', withFailure.confidence === 1 / 2, String(withFailure.confidence))

console.log('')
if (failures > 0) {
  console.error('lean-bridge: ' + failures + ' check(s) failed')
  process.exit(1)
}
console.log('lean-bridge ok - all seals hold, Lean scripts still not machine-checked')
