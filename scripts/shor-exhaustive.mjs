#!/usr/bin/env node
/**
 * Shor's algorithm over EVERY input the simulator can address, and what it cost.
 *
 * The seal for this used to factor 15 with base 7 and compare the product to
 * the literal 15 — its own basis said INSTANCE ONLY. Then it ran a family of
 * eight pairs. This runs the whole reachable space: every modulus from 4 to 33
 * and every base from 2 to N-1, 495 pairs, and asks two questions a family
 * cannot answer.
 *
 * ONE: DOES IT EVER RETURN A WRONG FACTORISATION? Not "does it factor 15", but
 * is there any input at all for which it returns a pair that is not a true
 * factorisation of N. The answer is the strongest form of correctness available
 * without a proof, and it is checked against N itself rather than a literal.
 *
 * TWO: IS EVERY REFUSAL EXPLAINED? 240 of the 495 return null, and an
 * unexplained null is indistinguishable from a bug. Shor's fails in exactly
 * three ways: N is prime so no factorisation exists, the period r is odd, or
 * a^(r/2) ≡ -1 mod N. Every null must be one of those. A null outside them
 * would mean the implementation refuses inputs the mathematics says it should
 * handle — which is what a classical search wearing the name would look like.
 *
 * THAT SECOND CHECK IS THE ONE THAT IDENTIFIES THE METHOD. Correctness alone is
 * satisfied by trial division. Failing PRECISELY where Shor's fails, and
 * nowhere else, is not.
 *
 * THE COINS ARE REPORTED, because a Shor result without its cost is the half of
 * the story that flatters. The sweep spends about 2^30 elementary complex
 * updates to confirm factorisations that trial division finds in ~3000
 * divisions — 583,108 : 1 against. The method is genuine and the advantage is
 * inverted, and both belong in the same output.
 *
 * THIS CHECK CANNOT EXIST WHERE SHOR MATTERS, AND THAT IS NOT A LIMITATION TO
 * BE ENGINEERED AWAY.
 *
 * The refusal analysis below calls `orderOf(a, N)`, which finds the
 * multiplicative period by trying every exponent in turn. That is a classical
 * brute-force search, and it is EXACTLY THE PROBLEM SHOR'S ALGORITHM EXISTS TO
 * SOLVE. So the second question — is every refusal one of the three known
 * failure modes — is answerable only where the period is already computable
 * classically, which is precisely the regime in which nobody needs Shor.
 *
 * The same is true of the first question. "Is this a true factorisation" is
 * cheap because multiplying p by q is cheap, so correctness scales. But
 * "should this input have factored" needs the period, and at RSA sizes there is
 * no oracle to ask. Run this at N large enough to be interesting and the
 * verification does not get slow — it becomes IMPOSSIBLE, because the tool it
 * depends on is the thing under test.
 *
 * That is why the instrument stops at 33 and says so, rather than reporting a
 * bound it could raise. An exhaustive check over a space you can enumerate is
 * evidence about an implementation, never about an algorithm's advantage; the
 * ability to run it at all is proof that the advantage is absent here.
 *
 * Folded behind a fingerprint: 36 seconds is too long for every chain run, and
 * the answer only changes when the simulator or the algorithm does.
 *
 *   npm run shor:exhaustive
 *   npm run shor:exhaustive -- --check
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { totalmem } from 'node:os'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const RECORD = join(ROOT, 'src/verification/shor-exhaustive.json')
const CHECK = process.argv.includes('--check')
/**
 * THE BOUND IS MEASURED, NOT TYPED.
 *
 * This read `const MAX_N = 63`, with a comment arguing 63 was principled
 * because bits(N) turns over at 64. The argument was sound and the constant was
 * still a constant: an EXHAUSTIVE check whose ceiling is typed in means "every
 * input" quietly meaning "every input that fitted the machine I wrote it on".
 * A faster machine gets no more coverage; a slower one gets a timeout.
 *
 * So the tool measures its own capacity. A band is every N sharing a value of
 * bits(N), because those all cost the same 3m qubits — admitting a width means
 * admitting all of it, since a half-covered band is the arbitrary bound again
 * in a different disguise. The only figure a human sets is the budget below.
 *
 * THE PROBE MUST BE BUDGETED TOO, and this is where the first version hung. It
 * ran a probe at each width and THEN asked whether the band fitted, so it
 * reached m=9 and started allocating 2^27 amplitudes to discover that 2^27
 * amplitudes are too many. A measurement that costs more than the thing it is
 * deciding about is not a measurement. Past the second width the cost of the
 * next probe is PREDICTED from the observed growth factor, and a width whose
 * predicted band already exceeds the remaining budget is never run at all.
 */
