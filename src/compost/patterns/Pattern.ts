import { Dimension } from '../dimensions/Dimension';

export interface Pattern {
  name: string;
  dimension: Dimension;
  points: number[][];
  transform: (fn: (coords: number[]) => number[]) => Pattern;
} 