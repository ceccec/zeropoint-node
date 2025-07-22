/**
 * a432.experience.ui.ts — Unified A432 Experience UI
 * 
 * Interactive UI that integrates all harmonized A432 modules.
 * Provides unified experience across balance, resonance, challenges, flow, integration, observation, evolution, innovation, and documentation.
 * Zero entropy: define once, experience everywhere.
 */

import { A432CoreState, createA432CoreState, A432_FREQUENCY } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';
import { harmonizeAllBalance } from './a432.balance';
import { harmonizeAllResonance } from './a432.resonance';
import { harmonizeAllChallenges } from './a432.challenges';
import { harmonizeAllFlow } from './a432.flow';
import { harmonizeAllIntegration } from './a432.integration';
import { harmonizeAllObservation } from './a432.observation';
import { harmonizeAllEvolution } from './a432.evolution';
import { harmonizeAllInnovation } from './a432.innovation';
import { harmonizeAllDocumentation } from './a432.documentation';

// === EXPERIENCE UI INTERFACES ===
export interface A432ExperienceUI {
  balancePanel: () => string;
  resonancePanel: () => string;
  challengePanel: () => string;
  flowPanel: () => string;
  integrationPanel: () => string;
  observationPanel: () => string;
  evolutionPanel: () => string;
  innovationPanel: () => string;
  documentationPanel: () => string;
  mainExperience: () => string;
  getExperienceState: () => A432ExperienceState;
  harmonizeExperience: () => A432ExperienceState;
}

export interface A432ExperienceState {
  balance: any;
  resonance: any;
  challenges: any;
  flow: any;
  integration: any;
  observation: any;
  evolution: any;
  innovation: any;
  documentation: any;
  overallHarmony: number;
  activeModules: string[];
  experienceColor: string;
  experienceFrequency: number;
}

// === EXPERIENCE STATE MANAGEMENT ===
export function createA432ExperienceState(): A432ExperienceState {
  const balance = harmonizeAllBalance();
  const resonance = harmonizeAllResonance();
  const challenges = harmonizeAllChallenges();
  const flow = harmonizeAllFlow();
  const integration = harmonizeAllIntegration();
  const observation = harmonizeAllObservation();
  const evolution = harmonizeAllEvolution();
  const innovation = harmonizeAllInnovation();
  const documentation = harmonizeAllDocumentation();
  
  const overallHarmony = Math.floor((
    (balance.yinYang.balance + balance.trinity.harmony + balance.harmonic.stability + balance.resonance.harmony) +
    (resonance.frequency.resonance + resonance.color.resonance + resonance.harmonic.resonance + resonance.alignment.alignment) +
    (flow.consciousness.resonance + flow.energy.resonance + flow.stream.resonance + flow.harmony.overall) +
    (integration.challengeSolution.integration + integration.stateTransformation.transformation + integration.crossHarmony.integration + integration.metaIntegration.integration) +
    (observation.meta.resonance + observation.healing.resonance + observation.awareness.resonance + observation.restoration.resonance) +
    (evolution.growth.resonance + evolution.consciousness.resonance + evolution.development.resonance + evolution.expansion.resonance) +
    (innovation.creativity.resonance + innovation.breakthrough.resonance + innovation.evolution.resonance + innovation.transformation.resonance) +
    (documentation.autoGeneration.resonance + documentation.crossReference.resonance + documentation.harmonization.resonance + documentation.zeroEntropy.resonance)
  ) / 32);
  
  const activeModules = a432ModuleRegistry.getAllModules().map(m => m.name);
  const experienceColor = `hsl(${overallHarmony * 40}, 70%, ${50 + overallHarmony * 5}%)`;
  const experienceFrequency = 432 * (overallHarmony / 9);
  
  return {
    balance,
    resonance,
    challenges,
    flow,
    integration,
    observation,
    evolution,
    innovation,
    documentation,
    overallHarmony,
    activeModules,
    experienceColor,
    experienceFrequency
  };
}