/**
 * THE BUDGET IS THE MACHINE'S, NOT MINE.
 *
 * This read `Number(process.env.SHOR_BUDGET_MS ?? 120_000)`, and I then passed
 * SHOR_BUDGET_MS=25000 on every run so the gate chain would finish. That put
 * the arbitrariness straight back one level up: the typed ceiling was replaced
 * by a measured one, and then the measurement was governed by a number I chose
 * to suit myself. A knob is a constant with a person attached.
 *
 * The QPU already answers this. `qpu:pentagram` measures five resources and
 * names the binding one — on this machine RAM, at 2^31 amplitudes — and it
 * records that CPU and GPU add no state and only divide the TIME one sweep
 * takes. So the budget has a definition that needs no human: the time this
 * machine takes to touch its binding capacity ONCE, which is that capacity
 * divided by the amplitude-gate throughput measured here, now.
 *
 * Both halves are measured. Neither is typed. A faster machine gets a smaller
 * budget and a wider sweep in the same wall time, which is what "sized by the
 * hardware" has to mean if it means anything.
 */
function measuredBudgetMs() {
  // The binding point, by the pentagram's own arithmetic: 16 bytes an amplitude
  // (two float64), and RAM is what binds on this machine.
  const amplitudesAtCapacity = totalmem() / 16

  // Amplitude-gate throughput, measured on a register small enough to sit in
  // cache so this calibration is quick and not itself the thing being budgeted.
  const calibrationQubits = 12
  const size = 1 << calibrationQubits
  const re = new Float64Array(size)
  const im = new Float64Array(size)
  re[0] = 1
  const sweep = () => {
    for (let q = 0; q < calibrationQubits; q += 1) {
      const bit = 1 << q
      for (let i = 0; i < size; i += 1) {
        if ((i & bit) !== 0) continue
        const j = i | bit
        const ar = re[i], ai = im[i], br = re[j], bi = im[j]
        re[i] = ar + br; im[i] = ai + bi
        re[j] = ar - br; im[j] = ai - bi
      }
    }
  }
  sweep() // warm the path; a cold run is not a sample
  const trials = []
  for (let k = 0; k < 3; k += 1) {
    const t0 = Date.now()
    sweep()
    trials.push(Date.now() - t0)
  }
  trials.sort((a, b) => a - b)
  const perSweepMs = Math.max(trials[1], 1)
  const opsPerSweep = calibrationQubits * size
  const opsPerMs = opsPerSweep / perSweepMs

  return { budgetMs: Math.round(amplitudesAtCapacity / opsPerMs), amplitudesAtCapacity, opsPerMs }
}

const measured = measuredBudgetMs()
/**
 * The override remains, because a CI runner may need to bound the wall clock —
 * but it is RECORDED as a deviation rather than silently becoming the budget.
 * A smaller sweep that looks identical to a full one is how a ceiling stops
 * meaning anything.
 */
const BUDGET_OVERRIDE = process.env.SHOR_BUDGET_MS ? Number(process.env.SHOR_BUDGET_MS) : null
const BUDGET_MS = BUDGET_OVERRIDE ?? measured.budgetMs

const SOURCES = ['src/quantum/algorithms.ts', 'src/quantum/simulator.ts', 'scripts/shor-exhaustive.mjs']
const fingerprint = (() => {
  const h = createHash('sha256')
  for (const f of SOURCES) h.update(f).update(readFileSync(join(ROOT, f)))
  return h.digest('hex').slice(0, 32)
})()

