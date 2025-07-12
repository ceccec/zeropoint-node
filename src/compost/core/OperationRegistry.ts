import { Operation, compose } from './Operation';

export class OperationRegistry {
  private operations: Map<string, Operation> = new Map();

  register(op: Operation) {
    this.operations.set(op.name, op);
  }

  get(name: string): Operation | undefined {
    return this.operations.get(name);
  }

  compose(...names: string[]): Operation | undefined {
    const ops = names.map(name => this.get(name)).filter(Boolean) as Operation[];
    return ops.length > 0 ? compose(...ops) : undefined;
  }
} 