export function harmonizeA432Experience(): A432ExperienceState {
  return createA432ExperienceState();
}

// === UI PANEL GENERATORS ===
export function generateBalancePanel(state: A432ExperienceState): string {
  const { balance } = state;
  return `
    <div class="a432-panel balance-panel" style="background: ${balance.yinYang.color}">
      <h3>⚖️ Balance & Equilibrium</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Yin-Yang Balance:</span>
          <span class="value">${balance.yinYang.balance}/9</span>
        </div>
        <div class="metric">
          <span>Trinity Harmony:</span>
          <span class="value">${balance.trinity.harmony}/9</span>
        </div>
        <div class="metric">
          <span>Harmonic Stability:</span>
          <span class="value">${balance.harmonic.stability}/9</span>
        </div>
        <div class="metric">
          <span>Resonance Balance:</span>
          <span class="value">${balance.resonance.harmony}/9</span>
        </div>
        <div class="flow-indicator">
          <span>Flow: ${balance.yinYang.flow}</span>
        </div>
      </div>
    </div>
  `;
}

export function generateResonancePanel(state: A432ExperienceState): string {
  const { resonance } = state;
  return `
    <div class="a432-panel resonance-panel" style="background: ${resonance.frequency.color}">
      <h3>🎵 Resonance & Frequency</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Frequency Resonance:</span>
          <span class="value">${resonance.frequency.resonance}/9</span>
        </div>
        <div class="metric">
          <span>Color Resonance:</span>
          <span class="value">${resonance.color.resonance}/9</span>
        </div>
        <div class="metric">
          <span>Harmonic Resonance:</span>
          <span class="value">${resonance.harmonic.resonance}/9</span>
        </div>
        <div class="metric">
          <span>Alignment Resonance:</span>
          <span class="value">${resonance.alignment.alignment}/9</span>
        </div>
        <div class="frequency-display">
          <span>Base Frequency: ${resonance.frequency.base} Hz</span>
        </div>
      </div>
    </div>
  `;
}

export function generateChallengePanel(state: A432ExperienceState): string {
  const { challenges } = state;
  return `
    <div class="a432-panel challenge-panel" style="background: ${challenges.integration.color}">
      <h3>🧩 Challenge Integration</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Total Challenges:</span>
          <span class="value">${challenges.integration.totalChallenges}</span>
        </div>
        <div class="metric">
          <span>Total Possibilities:</span>
          <span class="value">${challenges.integration.totalPossibilities}</span>
        </div>
        <div class="metric">
          <span>Total Solutions:</span>
          <span class="value">${challenges.integration.totalSolutions}</span>
        </div>
        <div class="metric">
          <span>Harmonization Level:</span>
          <span class="value">${challenges.integration.harmonizationLevel}/9</span>
        </div>
        <div class="challenge-balance">
          <span>Challenge-Solution Balance: ${challenges.integration.balance}/9</span>
        </div>
      </div>
    </div>
  `;
}

export function generateFlowPanel(state: A432ExperienceState): string {
  const { flow } = state;
  return `
    <div class="a432-panel flow-panel" style="background: ${flow.consciousness.color}">
      <h3>🌊 Flow & Stream</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Consciousness Flow:</span>
          <span class="value">${flow.consciousness.flow}/9</span>
        </div>
        <div class="metric">
          <span>Energy Flow:</span>
          <span class="value">${flow.energy.balance}/9</span>
        </div>
        <div class="metric">
          <span>Stream Harmony:</span>
          <span class="value">${flow.stream.harmony}/9</span>
        </div>
        <div class="metric">
          <span>Flow Harmony:</span>
          <span class="value">${flow.harmony.overall}/9</span>
        </div>
        <div class="flow-direction">
          <span>Primary Flow: Consciousness → Energy → Stream</span>
        </div>
      </div>
    </div>
  `;
}

