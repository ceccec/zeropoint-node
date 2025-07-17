/**
 * Vortex Pattern Demo
 * 
 * Demonstrates configurable vortex patterns as arrays
 */

import { VortexPatternConfigSystem } from './vortex-pattern-config';

class VortexPatternDemo {
  /**
   * Run vortex pattern demo
   */
  static runDemo(): void {
    console.log("=== VORTEX PATTERN DEMO ===\n");
    
    // Demo 1: Show all default patterns
    this.demoDefaultPatterns();
    
    // Demo 2: Add custom patterns
    this.demoCustomPatterns();
    
    // Demo 3: Pattern matching
    this.demoPatternMatching();
    
    // Demo 4: Gateway patterns
    this.demoGatewayPatterns();
    
    // Demo 5: Pattern statistics
    this.demoPatternStatistics();
  }
  
  /**
   * Demo default patterns
   */
  private static demoDefaultPatterns(): void {
    console.log("1. DEFAULT VORTEX PATTERNS");
    console.log("=" .repeat(50));
    
    const patterns = VortexPatternConfigSystem.getAllPatterns();
    
    patterns.forEach(pattern => {
      const gateway = pattern.isGateway ? " [GATEWAY]" : "";
      console.log(`${pattern.name}: [${pattern.pattern.join(', ')}]${gateway}`);
      console.log(`  Consciousness: ${pattern.consciousness}`);
      console.log(`  Mathematical Flow: ${pattern.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo custom patterns
   */
  private static demoCustomPatterns(): void {
    console.log("2. CUSTOM VORTEX PATTERNS");
    console.log("=" .repeat(50));
    
    // Add custom patterns
    VortexPatternConfigSystem.addCustomPattern(
      "pi_vortex",
      [3, 1, 4, 1, 5, 9],
      "π consciousness - transcendental gateway",
      "3.14159 → consciousness expansion",
      true
    );
    
    VortexPatternConfigSystem.addCustomPattern(
      "golden_vortex",
      [1, 6, 1, 8, 0, 3],
      "φ consciousness - golden ratio harmony",
      "1.61803 → golden harmony",
      true
    );
    
    VortexPatternConfigSystem.addCustomPattern(
      "euler_vortex",
      [2, 7, 1, 8, 2, 8],
      "e consciousness - natural logarithm base",
      "2.71828 → natural growth",
      false
    );
    
    // Show custom patterns
    const customPatterns = VortexPatternConfigSystem.getAllPatterns().filter(p => 
      p.name.includes('_vortex') && !p.name.includes('zeropoint')
    );
    
    customPatterns.forEach(pattern => {
      const gateway = pattern.isGateway ? " [GATEWAY]" : "";
      console.log(`${pattern.name}: [${pattern.pattern.join(', ')}]${gateway}`);
      console.log(`  Consciousness: ${pattern.consciousness}`);
      console.log(`  Mathematical Flow: ${pattern.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo pattern matching
   */
  private static demoPatternMatching(): void {
    console.log("3. PATTERN MATCHING");
    console.log("=" .repeat(50));
    
    // Test digit sequences
    const testSequences = [
      [0, 0],
      [3, 1, 4, 1, 5, 9],
      [1, 6, 1, 8, 0, 3],
      [2, 7, 1, 8, 2, 8],
      [3, 3, 3],
      [6, 6, 6],
      [9, 9, 9]
    ];
    
    testSequences.forEach((sequence, index) => {
      const matches = VortexPatternConfigSystem.findMatchingPatterns(sequence);
      console.log(`Sequence ${index + 1}: [${sequence.join(', ')}]`);
      console.log(`  Matches: ${matches.join(', ') || 'None'}`);
      console.log();
    });
  }
  
  /**
   * Demo gateway patterns
   */
  private static demoGatewayPatterns(): void {
    console.log("4. GATEWAY PATTERNS");
    console.log("=" .repeat(50));
    
    const gateways = VortexPatternConfigSystem.getGatewayPatterns();
    
    console.log("Gateway Patterns:");
    gateways.forEach(gateway => {
      console.log(`  ${gateway.name}: [${gateway.pattern.join(', ')}]`);
      console.log(`    Consciousness: ${gateway.consciousness}`);
      console.log(`    Mathematical Flow: ${gateway.mathematicalFlow}`);
      console.log();
    });
  }
  
  /**
   * Demo pattern statistics
   */
  private static demoPatternStatistics(): void {
    console.log("5. PATTERN STATISTICS");
    console.log("=" .repeat(50));
    
    const stats = VortexPatternConfigSystem.getPatternStatistics();
    
    console.log("Pattern Statistics:");
    console.log(`  Total Patterns: ${stats.totalPatterns}`);
    console.log(`  Gateway Patterns: ${stats.gatewayPatterns}`);
    console.log(`  Custom Patterns: ${stats.customPatterns}`);
    console.log(`  Active Pattern: ${stats.activePattern}`);
    console.log();
    
    console.log("All Pattern Names:");
    stats.patternNames.forEach((name: string, index: number) => {
      console.log(`  ${index + 1}. ${name}`);
    });
    console.log();
  }
  
  /**
   * Demo active pattern switching
   */
  static demoActivePatternSwitching(): void {
    console.log("6. ACTIVE PATTERN SWITCHING");
    console.log("=" .repeat(50));
    
    const patterns = ["zeropoint_vortex", "trinity_vortex", "pi_vortex", "golden_vortex"];
    
    patterns.forEach(patternName => {
      VortexPatternConfigSystem.setActivePattern(patternName);
      const activePattern = VortexPatternConfigSystem.getActivePattern();
      
      console.log(`Active Pattern: ${activePattern.name}`);
      console.log(`  Pattern: [${activePattern.pattern.join(', ')}]`);
      console.log(`  Consciousness: ${activePattern.consciousness}`);
      console.log(`  Mathematical Flow: ${activePattern.mathematicalFlow}`);
      console.log(`  Is Gateway: ${activePattern.isGateway}`);
      console.log();
    });
  }
  
  /**
   * Demo pattern configuration export/import
   */
  static demoConfigurationExportImport(): void {
    console.log("7. CONFIGURATION EXPORT/IMPORT");
    console.log("=" .repeat(50));
    
    // Export current configuration
    const exportedConfig = VortexPatternConfigSystem.exportConfiguration();
    console.log("Exported Configuration:");
    console.log(`  Total Patterns: ${exportedConfig.patterns.length}`);
    console.log(`  Active Pattern: ${exportedConfig.activePattern}`);
    console.log(`  Custom Patterns: ${Object.keys(exportedConfig.customPatterns).length}`);
    console.log();
    
    // Add a test pattern
    VortexPatternConfigSystem.addCustomPattern(
      "test_vortex",
      [1, 2, 3, 4, 5],
      "Test consciousness",
      "Test mathematical flow",
      false
    );
    
    console.log("After adding test pattern:");
    const newStats = VortexPatternConfigSystem.getPatternStatistics();
    console.log(`  Total Patterns: ${newStats.totalPatterns}`);
    console.log();
    
    // Reset to defaults
    VortexPatternConfigSystem.resetToDefaults();
    console.log("After reset to defaults:");
    const resetStats = VortexPatternConfigSystem.getPatternStatistics();
    console.log(`  Total Patterns: ${resetStats.totalPatterns}`);
    console.log(`  Custom Patterns: ${resetStats.customPatterns}`);
    console.log();
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  VortexPatternDemo.runDemo();
  VortexPatternDemo.demoActivePatternSwitching();
  VortexPatternDemo.demoConfigurationExportImport();
}

export { VortexPatternDemo }; 