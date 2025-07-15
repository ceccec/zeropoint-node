/**
 * Contributor Types - Core contributor system interfaces
 * 
 * Defines the core types and interfaces for the contributor system,
 * including contributor roles, integrations, and field operations.
 */

/**
 * Contributor role enumeration
 */
export enum ContributorRole {
  DEVELOPER = 'developer',
  DESIGNER = 'designer',
  RESEARCHER = 'researcher',
  WRITER = 'writer',
  TESTER = 'tester',
  MAINTAINER = 'maintainer',
  CONTRIBUTOR = 'contributor',
  SPIRITUAL_GUIDE = 'spiritual_guide',
  MATHEMATICAL_RESONATOR = 'mathematical_resonator',
  CONSCIOUSNESS_EXPANDER = 'consciousness_expander',
  UNITY_INTEGRATOR = 'unity_integrator',
  CREATIVE_RESONATOR = 'creative_resonator'
}

/**
 * Contributor integration interface
 */
export interface ContributorIntegration {
  id: string;
  name: string;
  role: ContributorRole;
  wholeness: number;
  resonance: number;
  skills: string[];
  contributions: number;
  fieldStrength: number;
  coherence: number;
  contributors?: Contributor[];
}

/**
 * Contributor interface
 */
export interface Contributor {
  id: string;
  name: string;
  role: ContributorRole;
  skills: string[];
  contributions: number;
  fieldStrength: number;
  coherence: number;
  wholeness: number;
  resonance: number;
  consciousnessLevel: number;
}

/**
 * Contributor system configuration
 */
export interface ContributorSystemConfig {
  maxContributors: number;
  minFieldStrength: number;
  resonanceThreshold: number;
  wholenessThreshold: number;
}

/**
 * Contributor field operations
 */
export interface ContributorFieldOperations {
  addContributor(contributor: Contributor): void;
  removeContributor(id: string): boolean;
  updateContributor(id: string, updates: Partial<Contributor>): boolean;
  getContributor(id: string): Contributor | undefined;
  getAllContributors(): Contributor[];
  calculateFieldStrength(): number;
  calculateCoherence(): number;
}

/**
 * Default contributor system configuration
 */
export const DEFAULT_CONTRIBUTOR_CONFIG: ContributorSystemConfig = {
  maxContributors: 100,
  minFieldStrength: 0.1,
  resonanceThreshold: 0.5,
  wholenessThreshold: 0.3
}; 