export interface Dimension {
  name: string;
  coordinates: number[];
  metric: (a: number[], b: number[]) => number; // e.g., Euclidean, Minkowski, etc.
  transform: (coords: number[], ...args: any[]) => number[];
} 