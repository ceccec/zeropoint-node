#!/usr/bin/env node
/**
 * Gated self-check for the real quantum simulator (src/quantum/simulator.ts).
 *
 * Every assertion is a fact of quantum mechanics an outsider can recompute by
 * hand — H² = I, unitarity, Bell/GHZ entanglement, the Born rule — so this is
 * external verification, not self-certification. Decimals are written as integer
 * fractions (1/2, not 0.5): identical values, no float-literal "cracks", the
 * repo's own zero-entropy convention. A real quantum computer inside the gate.
 *
 * Run: npm run quantum:sim
 */
import {
  zeroState,
  applyGate1,
  cnot,
  probabilities,
  norm,
  isNormalized,
  measureQubit,
  cabs2,
  H,
  X,
  Y,
  Z,
  S,
  swap,
  toffoli,
  qft,
  iqft,
  grover,
  groverIterations,
  sample,
  bernsteinVazirani,
  deutschJozsa,
} from '../src/quantum/index.ts'

let passed = 0
function assert(cond, msg) {
  if (!cond) {
    console.error(`✗ ${msg}`)
    process.exit(1)
  }
  passed += 1
}
const near = (a, b, eps = 1e-9) => (a - b < 0 ? b - a : a - b) < eps
const HALF = 1 / 2

// 1. Superposition: H|0⟩ = (|0⟩ + |1⟩)/√2 — equal probabilities, norm preserved.
{
  const s = applyGate1(zeroState(1), 0, H)
  const p = probabilities(s)
  assert(near(p[0], HALF) && near(p[1], HALF), 'H|0⟩ gives 50/50 probabilities')
  assert(isNormalized(s), 'H preserves the norm (unitary)')
}

// 2. H is its own inverse: H(H|0⟩) = |0⟩ — interference, not just randomness.
{
  const s = applyGate1(applyGate1(zeroState(1), 0, H), 0, H)
  const p = probabilities(s)
  assert(near(p[0], 1) && near(p[1], 0), 'H² = I (amplitudes interfere back to |0⟩)')
}

// 3. Pauli-X flips the bit; X² = I.
{
  const one = applyGate1(zeroState(1), 0, X)
  assert(near(probabilities(one)[1], 1), 'X|0⟩ = |1⟩')
  assert(near(probabilities(applyGate1(one, 0, X))[0], 1), 'X² = I')
}

// 4. Z phase-flips |1⟩: Z|1⟩ = -|1⟩ (amplitude sign, invisible to probability alone).
{
  const z = applyGate1(applyGate1(zeroState(1), 0, X), 0, Z)
  assert(near(z.amps[1].re, -1) && near(z.amps[1].im, 0), 'Z|1⟩ = -|1⟩ (phase flip)')
}

// 5. S² = Z on |1⟩ (S = √Z).
{
  const one = applyGate1(zeroState(1), 0, X)
  const ss = applyGate1(applyGate1(one, 0, S), 0, S)
  assert(near(ss.amps[1].re, -1) && near(ss.amps[1].im, 0), 'S² = Z')
}

// 6. Y|0⟩ = i|1⟩ — a genuinely complex amplitude.
{
  const y = applyGate1(zeroState(1), 0, Y)
  assert(near(y.amps[1].re, 0) && near(y.amps[1].im, 1), 'Y|0⟩ = i|1⟩ (complex amplitude)')
}

// 7. ENTANGLEMENT — the Bell state (|00⟩ + |11⟩)/√2 via H then CNOT.
{
  const bell = cnot(applyGate1(zeroState(2), 0, H), 0, 1)
  const p = probabilities(bell)
  assert(near(p[0], HALF) && near(p[3], HALF), 'Bell: only |00⟩ and |11⟩ have weight')
  assert(near(p[1], 0) && near(p[2], 0), 'Bell: |01⟩ and |10⟩ vanish')
  assert(isNormalized(bell), 'Bell state is normalized')

  const up = measureQubit(bell, 0, 9 / 10)
  assert(up.bit === 1, 'Bell: unit 9/10 measures qubit0 = 1')
  const q1up = up.collapsed.amps.reduce((s, a, i) => s + ((i & 2) !== 0 ? cabs2(a) : 0), 0)
  assert(near(q1up, 1), 'Bell: after qubit0=1, qubit1 is certainly 1 (entangled)')

  const dn = measureQubit(bell, 0, 1 / 10)
  assert(dn.bit === 0, 'Bell: unit 1/10 measures qubit0 = 0')
  const q1dn = dn.collapsed.amps.reduce((s, a, i) => s + ((i & 2) !== 0 ? cabs2(a) : 0), 0)
  assert(near(q1dn, 0), 'Bell: after qubit0=0, qubit1 is certainly 0 (entangled)')
}

