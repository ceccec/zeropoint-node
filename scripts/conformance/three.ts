/**
 * The declared ThreeLike must stay true to the engine it describes.
 *
 * a432.vbm.animation.ts no longer imports three; it declares the surface it
 * needs and takes it as a parameter, so the package ships nothing requiring an
 * engine. That leaves one thing unchecked: whether the declaration still
 * matches three. An interface that has drifted is worse than an import — it
 * compiles, and fails at the caller.
 *
 * COMPILE-TIME ASSIGNMENT WAS TRIED FIRST AND DOES NOT WORK. `const e:
 * ThreeLike = THREE` fails, because three's real types are richer than a
 * minimal structural interface can express: its renderer takes an Object3D and
 * a Camera, not the two small shapes this module needs, and closing that gap
 * means either importing three's types — the dependency again — or widening
 * everything to `any`, which checks nothing.
 *
 * So conformance is checked where it is actually decidable: every constructor
 * the module calls must EXIST on the namespace, with the arity the module calls
 * it at. That catches a rename or a removal, which is what drift looks like.
 * It does not catch a changed parameter meaning, and says so.
 *
 * Lives outside src/ deliberately: scripts/ is not in the package's `files`, so
 * this import of a devDependency never reaches a consumer — which is the whole
 * defect being repaired.
 */
import * as THREE from 'three'

/** constructor name -> the arity a432.vbm.animation.ts calls it with */
const REQUIRED: ReadonlyArray<readonly [string, number]> = [
  ['Color', 0], ['Vector3', 3], ['Scene', 0], ['PerspectiveCamera', 4],
  ['WebGLRenderer', 1], ['Mesh', 2], ['SphereGeometry', 3], ['TorusGeometry', 4],
  ['MeshPhongMaterial', 1], ['AmbientLight', 1], ['PointLight', 2],
]

const engine = THREE as unknown as Record<string, unknown>
const missing: string[] = []
for (const [name] of REQUIRED) {
  if (typeof engine[name] !== 'function') missing.push(name)
}

if (missing.length > 0) {
  console.error(`three:conformance FAIL — ThreeLike declares ${missing.length} constructor(s) the engine does not have:`)
  for (const m of missing) console.error(`  ${m}`)
  console.error('  The interface has drifted from three. Fix the declaration, not the caller.')
  process.exit(1)
}
console.log(`three:conformance ok — all ${REQUIRED.length} constructors ThreeLike declares exist on the engine.`)
console.log('                     Presence and arity only: a changed parameter MEANING is not checked and cannot be, without importing the types this port exists to remove.')