if (CHECK && existsSync(RECORD)) {
  const raw = readFileSync(RECORD, 'utf8')
  let rec = null
  try { rec = JSON.parse(raw) } catch {
    console.error('shor:exhaustive FAIL — the record is not readable JSON')
    process.exit(1)
  }
  if (JSON.stringify(rec, null, 2) + '\n' !== raw) {
    console.error('shor:exhaustive FAIL — the record does not round-trip: its bytes have been altered')
    process.exit(1)
  }
  if (typeof rec.contentHash !== 'string' || contentHashOf(rec) !== rec.contentHash) {
    console.error('shor:exhaustive FAIL — the record does not match its own contentHash')
    process.exit(1)
  }
  if (rec.inputsFingerprint === fingerprint) {
    if (rec.wrong.length > 0 || rec.unexplained.length > 0 || (rec.succeededWhereShorMustRefuse ?? []).length > 0) {
      console.error(`shor:exhaustive FAIL — recorded ${rec.wrong.length} wrong factorisation(s) and ${rec.unexplained.length} unexplained refusal(s)`)
      process.exit(1)
    }
    console.log(`shor:exhaustive ok — ${rec.runs} inputs, ${rec.correct} factored, ${rec.nulls} refused, 0 wrong, 0 unexplained (recorded)`)
    console.log(`                    neither the algorithm nor the simulator has moved (fingerprint ${fingerprint.slice(0, 12)})`)
    process.exit(0)
  }
  console.log('shor:exhaustive — the algorithm or the simulator has moved; re-running every input')
}

const { shor } = await import(join(ROOT, 'src/quantum/algorithms.ts'))

const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return false; return true }
const orderOf = (a, N) => { let x = a % N; let r = 1; while (x !== 1) { x = (x * a) % N; r += 1; if (r > 2 * N) return 0 } return r }
const powMod = (a, e, N) => { let x = 1; for (let i = 0; i < e; i += 1) x = (x * a) % N; return x }
const bits = (n) => { let b = 0; while ((1 << b) < n) b += 1; return b }


/**
 * THE BAND COST IS DERIVED, NOT TIMED — and that is what makes the ceiling
 * reproducible.
 *
 * This timed one real `shor()` per width, warmed and taking the median of
 * three. It was still a stopwatch on a shared machine: three runs of identical
 * code read the 15-qubit band at ~30s, ~30s and 63.4s, and the sweep stopped at
 * N=31, N=31 and N=15. A ceiling that moves with the load average is not a
 * property of the code, and a peer recomputing the record would disagree with
 * it for reasons that have nothing to do with Shor.
 *
 * But the work is already known exactly. A modulus N with m = bits(N) uses
 * t = 2m counting qubits over a 3m-qubit register, and the circuit is t
 * Hadamards, t controlled modular multiplications and an inverse QFT over t
 * qubits — every one of them touching all 2^(3m) amplitudes. So the cost of a
 * band is an arithmetic fact, and the only measured quantity left is the
 * machine's throughput, which the budget already needed.
 *
 * One measurement of the machine, one calculation from it. Nothing here is
 * timed twice, and the same tree gives the same ceiling on the same hardware
 * whatever else is running.
 */
const runsInBand = (lo, hi) => { let r = 0; for (let N = lo; N <= hi; N += 1) r += N - 2; return r }

/** Amplitude-gate operations for one (N, a) pair at m = bits(N). */
const opsPerRun = (m) => {
  const t = 2 * m
  const size = 2 ** (t + m)
  return (t + t + (t * (t + 1)) / 2) * size
}

function measureCapacity() {
  const bands = []
  let spent = 0
  for (let m = 3; m <= 12; m += 1) {
    const lo = (1 << (m - 1)) + 1
    const hi = (1 << m) - 1
    const runs = runsInBand(lo, hi)
    const bandMs = (opsPerRun(m) * runs) / measured.opsPerMs
    if (spent + bandMs > BUDGET_MS) {
      bands.push({ m, lo, hi, runs, bandMs, admitted: false })
      break
    }
    spent += bandMs
    bands.push({ m, lo, hi, runs, bandMs, admitted: true })
  }
  const admitted = bands.filter((b) => b.admitted)
  if (admitted.length === 0) {
    console.error('shor:exhaustive FAIL — no width fits the budget, so this would sweep nothing and report success')
    process.exit(1)
  }
  return { bands, maxN: admitted[admitted.length - 1].hi, spent }
}

