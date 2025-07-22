import { calculateVBMConsciousness } from './book-system';

// Universal Quantum Calculator
// Harmonizes imperial, decimal, and quantum units
// Embeds decimal system within quantum system

export interface QuantumUnit {
  value: number;
  unit: string;
  dimension: string;
  consciousness: number;
  harmonic: number;
}

export interface ConversionResult {
  from: QuantumUnit;
  to: QuantumUnit;
  ratio: number;
  consciousness_flow: number;
  dimensional_shift: number;
}

export class UniversalCalculator {
  private book: typeof calculateVBMConsciousness;
  
  // A432 Hz as metaphysical constant (BOOK APPROVED)
  private readonly A432 = 432;
  
  // A432-based quantum constants (BOOK APPROVED)
  private readonly A432_GOLDEN_RATIO = 432 / 267; // A432-based golden ratio approximation
  private readonly A432_PI = 432 / 137; // A432-based pi approximation
  private readonly A432_QUANTUM_CONSTANT = 432 / 1000; // A432-based quantum constant
  private readonly A432_LIGHT_CONSTANT = 432 * 1000; // A432-based light constant
  
  // A432-based imperial to metric ratios (dimensional vortex transitions)
  private readonly A432_IMPERIAL_RATIOS = {
    inch_to_meter: 432 / 17000, // A432-based inch to meter
    foot_to_meter: 432 / 1417, // A432-based foot to meter  
    yard_to_meter: 432 / 472, // A432-based yard to meter
    mile_to_meter: 432 / 0.268, // A432-based mile to meter
    pound_to_kg: 432 / 953, // A432-based pound to kg
    gallon_to_liter: 432 / 114 // A432-based gallon to liter
  };
  
  constructor() {
    this.book = calculateVBMConsciousness;
  }
  
  // Calculate consciousness multiplier for any value
  private calculateConsciousness(value: number): number {
    const digit = Math.abs(Math.floor(value)) % 10;
    const vbmResult = this.book(digit);
    // Ensure minimum consciousness of 1 for non-zero values, 0.1 for void
    return digit === 0 ? 0.1 : Math.max(vbmResult.consciousness, 1);
  }
  
  // Calculate harmonic frequency from consciousness
  private calculateHarmonic(consciousness: number): number {
    // For A432 quantum operations, return base A432 frequency
    // For other operations, use consciousness as a multiplier factor
    if (consciousness === 0.1) return this.A432; // Void gets base A432
    const consciousness_factor = consciousness / 5; // Normalize to max consciousness
    return this.A432 * consciousness_factor;
  }
  
  // Create quantum unit with consciousness and harmonic properties
  private createQuantumUnit(value: number, unit: string, dimension: string): QuantumUnit {
    const consciousness = this.calculateConsciousness(value);
    let harmonic: number;
    
    // Special handling for A432 quantum operations
    if (unit === 'a432') {
      harmonic = this.A432; // Base A432 frequency
    } else {
      harmonic = this.calculateHarmonic(consciousness);
    }
    
    return {
      value,
      unit,
      dimension,
      consciousness,
      harmonic
    };
  }
  
  // Convert between imperial and metric with consciousness flow
  public convertImperialToMetric(imperialValue: number, imperialUnit: string): ConversionResult {
    const imperial = this.createQuantumUnit(imperialValue, imperialUnit, 'imperial');
    
    let metricValue: number;
    let metricUnit: string;
    
    switch (imperialUnit) {
      case 'inch':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.inch_to_meter;
        metricUnit = 'meter';
        break;
      case 'foot':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.foot_to_meter;
        metricUnit = 'meter';
        break;
      case 'yard':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.yard_to_meter;
        metricUnit = 'meter';
        break;
      case 'mile':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.mile_to_meter;
        metricUnit = 'meter';
        break;
      case 'pound':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.pound_to_kg;
        metricUnit = 'kilogram';
        break;
      case 'gallon':
        metricValue = imperialValue * this.A432_IMPERIAL_RATIOS.gallon_to_liter;
        metricUnit = 'liter';
        break;
      default:
        throw new Error(`Unknown imperial unit: ${imperialUnit}`);
    }
    
    const metric = this.createQuantumUnit(metricValue, metricUnit, 'metric');
    const ratio = metricValue / imperialValue;
    const consciousness_flow = metric.consciousness / imperial.consciousness;
    const dimensional_shift = Math.log(ratio) / Math.log(this.A432_GOLDEN_RATIO);
    
    return {
      from: imperial,
      to: metric,
      ratio,
      consciousness_flow,
      dimensional_shift
    };
  }
  
  // Convert metric to imperial with consciousness flow
  public convertMetricToImperial(metricValue: number, metricUnit: string): ConversionResult {
    const metric = this.createQuantumUnit(metricValue, metricUnit, 'metric');
    
    let imperialValue: number;
    let imperialUnit: string;
    
    switch (metricUnit) {
      case 'meter':
        imperialValue = metricValue / this.A432_IMPERIAL_RATIOS.foot_to_meter;
        imperialUnit = 'foot';
        break;
      case 'kilogram':
        imperialValue = metricValue / this.A432_IMPERIAL_RATIOS.pound_to_kg;
        imperialUnit = 'pound';
        break;
      case 'liter':
        imperialValue = metricValue / this.A432_IMPERIAL_RATIOS.gallon_to_liter;
        imperialUnit = 'gallon';
        break;
      default:
        throw new Error(`Unknown metric unit: ${metricUnit}`);
    }
    
    const imperial = this.createQuantumUnit(imperialValue, imperialUnit, 'imperial');
    const ratio = imperialValue / metricValue;
    const consciousness_flow = imperial.consciousness / metric.consciousness;
    const dimensional_shift = Math.log(ratio) / Math.log(this.A432_GOLDEN_RATIO);
    
    return {
      from: metric,
      to: imperial,
      ratio,
      consciousness_flow,
      dimensional_shift
    };
  }
  
