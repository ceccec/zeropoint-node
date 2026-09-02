/**
 * The frame scheduler, and the one law that matters for it.
 *
 * a432.raf.ts exists because three modules carried the same shim; extracting it
 * added two exports the gate immediately reported as exercised by nothing. The
 * law worth asserting is not "raf is a function" — it is that CANCELLING WORKS,
 * because the fallback path is the one that runs under Node, where there is no
 * requestAnimationFrame, and a cancel that silently does nothing would leave
 * every animation in this package running after it was stopped.
 */
import { raf, craf } from './a432.raf.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

const scheduled = await new Promise<boolean>((resolve) => {
  let ran = false
  raf(() => { ran = true })
  setTimeout(() => resolve(ran), 60)
})
check('a scheduled frame runs', scheduled)

const cancelled = await new Promise<boolean>((resolve) => {
  let ran = false
  const id = raf(() => { ran = true })
  craf(id)
  setTimeout(() => resolve(!ran), 60)
})
check('a cancelled frame does NOT run', cancelled, 'craf did not cancel')

const arg = await new Promise<unknown>((resolve) => {
  raf((t) => resolve(t))
  setTimeout(() => resolve(undefined), 60)
})
check('the callback receives a number', typeof arg === 'number', `got ${typeof arg}`)

console.log(failures === 0
  ? 'a432.raf ok — a frame runs, a cancelled frame does not, and the callback gets a timestamp'
  : `a432.raf FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
