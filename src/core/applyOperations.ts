import { Operation } from './Operation';
import { validateFullCompliance } from './ComplianceSystem';

export function apply(subject: any, op: Operation, context?: any) {
  // Validate operation for full compliance before execution
  if (!validateFullCompliance(op, context)) {
    throw new Error(`Operation ${op.name} failed comprehensive compliance check`);
  }
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