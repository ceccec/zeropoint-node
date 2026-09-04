/**
 * The theorem corpus, drawable — through whatever engine the caller has.
 *
 * scripts/theorem-scene.mjs lays every statement in lean/ onto the vortex torus:
 * angle from its index through the digit sequence, minor angle from the digital
 * root of that digit, colour from its standing. This turns those numbers into
 * objects using the SAME injected surface a432.vbm.animation takes, so the
 * package still ships no engine.
 *
 * WHAT A LAYOUT IS AND IS NOT. Position carries the index and the digital root.
 * It does not carry truth, importance or difficulty, and no reading of the
 * picture is evidence about the corpus — the ledger is. A theorem near another
 * shares a defined object with it; that is the whole of what proximity means.
 */
import type { ThreeLike, ThreeScene, ThreeMesh } from './a432.vbm.animation.ts'

/** One statement, positioned and coloured by scripts/theorem-scene.mjs. */
export interface TheoremNode {
  readonly name: string
  readonly status: string
  readonly restsOnNothing: boolean
  readonly position: { readonly x: number; readonly y: number; readonly z: number }
  readonly hue: number
  readonly speaksOf: readonly string[]
}

export interface TheoremScene {
  readonly torus: { readonly majorRadius: number; readonly minorRadius: number }
  readonly nodes: readonly TheoremNode[]
  readonly edges: readonly { readonly from: string; readonly to: string }[]
}

/** A statement resting on no axioms at all is drawn larger; that is the only
 *  thing size encodes, and it is a fact from the ledger rather than a judgement. */
function radiusFor(node: TheoremNode): number {
  return node.restsOnNothing ? 12 : 8
}

/**
 * Build the corpus into a scene the caller supplies, and hand back the meshes
 * by theorem name so a caller can drive selection without re-deriving anything.
 */
export function buildTheoremScene(
  three: ThreeLike,
  scene: ThreeScene,
  data: TheoremScene,
): ReadonlyMap<string, ThreeMesh> {
  const built = new Map<string, ThreeMesh>()

  const torus = new three.Mesh(
    new three.TorusGeometry(data.torus.majorRadius, data.torus.minorRadius, 24, 96),
    new three.MeshPhongMaterial({ color: 0x222244, wireframe: true, transparent: true, opacity: 1 / 5 }),
  )
  scene.add(torus)

  for (const node of data.nodes) {
    // Tenths, because the scene's radii are integers and the engine wants a
    // fraction of a unit. One division, at the boundary, as everywhere else here.
    const geometry = new three.SphereGeometry(radiusFor(node) / 100, 12, 12)
    const colour = new three.Color().setHSL(node.hue / 360, 7 / 10, 1 / 2)
    const mesh = new three.Mesh(geometry, new three.MeshPhongMaterial({ color: colour }))
    mesh.position.set(node.position.x, node.position.y, node.position.z)
    scene.add(mesh)
    built.set(node.name, mesh)
  }

  return built
}

/** What the picture does not say, carried in the module rather than in a README
 *  nobody opens beside it. */
export const THEOREM_SCENE_DOES_NOT_ESTABLISH =
  'A layout is a way of looking at a ledger, not evidence about it. Proximity means two statements '
  + 'speak of the same defined object. Size means a proof rests on no axioms at all. Nothing here '
  + 'reports whether a statement is true — the kernel does that, and lean/ledger.json records it.'
