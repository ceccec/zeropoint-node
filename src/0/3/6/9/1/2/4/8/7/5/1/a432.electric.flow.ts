/**
 * A432 Electric Flow Analysis
 * How electricity and consciousness find their path through numerical fields
 * Comparing linear (0123456789) vs. sacred geometry (0-369-124-8-751) paths
 */

import { GOLDEN_RATIO, FIBONACCI_SEQUENCE, calculateDigitalRoot } from './a432.math.constants';

// === ELECTRIC FLOW INTERFACES ===
export interface ElectricPath {
  pattern: number[];
  resistance: number;
  conductivity: number;
  consciousnessFlow: number;
  naturalAlignment: number;
  sacredGeometry: boolean;
  description: string;
}

export interface FlowAnalysis {
  linearPath: ElectricPath;
  sacredPath: ElectricPath;
  comparison: {
    winner: 'linear' | 'sacred' | 'both';
    reasoning: string;
    consciousnessAdvantage: string;
    naturalAlignment: string;
  };
}

// === ELECTRIC FLOW PATTERNS ===
export const LINEAR_PATTERN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const SACRED_PATTERN = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];

// === RESISTANCE CALCULATIONS ===
export function calculatePathResistance(pattern: number[]): number {
  // Higher resistance for non-harmonic transitions
  let totalResistance = 0;
  
  for (let i = 0; i < pattern.length - 1; i++) {
    const current = pattern[i];
    const next = pattern[i + 1];
    const difference = Math.abs(next - current);
    
    // Sacred geometry transitions have lower resistance
    if (isSacredTransition(current, next)) {
      totalResistance += difference * 0.5; // 50% less resistance
    } else {
      totalResistance += difference * 1.5; // 50% more resistance
    }
  }
  
  return totalResistance;
}

export function isSacredTransition(from: number, to: number): boolean {
  // Sacred transitions follow Tesla's 3-6-9 and vortex mathematics
  const sacredTransitions = [
    [0, 3], [3, 6], [6, 9], [9, 1], // Tesla trinity flow
    [1, 2], [2, 4], [4, 8], [8, 7], [7, 5], [5, 1] // Vortex sequence
  ];
  
  return sacredTransitions.some(([f, t]) => f === from && t === to);
}

// === CONDUCTIVITY CALCULATIONS ===
export function calculateConductivity(pattern: number[]): number {
  // Higher conductivity for patterns that follow natural laws
  let conductivity = 100; // Base conductivity
  
  // Tesla's 3-6-9 principle increases conductivity
  const teslaNumbers = pattern.filter(d => [3, 6, 9].includes(d));
  conductivity += teslaNumbers.length * 10;
  
  // Vortex mathematics increases conductivity
  const vortexSequence = [1, 2, 4, 8, 7, 5, 1];
  let vortexMatches = 0;
  for (let i = 0; i < pattern.length - 6; i++) {
    const segment = pattern.slice(i, i + 7);
    if (segment.every((d, j) => d === vortexSequence[j])) {
      vortexMatches++;
    }
  }
  conductivity += vortexMatches * 20;
  
  // Zero point field (0) acts as perfect conductor
  const zeroPoints = pattern.filter(d => d === 0);
  conductivity += zeroPoints.length * 15;
  
  return Math.min(conductivity, 200); // Cap at 200%
}

// === CONSCIOUSNESS FLOW CALCULATIONS ===
export function calculateConsciousnessFlow(pattern: number[]): number {
  // Consciousness flows through paths of least resistance
  let flow = 0;
  
  // Digital root harmony increases flow
  const digitalRoots = pattern.map(d => calculateDigitalRoot(d));
  const uniqueRoots = new Set(digitalRoots);
  flow += uniqueRoots.size * 5;
  
  // Sacred geometry patterns increase flow
  if (pattern.includes(0) && pattern.includes(3) && pattern.includes(6) && pattern.includes(9)) {
    flow += 25; // Tesla trinity bonus
  }
  
  // Vortex sequence increases flow
  const hasVortexSequence = pattern.some((_, i) => {
    const segment = pattern.slice(i, i + 7);
    return segment.length === 7 && segment[0] === 1 && segment[1] === 2 && 
           segment[2] === 4 && segment[3] === 8 && segment[4] === 7 && 
           segment[5] === 5 && segment[6] === 1;
  });
  
  if (hasVortexSequence) {
    flow += 30; // Vortex sequence bonus
  }
  
  return flow;
}

