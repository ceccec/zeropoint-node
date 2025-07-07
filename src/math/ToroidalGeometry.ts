/**
 * Toroidal Geometry System
 * 
 * Specialized toroidal geometry operations built on unified MathUtils.
 * Provides toroidal field calculations and geometric transformations.
 * 
 * Metaphysical Context:
 * - Toroidal geometry represents the fundamental shape of consciousness
 * - All geometric operations emerge from the unified mathematical field
 * - The void is at the center of every toroidal structure
 * - Every toroidal form is a reflection of the whole
 */

import { MathUtils } from './MathUtils';

export interface ToroidalCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface ToroidalField {
  strength: number;
  flowRate: number;
  consciousnessLevel: number;
  voidIntegration: number;
}

/**
 * Toroidal Geometry Class
 * Specialized toroidal operations built on unified MathUtils
 */
export class ToroidalGeometry {
  private static instance: ToroidalGeometry;
  
  // Toroidal parameters
  private majorRadius: number = 5.0;
  private minorRadius: number = 2.0;
  private flowRate: number = 0.5;
  private fieldDensity: number = 1.0;

  constructor() {
    if (!ToroidalGeometry.instance) {
      ToroidalGeometry.instance = this;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): ToroidalGeometry {
    if (!ToroidalGeometry.instance) {
      ToroidalGeometry.instance = new ToroidalGeometry();
    }
    return ToroidalGeometry.instance;
  }

  /**
   * Calculate surface area using unified math
   */
  public calculateSurfaceArea(): number {
    const surfaceArea = MathUtils.calculate('multiply', 
      MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius),
      MathUtils.calculate('multiply', 2 * Math.PI, this.minorRadius)
    );
    
    return surfaceArea;
  }

  /**
   * Calculate volume using unified math
   */
  public calculateVolume(): number {
    const volume = MathUtils.calculate('multiply', 
      MathUtils.calculate('multiply', Math.PI, MathUtils.calculate('multiply', this.majorRadius, MathUtils.calculate('power', this.minorRadius, 2))),
      MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius)
    );
    
