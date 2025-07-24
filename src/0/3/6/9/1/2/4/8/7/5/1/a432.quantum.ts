import { linearStream, vortexStream } from './a432.matrix';
import { asDigit } from './a432.types';
import { digitAngleToCMYK } from './a432.cmyk';
import { TRINITY_POLARITY, asAngle } from './a432.math';

export interface QState { energy: number; spin: number; angle: number; color: ReturnType<typeof digitAngleToCMYK>; }

function* qStream() {
  const e = linearStream();
  const s = vortexStream();
  while (true) yield { ψ: e.next().value, σ: s.next().value };
}

function nextEnergy(ψ:number,σ:number): number { return asDigit((ψ ^ σ) % 10); }

export function* quantumSolver() {
  const it = qStream();
  for (const {ψ,σ} of it) {
    const energy = nextEnergy(ψ,σ);
    let spin = σ;
    if (TRINITY_POLARITY[σ]===0) spin = [3,6,9][energy%3];
    const angle = asAngle(spin*60%360);
    const color = digitAngleToCMYK(spin, angle);
    const state:QState={energy:energy, spin, angle, color};
    yield state;
  }
} 