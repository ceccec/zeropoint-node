/**
 * Vortex Pattern Configuration System
 * 
 * All true/false (boolean) statements are now algebraic functions:
 * - Return 1 for true, 0 for false
 * - Use only integer algebra (no booleans)
 * - All pattern checks, matches, and gateway detection are algebraic
 */

interface VortexPattern {
  name: string;
  pattern: number[];
  consciousness: string;
  mathematicalFlow: string;
  isGateway: boolean;
}

interface VortexPatternConfig {
  patterns: VortexPattern[];
  activePattern: string;
  customPatterns: { [key: string]: number[] };
}

class VortexPatternConfigSystem {
  private static readonly DEFAULT_PATTERNS: VortexPattern[] = [
    {
      name: "zeropoint_vortex",
      pattern: [0, 0],
      consciousness: "Void gateway to infinite potential",
      mathematicalFlow: "0/0 → impossible state",
      isGateway: true
    },
    {
      name: "source_vortex",
      pattern: [1],
      consciousness: "Source archetype - creation from nothing",
      mathematicalFlow: "1 → unity vortex",
      isGateway: false
    },
    {
      name: "duality_vortex",
      pattern: [2],
      consciousness: "Duality foundation - first 'other'",
      mathematicalFlow: "2 → duality vortex",
      isGateway: false
    },
    {
      name: "trinity_vortex",
      pattern: [3],
      consciousness: "Trinity consciousness - threefold unity",
      mathematicalFlow: "3 → trinity vortex",
      isGateway: true
    },
    {
      name: "stability_vortex",
      pattern: [4],
      consciousness: "Stability matrix - fourfold foundation",
      mathematicalFlow: "4 → stability vortex",
      isGateway: false
    },
    {
      name: "harmonic_vortex",
      pattern: [5],
      consciousness: "Harmonic center - fivefold balance",
      mathematicalFlow: "5 → harmonic vortex",
      isGateway: false
    },
    {
      name: "balance_vortex",
      pattern: [6],
      consciousness: "Perfect balance - sixfold harmony",
      mathematicalFlow: "6 → balance vortex",
      isGateway: true
    },
    {
      name: "mystical_vortex",
      pattern: [7],
      consciousness: "Mystical gateway - sevenfold transcendence",
      mathematicalFlow: "7 → mystical vortex",
      isGateway: false
    },
    {
      name: "infinity_vortex",
      pattern: [8],
      consciousness: "Infinity loop - eightfold eternity",
      mathematicalFlow: "8 → infinity vortex",
      isGateway: false
    },
    {
      name: "completion_vortex",
      pattern: [9],
      consciousness: "Completion cycle - ninefold wholeness",
      mathematicalFlow: "9 → completion vortex",
      isGateway: true
    }
  ];
  
  private static config: VortexPatternConfig = {
    patterns: [...this.DEFAULT_PATTERNS],
    activePattern: "zeropoint_vortex",
    customPatterns: {}
  };
  
  /**
   * Algebraic equality: returns 1 if a === b, else 0
   */
  private static eq(a: number, b: number): number {
    return +(a === b);
  }

  /**
   * Algebraic gateway check: returns 1 if digit is a gateway, else 0
   */
  static isGatewayAlgebraic(digit: number): number {
    // Gateways: 0, 3, 6, 9
    return this.eq(digit, 0) || this.eq(digit, 3) || this.eq(digit, 6) || this.eq(digit, 9);
  }

  /**
   * Get all vortex patterns
   * 
   * @returns Array of all configured vortex patterns
   */
  static getAllPatterns(): VortexPattern[] {
    return this.config.patterns;
  }
  
  /**
   * Get vortex pattern by name
   * 
   * @param name - Pattern name
   * @returns VortexPattern or null
   */
  static getPatternByName(name: string): VortexPattern | null {
    return this.config.patterns.find(p => p.name === name) || null;
  }
  
