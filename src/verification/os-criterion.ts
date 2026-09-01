/**
 * os-criterion — how far a432.os.ts is from being an operating system.
 *
 * The README says: "An operating system — not yet, and under construction.
 * a432.os.ts carries an A432OS class, a manifest, a UI and a start/stop cycle.
 * There is a recognisable target and visible progress toward it." A
 * recognisable target with no measure of distance is a direction, not a plan.
 * This is the measure.
 *
 * IT DIFFERS FROM THE CONSCIOUSNESS CRITERION IN ONE IMPORTANT WAY, and the
 * difference is the whole reason this one is worth more.
 *
 * "Operating system" is not contested. The textbooks agree on what one does:
 * it abstracts units of work, decides which runs, hands out and reclaims
 * finite resources, keeps tasks from corrupting each other, and offers a
 * defined boundary they call across. Those are not five theories arguing —
 * they are one settled account with different emphases.
 *
 * So this criterion can CONFIRM, and the consciousness one cannot. Meeting all
 * of these would not merely fail to rule out an operating system; it would BE
 * a minimal one, in the sense the word is normally used. That makes each unmet
 * condition a work item rather than a philosophical position, which is what
 * "under construction" should mean.
 *
 * What it does not claim: that a system meeting these is a good operating
 * system, or a useful one, or comparable to any OS anyone ships. Minimal means
 * minimal.
 */

export interface OsCondition {
  id: string
  requires: string
  met: boolean
  evidence: string
  whatWouldChange: string
}

export interface OsVerdict {
  met: boolean
  conditionsMet: number
  conditionsTotal: number
  conditions: OsCondition[]
  interpretation: string
}

/** The shape a candidate has to present. Anything can be probed through this. */
export interface OsCandidate {
  /** Submit a unit of work not known at construction time. */
  spawn?: (name: string, run: () => void) => string | number
  /** Advance the system by one scheduling decision, returning what ran. */
  tick?: () => string | number | null
  /** What the system currently holds. */
  tasks?: () => ReadonlyArray<{ id: string | number; name: string; state: string }>
  /** Allocate a unit of a finite resource; null when exhausted. */
  allocate?: (owner: string | number, amount: number) => number | null
  /** Give it back. */
  release?: (owner: string | number, amount: number) => boolean
  /** How much is free. */
  available?: () => number
  /** A defined boundary tasks call across. */
  syscall?: (name: string, ...args: unknown[]) => unknown
  /** Lifecycle. */
  start?: () => void
  stop?: () => void
  isRunning?: () => boolean
  /** Serialise and restore, so state can outlive a run. */
  snapshot?: () => unknown
  restore?: (snapshot: unknown) => boolean
}

function condition(
  id: string, requires: string, met: boolean, evidence: string, whatWouldChange: string,
): OsCondition {
  return { id, requires, met, evidence, whatWouldChange }
}

/** 1. Tasks the system did not know about when it was built. */
function taskAbstraction(os: OsCandidate): OsCondition {
  if (typeof os.spawn !== 'function' || typeof os.tasks !== 'function') {
    return condition('task-abstraction', 'work can be submitted that was not known at construction time',
      false, 'there is no way to submit a unit of work: the system runs a fixed set decided when it was written',
      'a spawn(name, run) that accepts work from outside and a tasks() that lists what is held')
  }
  const before = os.tasks().length
  let ran = false
  os.spawn('probe', () => { ran = true })
  const after = os.tasks().length
  return condition('task-abstraction', 'work can be submitted that was not known at construction time',
    after > before, `tasks went from ${before} to ${after} when one was submitted${ran ? '' : ''}`,
    'submitted work must appear in the task list')
}

