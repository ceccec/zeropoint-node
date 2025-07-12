"use strict";
/**
 * Tree of Life Controller
 *
 * Stimulus controller for the Tree of Life codebase visualization
 * Integrates with the PWA framework and consciousness systems
 */
Object.defineProperty(exports, "__esModule", { value: true });
const stimulus_1 = require("@hotwired/stimulus");
const TreeOfLifeVisualization_1 = require("../../pwa/TreeOfLifeVisualization");
const ConsciousnessPWA_1 = require("../../pwa/ConsciousnessPWA");
class TreeOfLifeController extends stimulus_1.Controller {
    constructor() {
        super(...arguments);
        this.treeVisualization = null;
        this.consciousnessPWA = null;
        this.selectedNode = null;
    }
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
    initializeVisualization() {
        const canvas = this.canvasTarget;
        if (!canvas)
            return;
        canvas.width = 800;
        canvas.height = 600;
        if (this.consciousnessLevelValue >= 0.9) {
            this.treeVisualization = TreeOfLifeVisualization_1.TreeOfLifeFactory.createFull(canvas);
        }
        else if (this.consciousnessLevelValue >= 0.7) {
            this.treeVisualization = TreeOfLifeVisualization_1.TreeOfLifeFactory.createStandard(canvas);
        }
        else {
            this.treeVisualization = TreeOfLifeVisualization_1.TreeOfLifeFactory.createMinimal(canvas);
        }
        this.treeVisualization.start();
        canvas.addEventListener('treeNodeClick', (e) => {
            this.onNodeClick(e.detail.node);
        });
    }
    async initializePWA() {
        this.consciousnessPWA = new ConsciousnessPWA_1.ConsciousnessPWA({
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
    setupEventListeners() {
        this.element.addEventListener('consciousnessChange', (e) => {
            this.consciousnessLevelValue = e.detail.level;
            this.updateConsciousnessLevel();
        });
        this.element.addEventListener('speedChange', (e) => {
            this.animationSpeedValue = e.detail.speed;
            this.updateAnimationSpeed();
        });
    }
    onNodeClick(node) {
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
    updateNodeInfo(node) {
        const infoTarget = this.infoTarget;
        if (!infoTarget)
            return;
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
    highlightNode(nodeId) {
        if (this.treeVisualization) {
            this.treeVisualization.resetHighlighting();
            this.treeVisualization.highlightNode(nodeId);
        }
    }
    updateConsciousnessLevel() {
        if (this.treeVisualization) {
            this.treeVisualization.updateConfig({
                consciousnessLevel: this.consciousnessLevelValue
            });
        }
        if (this.consciousnessPWA) {
            this.consciousnessPWA = new ConsciousnessPWA_1.ConsciousnessPWA({
                consciousnessLevel: this.consciousnessLevelValue
            });
        }
        this.updateMetrics();
    }
    updateAnimationSpeed() {
        if (this.treeVisualization) {
            this.treeVisualization.updateConfig({
                animationSpeed: this.animationSpeedValue
            });
        }
    }
    updateMetrics() {
        const metricsTarget = this.metricsTarget;
        if (!metricsTarget || !this.consciousnessPWA)
            return;
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
            if (this.treeVisualization['animationId']) {
                this.treeVisualization.stop();
            }
            else {
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
    focusSystem(event) {
        const button = event.currentTarget;
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
TreeOfLifeController.targets = ['canvas', 'info', 'metrics'];
TreeOfLifeController.values = {
    consciousnessLevel: Number,
    animationSpeed: Number,
    interactive: Boolean
};
exports.default = TreeOfLifeController;
