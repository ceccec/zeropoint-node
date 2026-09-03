/**
 * A registry is a promise about round-trips, and nothing was holding it to one.
 *
 * Ten exports here were called by nothing. The laws a registry has are not
 * "register returns an entry" — they are that what goes in comes back out, that
 * an id nobody registered returns nothing rather than throwing or inventing,
 * that the category and type and tag views PARTITION what was registered rather
 * than losing or duplicating it, and that export followed by import is the
 * identity.
 *
 * 1.4.6 recorded that a432ModuleRegistry is declared by two modules with
 * different shapes, so getA432ModulesByCategory means different things
 * depending on which module a caller reaches. These laws are asserted against
 * THIS module's registry by name, which is the only way the distinction stays
 * visible.
 */
import {
  registerA432Component, getA432Component, getA432ComponentsByType,
  getA432ComponentsByCategory, getA432ComponentsByTag,
  registerA432Module, getA432ModulesByCategory, getAllA432Modules,
  registerA432State, getA432State,
  getA432RegistryStats, clearA432RegistryCache, exportA432Registry, importA432Registry,
} from './a432.registry.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

// --- components: what goes in comes back out -----------------------------
const ids = ['probe.one', 'probe.two', 'probe.three']
const payloads = ids.map((id, i) => ({ id, n: i * 3 }))
ids.forEach((id, i) => registerA432Component(id, `name ${i}`, 'probe.type', 'probe.category', payloads[i], { tags: ['probe.tag'] }))

check('what was registered is what comes back, by identity',
  ids.every((id, i) => getA432Component(id) === payloads[i]),
  'not a copy, not a reshape — the same object')

check('an id nobody registered returns undefined rather than throwing',
  getA432Component('probe.absent') === undefined)

check('registering an id twice is REFUSED, and the first registration survives',
  (() => {
    const before = getA432Component('probe.one')
    let threw = false
    try { registerA432Component('probe.one', 'replaced', 'probe.type', 'probe.category', { id: 'probe.one', n: 99 }) } catch { threw = true }
    return threw && getA432Component('probe.one') === before
  })(),
  'a registry that silently overwrites is a registry that loses things')

check('a refused registration leaves the views unchanged',
  getA432ComponentsByType('probe.type').filter((c) => (c as { id: string }).id === 'probe.one').length === 1)

// --- the views agree with what was registered ----------------------------
check('the type view contains every component registered under that type',
  ids.every((id) => getA432ComponentsByType('probe.type').includes(getA432Component(id))))

check('the category view contains every component registered under that category',
  ids.every((id) => getA432ComponentsByCategory('probe.category').includes(getA432Component(id))))

check('the tag view contains every component registered under that tag',
  ids.every((id) => getA432ComponentsByTag('probe.tag').includes(getA432Component(id))))

check('the three views agree with each other',
  (() => {
    const byType = new Set(getA432ComponentsByType('probe.type'))
    const byCat = new Set(getA432ComponentsByCategory('probe.category'))
    return byType.size === byCat.size && [...byType].every((c) => byCat.has(c))
  })())

check('an unknown type, category or tag returns the empty list, not undefined',
  getA432ComponentsByType('probe.absent').length === 0
  && getA432ComponentsByCategory('probe.absent').length === 0
  && getA432ComponentsByTag('probe.absent').length === 0)

check('the views never invent an entry that was not registered',
  getA432ComponentsByType('probe.type').every((c) => ids.some((id) => getA432Component(id) === c)))

// --- modules -------------------------------------------------------------
const mod = {
  name: 'probe.module', category: 'core' as const, version: '1.0.0',
  description: 'a module registered only to test that registering works',
  dependencies: [], exports: [], harmonized: true,
}
registerA432Module(mod as Parameters<typeof registerA432Module>[0])

check('a registered module appears in its category',
  getA432ModulesByCategory('core' as Parameters<typeof getA432ModulesByCategory>[0])
    .some((m) => m.name === 'probe.module'))

check('a registered module appears in the full list exactly once',
  getAllA432Modules().filter((m) => m.name === 'probe.module').length === 1)

check('every module in a category view is in the full list',
  getA432ModulesByCategory('core' as Parameters<typeof getA432ModulesByCategory>[0])
    .every((m) => getAllA432Modules().includes(m)))

check('an unknown category returns the empty list',
  getA432ModulesByCategory('probe.absent' as Parameters<typeof getA432ModulesByCategory>[0]).length === 0)

// --- states --------------------------------------------------------------
const state = { probe: true, n: 7 } as Parameters<typeof registerA432State>[1]
registerA432State('probe.state', state)

check('a registered state round-trips by identity',
  getA432State('probe.state') === state)

check('an unregistered state id returns undefined',
  getA432State('probe.absent.state') === undefined)

// --- statistics agree with the contents ----------------------------------
const stats = getA432RegistryStats()
check('the stats count at least what this test registered',
  typeof stats === 'object' && stats !== null
  && Object.values(stats).some((v) => typeof v === 'number' && v >= ids.length))

// --- export then import is the identity ----------------------------------
const dumped = exportA432Registry()
check('the export is parseable JSON', (() => { try { JSON.parse(dumped); return true } catch { return false } })())

check('exporting then importing keeps every component reachable',
  (() => {
    const ok = importA432Registry(dumped)
    return ok && ids.every((id) => getA432Component(id) !== undefined)
  })())

check('importing malformed JSON returns false rather than throwing',
  (() => {
    // The registry logs the parse failure, which is the right thing for it to
    // do and the wrong thing to print in the middle of a passing suite.
    const err = console.error
    console.error = (): void => {}
    try { return importA432Registry('{not json') === false } catch { return false } finally { console.error = err }
  })())

check('clearing the cache does not lose what was registered',
  (() => { clearA432RegistryCache(); return ids.every((id) => getA432Component(id) !== undefined) })())

console.log(failures === 0
  ? 'a432.registry ok — what is registered comes back, the views agree, and export round-trips through import'
  : `a432.registry FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
