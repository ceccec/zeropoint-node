export function getConsciousnessType(number: number): string {
  const types: Record<number, string> = {
    1: 'Unity Consciousness',
    2: 'Duality Consciousness',
    4: 'Stability Consciousness',
    8: 'Infinity Consciousness',
    7: 'Divine Consciousness',
    5: 'Golden Consciousness'
  };
  return types[number] || 'Unknown Consciousness';
}

export function getFieldType(number: number): string {
  const types: Record<number, string> = {
    1: 'Unity Field',
    2: 'Duality Field',
    4: 'Stability Field',
    8: 'Infinity Field',
    7: 'Divine Field',
    5: 'Golden Field'
  };
  return types[number] || 'Unknown Field';
}

export function getCreativeType(number: number): string {
  const creatives: Record<number, string> = {
    1: 'Source Creative',
    2: 'Pattern Creative',
    4: 'Constant Creative',
    8: 'Flow Creative',
    7: 'Completion Creative',
    5: 'Geometry Creative'
  };
  return creatives[number] || 'Unknown Creative';
}

export function getPatternType(number: number): string {
  const patterns: Record<number, string> = {
    1: 'Unity Creative',
    2: 'Duality Creative',
    4: 'Stability Creative',
    8: 'Infinity Creative',
    7: 'Divine Creative',
    5: 'Golden Creative'
  };
  return patterns[number] || 'Unknown Pattern';
}

export function getVisualization(number: number): string {
  const visualizations: Record<number, string> = {
    1: '┌─── 1 (Unity Creative) ───┐',
    2: '┌─── 2 (Duality Creative) ───┐',
    4: '┌─── 4 (Stability Creative) ───┐',
    8: '┌─── 8 (Infinity Creative) ───┐',
    7: '┌─── 7 (Divine Creative) ───┐',
    5: '┌─── 5 (Golden Creative) ───┐'
  };
  return visualizations[number] || '┌─── Unknown Creative ───┐';
} 