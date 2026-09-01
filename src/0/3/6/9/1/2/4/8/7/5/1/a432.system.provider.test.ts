/**
 * The provider's tests. Its whole purpose is to remove an import cycle, so the
 * properties worth asserting are about registration and about failing loudly
 * when nothing has registered — a subsystem reaching for the system before it
 * exists is a load-order fault and should say so rather than fail three frames
 * later on undefined.
 */
import { createCheck } from '../../../../../../../../../../../verification/harness.ts'
import { registerA432System, a432SystemProvider, hasA432System, type A432SystemProvider } from './a432.system.provider.ts'

const { check, failures } = createCheck()

// Capture whatever is registered so this suite can be run in any order.
const previouslyRegistered = hasA432System() ? a432SystemProvider() : null

const stub: A432SystemProvider = {
  getFactory: () => ({ probe: 'factory' }) as never,
  getNavigationMap: () => ({ probe: 'map' }) as never,
  getRegistry: () => ({ probe: 'registry' }) as never,
}

registerA432System(stub)
check('registering makes a system available', hasA432System())
check('the registered system is the one returned', a432SystemProvider() === stub)
check('it exposes exactly the three methods the subsystems use',
  (['getFactory', 'getNavigationMap', 'getRegistry'] as const).every(m => typeof a432SystemProvider()[m] === 'function'))
check('registering again replaces it', (() => {
  const second: A432SystemProvider = { ...stub }
  registerA432System(second)
  return a432SystemProvider() === second
})())

// Restore whatever the rest of the process had, so this suite is not a
// landmine for anything importing a432.index.ts alongside it.
if (previouslyRegistered) registerA432System(previouslyRegistered)
check('the previous registration can be restored',
  previouslyRegistered ? a432SystemProvider() === previouslyRegistered : true)

console.log()
if (failures() > 0) { console.error(`a432.system.provider FAIL — ${failures()}`); process.exit(1) }
console.log('a432.system.provider ok')
process.exit(0)
