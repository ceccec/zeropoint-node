import { MetaphysicalLaw } from '../laws/MetaphysicalLaw';

export function applyLaws<T>(subject: T, laws: MetaphysicalLaw[], context?: any): T {
  let result = subject;
  for (const law of laws) {
    if (typeof law.apply === 'function') {
      result = law.apply(result, context);
    }
  }
  return result;
} 