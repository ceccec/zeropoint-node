export interface MetaphysicalLaw {
  name: string;
  description: string;
  apply: <T>(subject: T, context?: any) => T;
} 