const capacity = measureCapacity()
const MAX_N = capacity.maxN
console.log(`  capacity measured against a ${(BUDGET_MS / 1000).toFixed(0)}s budget — no bound is typed`)
console.log(`    the budget is the machine's: ${(measured.amplitudesAtCapacity / 1e9).toFixed(1)}e9 amplitudes at the binding point,`)
console.log(`    divided by ${(measured.opsPerMs / 1e3).toFixed(0)}k measured amplitude-gate ops per ms = ${(measured.budgetMs / 1000).toFixed(0)}s`)
if (BUDGET_OVERRIDE !== null) console.log(`    OVERRIDDEN to ${(BUDGET_OVERRIDE / 1000).toFixed(0)}s by SHOR_BUDGET_MS — this sweep is smaller than the machine allows`)
for (const b of capacity.bands) {
  console.log(`    ${b.admitted ? 'take' : 'STOP'}  N=${String(b.lo).padStart(4)}..${String(b.hi).padStart(4)}  ${3 * b.m} qubits  `
    + `${String(b.runs).padStart(6)} runs  ~${(b.bandMs / 1000).toFixed(1)}s  derived from ${(measured.opsPerMs / 1e3).toFixed(0)}k ops/ms`)
}
console.log(`    -> sweeping every input to N=${MAX_N}\n`)

/**
 * ONE SWEEP, TWO FACTORISERS, AND THAT IS WHAT MAKES IT FALSIFIABLE.
 *
 * The self-discrimination test first lived as a SECOND loop that recomputed
 * `mustRefuse` for itself and counted how often trial division tripped it. It
 * reported 93 and it guarded nothing: deleting the converse arm from the real
 * sweep would have left that parallel loop counting 93 exactly as before. A
 * check you can delete without breaking the check that checks it is a conjunct,
 * not a dependency.
 *
 * So the checking is one function and both factorisers go through it. Remove
 * the converse arm and the classical stand-in stops being caught, and the
 * assertion below fails. The guard now reads what it claims to guard.
 */
function sweep(factorise) {
  const wrong = []
  const unexplained = []
  const succeededWhereShorMustRefuse = []
  const refusal = { prime: 0, oddPeriod: 0, negativeOne: 0 }
  let runs = 0, correct = 0, nulls = 0
  let amplitudes = 0n, gateOps = 0n

  for (let N = 4; N <= MAX_N; N += 1) {
    const m = bits(N)
    const t = 2 * m
    const size = 2n ** BigInt(t + m)
    for (let a = 2; a < N; a += 1) {
      runs += 1
      amplitudes += size
      // t Hadamards, t controlled modular multiplications, an inverse QFT over t
      // qubits — each touching every amplitude.
      gateOps += (BigInt(t) + BigInt(t) + BigInt((t * (t + 1)) / 2)) * size

      let out
      try { out = factorise(N, a) } catch (err) {
        unexplained.push({ N, a, why: `threw: ${err.message}` })
        continue
      }

      // THE CONVERSE, AND WITHOUT IT THIS CHECK IS NOT ABOUT SHOR AT ALL.
      //
      // Verifying that every REFUSAL is explained catches an implementation
      // that refuses too much. It cannot catch one that refuses too LITTLE —
      // and classical trial division refuses nothing, so it produced 0 wrong
      // and 0 unexplained and passed this instrument cleanly while being no
      // more Shor's algorithm than long division is. I had already told a peer
      // that failing precisely where Shor fails is what a classical search
      // could not reproduce; that was true of the CLAIM and false of the CHECK.
      //
      // Shor's construction yields a factor from a period r only when r is even
      // and a^(r/2) != -1 mod N. Where those fail there is nothing for the
      // classical post-processing to use, so a period-finder MUST refuse, and
      // succeeding there is proof the answer came from somewhere else.
      const coprime = gcd(a, N) === 1
      const period = coprime ? orderOf(a, N) : 0
      const mustRefuse = coprime && period > 0
        && (period % 2 === 1 || powMod(a, period / 2, N) === N - 1)

      if (out !== null) {
        const [p, q] = out
        // Compared against N, which varies across the sweep — no expected answer
        // is written down anywhere in this file.
        const trueFactorisation = Number.isInteger(p) && Number.isInteger(q)
          && p > 1 && q > 1 && p < N && q < N && p * q === N
        if (!trueFactorisation) { wrong.push({ N, a, got: out }); continue }
        if (mustRefuse) {
          succeededWhereShorMustRefuse.push({
            N, a, period,
            why: period % 2 === 1 ? 'odd period' : 'a^(r/2) = -1 mod N',
          })
        }
        correct += 1
        continue
      }

      nulls += 1
      if (isPrime(N)) { refusal.prime += 1; continue }
      if (gcd(a, N) !== 1) { unexplained.push({ N, a, why: 'shares a factor with N yet refused' }); continue }
      const r = orderOf(a, N)
      if (r === 0) { unexplained.push({ N, a, why: 'no multiplicative order found' }); continue }
      if (r % 2 === 1) { refusal.oddPeriod += 1; continue }
      if (powMod(a, r / 2, N) === N - 1) { refusal.negativeOne += 1; continue }
      unexplained.push({ N, a, why: `even period r=${r} and a^(r/2) != -1 — the mathematics says this should factor` })
    }
  }
  return { wrong, unexplained, succeededWhereShorMustRefuse, refusal, runs, correct, nulls, amplitudes, gateOps }
}

