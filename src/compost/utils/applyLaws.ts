import { MetaphysicalLaw } from '../laws/MetaphysicalLaw';

export function applyLaws<T>(subject: T, laws: MetaphysicalLaw[]): T {
  return laws.reduce((acc, law) => law.apply(acc), subject);
} 