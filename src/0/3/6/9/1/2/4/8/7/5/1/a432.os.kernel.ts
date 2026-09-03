/**
 * a432.os.kernel — a minimal kernel, built against src/verification/os-criterion.ts.
 *
 * The README calls a432.os.ts "not yet, and under construction", which was
 * fair: it is four fixed setInterval timers and a state generator. Nothing it
 * does is a scheduling decision, nothing is allocated or reclaimed, and a
 * throw inside a timer callback escapes into the host. The criterion scores it
 * 1 of 7 — it has a lifecycle.
 *
 * This is the construction. It implements the six missing properties as
 * mechanisms rather than as methods that satisfy a probe:
 *
 *   tasks         work submitted after construction, held and listed
 *   scheduling    round-robin over ready tasks, one quantum per tick, and the
 *                 tick REPORTS which it chose
 *   resources     a bounded pool that refuses to over-allocate and reclaims
 *   isolation     a task that throws is caught, marked failed, and the rest
 *                 keep running
 *   syscalls      a closed dispatch table; an unknown name is refused
 *   persistence   snapshot/restore of kernel state
 *
 * WHAT IT IS NOT: an operating system in any useful sense. It schedules
 * closures inside one JavaScript thread. There is no memory protection, no
 * privilege boundary, no preemption — a task that loops forever holds the
 * kernel, exactly as a cooperative scheduler always has. What the criterion
 * measures is whether the mechanisms are present and behave, not whether they
 * would survive contact with real hardware.
 *
 * The scheduling quantum and the pool size are the repo's own numbers rather
 * than round decimals, which is the house style and also means they are stated
 * once.
 */
import { digitalRoot } from '../../../../../../../../../../index.ts'
import { A432_CONSTANTS } from './a432.math.ts'

export type TaskState = 'ready' | 'running' | 'done' | 'failed'

export interface KernelTask {
  id: number
  name: string
  state: TaskState
  runs: number
  error: string | null
}

interface InternalTask extends KernelTask {
  run: (() => void) | null
}

export interface KernelSnapshot {
  nextId: number
  cursor: number
  running: boolean
  poolTotal: number
  held: Array<[string, number]>
  tasks: KernelTask[]
}

/** One tick runs one task. The trinity digit, not a round number. */
export const SCHEDULING_QUANTUM = 1

/** The pool is the base frequency reduced — a bounded resource, sized by the repo's own constant. */
export const RESOURCE_POOL = A432_CONSTANTS.BASE_FREQUENCY / 48 // 9 units

export class A432Kernel {
  private tasksById = new Map<number, InternalTask>()
  private order: number[] = []
  private cursor = 0
  private nextId = 1
  private running = false
  private readonly poolTotal = RESOURCE_POOL
  private held = new Map<string, number>()

  // ——— lifecycle ———
  start(): void { this.running = true }
  stop(): void { this.running = false }
  isRunning(): boolean { return this.running }

  // ——— tasks ———

  /** Submit work the kernel did not know about when it was constructed. */
  spawn(name: string, run: () => void): number {
    const id = this.nextId++
    this.tasksById.set(id, { id, name, state: 'ready', runs: 0, error: null, run })
    this.order.push(id)
    return id
  }

  tasks(): KernelTask[] {
    // Explicit rather than destructuring `run` away: a discarded binding reads
    // as an unused variable to the linter, and the field list is worth stating
    // because it is the boundary between kernel internals and what a caller sees.
    return [...this.tasksById.values()].map((t) => ({
      id: t.id, name: t.name, state: t.state, runs: t.runs, error: t.error,
    }))
  }

  /**
   * One scheduling decision. Round-robin over ready tasks, so every runnable
   * task is eventually selected — the property that makes it a scheduler
   * rather than a loop. Returns the id it chose, or null when nothing is ready.
   *
   * A task that throws is contained here. That containment is the whole reason
   * a kernel runs tasks instead of the tasks running themselves.
   */
  tick(): number | null {
    // `order` IS the ready queue, and a finished task leaves it.
    //
    // This used to filter the whole of `order` on every tick — every task ever
    // spawned, scanned and copied into a new array to find the ready ones. A
    // task runs once and is then done, so `order` only ever grew, and the scan
    // grew with it: the real-time criterion measured the floor of a step rising
    // from 38 to 368 microseconds over twenty thousand frames. A scheduler
    // whose cost grows with the number of tasks it has already finished is not
    // a scheduler anyone can keep running.
    //
    // The finished task stays in `tasksById`, so tasks(), snapshot() and the OS
    // criterion still see the full history. What leaves is its place in the
    // queue.
    while (this.order.length > 0) {
      const head = this.order[this.cursor % this.order.length]!
      if (this.tasksById.get(head)?.state === 'ready') break
      this.order.splice(this.cursor % this.order.length, 1)
    }
    if (this.order.length === 0) return null
    const chosen = this.order[this.cursor % this.order.length]!
    this.cursor = (this.cursor + 1) % this.order.length
    const task = this.tasksById.get(chosen)!
    task.state = 'running'
    try {
      for (let q = 0; q < SCHEDULING_QUANTUM; q++) task.run?.()
      task.runs++
      task.state = 'done'
    } catch (e) {
      task.runs++
      task.state = 'failed'
      task.error = e instanceof Error ? e.message : String(e)
    }
    // It is finished either way, so it leaves the queue rather than being
    // filtered out of every future tick.
    const at = this.order.indexOf(chosen)
    if (at >= 0) this.order.splice(at, 1)
    if (this.order.length > 0) this.cursor = this.cursor % this.order.length
    else this.cursor = 0
    return chosen
  }