  // Quantum calculation with consciousness embedding
  public calculateQuantum(value: number, operation: string): QuantumUnit {
    let result: number;
    
    switch (operation) {
      case 'planck':
        result = value * this.A432_QUANTUM_CONSTANT;
        break;
      case 'light':
        result = value * this.A432_LIGHT_CONSTANT;
        break;
      case 'golden':
        result = value * this.A432_GOLDEN_RATIO;
        break;
      case 'a432':
        result = value * this.A432;
        break;
      case 'consciousness':
        result = value * this.calculateConsciousness(value);
        break;
      default:
        throw new Error(`Unknown quantum operation: ${operation}`);
    }
    
    return this.createQuantumUnit(result, operation, 'quantum');
  }
  
  // Dimensional vortex transition
  public dimensionalShift(value: number, fromDimension: string, toDimension: string): ConversionResult {
    const from = this.createQuantumUnit(value, fromDimension, fromDimension);
    
    let toValue: number;
    let toUnit: string;
    
    // Non-linear dimensional shifts based on consciousness flow
    // Ensure minimum consciousness factor to avoid zero ratios
    const consciousness_factor = Math.max(from.consciousness / 5, 0.1);
    
    switch (`${fromDimension}_to_${toDimension}`) {
      case 'imperial_to_quantum':
        toValue = value * consciousness_factor * this.A432_GOLDEN_RATIO;
        toUnit = 'quantum_unit';
        break;
      case 'metric_to_quantum':
        toValue = value * consciousness_factor * this.A432 / 1000;
        toUnit = 'quantum_unit';
        break;
      case 'quantum_to_imperial':
        toValue = value / (consciousness_factor * this.A432_GOLDEN_RATIO);
        toUnit = 'imperial_unit';
        break;
      case 'quantum_to_metric':
        toValue = value / (consciousness_factor * this.A432 / 1000);
        toUnit = 'metric_unit';
        break;
      default:
        throw new Error(`Unknown dimensional shift: ${fromDimension} to ${toDimension}`);
    }
    
    const to = this.createQuantumUnit(toValue, toUnit, toDimension);
    const ratio = toValue / value;
    const consciousness_flow = to.consciousness / from.consciousness;
    const dimensional_shift = Math.log(ratio) / Math.log(this.A432_GOLDEN_RATIO);
    
    return {
      from,
      to,
      ratio,
      consciousness_flow,
      dimensional_shift
    };
  }
  
  // Harmonic matrix calculation for any two values
  public calculateHarmonicMatrix(value1: number, value2: number): {
    harmonic_ratio: number;
    consciousness_flow: number;
    dimensional_shift: number;
    a432_relationship: number;
  } {
    const unit1 = this.createQuantumUnit(value1, 'unit1', 'matrix');
    const unit2 = this.createQuantumUnit(value2, 'unit2', 'matrix');
    
    const harmonic_ratio = unit2.harmonic / unit1.harmonic;
    const consciousness_flow = unit2.consciousness / unit1.consciousness;
    const dimensional_shift = Math.log(harmonic_ratio) / Math.log(this.A432_GOLDEN_RATIO);
    const a432_relationship = (unit1.harmonic + unit2.harmonic) / this.A432;
    
    return {
      harmonic_ratio,
      consciousness_flow,
      dimensional_shift,
      a432_relationship
    };
  }
  
  // Get all available units and their consciousness properties
  public getAvailableUnits(): Record<string, { dimension: string; consciousness: number; harmonic: number }> {
    const units: Record<string, { dimension: string; consciousness: number; harmonic: number }> = {};
    
    // Imperial units
    ['inch', 'foot', 'yard', 'mile', 'pound', 'gallon'].forEach(unit => {
      const quantum = this.createQuantumUnit(1, unit, 'imperial');
      units[unit] = {
        dimension: 'imperial',
        consciousness: quantum.consciousness,
        harmonic: quantum.harmonic
      };
    });
    
    // Metric units
    ['meter', 'kilogram', 'liter'].forEach(unit => {
      const quantum = this.createQuantumUnit(1, unit, 'metric');
      units[unit] = {
        dimension: 'metric',
        consciousness: quantum.consciousness,
        harmonic: quantum.harmonic
      };
    });
    
    // Quantum units
    ['planck', 'light', 'golden', 'a432', 'consciousness'].forEach(unit => {
      const quantum = this.createQuantumUnit(1, unit, 'quantum');
      units[unit] = {
        dimension: 'quantum',
        consciousness: quantum.consciousness,
        harmonic: quantum.harmonic
      };
    });
    
    return units;
  }
}

// Export singleton instance
export const universalCalculator = new UniversalCalculator(); 