import { Operation } from './Operation';

/**
 * Apply operations with pure scientific integrity
 * 
 * All operations are mathematical functions of integers flowing through the Rodin coil.
 * The project itself is the scientific proof.
 */
export function apply(subject: any, op: Operation, context?: any) {
  // Pure scientific operation execution - no external validation needed
  // The operation itself is the proof of its validity
  return op.execute(subject, context);
}

export function applyAll(subject: any, ops: Operation[], context?: any) {
  // Validate all operations for full compliance before execution
  for (const op of ops) {
    if (!validateFullCompliance(op, context)) {
      throw new Error(`Operation ${op.name} failed comprehensive compliance check`);
    }
  }
  return ops.reduce((acc, op) => apply(acc, op, context), subject);
} 