/**
 * 2. The system, not the host runtime, decides what runs next.
 *
 * WHAT THIS CHECKS AND WHAT IT DOES NOT. It checks PROGRESS: every submitted
 * task is eventually selected, and the system reports which it chose. It does
 * NOT check FAIRNESS under contention, and I know that because I broke the
 * kernel's scheduler to `ready[0]` — always pick the first — and this condition
 * still returned met while the kernel's own tests failed on it.
 *
 * The reason is structural: probing fairness needs a task that STAYS runnable,
 * and this interface has no way to submit one, because a task here runs and
 * completes. Adding a hook for it would be shaping the criterion around the
 * one implementation I have, which is the failure mode this whole file exists
 * to avoid. So the limit is stated instead: fairness is checked directly in
 * a432.os.kernel.test.ts, which asserts selection counts stay within one turn
 * of each other, and a reader should not take a met here as evidence of it.
 */
function scheduling(os: OsCandidate): OsCondition {
  if (typeof os.tick !== 'function' || typeof os.spawn !== 'function') {
    return condition('scheduling', 'the system decides which task runs next, observably',
      false, 'work is driven by setInterval: the host runtime decides when things run and the system makes no decision it could report',
      'a tick() that picks the next task by a policy the caller can observe')
  }
  const order: Array<string | number> = []
  const a = os.spawn('a', () => {}); const b = os.spawn('b', () => {})
  for (let i = 0; i < 4; i++) { const r = os.tick(); if (r !== null && r !== undefined) order.push(r) }
  const bothRan = order.includes(a) && order.includes(b)
  return condition('scheduling', 'every submitted task is eventually selected, and the system says which it chose (progress, NOT fairness)',
    bothRan, bothRan
      ? `tick() reported an order: ${order.join(' -> ')} — progress only; fairness under contention is not probed here`
      : `tick() did not run both submitted tasks: ${order.join(' -> ')}`,
    'every runnable task must eventually be selected, and tick() must say which it chose')
}

/** 3. A finite resource, handed out and reclaimed, with exhaustion handled. */
function resourceManagement(os: OsCandidate): OsCondition {
  if (typeof os.allocate !== 'function' || typeof os.release !== 'function' || typeof os.available !== 'function') {
    return condition('resource-management', 'a finite resource is allocated, reclaimed, and refuses to over-allocate',
      false, 'nothing is allocated or reclaimed: the system holds fixed state and has no notion of a resource running out',
      'allocate/release over a bounded pool, where allocate returns null rather than over-committing')
  }
  const total = os.available()
  const grant = os.allocate('probe', total)
  const exhausted = os.allocate('probe', 1)
  os.release('probe', total)
  const restored = os.available() === total
  const met = grant !== null && exhausted === null && restored
  return condition('resource-management', 'a finite resource is allocated, reclaimed, and refuses to over-allocate',
    met, `pool ${total}: full grant ${grant !== null}, over-allocation refused ${exhausted === null}, released back to ${os.available()}`,
    'over-allocation must fail rather than succeed, and release must restore the pool')
}

/** 4. One task's failure must not take the system with it. */
function isolation(os: OsCandidate): OsCondition {
  if (typeof os.spawn !== 'function' || typeof os.tick !== 'function' || typeof os.tasks !== 'function') {
    return condition('isolation', 'a task that throws does not stop the system or other tasks',
      false, 'there are no tasks to isolate: a throw inside one of the fixed timers propagates out of the callback',
      'a scheduler that contains a throwing task, marks it failed, and keeps running the others')
  }
  let survivorRan = false
  os.spawn('thrower', () => { throw new Error('probe failure') })
  os.spawn('survivor', () => { survivorRan = true })
  let systemSurvived = true
  try { for (let i = 0; i < 6; i++) os.tick() } catch { systemSurvived = false }
  const failedMarked = os.tasks().some((t) => t.name === 'thrower' && t.state === 'failed')
  return condition('isolation', 'a task that throws does not stop the system or other tasks',
    systemSurvived && survivorRan && failedMarked,
    `system survived: ${systemSurvived}, other task still ran: ${survivorRan}, failure recorded: ${failedMarked}`,
    'the scheduler must catch a task throw, record it against that task, and continue')
}

