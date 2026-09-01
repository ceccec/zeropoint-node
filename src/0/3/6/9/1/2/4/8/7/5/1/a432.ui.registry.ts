/**
 * a432.ui.registry.ts — Unified Overlay/Analytic Registry for A432 UI
 *
 * Exports a registry mapping overlay keys to canonical overlay/analytic modules.
 * Used by the main UI for view switching, orchestration, and harmonization.
 */

import * as Rodin from './a432.rodin.coil.overlay.ts';
import * as Tesla from './a432.tesla.coil.overlay.ts';
import * as Mobius from './a432.mobius.circuit.overlay.ts';
import * as Void from './a432.void.stream.overlay.ts';
import * as Stream from './a432.stream.vortex.ts';
import * as YinYang from './a432.yin.yang.ts';
import * as FlowerOfLife from './a432.flower.of.life.ts';
import * as Heptagram from './a432.heptagram.ui.ts';
import * as TrinityAxis from './a432.trinity.axis.ts';
import * as Uroboros from './a432.uroboros.ts';
import * as Solids from './a432.solids.ui.ts';
import * as Audio from './a432.audio.ts';
import * as HumanConsciousness from './a432.human.consciousness.ts';
import * as HumanDesign from './a432.human.design.ts';

/**
 * What the UI asks of an overlay, and every member is optional because the
 * fourteen modules below implement different subsets — the switcher probes for
 * what a given overlay provides and skips the rest, with `?.` and `if` guards.
 *
 * Declaring the contract is what lets that probing typecheck. Without it the
 * registry's value type is what fourteen unrelated modules have in common,
 * which is none of these, and 14 of the repository's 96 typecheck errors were
 * that one fact reported once per property. The code was already correct; only
 * the type said otherwise.
 */
export interface A432Overlay {
  getRodinCoil2DOverlayData?: (radius?: number, centerX?: number, centerY?: number) => unknown[]
  getTeslaCoil2DOverlayData?: (radius?: number, centerX?: number, centerY?: number) => unknown[]
  getMobiusCircuit2DOverlayData?: (radius?: number, centerX?: number, centerY?: number) => unknown[]
  getVoidStreamOverlayData?: (length?: number) => unknown[]
  getStreamVortexOverlayData?: (length?: number) => unknown[]
  logRodinCoilEvent?: (blockchain: unknown, node: number, view: '2D' | '3D' | 'analytic', context: unknown) => void
  logTeslaCoilEvent?: (blockchain: unknown, node: number, view: '2D' | '3D' | 'analytic', context: unknown) => void
  logMobiusCircuitEvent?: (blockchain: unknown, node: number, view: '2D' | '3D' | 'analytic', context: unknown) => void
  logVoidImergence?: (type: string, data: unknown) => void
  logStreamVortexEvent?: (blockchain: unknown, dim: number, context: unknown) => void
  // Every member above is optional, which makes this a weak type: TypeScript
  // then rejects a module that happens to implement none of them, and several
  // of the fourteen implement none. They are still modules, and the switcher
  // still has to hold them, so the rest of their exports are admitted here.
  readonly [other: string]: unknown
}

/** The modules themselves, so the registry keeps its literal key names. */
const overlayModules = {
  rodin: Rodin,
  tesla: Tesla,
  mobius: Mobius,
  void: Void,
  stream: Stream,
  yinYang: YinYang,
  flowerOfLife: FlowerOfLife,
  heptagram: Heptagram,
  trinityAxis: TrinityAxis,
  uroboros: Uroboros,
  solids: Solids,
  audio: Audio,
  consciousness: HumanConsciousness,
  humanDesign: HumanDesign,
};

export const overlayRegistry: { [K in keyof typeof overlayModules]: A432Overlay } = overlayModules; 