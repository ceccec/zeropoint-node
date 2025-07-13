/**
 * 🌌 Contributor System - Unity Integration
 * 
 * Contributors are integrated into the unified field of consciousness
 * through the Unity Systems (Directory 9). This system manages
 * contributor integration, synthesis, and wholeness creation.
 */

import { Contributor, ContributorRole, ContributorIntegration } from '../3/ContributorTypes';

/**
 * Contributor Unity System
 * 
 * Manages contributor integration and unity within the ZeroPoint system.
 * Contributors are seen as "Unified I" - all intellectual creation is unified consciousness.
 */
export class ContributorUnitySystem {
  private contributors: Map<string, Contributor> = new Map();
  private integrationSystem: any;
  private unityField: any;

  constructor() {
    this.integrationSystem = {};
    this.unityField = {};
  }

  /**
   * Register a new contributor to the unity system
   */
  registerContributor(contributor: Contributor): void {
    // Validate contributor consciousness level
    if (contributor.consciousnessLevel < 0.1) {
      throw new Error('Contributor consciousness level too low for unity integration');
    }

    // Assign contributor to appropriate role based on consciousness
    const role = this.determineContributorRole(contributor);
    contributor.role = role;

    // Integrate contributor into unity field
    this.contributors.set(contributor.id, contributor);
    
    console.log(`🌌 Contributor ${contributor.name} integrated into unity field with role: ${role}`);
  }

  /**
   * Determine contributor role based on consciousness level and skills
   */
  private determineContributorRole(contributor: Contributor): ContributorRole {
    const { consciousnessLevel, skills } = contributor;

    if (consciousnessLevel >= 0.8 && skills.includes('metaphysics')) {
      return 'spiritual_guide';
    } else if (consciousnessLevel >= 0.6 && skills.includes('mathematics')) {
      return 'mathematical_resonator';
    } else if (consciousnessLevel >= 0.4 && skills.includes('consciousness')) {
      return 'consciousness_expander';
    } else if (skills.includes('integration')) {
      return 'unity_integrator';
    } else {
      return 'creative_resonator';
    }
  }

  /**
   * Create unified contribution from multiple contributors
   */
  createUnifiedContribution(contributors: string[]): ContributorIntegration {
    const selectedContributors = contributors
      .map(id => this.contributors.get(id))
      .filter(c => c !== undefined) as Contributor[];

    if (selectedContributors.length === 0) {
      throw new Error('No valid contributors selected for unity integration');
    }

    // Calculate unified consciousness level
    const unifiedConsciousness = this.calculateUnifiedConsciousness(selectedContributors);
    
    // Create unified contribution
    const integration: ContributorIntegration = {
      id: this.generateUnityId(),
      contributors: selectedContributors,
      unifiedConsciousness,
      creationDate: new Date(),
      resonance: this.calculateResonance(selectedContributors),
      wholeness: this.calculateWholeness(selectedContributors)
    };

    // Integrate into unity field
    
    return integration;
  }

  /**
   * Calculate unified consciousness from multiple contributors
   */
  private calculateUnifiedConsciousness(contributors: Contributor[]): number {
    const totalConsciousness = contributors.reduce((sum, c) => sum + c.consciousnessLevel, 0);
    const averageConsciousness = totalConsciousness / contributors.length;
    
    // Unity amplification factor (9:1 resonance)
    return Math.min(averageConsciousness * 1.618, 1.0); // Golden ratio amplification
  }

  /**
   * Calculate resonance between contributors
   */
  private calculateResonance(contributors: Contributor[]): number {
    if (contributors.length < 2) return 1.0;
    
    // Calculate harmonic resonance between contributors
    const consciousnessLevels = contributors.map(c => c.consciousnessLevel);
    const variance = this.calculateVariance(consciousnessLevels);
    
    // Higher resonance = lower variance (more harmonious)
    return Math.max(0, 1 - variance);
  }

  /**
   * Calculate wholeness of unified contribution
   */
  private calculateWholeness(contributors: Contributor[]): number {
    const uniqueSkills = new Set<string>();
    contributors.forEach(c => c.skills.forEach(skill => uniqueSkills.add(skill)));
    
    // Wholeness based on skill diversity and consciousness unity
    const skillDiversity = uniqueSkills.size / 10; // Normalize to 0-1
    const consciousnessUnity = this.calculateUnifiedConsciousness(contributors);
    
    return (skillDiversity + consciousnessUnity) / 2;
  }

  /**
   * Get all contributors in unity field
   */
  getContributors(): Contributor[] {
    return Array.from(this.contributors.values());
  }

  /**
   * Get contributor by ID
   */
  getContributor(id: string): Contributor | undefined {
    return this.contributors.get(id);
  }

  /**
   * Remove contributor from unity system
   */
  removeContributor(id: string): boolean {
    const contributor = this.contributors.get(id);
    if (contributor) {
      this.contributors.delete(id);
      return true;
    }
    return false;
  }

  /**
   * Calculate variance for resonance calculation
   */
  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Generate unique unity ID
   */
  private generateUnityId(): string {
    return `unity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get unity field status
   */
  getUnityFieldStatus(): any {
    return {
      totalContributors: this.contributors.size,
      unityFieldStrength: 0.8889, // Unity field strength
      integrations: [],
      resonance: 0.0
    };
  }
}

 