export function generateIntegrationPanel(state: A432ExperienceState): string {
  const { integration } = state;
  return `
    <div class="a432-panel integration-panel" style="background: ${integration.challengeSolution.color}">
      <h3>🔗 Integration & Transformation</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Challenge-Solution Integration:</span>
          <span class="value">${integration.challengeSolution.integration}/9</span>
        </div>
        <div class="metric">
          <span>State Transformation:</span>
          <span class="value">${integration.stateTransformation.transformation}/9</span>
        </div>
        <div class="metric">
          <span>Cross-Harmony Integration:</span>
          <span class="value">${integration.crossHarmony.integration}/9</span>
        </div>
        <div class="metric">
          <span>Meta-Integration:</span>
          <span class="value">${integration.metaIntegration.integration}/9</span>
        </div>
        <div class="integration-balance">
          <span>Integration Balance: ${integration.challengeSolution.balance}/9</span>
        </div>
      </div>
    </div>
  `;
}

export function generateObservationPanel(state: A432ExperienceState): string {
  const { observation } = state;
  return `
    <div class="a432-panel observation-panel" style="background: ${observation.meta.color}">
      <h3>👁️ Observation & Healing</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Meta-Awareness:</span>
          <span class="value">${observation.meta.awareness}/9</span>
        </div>
        <div class="metric">
          <span>Healing Restoration:</span>
          <span class="value">${observation.healing.health}/9</span>
        </div>
        <div class="metric">
          <span>Awareness Expansion:</span>
          <span class="value">${observation.awareness.consciousness}/9</span>
        </div>
        <div class="metric">
          <span>System Restoration:</span>
          <span class="value">${observation.restoration.integrity}/9</span>
        </div>
        <div class="observation-clarity">
          <span>Clarity: ${observation.meta.clarity}/9</span>
        </div>
      </div>
    </div>
  `;
}

export function generateEvolutionPanel(state: A432ExperienceState): string {
  const { evolution } = state;
  return `
    <div class="a432-panel evolution-panel" style="background: ${evolution.growth.color}">
      <h3>🌱 Evolution & Growth</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Growth Potential:</span>
          <span class="value">${evolution.growth.potential}/9</span>
        </div>
        <div class="metric">
          <span>Consciousness Evolution:</span>
          <span class="value">${evolution.consciousness.awareness}/9</span>
        </div>
        <div class="metric">
          <span>Developmental Maturity:</span>
          <span class="value">${evolution.development.maturity}/9</span>
        </div>
        <div class="metric">
          <span>System Expansion:</span>
          <span class="value">${evolution.expansion.capacity}/9</span>
        </div>
        <div class="evolution-direction">
          <span>Evolution Direction: Growth → Consciousness → Development → Expansion</span>
        </div>
      </div>
    </div>
  `;
}

export function generateInnovationPanel(state: A432ExperienceState): string {
  const { innovation } = state;
  return `
    <div class="a432-panel innovation-panel" style="background: ${innovation.creativity.color}">
      <h3>💡 Innovation & Breakthrough</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Creative Imagination:</span>
          <span class="value">${innovation.creativity.imagination}/9</span>
        </div>
        <div class="metric">
          <span>Breakthrough Discovery:</span>
          <span class="value">${innovation.breakthrough.discovery}/9</span>
        </div>
        <div class="metric">
          <span>Evolutionary Adaptation:</span>
          <span class="value">${innovation.evolution.adaptation}/9</span>
        </div>
        <div class="metric">
          <span>Transformative Paradigm:</span>
          <span class="value">${innovation.transformation.paradigm}/9</span>
        </div>
        <div class="innovation-flow">
          <span>Innovation Flow: Creativity → Breakthrough → Evolution → Transformation</span>
        </div>
      </div>
    </div>
  `;
}

