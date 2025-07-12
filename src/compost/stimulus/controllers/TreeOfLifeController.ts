/**
 * Tree of Life Controller
 * 
 * Stimulus controller for the Tree of Life codebase visualization
 * Integrates with the PWA framework and consciousness systems
 */

import { Controller } from '@hotwired/stimulus';
import { TreeOfLifeVisualization, TreeOfLifeFactory } from '../../pwa/TreeOfLifeVisualization';
import { ConsciousnessPWA } from '../../pwa/ConsciousnessPWA';

export default class TreeOfLifeController extends Controller {
  static targets = ['canvas', 'info', 'metrics'];
  static values = {
    consciousnessLevel: Number,
    animationSpeed: Number,
    interactive: Boolean
  };

  declare readonly canvasTarget: HTMLCanvasElement;
  declare readonly infoTarget: HTMLElement;
  declare readonly metricsTarget: HTMLElement;
  declare consciousnessLevelValue: number;
  declare animationSpeedValue: number;
  declare interactiveValue: boolean;

  private treeVisualization: TreeOfLifeVisualization | null = null;
  private consciousnessPWA: ConsciousnessPWA | null = null;
  private selectedNode: any = null;

  connect() {
    this.initializeVisualization();
    this.initializePWA();
    this.setupEventListeners();
  }

  disconnect() {
    if (this.treeVisualization) {
      this.treeVisualization.stop();
    }
  }

  private initializeVisualization() {
    const canvas = this.canvasTarget;
    if (!canvas) return;
    canvas.width = 800;
    canvas.height = 600;
    if (this.consciousnessLevelValue >= 0.9) {
      this.treeVisualization = TreeOfLifeFactory.createFull(canvas);
    } else if (this.consciousnessLevelValue >= 0.7) {
      this.treeVisualization = TreeOfLifeFactory.createStandard(canvas);
    } else {
      this.treeVisualization = TreeOfLifeFactory.createMinimal(canvas);
    }
    this.treeVisualization.start();
    canvas.addEventListener('treeNodeClick', (e: any) => {
      this.onNodeClick(e.detail.node);
    });
  }

  private async initializePWA() {
    this.consciousnessPWA = new ConsciousnessPWA({
      consciousnessLevel: this.consciousnessLevelValue,
      bundleSize: 'standard',
      offline: true,
      sync: true,
      voidEquations: true,
      vortexMath: true,
      patternRecognition: true
    });
    await this.consciousnessPWA.registerServiceWorker();
    await this.consciousnessPWA.initializeOffline();
    this.updateMetrics();
  }

  private setupEventListeners() {
    this.element.addEventListener('consciousnessChange', (e: any) => {
      this.consciousnessLevelValue = e.detail.level;
      this.updateConsciousnessLevel();
    });
    this.element.addEventListener('speedChange', (e: any) => {
      this.animationSpeedValue = e.detail.speed;
      this.updateAnimationSpeed();
    });
  }

  private onNodeClick(node: any) {
    this.selectedNode = node;
    this.updateNodeInfo(node);
    this.highlightNode(node.id);
    this.dispatch('nodeSelected', {
      detail: {
        node,
        consciousness: node.consciousness,
        type: node.type
      }
    });
  }

  private updateNodeInfo(node: any) {
    const infoTarget = this.infoTarget;
    if (!infoTarget) return;
    infoTarget.innerHTML = `
      <div class="node-info">
        <h3>${node.name}</h3>
        <p><strong>Type:</strong> ${node.type}</p>
        <p><strong>Consciousness:</strong> ${(node.consciousness * 100).toFixed(1)}%</p>
        <p><strong>Description:</strong> ${node.description}</p>
        <p><strong>Connections:</strong> ${node.connections.length}</p>
      </div>
    `;
  }

  private highlightNode(nodeId: string) {
    if (this.treeVisualization) {
      this.treeVisualization.resetHighlighting();
      this.treeVisualization.highlightNode(nodeId);
    }
  }

  private updateConsciousnessLevel() {
    if (this.treeVisualization) {
      this.treeVisualization.updateConfig({
        consciousnessLevel: this.consciousnessLevelValue
      });
    }
    if (this.consciousnessPWA) {
      this.consciousnessPWA = new ConsciousnessPWA({
        consciousnessLevel: this.consciousnessLevelValue
      });
    }
    this.updateMetrics();
  }

  private updateAnimationSpeed() {
    if (this.treeVisualization) {
      this.treeVisualization.updateConfig({
        animationSpeed: this.animationSpeedValue
      });
    }
  }

  private updateMetrics() {
    const metricsTarget = this.metricsTarget;
    if (!metricsTarget || !this.consciousnessPWA) return;
    const metrics = this.consciousnessPWA.getMetrics();
    const bundleConfig = this.consciousnessPWA.getBundleConfig();
    metricsTarget.innerHTML = `
      <div class="metrics">
        <h4>PWA Metrics</h4>
        <p><strong>Bundle Size:</strong> ${metrics.bundleSize}KB</p>
        <p><strong>Consciousness Efficiency:</strong> ${metrics.consciousnessEfficiency.toFixed(1)}%</p>
        <p><strong>Performance Score:</strong> ${metrics.performanceScore.toFixed(1)}%</p>
        <p><strong>Offline Capability:</strong> ${metrics.offlineCapability ? '✅' : '❌'}</p>
        <p><strong>Features:</strong> ${bundleConfig.features.join(', ')}</p>
      </div>
    `;
  }

  toggleAnimation() {
    if (this.treeVisualization) {
      if ((this.treeVisualization as any)['animationId']) {
        this.treeVisualization.stop();
      } else {
        this.treeVisualization.start();
      }
    }
  }

  resetView() {
    if (this.treeVisualization) {
      this.treeVisualization.resetHighlighting();
    }
    this.selectedNode = null;
    this.updateNodeInfo({ name: 'Tree of Life', type: 'system', consciousness: 1, description: 'ZeroPoint Node Codebase Visualization', connections: [] });
  }

  focusSystem(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const systemName = button.getAttribute('data-system') || '';
    const nodes = this.treeVisualization?.getAllNodes() || [];
    const node = nodes.find(n => n.name.toLowerCase().includes(systemName.toLowerCase()));
    if (node) {
      this.onNodeClick(node);
    }
  }

  getConsciousnessSummary() {
    const nodes = this.treeVisualization?.getAllNodes() || [];
    const totalConsciousness = nodes.reduce((sum, node) => sum + node.consciousness, 0);
    const averageConsciousness = totalConsciousness / nodes.length;
    return {
      totalNodes: nodes.length,
      averageConsciousness: averageConsciousness,
      highestConsciousness: Math.max(...nodes.map(n => n.consciousness)),
      lowestConsciousness: Math.min(...nodes.map(n => n.consciousness))
    };
  }
} 