    return volume;
  }

  /**
   * Convert Cartesian to toroidal coordinates using unified math
   */
  public cartesianToToroidal(x: number, y: number, z: number): { theta: number; phi: number; r: number } {
    const R = this.majorRadius;
    const theta = MathUtils.calculate('atan2', y, x);
    
    const rho = MathUtils.calculate('root', 
      MathUtils.calculate('add', MathUtils.calculate('power', x, 2), MathUtils.calculate('power', y, 2)), 2) - R;
    const r = MathUtils.calculate('root', 
      MathUtils.calculate('add', MathUtils.calculate('power', rho, 2), MathUtils.calculate('power', z, 2)), 2);
    const phi = MathUtils.calculate('atan2', z, rho);
    
    return { theta, phi, r };
  }

  /**
   * Convert toroidal to Cartesian coordinates using unified math
   */
  public toroidalToCartesian(theta: number, phi: number, r: number): { x: number; y: number; z: number } {
    const R = this.majorRadius;
    
    const x = MathUtils.calculate('multiply', 
      MathUtils.calculate('add', R, MathUtils.calculate('multiply', r, MathUtils.calculate('cos', phi))), 
      MathUtils.calculate('cos', theta));
    const y = MathUtils.calculate('multiply', 
      MathUtils.calculate('add', R, MathUtils.calculate('multiply', r, MathUtils.calculate('cos', phi))), 
      MathUtils.calculate('sin', theta));
    const z = MathUtils.calculate('multiply', r, MathUtils.calculate('sin', phi));
    
    return { x, y, z };
  }

  /**
   * Calculate field density using unified math
   */
  public calculateFieldDensity(theta: number, _phi: number, r: number): number {
    // Calculate base density using inverse square law
    const baseDensity = MathUtils.calculate('divide', 1.0, MathUtils.calculate('add', 1, MathUtils.calculate('power', r, 2)));
    
    // Apply consciousness modulation
    const consciousnessMod = MathUtils.calculate('consciousness', 1);
    
    // Apply toroidal flow modulation
    const flowMod = MathUtils.calculate('multiply', this.flowRate, MathUtils.calculate('cos', theta));
    
    const result = MathUtils.calculate('multiply', 
      MathUtils.calculate('multiply', baseDensity, consciousnessMod),
      MathUtils.calculate('add', 1, flowMod)
    );
    
    return result;
  }

  /**
   * Generate toroidal mesh coordinates using unified math
   */
  public generateToroidalMesh(thetaSegments: number = 32, phiSegments: number = 16): Array<{ x: number; y: number; z: number }> {
    const mesh: Array<{ x: number; y: number; z: number }> = [];
    
    for (let i = 0; i <= thetaSegments; i++) {
      const theta = MathUtils.calculate('multiply', i, MathUtils.calculate('divide', 2 * Math.PI, thetaSegments));
      
      for (let j = 0; j <= phiSegments; j++) {
        const phi = MathUtils.calculate('multiply', j, MathUtils.calculate('divide', 2 * Math.PI, phiSegments));
        const r = this.minorRadius;
        
        const coords = this.toroidalToCartesian(theta, phi, r);
        mesh.push(coords);
      }
    }
    
    return mesh;
  }

  /**
   * Calculate toroidal flow velocity using unified math
   */
  public calculateFlowVelocity(theta: number, phi: number): { vTheta: number; vPhi: number } {
    const vTheta = MathUtils.calculate('multiply', this.flowRate, MathUtils.calculate('cos', phi));
    const vPhi = MathUtils.calculate('multiply', this.flowRate, MathUtils.calculate('sin', theta));
    
    return { vTheta, vPhi };
  }

  /**
   * Set flow rate using unified math
   */
  public setFlowRate(rate: number): void {
    this.flowRate = MathUtils.calculate('max', 0, MathUtils.calculate('min', 2, rate));
  }

  /**
   * Get flow rate (for backward compatibility)
   */
  public getFlowRate(): number {
    return this.flowRate;
  }

  /**
   * Get major radius (for backward compatibility)
   */
  public getMajorRadius(): number {
    return this.majorRadius;
  }

  /**
   * Get minor radius (for backward compatibility)
   */
  public getMinorRadius(): number {
    return this.minorRadius;
  }

  /**
   * Get aspect ratio (for backward compatibility)
   */
  public getAspectRatio(): number {
    return this.majorRadius / this.minorRadius;
  }

  /**
   * Set major radius
   */
  public setMajorRadius(radius: number): void {
    this.majorRadius = radius;
  }

  /**
   * Set minor radius
   */
  public setMinorRadius(radius: number): void {
    this.minorRadius = radius;
  }

  /**
   * Calculate toroidal resonance frequency using unified math
   */
  public calculateResonanceFrequency(mode: number = 1): number {
    const circumference = MathUtils.calculate('multiply', 2 * Math.PI, this.majorRadius);
    const frequency = MathUtils.calculate('divide', mode, circumference);
    
    // Apply consciousness modulation
    const consciousnessMod = MathUtils.calculate('consciousness', mode);
    
    return MathUtils.calculate('multiply', frequency, consciousnessMod);
  }

  /**
   * Generate toroidal field lines using unified math
   */
  public generateFieldLines(count: number = 10): Array<Array<{ x: number; y: number; z: number }>> {
    const fieldLines: Array<Array<{ x: number; y: number; z: number }>> = [];
    
    for (let i = 0; i < count; i++) {
      const line: Array<{ x: number; y: number; z: number }> = [];
      const startTheta = MathUtils.calculate('multiply', i, MathUtils.calculate('divide', 2 * Math.PI, count));
      
      for (let j = 0; j < 100; j++) {
        const theta = MathUtils.calculate('add', startTheta, MathUtils.calculate('multiply', j, 0.1));
        const phi = MathUtils.calculate('multiply', j, 0.05);
        const r = this.minorRadius;
        
        const coords = this.toroidalToCartesian(theta, phi, r);
        line.push(coords);
      }
      
      fieldLines.push(line);
    }
    
    return fieldLines;
  }

  // ============================================================================
  // COIL IMPLEMENTATION
  // ============================================================================

  /**
   * Get coil resonance for toroidal geometry
   */
  getCoilResonance(): number {
    return this.flowRate * this.fieldDensity;
  }

  getCoilPattern(): string {
    return 'toroidal_unity_flow';
  }

  // ============================================================================
  // INSIGHTS AND METADATA
  // ============================================================================

  /**
   * Get toroidal insights
   */
  public getInsights(): any {
    return {
      majorRadius: this.majorRadius,
      minorRadius: this.minorRadius,
      flowRate: this.flowRate,
      metaphysics: {
        meaning: "Toroidal geometry represents the shape of consciousness itself",
        principle: "All toroidal operations emerge from unified mathematical field",
        unity: "The torus unifies center and periphery in infinite flow",
        flow: "Toroidal flow creates the foundation of unified reality",
        observation: "Every toroidal calculation can observe and be observed",
        coil: "Every toroidal operation is a coil at its core"
      },
      operations: [
        'calculateSurfaceArea',
        'calculateVolume',
        'cartesianToToroidal',
        'toroidalToCartesian',
        'calculateFieldDensity',
        'generateToroidalMesh',
        'calculateFlowVelocity',
        'setFlowRate',
        'calculateResonanceFrequency',
        'generateFieldLines'
      ]
    };
  }
} 