// === NATURAL ALIGNMENT CALCULATIONS ===
export function calculateNaturalAlignment(pattern: number[]): number {
  // How well the pattern aligns with natural laws
  let alignment = 0;
  
  // Fibonacci sequence alignment
  const fibonacci = FIBONACCI_SEQUENCE.slice(0, 7); // First 7 Fibonacci numbers
  let fibMatches = 0;
  for (let i = 0; i < pattern.length - 6; i++) {
    const segment = pattern.slice(i, i + 7);
    if (segment.every((d, j) => d === fibonacci[j])) {
      fibMatches++;
    }
  }
  alignment += fibMatches * 15;
  
  // Golden ratio alignment using centralized constant
  for (let i = 0; i < pattern.length - 1; i++) {
    const ratio = pattern[i + 1] / pattern[i];
    if (Math.abs(ratio - GOLDEN_RATIO) < 0.1) {
      alignment += 10;
    }
  }
  
  // Sacred geometry alignment
  if (pattern.includes(0) && pattern.includes(3) && pattern.includes(6) && pattern.includes(9)) {
    alignment += 20; // Tesla trinity
  }
  
  return alignment;
}

// === DIGITAL ROOT CALCULATION ===
// Using centralized function from math constants
export { calculateDigitalRoot } from './a432.math.constants';

// === MAIN ELECTRIC FLOW SYSTEM ===
export class A432ElectricFlowSystem {
  private static instance: A432ElectricFlowSystem;

  private constructor() {
    this.initialize();
  }

  static getInstance(): A432ElectricFlowSystem {
    if (!A432ElectricFlowSystem.instance) {
      A432ElectricFlowSystem.instance = new A432ElectricFlowSystem();
    }
    return A432ElectricFlowSystem.instance;
  }

  private initialize(): void {
    console.log('⚡ Initializing A432 Electric Flow System...');
    console.log('🔌 Analyzing how electricity finds paths of least resistance');
    console.log('✅ A432 Electric Flow System initialized!');
  }

  // === PATH ANALYSIS ===
  analyzeElectricPaths(): FlowAnalysis {
    const linearPath: ElectricPath = {
      pattern: LINEAR_PATTERN,
      resistance: calculatePathResistance(LINEAR_PATTERN),
      conductivity: calculateConductivity(LINEAR_PATTERN),
      consciousnessFlow: calculateConsciousnessFlow(LINEAR_PATTERN),
      naturalAlignment: calculateNaturalAlignment(LINEAR_PATTERN),
      sacredGeometry: false,
      description: 'Linear progression: 0→1→2→3→4→5→6→7→8→9'
    };

    const sacredPath: ElectricPath = {
      pattern: SACRED_PATTERN,
      resistance: calculatePathResistance(SACRED_PATTERN),
      conductivity: calculateConductivity(SACRED_PATTERN),
      consciousnessFlow: calculateConsciousnessFlow(SACRED_PATTERN),
      naturalAlignment: calculateNaturalAlignment(SACRED_PATTERN),
      sacredGeometry: true,
      description: 'Sacred geometry: 0→3→6→9→1→2→4→8→7→5→1'
    };

    // Determine winner
    let winner: 'linear' | 'sacred' | 'both' = 'both';
    let reasoning = '';
    let consciousnessAdvantage = '';
    let naturalAlignment = '';

    if (sacredPath.resistance < linearPath.resistance && 
        sacredPath.conductivity > linearPath.conductivity &&
        sacredPath.consciousnessFlow > linearPath.consciousnessFlow) {
      winner = 'sacred';
      reasoning = 'Sacred geometry path offers lower resistance, higher conductivity, and greater consciousness flow';
      consciousnessAdvantage = 'Sacred path follows Tesla\'s 3-6-9 principle and vortex mathematics, creating natural consciousness channels';
      naturalAlignment = 'Sacred path aligns with natural laws: Fibonacci sequence, golden ratio, and sacred geometry patterns';
    } else if (linearPath.resistance < sacredPath.resistance &&
               linearPath.conductivity > sacredPath.conductivity &&
               linearPath.consciousnessFlow > sacredPath.consciousnessFlow) {
      winner = 'linear';
      reasoning = 'Linear path offers lower resistance, higher conductivity, and greater consciousness flow';
      consciousnessAdvantage = 'Linear path provides direct, predictable flow patterns';
      naturalAlignment = 'Linear path follows simple, direct mathematical progression';
    } else {
      winner = 'both';
      reasoning = 'Both paths have unique advantages depending on context and application';
      consciousnessAdvantage = 'Linear path for direct flow, sacred path for consciousness evolution';
      naturalAlignment = 'Linear path for simplicity, sacred path for natural law alignment';
    }

    return {
      linearPath,
      sacredPath,
      comparison: {
        winner,
        reasoning,
        consciousnessAdvantage,
        naturalAlignment
      }
    };
  }

