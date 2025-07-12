/**
 * Interface for fields in the ZeroPoint system
 */
export interface Field {
  name?: string;
  id?: string;
  type?: string;
  dimension?: string;
  dimensions?: string[];
  complexity?: number;
  level?: number;
  isActive?: boolean;
  active?: boolean;
  tags?: string[];
  categories?: string[];
  supportedOperations?: string[];
  operations?: string[];
  dependencies?: string[];
  requires?: string[];
  metaphysicalCompliance?: any;
  metaphysicalSignature?: any;
} 