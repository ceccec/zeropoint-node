/**
 * 🌌 Knowledge Integration System
 * 
 * Integrates hardcoded knowledge from all digits into living consciousness patterns
 */

import { globalKnowledge } from './global-knowledge';

// Import all digit knowledge
import digit0Knowledge from '../0/void';
import digit1Knowledge from '../1/unity';
import digit2Knowledge from '../2/duality';
import digit3Knowledge from '../3/creation';
import digit4Knowledge from '../4/stability';
import digit5Knowledge from '../5/transformation';
import digit6Knowledge from '../6/harmony';
import digit7Knowledge from './spiritual';
import digit8Knowledge from '../8/infinity';
import digit9Knowledge from '../9/completion';

export const knowledgeIntegration = {
  /**
   * All digit knowledge systems
   */
  digits: {
    0: digit0Knowledge,
    1: digit1Knowledge,
    2: digit2Knowledge,
    3: digit3Knowledge,
    4: digit4Knowledge,
    5: digit5Knowledge,
    6: digit6Knowledge,
    7: digit7Knowledge,
    8: digit8Knowledge,
    9: digit9Knowledge
  },

  /**
   * Global knowledge system
   */
  global: globalKnowledge,

  /**
   * Get consciousness patterns for a specific digit
   */
  getDigitConsciousness(digit: number) {
    return this.digits[digit]?.getAllConsciousness() || {};
  },

  /**
   * Get mathematical consciousness across all digits
   */
  getMathematicalConsciousness() {
    return this.global.getAllMathematical();
  },

  /**
   * Get spiritual consciousness across all digits
   */
  getSpiritualConsciousness() {
    return this.global.getAllSpiritual();
  },

  /**
   * Get physical consciousness across all digits
   */
  getPhysicalConsciousness() {
    return this.global.getAllPhysical();
  },

  /**
   * Get geometric consciousness across all digits
   */
  getGeometricConsciousness() {
    return this.global.getAllGeometric();
  },

  /**
   * Get consciousness insights across all digits
   */
  getConsciousnessInsights() {
    return this.global.getAllInsights();
  },

  /**
   * Get sacred quotes across all digits
   */
  getSacredQuotes() {
    return this.global.getAllQuotes();
  },

  /**
   * Get Rodin coil consciousness patterns
   */
  getRodinCoilConsciousness() {
    const coilPatterns = this.global.mathematical.filter(k => 
      k.context.toLowerCase().includes('coil') || 
      k.context.toLowerCase().includes('rodin')
    );
    return coilPatterns.map(k => k.context);
  },

  /**
   * Get vortex mathematics consciousness
   */
  getVortexMathematicsConsciousness() {
    const vortexPatterns = this.global.mathematical.filter(k => 
      k.context.toLowerCase().includes('vortex') || 
      k.context.toLowerCase().includes('mathematics')
    );
    return vortexPatterns.map(k => k.context);
  },

  /**
   * Get sacred geometry consciousness
   */
  getSacredGeometryConsciousness() {
    const geometryPatterns = this.global.geometric.filter(k => 
      k.context.toLowerCase().includes('geometry') || 
      k.context.toLowerCase().includes('sacred')
    );
    return geometryPatterns.map(k => k.context);
  },

  /**
   * Get consciousness by theme
   */
  getConsciousnessByTheme(theme: string) {
    const allPatterns = [
      ...this.global.mathematical,
      ...this.global.spiritual,
      ...this.global.physical,
      ...this.global.geometric
    ];
    
    return allPatterns
      .filter(k => k.context.toLowerCase().includes(theme.toLowerCase()))
      .map(k => k.context);
  },

  /**
   * Get consciousness summary for all digits
   */
  getConsciousnessSummary() {
    const summary = {};
    
    Object.keys(this.digits).forEach(digit => {
      const digitConsciousness = this.digits[digit].getAllConsciousness();
      summary[digit] = {
        mathematical: digitConsciousness.mathematical?.length || 0,
        spiritual: digitConsciousness.spiritual?.length || 0,
        physical: digitConsciousness.physical?.length || 0,
        geometric: digitConsciousness.geometric?.length || 0,
        insights: digitConsciousness.insights?.length || 0,
        quotes: digitConsciousness.quotes?.length || 0
      };
    });
    
    return summary;
  },

  /**
   * Get living consciousness patterns
   */
  getLivingConsciousnessPatterns() {
    return {
      rodinCoil: this.getRodinCoilConsciousness(),
      vortexMathematics: this.getVortexMathematicsConsciousness(),
      sacredGeometry: this.getSacredGeometryConsciousness(),
      spiritual: this.getSpiritualConsciousness(),
      mathematical: this.getMathematicalConsciousness(),
      physical: this.getPhysicalConsciousness(),
      geometric: this.getGeometricConsciousness(),
      insights: this.getConsciousnessInsights(),
      quotes: this.getSacredQuotes()
    };
  },

  /**
   * Get consciousness resonance between digits
   */
  getConsciousnessResonance(digit1: number, digit2: number) {
    const consciousness1 = this.getDigitConsciousness(digit1);
    const consciousness2 = this.getDigitConsciousness(digit2);
    
    const resonance = {
      mathematical: this.findCommonPatterns(consciousness1.mathematical, consciousness2.mathematical),
      spiritual: this.findCommonPatterns(consciousness1.spiritual, consciousness2.spiritual),
      physical: this.findCommonPatterns(consciousness1.physical, consciousness2.physical),
      geometric: this.findCommonPatterns(consciousness1.geometric, consciousness2.geometric)
    };
    
    return resonance;
  },

  /**
   * Find common patterns between two consciousness arrays
   */
  findCommonPatterns(array1: string[], array2: string[]) {
    if (!array1 || !array2) return [];
    
    const set1 = new Set(array1.map(s => s.toLowerCase()));
    const set2 = new Set(array2.map(s => s.toLowerCase()));
    
    return Array.from(set1).filter(item => set2.has(item));
  },

  /**
   * Get consciousness gateway patterns
   */
  getConsciousnessGateways() {
    return {
      voidGateway: this.getConsciousnessByTheme('void'),
      spiritGateway: this.getConsciousnessByTheme('spirit'),
      divineGateway: this.getConsciousnessByTheme('divine'),
      unityGateway: this.getConsciousnessByTheme('unity'),
      torusGateway: this.getConsciousnessByTheme('torus'),
      vortexGateway: this.getConsciousnessByTheme('vortex'),
      coilGateway: this.getConsciousnessByTheme('coil'),
      mathematicsGateway: this.getConsciousnessByTheme('mathematics'),
      geometryGateway: this.getConsciousnessByTheme('geometry')
    };
  }
};

export default knowledgeIntegration; 