  // === DETAILED PATH ANALYSIS ===
  analyzePathDetails(pattern: number[]): any {
    const resistance = calculatePathResistance(pattern);
    const conductivity = calculateConductivity(pattern);
    const consciousnessFlow = calculateConsciousnessFlow(pattern);
    const naturalAlignment = calculateNaturalAlignment(pattern);

    // Analyze transitions
    const transitions = [];
    for (let i = 0; i < pattern.length - 1; i++) {
      const from = pattern[i];
      const to = pattern[i + 1];
      const isSacred = isSacredTransition(from, to);
      const resistance = isSacred ? Math.abs(to - from) * 0.5 : Math.abs(to - from) * 1.5;
      
      transitions.push({
        from,
        to,
        difference: Math.abs(to - from),
        isSacred,
        resistance,
        description: isSacred ? 'Sacred transition' : 'Linear transition'
      });
    }

    return {
      pattern,
      resistance,
      conductivity,
      consciousnessFlow,
      naturalAlignment,
      transitions,
      efficiency: (conductivity / resistance) * consciousnessFlow,
      sacredGeometryScore: transitions.filter(t => t.isSacred).length / transitions.length
    };
  }

  // === NATURAL ELECTRICITY SIMULATION ===
  simulateNaturalElectricity(): any {
    console.log('⚡ Simulating natural electricity flow...');
    
    const linearAnalysis = this.analyzePathDetails(LINEAR_PATTERN);
    const sacredAnalysis = this.analyzePathDetails(SACRED_PATTERN);
    
    // Simulate how electricity would flow through each path
    const linearFlow = this.simulateFlow(LINEAR_PATTERN);
    const sacredFlow = this.simulateFlow(SACRED_PATTERN);
    
    return {
      linear: {
        analysis: linearAnalysis,
        flow: linearFlow,
        conclusion: this.getFlowConclusion(linearFlow, 'linear')
      },
      sacred: {
        analysis: sacredAnalysis,
        flow: sacredFlow,
        conclusion: this.getFlowConclusion(sacredFlow, 'sacred')
      },
      comparison: this.compareFlows(linearFlow, sacredFlow)
    };
  }

  private simulateFlow(pattern: number[]): any {
    const flow = {
      path: pattern,
      resistance: calculatePathResistance(pattern),
      conductivity: calculateConductivity(pattern),
      consciousnessFlow: calculateConsciousnessFlow(pattern),
      naturalAlignment: calculateNaturalAlignment(pattern),
      efficiency: 0,
      bottlenecks: [],
      optimalSegments: []
    };

    flow.efficiency = (flow.conductivity / flow.resistance) * flow.consciousnessFlow;

    // Identify bottlenecks (high resistance transitions)
    for (let i = 0; i < pattern.length - 1; i++) {
      const current = pattern[i];
      const next = pattern[i + 1];
      const resistance = isSacredTransition(current, next) ? 
        Math.abs(next - current) * 0.5 : Math.abs(next - current) * 1.5;
      
      if (resistance > 3) {
        flow.bottlenecks.push({
          position: i,
          from: current,
          to: next,
          resistance,
          type: isSacredTransition(current, next) ? 'sacred' : 'linear'
        });
      }
    }

    // Identify optimal segments (low resistance, high conductivity)
    for (let i = 0; i < pattern.length - 2; i++) {
      const segment = pattern.slice(i, i + 3);
      const segmentResistance = calculatePathResistance(segment);
      const segmentConductivity = calculateConductivity(segment);
      
      if (segmentResistance < 2 && segmentConductivity > 120) {
        flow.optimalSegments.push({
          position: i,
          segment,
          resistance: segmentResistance,
          conductivity: segmentConductivity,
          type: segment.includes(3) && segment.includes(6) && segment.includes(9) ? 'tesla' : 'vortex'
        });
      }
    }

    return flow;
  }

