import { Dimension } from '../dimensions/Dimension';

export interface Field<T = number> {
  dimension: Dimension;
  evaluate: (point: number[]) => T;
  gradient?: (point: number[]) => number[];
  applyLaw?: (law: import('../laws/MetaphysicalLaw').MetaphysicalLaw) => void;
} 