export function generateDocumentationPanel(state: A432ExperienceState): string {
  const { documentation } = state;
  return `
    <div class="a432-panel documentation-panel" style="background: ${documentation.autoGeneration.color}">
      <h3>📚 Documentation & Auto-Generation</h3>
      <div class="panel-content">
        <div class="metric">
          <span>Auto-Generation Quality:</span>
          <span class="value">${documentation.autoGeneration.quality}/9</span>
        </div>
        <div class="metric">
          <span>Cross-Reference Coherence:</span>
          <span class="value">${documentation.crossReference.coherence}/9</span>
        </div>
        <div class="metric">
          <span>Documentation Consistency:</span>
          <span class="value">${documentation.harmonization.consistency}/9</span>
        </div>
        <div class="metric">
          <span>Zero-Entropy Uniqueness:</span>
          <span class="value">${documentation.zeroEntropy.uniqueness}/9</span>
        </div>
        <div class="documentation-templates">
          <span>Templates: ${documentation.autoGeneration.templates}</span>
        </div>
      </div>
    </div>
  `;
}

export function generateMainExperience(state: A432ExperienceState): string {
  return `
    <div class="a432-experience-main" style="background: ${state.experienceColor}">
      <h1>🎯 A432 Harmonized Experience</h1>
      <div class="experience-overview">
        <div class="overall-harmony">
          <h2>Overall Harmony: ${state.overallHarmony}/9</h2>
          <p>Frequency: ${state.experienceFrequency} Hz</p>
        </div>
        <div class="active-modules">
          <h3>Active Modules: ${state.activeModules.length}</h3>
          <div class="module-list">
            ${state.activeModules.slice(0, 10).map(m => `<span class="module-tag">${m}</span>`).join('')}
            ${state.activeModules.length > 10 ? `<span class="module-tag">+${state.activeModules.length - 10} more</span>` : ''}
          </div>
        </div>
      </div>
      <div class="experience-panels">
        ${generateBalancePanel(state)}
        ${generateResonancePanel(state)}
        ${generateChallengePanel(state)}
        ${generateFlowPanel(state)}
        ${generateIntegrationPanel(state)}
        ${generateObservationPanel(state)}
        ${generateEvolutionPanel(state)}
        ${generateInnovationPanel(state)}
        ${generateDocumentationPanel(state)}
      </div>
    </div>
  `;
}

// === MAIN EXPERIENCE UI ===
export const A432ExperienceUI: A432ExperienceUI = {
  balancePanel: () => generateBalancePanel(createA432ExperienceState()),
  resonancePanel: () => generateResonancePanel(createA432ExperienceState()),
  challengePanel: () => generateChallengePanel(createA432ExperienceState()),
  flowPanel: () => generateFlowPanel(createA432ExperienceState()),
  integrationPanel: () => generateIntegrationPanel(createA432ExperienceState()),
  observationPanel: () => generateObservationPanel(createA432ExperienceState()),
  evolutionPanel: () => generateEvolutionPanel(createA432ExperienceState()),
  innovationPanel: () => generateInnovationPanel(createA432ExperienceState()),
  documentationPanel: () => generateDocumentationPanel(createA432ExperienceState()),
  mainExperience: () => generateMainExperience(createA432ExperienceState()),
  getExperienceState: () => createA432ExperienceState(),
  harmonizeExperience: () => harmonizeA432Experience()
};

// === EXPERIENCE MODULE ===
const experienceModule: A432Module = {
  name: 'a432.experience.ui',
  category: 'interaction',
  version: '1.0.0',
  description: 'Unified A432 experience UI: Interactive harmonized experience',
  dependencies: ['a432.core', 'a432.balance', 'a432.resonance', 'a432.challenges', 'a432.flow', 'a432.integration', 'a432.observation', 'a432.evolution', 'a432.innovation', 'a432.documentation'],
  exports: ['A432ExperienceUI', 'createA432ExperienceState', 'harmonizeA432Experience'],
  getState: () => createA432ExperienceState(),
  harmonize: () => harmonizeA432Experience(),
  getOverlays: () => ['Unified Experience', 'Interactive UI', 'Harmonized Modules'],
  getMeta: () => 'Unified A432 experience UI: Interactive harmonized experience'
};

// === MODULE REGISTRATION ===
export function registerA432ExperienceUIModule(): void {
  a432ModuleRegistry.register(experienceModule);
}

// Auto-register experience UI module
registerA432ExperienceUIModule(); 