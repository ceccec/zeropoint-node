import * as V from './a432-vortex-pi.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}
const finite = (n: number) => typeof n === 'number' && Number.isFinite(n)

// The document's central claim: the decimal point of pi is a gateway, so a
// current digit of zero returns the portal rather than a digit.
{
  let portalOk = true, digitOk = true, deterministic = true
  for (let s = -3; s < 12; s++) for (let e = 0; e < 400; e += 37) {
    if (V.computeNextPiDigit(0, s, e) !== V.TRINITY_PORTAL_PI.TRINITY_PORTAL) portalOk = false
    const d = V.computeNextPiDigit(4, s, e)
    if (!Number.isInteger(d) || d < 1 || d > 9) digitOk = false
    if (V.computeNextPiDigit(4, s, e) !== d) deterministic = false
  }
  check('a current digit of zero returns the trinity portal', portalOk)
  check('every other step returns a digit 1-9', digitOk)
  check('computeNextPiDigit is deterministic', deterministic)
  check('a negative stream index still indexes the stream',
    finite(V.computeNextPiDigit(4, -7, 3)) && V.computeNextPiDigit(4, -7, 3) >= 1)
  check('the vortex stream is pi after the point',
    JSON.stringify([...V.TRINITY_PORTAL_PI.VORTEX_STREAM]) === JSON.stringify([1, 4, 1, 5, 7]))
}

// evolveVortex is a transition, so the properties are about the step.
{
  const start = V.createVortexState(0)
  check('a fresh vortex is running at evolution zero', start.isRunning && start.evolution === 0)
  const stopped = { ...start, isRunning: false }
  check('a stopped vortex does not evolve', V.evolveVortex(stopped, 1) === stopped)

  let s = start
  let monotonic = true, bounded = true, harmonyOk = true
  for (let i = 0; i < 200; i++) {
    const next = V.evolveVortex(s, i * 1000)
    if (next.evolution !== s.evolution + 1 || next.streamIndex !== s.streamIndex + 1) monotonic = false
    if (next.consciousness < s.consciousness || next.consciousness > 1) bounded = false
    if (!Number.isInteger(next.harmony) || next.harmony < 0 || next.harmony > 9) harmonyOk = false
    s = next
  }
  check('evolution and stream index advance by one each tick', monotonic)
  check('consciousness rises and never passes one', bounded, String(s.consciousness))
  check('harmony is always a digit', harmonyOk)
  check('evolveVortex is deterministic',
    JSON.stringify(V.evolveVortex(start, 5)) === JSON.stringify(V.evolveVortex(start, 5)))
  check('evolveVortex does not mutate its input',
    start.evolution === 0 && start.streamIndex === 0)

  // Consciousness rises by 1/1000 and is capped, so it must reach exactly 1.
  let capped = V.createVortexState(0)
  for (let i = 0; i < 1200; i++) capped = V.evolveVortex(capped, i)
  check('consciousness saturates at exactly one', capped.consciousness === 1, String(capped.consciousness))
}

// The three hues are a colour triad, which is the whole point of the offsets.
{
  let triadOk = true, rangeOk = true
  const hue = (s: string) => Number(s.slice(4, s.indexOf(',')))
  for (let e = 0; e < 24; e++) {
    const v = V.updateVortexCSS(e)
    const [p, s2, a] = [hue(v.primary), hue(v.secondary), hue(v.accent)]
    if ((p + 120) % 360 !== s2 || (p + 240) % 360 !== a) triadOk = false
    if (![p, s2, a].every(h => h >= 0 && h < 360)) rangeOk = false
  }
  check('the three hues stay 120 degrees apart', triadOk)
  check('every hue is a bearing', rangeOk)
  check('a negative evolution still yields a bearing', hue(V.updateVortexCSS(-5).primary) >= 0)

  // The applier is the only part that touches a document, and there is none.
  check('applyVortexCSS reports failure with no document', V.applyVortexCSS(V.updateVortexCSS(1)) === false)
  const seen: Record<string, string> = {}
  const stub = { style: { setProperty: (k: string, v: string) => { seen[k] = v } } }
  check('applyVortexCSS sets four variables on a target', V.applyVortexCSS(V.updateVortexCSS(1), stub) && Object.keys(seen).length === 4)
}

{
  const frame = V.updateVortexVideo(1, 0, 800, 600)
  check('the frame is fifty circles', frame.length === 50)
  check('every circle is finite', frame.every(c => finite(c.x) && finite(c.y) && finite(c.size)))
  check('every circle has a colour', frame.every(c => /^hsl\(\d+(\.\d+)?, 100%, 50%\)$/.test(c.fill)))
  check('the frame is deterministic',
    JSON.stringify(V.updateVortexVideo(1, 0, 800, 600)) === JSON.stringify(frame))

  check('display interval is a thousand over the frequency', V.calculateDisplayInterval(1000) === 1)
  check('display frequency at zero consciousness is the base', V.calculateDisplayFrequency(50, 0) === 432)
  let freqOk = true
  for (let e = 0; e < 400; e += 13) for (const c of [0, 1 / 2, 1]) {
    const f = V.calculateDisplayFrequency(e, c)
    if (!Number.isInteger(f) || f < 432 || f > 864) freqOk = false
  }
  check('display frequency stays between the base and its octave', freqOk)
}

console.log()
if (failures > 0) { console.error(`a432-vortex-pi FAIL — ${failures}`); process.exit(1) }
console.log('a432-vortex-pi ok')
process.exit(0)