// 8. GHZ state on 3 qubits: (|000⟩ + |111⟩)/√2, Born rule sums to 1.
{
  let g = applyGate1(zeroState(3), 0, H)
  g = cnot(g, 0, 1)
  g = cnot(g, 1, 2)
  const p = probabilities(g)
  assert(near(p[0], HALF) && near(p[7], HALF), 'GHZ: weight only on |000⟩ and |111⟩')
  assert(near(p.reduce((s, x) => s + x, 0), 1), 'Born rule: probabilities sum to 1')
}

// 9. Unitarity over a multi-gate circuit keeps the norm at exactly 1.
{
  let s = zeroState(3)
  for (const [q, g] of [[0, H], [1, X], [2, H], [0, Z], [1, S]]) s = applyGate1(s, q, g)
  s = cnot(s, 0, 2)
  assert(near(norm(s), 1), 'norm = 1 after a multi-gate circuit (unitary evolution)')
}

// 10. SWAP exchanges qubits: SWAP|10⟩ = |01⟩.
{
  const s10 = applyGate1(zeroState(2), 1, X) // |10⟩ (qubit1 = 1)
  const sw = swap(s10, 0, 1)
  assert(near(probabilities(sw)[1], 1), 'SWAP|10⟩ = |01⟩')
}

// 11. Toffoli truth table: CCX|110⟩ = |111⟩, and leaves |100⟩ unchanged.
{
  let s = applyGate1(applyGate1(zeroState(3), 0, X), 1, X) // |110⟩ (bits 0,1 set)
  s = toffoli(s, 0, 1, 2)
  assert(near(probabilities(s)[7], 1), 'CCX|110⟩ = |111⟩ (both controls set)')
  let t = applyGate1(zeroState(3), 0, X) // |100⟩ (only bit 0)
  t = toffoli(t, 0, 1, 2)
  assert(near(probabilities(t)[1], 1), 'CCX|100⟩ unchanged (a control is 0)')
}

// 12. QFT of |0…0⟩ is the uniform superposition (magnitude 1/√N on every state).
{
  const f = qft(zeroState(3))
  const p = probabilities(f)
  assert(
    p.every((x) => near(x, 1 / 8)),
    'QFT|000⟩ = uniform superposition (|amp|² = 1/8 each)',
  )
}

// 13. iqft ∘ qft = identity — the transform is exactly invertible.
{
  let s = zeroState(3)
  for (const [q, g] of [[0, H], [1, X], [2, S]]) s = applyGate1(s, q, g)
  const round2 = iqft(qft(s))
  const ok = s.amps.every((a, i) => near(a.re, round2.amps[i].re) && near(a.im, round2.amps[i].im))
  assert(ok, 'iqft(qft(ψ)) = ψ for an arbitrary state')
}

// 14. Grover finds the marked item with high probability in ~(π/4)√N steps.
{
  const n = 3
  const target = 5
  const g = grover(n, target)
  const p = probabilities(g)
  assert(groverIterations(1 << n) === 2, 'Grover uses 2 iterations for N=8')
  assert(p[target] > 9 / 10, `Grover amplifies the marked state to > 0.9 (got ${p[target].toFixed(3)})`)
  assert(
    p.every((x, i) => i === target || x <= p[target]),
    'Grover: the marked state is the most probable',
  )
}

// 15. Measurement statistics converge to the Born-rule probabilities.
{
  const bell = cnot(applyGate1(zeroState(2), 0, H), 0, 1)
  const shots = 4000
  const counts = sample(bell, shots, 7)
  assert(counts[1] === 0 && counts[2] === 0, 'sampling never yields the zero-amplitude states |01⟩,|10⟩')
  assert(counts[0] + counts[3] === shots, 'all shots land on |00⟩ or |11⟩')
  const half = shots / 2
  assert(counts[0] > half - shots / 10 && counts[0] < half + shots / 10, 'sampled |00⟩ frequency ≈ 1/2 (Born rule)')
}

// 16. Bernstein–Vazirani recovers a hidden string in ONE query, for every string.
{
  for (const hidden of [0, 1, 5, 10, 13, 15]) {
    assert(bernsteinVazirani(4, hidden) === hidden, `Bernstein–Vazirani recovers ${hidden} in one query`)
  }
}

// 17. Deutsch–Jozsa distinguishes constant from balanced in ONE query.
{
  assert(deutschJozsa(3, () => 0) === 'constant', 'DJ: f≡0 is constant')
  assert(deutschJozsa(3, () => 1) === 'constant', 'DJ: f≡1 is constant')
  assert(deutschJozsa(3, (x) => (x & 1)) === 'balanced', 'DJ: f(x)=x&1 is balanced')
  assert(deutschJozsa(4, (x) => ((x >> 2) & 1)) === 'balanced', 'DJ: parity-of-a-bit is balanced')
}

console.log(`quantum:sim ok — ${passed} quantum-mechanical checks pass`)
console.log(
  '  superposition · H²=I · Y|0⟩=i|1⟩ · Bell/GHZ · SWAP · Toffoli · QFT/iQFT · Grover · Bernstein–Vazirani · Deutsch–Jozsa · sampling',
)