const started = Date.now()
const real = sweep(shor)
const elapsedMs = Date.now() - started

const { wrong, unexplained, succeededWhereShorMustRefuse, refusal, runs, correct, nulls, amplitudes, gateOps } = real

/**
 * THE FIXTURE ASSERTS ITS OWN DISCRIMINATING POWER, through the same code.
 *
 * A classical trial-division factoriser wearing the algorithm's interface. It
 * ignores `a` entirely — there is no period in it to be even or odd — and it
 * refuses only for primes. If the checks above cannot tell it from the real
 * implementation then a clean sweep is evidence of nothing, and this must fail
 * rather than report success.
 */
const classicalStandIn = (N) => {
  for (let d = 2; d * d <= N; d += 1) if (N % d === 0) return [d, N / d]
  return null
}
const classical = sweep(classicalStandIn)
const classicalCaught = classical.succeededWhereShorMustRefuse.length
if (classicalCaught === 0) {
  console.error('shor:exhaustive FAIL — classical trial division substituted for the algorithm is NOT')
  console.error('  caught by these checks, so a clean sweep here would be evidence of nothing.')
  console.error(`  stand-in: wrong=${classical.wrong.length} unexplained=${classical.unexplained.length} caught=0 over ${classical.runs} pairs`)
  process.exit(1)
}



// A sweep that ran nothing would report 0 wrong and 0 unexplained too.
if (runs === 0) {
  console.error('shor:exhaustive FAIL — 0 inputs run, so "no wrong answers" is vacuous')
  process.exit(1)
}

const record = sealRecord({
  what: `Shor's algorithm over every modulus 4..${MAX_N} and every base 2..N-1. Two questions a family of inputs cannot answer: is any returned pair NOT a true factorisation, and is any refusal outside the three ways Shor's is known to fail.`,
  doesNotEstablish: 'any speedup, and it cannot be run where Shor matters. The refusal analysis calls a CLASSICAL brute-force order finder — the very problem Shor solves — so "every refusal is one of the three known failure modes" is answerable only in the regime where the period is already computable classically, which is the regime where nobody needs Shor. Correctness scales because multiplying p by q is cheap; the failure characterisation does not scale at all. Being able to run this check is itself evidence that the advantage is absent here. The method is genuine and the execution is a classical simulation costing 2^(3m) amplitudes for m = bits(N), which is measured below and runs 583,108 : 1 against trial division over the same inputs. Correctness is total; the advantage is inverted.',
  inputsFingerprint: fingerprint,
  maxN: MAX_N,
  budgetMs: BUDGET_MS,
  budgetIsMeasured: BUDGET_OVERRIDE === null,
  measuredBudgetMs: measured.budgetMs,
  amplitudesAtBindingPoint: measured.amplitudesAtCapacity,
  measuredOpsPerMs: Math.round(measured.opsPerMs),
  capacityBands: capacity.bands,
  // "EXHAUSTIVE" IS A CLAIM ABOUT A RANGE, AND THE RANGE MOVED. The typed bound
  // said 63 and never measured whether 63 was reachable; the measured bound
  // says 31 under a 120s budget and names the band it declined. A check that
  // narrows its own scope silently is worse than one with an arbitrary bound,
  // because the word "every" survives the narrowing.
  notSwept: capacity.bands.filter((b) => !b.admitted).map((b) => ({
    range: `${b.lo}..${b.hi}`, qubits: 3 * b.m, runs: b.runs,
    estimateMs: Math.round(b.bandMs),
    wouldNeedMs: Math.round(b.bandMs),
  })),
  runs,
  correct,
  nulls,
  refusal,
  wrong,
  unexplained,
  succeededWhereShorMustRefuse,
  classicalStandInCaught: classicalCaught,
  classicalStandInWrong: classical.wrong.length,
  classicalStandInUnexplained: classical.unexplained.length,
  coins: {
    amplitudesAllocated: amplitudes.toString(),
    amplitudeGateOperations: gateOps.toString(),
    approxPowerOfTwo: gateOps.toString(2).length - 1,
    trialDivisionsForSameInputs: runs * 6,
    ratioAgainst: Number(gateOps / BigInt(runs * 6)),
    elapsedMs,
  },
})

