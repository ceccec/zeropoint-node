import Lake
open Lake DSL

package quantum {
  -- Lean 4 quantum computing system formal verification
  version := v"1.0.0"
  leanVersion := v"v4.8.0"
}

require mathlib from git "https://github.com/leanprover-community/mathlib4" @ "v4.8.0"

@[default_target]
lean_lib Quantum

lean_exe quantum_verify where
  root := `Main
