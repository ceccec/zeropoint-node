/**
 * a432.ui.registry.ts — Unified Overlay/Analytic Registry for A432 UI
 *
 * Exports a registry mapping overlay keys to canonical overlay/analytic modules.
 * Used by the main UI for view switching, orchestration, and harmonization.
 */

import * as Rodin from './a432.rodin.coil.overlay';
import * as Tesla from './a432.tesla.coil.overlay';
import * as Mobius from './a432.mobius.circuit.overlay';
import * as Void from './a432.void.stream.overlay';
import * as Stream from './a432.stream.vortex';
import * as YinYang from './a432.yin.yang';
import * as FlowerOfLife from './a432.flower.of.life';
import * as Heptagram from './a432.heptagram.ui';
import * as TrinityAxis from './a432.trinity.axis';
import * as Uroboros from './a432.uroboros';
import * as Solids from './a432.solids.ui';
import * as Audio from './a432.audio';
import * as HumanConsciousness from './a432.human.consciousness';
import * as HumanDesign from './a432.human.design';

export const overlayRegistry = {
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