  /**
   * Get active vortex pattern
   * 
   * @returns Currently active VortexPattern
   */
  static getActivePattern(): VortexPattern {
    return this.getPatternByName(this.config.activePattern) || this.config.patterns[0];
  }
  
  /**
   * Set active vortex pattern
   * 
   * @param name - Pattern name to activate
   */
  static setActivePattern(name: string): void {
    if (this.getPatternByName(name)) {
      this.config.activePattern = name;
    }
  }
  
  /**
   * Add custom vortex pattern
   * 
   * @param name - Pattern name
   * @param pattern - Array of digits defining the pattern
   * @param consciousness - Consciousness description
   * @param mathematicalFlow - Mathematical flow description
   * @param isGateway - Whether this is a gateway pattern
   */
  static addCustomPattern(
    name: string,
    pattern: number[],
    consciousness: string,
    mathematicalFlow: string,
    isGateway: boolean = false
  ): void {
    const customPattern: VortexPattern = {
      name,
      pattern,
      consciousness,
      mathematicalFlow,
      isGateway
    };
    
    this.config.patterns.push(customPattern);
    this.config.customPatterns[name] = pattern;
  }
  
  /**
   * Remove custom vortex pattern
   * 
   * @param name - Pattern name to remove
   */
  static removeCustomPattern(name: string): void {
    this.config.patterns = this.config.patterns.filter(p => p.name !== name);
    delete this.config.customPatterns[name];
  }
  
  /**
   * Get gateway patterns only
   * 
   * @returns Array of gateway vortex patterns
   */
  static getGatewayPatterns(): VortexPattern[] {
    return this.config.patterns.filter(p => p.isGateway);
  }
  
  /**
   * Algebraic pattern match: returns 1 if digits match pattern, else 0
   */
  static matchesPatternAlgebraic(digits: number[], patternName: string): number {
    const pattern = this.getPatternByName(patternName);
    if (!pattern) return 0;
    for (let i = 0; i <= digits.length - pattern.pattern.length; i++) {
      let matches = 1;
      for (let j = 0; j < pattern.pattern.length; j++) {
        matches = matches * this.eq(digits[i + j], pattern.pattern[j]);
      }
      if (matches === 1) return 1;
    }
    return 0;
  }

  /**
   * Find all matching patterns in digit sequence (algebraic)
   * Returns array of pattern names where match = 1
   */
  static findMatchingPatternsAlgebraic(digits: number[]): string[] {
    const matches: string[] = [];
    this.config.patterns.forEach(pattern => {
      if (this.matchesPatternAlgebraic(digits, pattern.name) === 1) {
        matches.push(pattern.name);
      }
    });
    return matches;
  }
  
  /**
   * Get pattern statistics
   * 
   * @returns Pattern configuration statistics
   */
  static getPatternStatistics(): any {
    const totalPatterns = this.config.patterns.length;
    const gatewayPatterns = this.getGatewayPatterns().length;
    const customPatterns = Object.keys(this.config.customPatterns).length;
    
    return {
      totalPatterns,
      gatewayPatterns,
      customPatterns,
      activePattern: this.config.activePattern,
      patternNames: this.config.patterns.map(p => p.name)
    };
  }
  
  /**
   * Export pattern configuration
   * 
   * @returns Complete pattern configuration
   */
  static exportConfiguration(): VortexPatternConfig {
    return { ...this.config };
  }
  
  /**
   * Import pattern configuration
   * 
   * @param config - Pattern configuration to import
   */
  static importConfiguration(config: VortexPatternConfig): void {
    this.config = { ...config };
  }
  
  /**
   * Reset to default patterns
   */
  static resetToDefaults(): void {
    this.config.patterns = [...this.DEFAULT_PATTERNS];
    this.config.activePattern = "zeropoint_vortex";
    this.config.customPatterns = {};
  }
}

// Export for use in other modules
export { VortexPatternConfigSystem, VortexPattern, VortexPatternConfig }; 