/**
 * Round-trips, which is the one law a plausible constant cannot satisfy.
 *
 * Eleven exports across these two modules were called by nothing, and the first
 * call found the same defect twice: both used frequencyForDigit, which is
 * defined ONLY on the trinity axis {3,6,9} and throws for every other digit.
 * a432.vbm.path threw on any path containing an orbit digit — including its own
 * canonical sequence [0,0,3,6,9,1,2,4,8,7,5,1] — and a432.vbm.decode threw
 * whenever a trinity sum landed off the axis. That is the third appearance of
 * this defect, after createBlock in 1.4.4; the fix is the same each time.
 *
 * The laws here are that parsing preserves the path, that reversing is an
 * involution on the sequence, and that the statistics count what is actually
 * there rather than a plausible number.
 */
import {
  parseVBMPathString, getVBMPathSequence, getVBMPathStatistics,
  validateVBMPath, createVBMPathNavigator, analyzeVBMPath, VBM_PATH_CONSTANTS,
} from './a432.vbm.path.ts'
import {
  decodeVBMSequence, getVBMDecodeDigits, getVBMDecodeDivisions,
  getVBMDecodeTrinities, getVBMDecodeStatistics, VBM_DECODE_CONSTANTS,
} from './a432.vbm.decode.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const quiet = <T>(f: () => T): T => {
  const log = console.log
  console.log = (): void => {}
  try { return f() } finally { console.log = log }
}

/** Paths that between them cover the axis, the orbit, both separators and zero. */
const PATHS = ['/3/6/9', '/1/2/4/8/7/5', '/3/6/9\\1/2', '/0', '\\9/1', '/3\\6/9\\1']

// --- parsing preserves the path -----------------------------------------
check('the navigator gives back the path it was given',
  PATHS.every((p) => createVBMPathNavigator(p).getPath() === p),
  'if parse loses the path there is nothing to round-trip')

check('parseVBMPathString and createVBMPathNavigator are the same thing',
  PATHS.every((p) => parseVBMPathString(p).getPath() === createVBMPathNavigator(p).getPath()
    && getVBMPathSequence(p).join(',') === parseVBMPathString(p).getSequence().join(',')))

check('the module can parse its own canonical sequence',
  (() => {
    const own = '/' + VBM_PATH_CONSTANTS.SEQUENCE.join('/')
    return getVBMPathSequence(own).join(',') === VBM_PATH_CONSTANTS.SEQUENCE.join(',')
  })(),
  'it threw on every orbit digit, so its own sequence was unparseable')

check('every digit in the sequence came from the path',
  PATHS.every((p) => getVBMPathSequence(p).every((d) => p.includes(String(d)))))

check('the sequence has one digit per separator',
  PATHS.every((p) => getVBMPathSequence(p).length === (p.match(/[/\\]/g) ?? []).length))

check('every parsed digit is a digit',
  PATHS.every((p) => getVBMPathSequence(p).every((d) => Number.isInteger(d) && d >= 0 && d <= 9)))

check('the empty path parses to the empty sequence',
  getVBMPathSequence('').length === 0)

// --- reversal is an involution on the sequence ---------------------------
check('reversing the path reverses the sequence',
  PATHS.every((p) => {
    const back = createVBMPathNavigator(p).generateReversePath()
    return getVBMPathSequence(back).join(',') === [...getVBMPathSequence(p)].reverse().join(',')
  }))

check('reversing twice returns the original sequence',
  PATHS.every((p) => {
    const twice = createVBMPathNavigator(createVBMPathNavigator(p).generateReversePath()).generateReversePath()
    return getVBMPathSequence(twice).join(',') === getVBMPathSequence(p).join(',')
  }))

// --- statistics count what is there --------------------------------------
check('total nodes equals the sequence length',
  PATHS.every((p) => getVBMPathStatistics(p).totalNodes === getVBMPathSequence(p).length))

check('forward and backward moves account for every node',
  PATHS.every((p) => {
    const s = getVBMPathStatistics(p)
    return s.forwardMoves + s.backwardMoves === s.totalNodes
  }))

