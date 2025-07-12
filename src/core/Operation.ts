import { validateFullCompliance } from './ComplianceSystem';

// Simple, focused operation interface with comprehensive compliance
export interface Operation {
  name: string;
  execute: (subject: any, context?: any) => any;
}

// Base operations - simple and focused with full compliance checking
export const identity: Operation = {
  name: 'identity',
  execute: (subject) => {
    const result = subject;
    validateFullCompliance(identity);
    return result;
  }
};

export const increment: Operation = {
  name: 'increment',
  execute: (subject) => {
    const result = { ...subject, value: (subject.value || 0) + 1 };
    validateFullCompliance(increment);
    return result;
  }
};

export const double: Operation = {
  name: 'double',
  execute: (subject) => {
    const result = { ...subject, value: (subject.value || 0) * 2 };
    validateFullCompliance(double);
    return result;
  }
};

// Compose simple operations into complex ones with full compliance
export function compose(...ops: Operation[]): Operation {
  return {
    name: ops.map(op => op.name).join('+'),
    execute: (subject, context) => {
      const result = ops.reduce((acc, op) => op.execute(acc, context), subject);
      validateFullCompliance(compose(...ops));
      return result;
    }
  };
}

// Complex operations built from simple ones
export const evolve = compose(increment, double);
export const amplify = compose(double, double);

// Special unify operation that handles context
export const unify: Operation = {
  name: 'unify',
  execute: (subject, context) => {
    const result = { ...subject };
    
    if (context && context.other) {
      result.unifiedWith = context.other;
    } else {
      result.unified = true;
    }
    
    validateFullCompliance(unify);
    return result;
  }
}; 