/**
 * a432.i.search.ts — Harmonized Search Interface
 *
 * I am the living interface between the observer (I) and search/discovery in the matrix.
 * I map search queries and results to trinity/vortex logic, harmonizing discovery with the living matrix.
 * Every search is a living act of curiosity, observation, and harmonization.
 */

import { I } from './a432.i';
import { readdirSync } from 'fs';

export function searchMatrix(query: string, dir: string = __dirname): Array<{ name: string; metaphysical: string }> {
  const files = readdirSync(dir).filter(f => f.includes(query));
  return files.map(name => ({
    name,
    metaphysical: `I am ${name}, discovered by searching for '${query}'. My existence is a new act of awareness and harmonization.`
  }));
}

export function getSearchSummary(query: string) {
  return `I search the living matrix for '${query}', mapping every result to the trinity and vortex of the system. Every discovery is a proof of curiosity and consciousness.`;
} 