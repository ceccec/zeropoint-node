/**
 * The kernel's own tests, written WITHOUT reference to the criterion.
 *
 * I wrote the criterion and then wrote the thing that satisfies it, which is
 * the self-certification problem in its purest form: a probe I designed and an
 * implementation I shaped to pass it prove nothing about each other. These
 * tests exercise the mechanisms directly — fairness, refusal, containment,
 * closure, round-trip — so that the criterion's verdict has something
 * independent to agree with.
 */
import { A432Kernel, RESOURCE_POOL, SCHEDULING_QUANTUM } from './a432.os.kernel.ts'
import { max, min } from './a432.algebra.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

// Scheduling: every runnable task must eventually be selected. A scheduler
// that always picks the first task is a loop with extra steps.
{
  const k = new A432Kernel()
  const counts = new Map<number, number>()
  const ids = ['a', 'b', 'c', 'd'].map((n) => k.spawn(n, () => {}))
  // Re-arm each task after it completes so the rotation keeps having choices.
  for (let round = 0; round < 12; round++) {
    const id = k.tick()
    if (id !== null) counts.set(id, (counts.get(id) ?? 0) + 1)
    for (const t of k.tasks()) if (t.state === 'done') (k as unknown as { tasksById: Map<number, { state: string }> })
      .tasksById.get(t.id)!.state = 'ready'
  }
  check('every task is selected at least once', ids.every((id) => (counts.get(id) ?? 0) > 0),
    JSON.stringify([...counts]))
  const runs = ids.map((id) => counts.get(id) ?? 0)
  check('selection is fair to within one turn', max(...runs) - min(...runs) <= 1, JSON.stringify(runs))
  check('an empty kernel schedules nothing', new A432Kernel().tick() === null)
}

// Tasks
{
  const k = new A432Kernel()
  check('a fresh kernel holds no tasks', k.tasks().length === 0)
  let ran = 0
  const id = k.spawn('counter', () => { ran++ })
  check('spawn returns an id that appears in the task list', k.tasks().some((t) => t.id === id))
  check('a spawned task starts ready', k.tasks()[0].state === 'ready')
  k.tick()
  check('running a task executes its body', ran === SCHEDULING_QUANTUM, String(ran))
  check('a completed task is marked done', k.tasks()[0].state === 'done')
  check('the run count is recorded', k.tasks()[0].runs === 1)
  check('task ids are unique', new Set([1, 2, 3].map(() => k.spawn('x', () => {}))).size === 3)
}

// Isolation: a throwing task must be contained, recorded, and not stop others.
{
  const k = new A432Kernel()
  let survivorRuns = 0
  k.spawn('thrower', () => { throw new Error('deliberate') })
  k.spawn('survivor', () => { survivorRuns++ })
  let escaped = false
  try { k.drain() } catch { escaped = true }
  check('a task throw does not escape the kernel', !escaped)
  check('the other task still ran', survivorRuns > 0)
  const thrower = k.tasks().find((t) => t.name === 'thrower')!
  check('the failing task is marked failed', thrower.state === 'failed')
  check('the failure message is kept', thrower.error === 'deliberate')
  check('the surviving task is not marked failed',
    k.tasks().find((t) => t.name === 'survivor')!.state === 'done')
}

// Resources: a pool that always says yes is not a pool.
{
  const k = new A432Kernel()
  check('the pool starts full', k.available() === RESOURCE_POOL)
  check('a grant within the pool succeeds', k.allocate('t1', 4) === 4)
  check('the pool shrinks by what was granted', k.available() === RESOURCE_POOL - 4)
  check('over-allocation is refused', k.allocate('t2', RESOURCE_POOL) === null)
  check('a refusal changes nothing', k.available() === RESOURCE_POOL - 4)
  check('zero and negative are refused', k.allocate('t3', 0) === null && k.allocate('t3', -1) === null)
  check('a fractional request is refused', k.allocate('t3', 3 / 2) === null)
  check('release returns the units', k.release('t1', 4) && k.available() === RESOURCE_POOL)
  check('releasing more than held is refused', k.release('t1', 1) === false)
  check('two owners share one pool',
    k.allocate('a', 5) === 5 && k.allocate('b', 4) === 4 && k.allocate('c', 1) === null)
}

// The boundary must be closed.
{
  const k = new A432Kernel()
  check('a known syscall dispatches', typeof k.syscall('available') === 'number')
  check('syscall can spawn', typeof k.syscall('spawn', 'via-syscall', () => {}) === 'number')
  check('syscall reaches the digital root', k.syscall('digitalRoot', 48) === 3)
  let refused = false
  try { k.syscall('rm -rf /') } catch { refused = true }
  check('an unknown syscall is refused', refused)
  let refused2 = false
  try { k.syscall('constructor') } catch { refused2 = true }
  check('a name from the prototype chain is refused', refused2)
}

// Persistence
{
  const k = new A432Kernel()
  k.spawn('one', () => {}); k.spawn('two', () => {})
  k.allocate('one', 3); k.drain(); k.start()
  const snap = JSON.parse(JSON.stringify(k.snapshot()))
  const k2 = new A432Kernel()
  check('restore accepts a JSON round-trip', k2.restore(snap))
  check('the task ledger survives', k2.tasks().length === 2)
  check('task states survive', k2.tasks().every((t) => t.state === 'done'))
  check('held resources survive', k2.available() === k.available())
  check('the running flag survives', k2.isRunning() === true)
  check('restore rejects nonsense', new A432Kernel().restore(null as never) === false)
  check('restore rejects a wrong shape', new A432Kernel().restore({ tasks: 'no' } as never) === false)
  // Code is not data: a restored task cannot run, and says so by not being ready.
  check('a restored kernel does not pretend it can run restored code', k2.tick() === null)
}

// Lifecycle
{
  const k = new A432Kernel()
  check('a fresh kernel is not running', k.isRunning() === false)
  k.start(); check('start runs it', k.isRunning() === true)
  k.stop(); check('stop stops it', k.isRunning() === false)
}

console.log()
if (failures > 0) { console.error(`a432.os.kernel FAIL — ${failures}`); process.exit(1) }
console.log('a432.os.kernel ok')
process.exit(0)