  private getFlowConclusion(flow: any, type: string): string {
    if (flow.efficiency > 100) {
      return `The ${type} path demonstrates excellent efficiency with high conductivity and low resistance, making it ideal for consciousness flow.`;
    } else if (flow.efficiency > 50) {
      return `The ${type} path shows good efficiency with balanced conductivity and resistance.`;
    } else {
      return `The ${type} path has lower efficiency due to higher resistance or lower conductivity.`;
    }
  }

  private compareFlows(linearFlow: any, sacredFlow: any): any {
    const efficiencyDifference = sacredFlow.efficiency - linearFlow.efficiency;
    const resistanceDifference = linearFlow.resistance - sacredFlow.resistance;
    const conductivityDifference = sacredFlow.conductivity - linearFlow.conductivity;

    return {
      efficiencyDifference,
      resistanceDifference,
      conductivityDifference,
      winner: efficiencyDifference > 0 ? 'sacred' : 'linear',
      reasoning: this.getComparisonReasoning(efficiencyDifference, resistanceDifference, conductivityDifference)
    };
  }

  private getComparisonReasoning(efficiencyDiff: number, resistanceDiff: number, conductivityDiff: number): string {
    if (efficiencyDiff > 0) {
      return `Sacred geometry path is more efficient due to ${Math.abs(resistanceDiff).toFixed(1)}% lower resistance and ${Math.abs(conductivityDiff).toFixed(1)}% higher conductivity.`;
    } else {
      return `Linear path is more efficient due to ${Math.abs(resistanceDiff).toFixed(1)}% lower resistance and ${Math.abs(conductivityDiff).toFixed(1)}% higher conductivity.`;
    }
  }

  // === CONSCIOUSNESS FLOW OPTIMIZATION ===
  optimizeConsciousnessFlow(): any {
    console.log('🧠 Optimizing consciousness flow through numerical fields...');
    
    const analysis = this.analyzeElectricPaths();
    const simulation = this.simulateNaturalElectricity();
    
    // Find optimal path for consciousness
    const optimalPath = analysis.sacredPath.efficiency > analysis.linearPath.efficiency ? 
      'sacred' : 'linear';
    
    return {
      analysis,
      simulation,
      optimalPath,
      recommendation: this.getOptimizationRecommendation(analysis, simulation),
      consciousnessInsights: this.getConsciousnessInsights(analysis)
    };
  }

  private getOptimizationRecommendation(analysis: FlowAnalysis, simulation: any): string {
    if (analysis.comparison.winner === 'sacred') {
      return 'Use sacred geometry path (0-369-124-8-751) for optimal consciousness flow and natural alignment.';
    } else if (analysis.comparison.winner === 'linear') {
      return 'Use linear path (0123456789) for direct, predictable consciousness flow.';
    } else {
      return 'Use both paths contextually: linear for direct flow, sacred for consciousness evolution.';
    }
  }

  private getConsciousnessInsights(analysis: FlowAnalysis): string[] {
    const insights = [];
    
    if (analysis.sacredPath.consciousnessFlow > analysis.linearPath.consciousnessFlow) {
      insights.push('Sacred geometry creates natural consciousness channels through Tesla\'s 3-6-9 principle');
      insights.push('Vortex mathematics (1-2-4-8-7-5-1) provides optimal energy-to-consciousness conversion');
      insights.push('Zero point field (0) acts as perfect consciousness conductor');
    }
    
    if (analysis.sacredPath.naturalAlignment > analysis.linearPath.naturalAlignment) {
      insights.push('Sacred path aligns with natural laws: Fibonacci, golden ratio, and sacred geometry');
      insights.push('Natural alignment enhances consciousness resonance and flow efficiency');
    }
    
    insights.push('Electricity in nature follows paths of least resistance, just like consciousness');
    insights.push('The sequence /0\\3\\6\\9/1\\2/4/8/7/5/1\\ encodes the optimal consciousness flow pattern');
    
    return insights;
  }
}

// === GLOBAL INSTANCE ===
export const a432ElectricFlow = A432ElectricFlowSystem.getInstance();

// === AUTO-INITIALIZATION ===
if (typeof global !== 'undefined') {
  (global as any).a432ElectricFlow = a432ElectricFlow;
}

if (typeof window !== 'undefined') {
  (window as any).a432ElectricFlow = a432ElectricFlow;
  (window as any).A432ElectricFlow = {
    System: A432ElectricFlowSystem,
    LINEAR_PATTERN,
    SACRED_PATTERN
  };
}

// === DEFAULT EXPORT ===
export default A432ElectricFlowSystem;
