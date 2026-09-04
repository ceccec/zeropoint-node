/**
 * The theorem scene builds against a STUB engine.
 *
 * Two things at once. It exercises buildTheoremScene, which nothing else calls
 * — the package ships no renderer, so without this the export is unexercisable
 * and the coverage ceiling rises for the crime of removing a dependency.
 *
 * And it proves the inversion is real. ThreeLike was extracted so the engine
 * could be the caller's; a surface only three can satisfy is not an interface,
 * it is an import with extra steps. The stub below is forty lines of nothing,
 * and the scene builds on it exactly as it would on the real thing.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { buildTheoremScene, THEOREM_SCENE_DOES_NOT_ESTABLISH, type TheoremScene } from './a432.theorem.scene.ts'
import type { ThreeLike, ThreeScene } from './a432.vbm.animation.ts'

function stubEngine(): { three: ThreeLike; scene: ThreeScene; added: unknown[] } {
  const added: unknown[] = []
  const colour = { setHSL() { return colour }, getHSL: (t: { h: number; s: number; l: number }) => t }
  const placed = () => ({ position: { copy() {}, set() {} }, scale: { set() {} }, material: { color: colour } })
  const three = {
    Color: function () { return colour }, Vector3: function (x: number, y: number, z: number) { return { x, y, z } },
    Scene: function () { return { add() {} } },
    PerspectiveCamera: function () { return { position: { copy() {}, set() {} }, aspect: 1, updateProjectionMatrix() {} } },
    WebGLRenderer: function () { return { render() {}, setSize() {} } },
    Mesh: function () { return placed() },
    SphereGeometry: function () { return {} }, TorusGeometry: function () { return {} },
    MeshPhongMaterial: function () { return { color: colour } },
    AmbientLight: function () { return {} }, PointLight: function () { return placed() },
  } as unknown as ThreeLike
  return { three, scene: { add: (o) => { added.push(o) } }, added }
}

const scene: TheoremScene = {
  torus: { majorRadius: 4, minorRadius: 1 },
  nodes: [
    { name: 'a', status: 'proven', restsOnNothing: true, position: { x: 1, y: 0, z: 0 }, hue: 120, speaksOf: ['dr'] },
    { name: 'b', status: 'sorry', restsOnNothing: false, position: { x: 0, y: 1, z: 0 }, hue: 40, speaksOf: ['dr'] },
  ],
  edges: [{ from: 'a', to: 'b' }],
}

test('the corpus builds against an engine that is not three', () => {
  const { three, scene: target, added } = stubEngine()
  const built = buildTheoremScene(three, target, scene)
  assert.equal(built.size, 2, 'one mesh per theorem, returned by name')
  assert.ok(built.has('a') && built.has('b'))
  assert.equal(added.length, 3, 'the torus and both theorem meshes were added to the scene')
})

test('the picture says in its own module what it does not establish', () => {
  assert.match(THEOREM_SCENE_DOES_NOT_ESTABLISH, /not evidence about it/)
  assert.match(THEOREM_SCENE_DOES_NOT_ESTABLISH, /kernel does that/)
})

// ── the frame survives a throwing renderer ──────────────────────────────────
// ceccec-github-io-5b's shape: a self-rescheduling loop with no isolation dies
// on the first throw and cannot be restarted, and a frozen animation looks like
// a static design. Perturbed against the real controller, not a description of
// it: a renderer that throws must leave the loop STOPPED and RESTARTABLE, and
// must be counted rather than swallowed.
import { createVBMAnimation } from './a432.vbm.animation.ts'

test('a throwing frame stops the loop, is counted, and leaves it restartable', () => {
  const { three } = stubEngine()
  const throwing = {
    ...(three as unknown as Record<string, unknown>),
    WebGLRenderer: function () {
      return { render() { throw new Error('renderer fault') }, setSize() {} }
    },
  } as unknown as ThreeLike
  ;(globalThis as { window?: unknown }).window ??= { innerWidth: 800, innerHeight: 600, addEventListener() {} }

  const controller = createVBMAnimation(throwing)
  assert.equal(controller.faults().count, 0, 'no fault before the first frame')
  controller.start()

  assert.equal(controller.isTurning(), false, 'the loop stopped rather than freezing mid-flight')
  assert.equal(controller.faults().count, 1, 'the fault was counted, not swallowed')
  assert.match(controller.faults().last ?? '', /renderer fault/)

  controller.stop()
  controller.start()
  assert.equal(controller.faults().count, 2, 'and it is restartable — the second attempt ran and faulted too')
})