check('trinity and rodin nodes account for every non-zero digit',
  PATHS.every((p) => {
    const s = getVBMPathStatistics(p)
    const nonZero = getVBMPathSequence(p).filter((d) => d !== 0).length
    return s.trinityNodes + s.rodinNodes === nonZero
  }))

check('depth never exceeds the number of forward moves',
  PATHS.every((p) => {
    const s = getVBMPathStatistics(p)
    return s.maxDepth <= s.forwardMoves && s.minDepth <= s.maxDepth
  }))

// --- validity ------------------------------------------------------------
check('a path that only descends is valid',
  validateVBMPath('/3/6/9') && validateVBMPath('/1/2/4'))

check('a path that rises above its own origin is NOT valid',
  !validateVBMPath('\\3/6'),
  'the condition is on every prefix, not just the end')

check('validity agrees between the function and the navigator',
  PATHS.every((p) => validateVBMPath(p) === createVBMPathNavigator(p).isValidPath()))

check('analyzeVBMPath runs over every path without throwing',
  PATHS.every((p) => { try { quiet(() => analyzeVBMPath(p)); return true } catch { return false } }))

// --- decode --------------------------------------------------------------
const SEQS = ['369', '124875', '0', VBM_DECODE_CONSTANTS.SEQUENCE]

check('decoding gives back the digits of the string',
  SEQS.every((s) => getVBMDecodeDigits(s).join('') === s))

check('the module can decode its own canonical sequence',
  getVBMDecodeDigits(VBM_DECODE_CONSTANTS.SEQUENCE).join(',') === VBM_DECODE_CONSTANTS.DIGITS.join(','),
  'it threw whenever a trinity sum landed off the axis')

check('there is one division per digit',
  SEQS.every((s) => getVBMDecodeDivisions(s).length === getVBMDecodeDigits(s).length))

check('each division carries the digit at its own index',
  SEQS.every((s) => getVBMDecodeDivisions(s).every((d, i) => d.digit === getVBMDecodeDigits(s)[i]
    && d.index === i)))

check('every trinity sum is the sum of its own digits',
  SEQS.every((s) => getVBMDecodeTrinities(s).every((t) => t.sum === t.digits.reduce((a, b) => a + b, 0))))

check('every trinity digital root is the digital root of its sum',
  SEQS.every((s) => getVBMDecodeTrinities(s).every((t) => t.digitalRoot === (t.sum === 0 ? 0 : ((t.sum - 1) % 9) + 1))))

check('no trinity frequency is NaN or Infinity',
  SEQS.every((s) => getVBMDecodeTrinities(s).every((t) => Number.isFinite(t.frequency))))

check('the statistics agree with what the processor holds',
  SEQS.every((s) => {
    const st = getVBMDecodeStatistics(s)
    return st.totalDigits === getVBMDecodeDigits(s).length
      && st.totalDivisions === getVBMDecodeDivisions(s).length
      && st.totalTrinities === getVBMDecodeTrinities(s).length
  }))

check('the empty sequence has no averages rather than NaN averages',
  (() => {
    const st = getVBMDecodeStatistics('')
    return st.totalDigits === 0 && st.averageDivision === 0 && st.averageHarmonic === 0
      && Number.isFinite(st.averageDivision) && Number.isFinite(st.averageHarmonic)
  })(),
  'unreachable while the module threw on orbit digits; finite:check found it the moment it stopped')

check('no statistic is ever NaN or Infinity',
  SEQS.concat(['']).every((s) => {
    const st = getVBMDecodeStatistics(s)
    return [st.averageDivision, st.averageHarmonic, st.totalDigits, st.totalDivisions, st.totalTrinities, st.totalHarmonics]
      .every((v) => Number.isFinite(v))
  }))

check('the recorded trinity sums are the trinities\' own sums',
  SEQS.every((s) => getVBMDecodeStatistics(s).trinitySums.join(',')
    === getVBMDecodeTrinities(s).map((t) => t.sum).join(',')))

check('decodeVBMSequence returns a processor that agrees with the free functions',
  SEQS.every((s) => decodeVBMSequence(s).getDigits().join(',') === getVBMDecodeDigits(s).join(',')))

console.log(failures === 0
  ? 'a432.vbm ok — paths round-trip through reversal, and both modules can now decode their own canonical sequence'
  : `a432.vbm FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
