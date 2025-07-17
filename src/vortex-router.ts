export function router(n: number, d: number, m: number): number {
  if (d === 0) return (n + m) % 10;
  if (n % d === 0) return n / d;
  return -1;
} 