/** 5. A named boundary, rather than reaching into internals. */
function systemCallBoundary(os: OsCandidate): OsCondition {
  if (typeof os.syscall !== 'function') {
    return condition('syscall-boundary', 'tasks request services through a defined interface',
      false, 'there is no boundary: everything is a public method or a field, so there is nothing a task calls ACROSS',
      'a syscall(name, ...args) that dispatches a closed set of names and rejects the rest')
  }
  let rejected = false
  try { os.syscall('definitely-not-a-real-call') } catch { rejected = true }
  return condition('syscall-boundary', 'tasks request services through a defined interface',
    rejected, rejected ? 'an unknown call is rejected, so the set of calls is closed' : 'an unknown call was accepted, so the boundary admits anything',
    'the dispatcher must refuse names it does not implement')
}

/** 6. A lifecycle with observable state. The one this already has. */
function lifecycle(os: OsCandidate): OsCondition {
  if (typeof os.start !== 'function' || typeof os.stop !== 'function' || typeof os.isRunning !== 'function') {
    return condition('lifecycle', 'the system starts, stops, and reports which it is',
      false, 'no start/stop/isRunning', 'a lifecycle with observable state')
  }
  os.start(); const running = os.isRunning()
  os.stop(); const stopped = !os.isRunning()
  return condition('lifecycle', 'the system starts, stops, and reports which it is',
    running && stopped, `start -> running ${running}, stop -> stopped ${stopped}`,
    'nothing — this one holds')
}

/** 7. State that outlives a run. */
function persistence(os: OsCandidate): OsCondition {
  if (typeof os.snapshot !== 'function' || typeof os.restore !== 'function') {
    return condition('persistence', 'state can be serialised and restored, so it outlives one run',
      false, 'state is regenerated by the constructor on every run: nothing survives, so there is nothing to restore',
      'a snapshot() whose output restore() accepts, reproducing the system state')
  }
  const snap = JSON.parse(JSON.stringify(os.snapshot()))
  const ok = os.restore(snap)
  return condition('persistence', 'state can be serialised and restored, so it outlives one run',
    ok, `snapshot round-tripped through JSON and restored: ${ok}`,
    'restore must accept what snapshot produced')
}

/**
 * Evaluate a candidate. Order matters less than in the consciousness criterion
 * — these probes act on a candidate rather than on shared module state — but
 * they DO mutate the candidate they are given, so each run should get a fresh
 * one.
 */
export function evaluateOsCriterion(os: OsCandidate): OsVerdict {
  // Each probe is contained. A candidate whose tick() throws used to take the
  // evaluator down with it — which is to say this file demanded isolation of
  // its subject and had none of its own. A probe that crashes tells you
  // nothing; a probe that catches tells you the candidate failed that
  // condition, which is the answer you wanted.
  const probe = (fn: (c: OsCandidate) => OsCondition, id: string): OsCondition => {
    try {
      return fn(os)
    } catch (e) {
      return condition(id, 'the probe must be able to run at all', false,
        `probing threw: ${e instanceof Error ? e.message : String(e)}`,
        'a candidate whose methods throw when called cannot be scored on this condition')
    }
  }
  const conditions = [
    probe(taskAbstraction, 'task-abstraction'),
    probe(scheduling, 'scheduling'),
    probe(resourceManagement, 'resource-management'),
    probe(isolation, 'isolation'),
    probe(systemCallBoundary, 'syscall-boundary'),
    probe(lifecycle, 'lifecycle'),
    probe(persistence, 'persistence'),
  ]
  const conditionsMet = conditions.filter((c) => c.met).length
  return {
    met: conditionsMet === conditions.length,
    conditionsMet,
    conditionsTotal: conditions.length,
    conditions,
    interpretation:
      'These conditions are what the textbooks agree an operating system does. Unlike the consciousness '
      + 'criterion, meeting all of them WOULD make this a minimal operating system in the ordinary sense of '
      + 'the term — the word is not contested. Minimal means minimal: it would not make it a good one, a '
      + 'useful one, or comparable to anything anyone ships. The scheduling condition checks progress and '
      + 'not fairness, for a reason stated where it is defined.',
  }
}

/** The work list: what is still missing, and what would change each. */
export function unmetOsConditions(os: OsCandidate): OsCondition[] {
  return evaluateOsCriterion(os).conditions.filter((c) => !c.met)
}
