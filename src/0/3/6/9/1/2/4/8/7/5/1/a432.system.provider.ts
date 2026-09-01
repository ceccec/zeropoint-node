/**
 * a432.system.provider — what the self-* subsystems actually need from the
 * system, so they stop importing the barrel that imports them.
 *
 * THE CYCLE THIS REMOVES. a432.index.ts imports a432.self.evolution,
 * a432.self.rebuilder and a432.consciousness.orchestrator, and all three
 * imported `A432System` back out of a432.index.ts. That is one strongly
 * connected component and the repository's only import cycle.
 *
 * It was known and worked around three times rather than removed. Every one of
 * those modules resolves its system reference lazily, through a Proxy or a
 * `??=` getter, each with a comment explaining the hazard — a432.self.evolution
 * says plainly that touching A432System from a constructor "made a432.index.ts,
 * and its four importers, fail to load entirely". Three lazy workarounds for
 * one edge is the edge asking to be deleted.
 *
 * The subsystems need three methods between them: getFactory, getNavigationMap
 * and getRegistry. That is the whole interface, so it is declared here and the
 * system registers itself against it. The subsystems now depend on a contract
 * rather than on the module that assembles them, which is the direction
 * dependencies are supposed to point.
 *
 * The types come from the three modules that define them, none of which
 * imports the barrel — so this introduces no new edge.
 */
import type { A432Factory } from './a432.factory.ts';
import type { A432NavigationMap } from './a432.navigation.map.ts';
import type { A432Registry } from './a432.registry.ts';

/** Everything the self-* subsystems ask of the system, and nothing more. */
export interface A432SystemProvider {
  getFactory(): A432Factory;
  getNavigationMap(): A432NavigationMap;
  getRegistry(): A432Registry;
}

let provider: A432SystemProvider | null = null;

/** a432.index.ts calls this once, with the lazy system proxy it already exports. */
export function registerA432System(system: A432SystemProvider): void {
  provider = system;
}

/**
 * The registered system. Throws rather than returning null, because a
 * subsystem reaching for the system before it exists is a load-order fault and
 * should say so instead of failing three frames later on undefined.
 */
export function a432SystemProvider(): A432SystemProvider {
  if (!provider) {
    throw new Error(
      'a432: no system registered yet — import a432.index.ts before using a self-* subsystem',
    );
  }
  return provider;
}

/** Whether a system has been registered. For tests and for load-order checks. */
export function hasA432System(): boolean {
  return provider !== null;
}