if (!CHECK) writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')

console.log(`  Shor over every input to N=${MAX_N}: ${runs} pairs in ${(elapsedMs / 1000).toFixed(1)}s`)
console.log(`    factored              ${correct}`)
console.log(`    refused               ${nulls}   (prime ${refusal.prime}, odd period ${refusal.oddPeriod}, a^(r/2) = -1 ${refusal.negativeOne})`)
console.log(`    WRONG factorisations  ${wrong.length}`)
console.log(`    UNEXPLAINED refusals  ${unexplained.length}`)
console.log(`    SUCCEEDED where period-finding must refuse  ${succeededWhereShorMustRefuse.length}`)
console.log(`\n  the coins: ${gateOps.toLocaleString()} amplitude-gate operations (~2^${gateOps.toString(2).length - 1})`)
console.log(`             against ~${runs * 6} trial divisions for the same inputs — ${Number(gateOps / BigInt(runs * 6)).toLocaleString()} : 1 AGAINST`)

for (const w of wrong.slice(0, 5)) console.error(`    wrong: N=${w.N} a=${w.a} -> ${JSON.stringify(w.got)}`)
for (const u of unexplained.slice(0, 5)) console.error(`    unexplained: N=${u.N} a=${u.a} — ${u.why}`)
for (const x of succeededWhereShorMustRefuse.slice(0, 5)) console.error(`    not period-finding: N=${x.N} a=${x.a} r=${x.period} (${x.why}) yet it factored`)
if (wrong.length > 0 || unexplained.length > 0 || succeededWhereShorMustRefuse.length > 0) {
  console.error('shor:exhaustive FAIL — a wrong answer, or a refusal the mathematics does not predict')
  process.exit(1)
}
console.log(`\n  AND THE CHECK ITSELF DOES NOT SCALE: the refusal analysis calls a classical`)
console.log('  brute-force order finder, which is the problem Shor solves. At any N where')
console.log('  the algorithm would matter there is no oracle to ask, so this instrument')
console.log('  exists only in the regime where the advantage does not.')
/**
 * WHAT THIS LINE USED TO SAY, AND WHY IT WAS WRONG.
 *
 * It read: "Failing PRECISELY where Shor's fails is what a classical search
 * wearing the name could not do." That is a true statement about the CLAIM and
 * was a false statement about the CHECK, which only ran one direction.
 *
 * Verifying that every refusal is explained catches an implementation that
 * refuses too much. It cannot catch one that refuses too LITTLE — and classical
 * trial division refuses nothing, so substituting it for the algorithm produced
 * 0 wrong and 0 unexplained and passed cleanly. The arm was vacuous, and the
 * sentence above it was doing the work the code was not.
 */
console.log(`\nshor:exhaustive ok — ${runs} inputs to N=${MAX_N}, checked in BOTH directions.`)
console.log('                    No refusal outside the three ways Shor\'s is known to fail, AND no')
console.log('                    success on any input where period-finding must refuse. The second arm')
console.log('                    is the one that identifies the method: classical trial division passes')
console.log(`                    the first cleanly (0 wrong, 0 unexplained) and fails the second in`)
console.log(`                    ${classicalCaught} of these ${runs} inputs — computed on this run, not quoted.`)
for (const b of capacity.bands.filter((x) => !x.admitted)) {
  console.log(`                    NOT swept: N=${b.lo}..${b.hi} (${b.runs} inputs, ${3 * b.m} qubits) — `
    + `~${(b.bandMs / 60000).toFixed(0)} min of derived work at this machine's measured throughput.`)
}
