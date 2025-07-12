/**
 * Interface for dimensions in the ZeroPoint system
 */
export interface Dimension {
  name: string;
  type: string;
  complexity: number;
  isActive: boolean;
  parent: string | null;
  dependencies: string[];
  compatibleDimensions: string[];
  supportedOperations: string[];
  description: string;
} 