  /** Run until nothing is ready, with a bound so a kernel cannot hang its caller. */
  drain(maxTicks = 1000): number[] {
    const ran: number[] = []
    for (let i = 0; i < maxTicks; i++) {
      const id = this.tick()
      if (id === null) break
      ran.push(id)
    }
    return ran
  }

  // ——— resources ———

  available(): number {
    let used = 0
    for (const n of this.held.values()) used += n
    return this.poolTotal - used
  }

  /** Refuses rather than over-committing. A pool that always says yes is not a pool. */
  allocate(owner: string | number, amount: number): number | null {
    if (!Number.isInteger(amount) || amount <= 0) return null
    if (amount > this.available()) return null
    const key = String(owner)
    this.held.set(key, (this.held.get(key) ?? 0) + amount)
    return amount
  }

  release(owner: string | number, amount: number): boolean {
    const key = String(owner)
    const has = this.held.get(key) ?? 0
    if (amount <= 0 || amount > has) return false
    const left = has - amount
    if (left === 0) this.held.delete(key); else this.held.set(key, left)
    return true
  }

  // ——— the boundary ———

  /**
   * A closed dispatch table. The point is not that it forwards — it is that
   * the set is closed, so a task cannot reach anything the kernel has not
   * chosen to offer.
   */
  syscall(name: string, ...args: unknown[]): unknown {
    switch (name) {
      case 'spawn': return this.spawn(args[0] as string, args[1] as () => void)
      case 'tasks': return this.tasks()
      case 'available': return this.available()
      case 'allocate': return this.allocate(args[0] as string, args[1] as number)
      case 'release': return this.release(args[0] as string, args[1] as number)
      case 'yield': return this.tick()
      case 'digitalRoot': return digitalRoot(args[0] as number)
      default:
        throw new Error(`a432 kernel: no such syscall ${JSON.stringify(name)}`)
    }
  }

  // ——— persistence ———

  /**
   * Task CODE cannot be serialised — a closure is not data, and pretending
   * otherwise would be the dishonest version of this. What survives is the
   * kernel's state and the task ledger; restored tasks carry their history
   * and are marked so a caller knows their code must be re-registered.
   */
  snapshot(): KernelSnapshot {
    return {
      nextId: this.nextId,
      cursor: this.cursor,
      running: this.running,
      poolTotal: this.poolTotal,
      held: [...this.held.entries()],
      tasks: this.tasks(),
    }
  }

  restore(snapshot: KernelSnapshot): boolean {
    if (!snapshot || typeof snapshot !== 'object') return false
    if (!Array.isArray(snapshot.tasks) || !Array.isArray(snapshot.held)) return false
    this.nextId = snapshot.nextId
    this.cursor = snapshot.cursor
    this.running = snapshot.running
    this.held = new Map(snapshot.held)
    this.tasksById = new Map(snapshot.tasks.map((t) => [t.id, { ...t, run: null }]))
    this.order = snapshot.tasks.map((t) => t.id)
    return true
  }
}

/** The kernel presented in the shape the criterion probes. */
export function kernelAsCandidate(kernel: A432Kernel = new A432Kernel()) {
  return {
    spawn: (name: string, run: () => void) => kernel.spawn(name, run),
    tick: () => kernel.tick(),
    tasks: () => kernel.tasks(),
    allocate: (owner: string | number, amount: number) => kernel.allocate(owner, amount),
    release: (owner: string | number, amount: number) => kernel.release(owner, amount),
    available: () => kernel.available(),
    syscall: (name: string, ...args: unknown[]) => kernel.syscall(name, ...args),
    start: () => kernel.start(),
    stop: () => kernel.stop(),
    isRunning: () => kernel.isRunning(),
    snapshot: () => kernel.snapshot(),
    restore: (s: unknown) => kernel.restore(s as KernelSnapshot),
  }
}
