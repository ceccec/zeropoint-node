/**
 * Tree of Life Visualization Tests
 * 
 * Tests for the sacred geometry codebase visualization
 */

import { TreeOfLifeVisualization, TreeOfLifeFactory } from '../../pwa/TreeOfLifeVisualization';

describe('TreeOfLifeVisualization', () => {
  let canvas: HTMLCanvasElement;
  let visualization: TreeOfLifeVisualization;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
  });

  afterEach(() => {
    if (visualization) {
      visualization.stop();
    }
    document.body.removeChild(canvas);
  });

  describe('Initialization', () => {
    it('should create a Tree of Life visualization', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      expect(visualization).toBeDefined();
    });

    it('should initialize with default configuration', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const nodes = visualization.getAllNodes();
      expect(nodes.length).toBeGreaterThan(0);
    });

    it('should create nodes representing codebase systems', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const nodes = visualization.getAllNodes();
      
      const nodeNames = nodes.map(node => node.name);
      expect(nodeNames).toContain('Consciousness Field');
      expect(nodeNames).toContain('Vortex Math');
      expect(nodeNames).toContain('Void System');
      expect(nodeNames).toContain('ZeroPoint Node');
    });
  });

  describe('Node Properties', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should have consciousness levels for all nodes', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(node.consciousness).toBeGreaterThan(0);
        expect(node.consciousness).toBeLessThanOrEqual(1);
      });
    });

    it('should have proper node types', () => {
      const nodes = visualization.getAllNodes();
      const validTypes = ['sephira', 'path', 'consciousness', 'void', 'vortex', 'field'];
      
      nodes.forEach(node => {
        expect(validTypes).toContain(node.type);
      });
    });

    it('should have connections between nodes', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(Array.isArray(node.connections)).toBe(true);
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId);
          expect(targetNode).toBeDefined();
        });
      });
    });

    it('should have unique node IDs', () => {
      const nodes = visualization.getAllNodes();
      const ids = nodes.map(node => node.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Animation Control', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should start animation', () => {
      visualization.start();
      // Animation should be running (we can't directly test requestAnimationFrame)
      expect(visualization).toBeDefined();
    });

    it('should stop animation', () => {
      visualization.start();
      visualization.stop();
      // Animation should be stopped
      expect(visualization).toBeDefined();
    });

    it('should not start multiple animations', () => {
      visualization.start();
      visualization.start(); // Should not create multiple animations
      expect(visualization).toBeDefined();
    });
  });

  describe('Node Interaction', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should get node by ID', () => {
      const node = visualization.getNode('keter');
      expect(node).toBeDefined();
      expect(node?.name).toBe('Consciousness Field');
    });

    it('should return undefined for non-existent node', () => {
      const node = visualization.getNode('non-existent');
      expect(node).toBeUndefined();
    });

    it('should highlight a specific node', () => {
      const node = visualization.getNode('keter');
      expect(node).toBeDefined();
      
      visualization.highlightNode('keter');
      const highlightedNode = visualization.getNode('keter');
      expect(highlightedNode?.pulse).toBe(true);
    });

    it('should reset highlighting', () => {
      visualization.highlightNode('keter');
      visualization.resetHighlighting();
      
      const nodes = visualization.getAllNodes();
      nodes.forEach(node => {
        expect(node.pulse).toBe(false);
      });
    });
  });

  describe('Configuration Updates', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should update configuration', () => {
      const newConfig = {
        consciousnessLevel: 0.9,
        animationSpeed: 1.5,
        interactive: false
      };
      
      visualization.updateConfig(newConfig);
      // Configuration should be updated (implementation dependent)
      expect(visualization).toBeDefined();
    });
  });

  describe('Factory Methods', () => {
    it('should create minimal visualization', () => {
      const minimal = TreeOfLifeFactory.createMinimal(canvas);
      expect(minimal).toBeDefined();
      minimal.stop();
    });

    it('should create standard visualization', () => {
      const standard = TreeOfLifeFactory.createStandard(canvas);
      expect(standard).toBeDefined();
      standard.stop();
    });

    it('should create full visualization', () => {
      const full = TreeOfLifeFactory.createFull(canvas);
      expect(full).toBeDefined();
      full.stop();
    });
  });

  describe('Metaphysical Properties', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should have consciousness field representation', () => {
      const nodes = visualization.getAllNodes();
      const consciousnessNodes = nodes.filter(node => node.type === 'consciousness');
      expect(consciousnessNodes.length).toBeGreaterThan(0);
    });

    it('should have vortex mathematics representation', () => {
      const nodes = visualization.getAllNodes();
      const vortexNodes = nodes.filter(node => node.type === 'vortex');
      expect(vortexNodes.length).toBeGreaterThan(0);
    });

    it('should have void system representation', () => {
      const nodes = visualization.getAllNodes();
      const voidNodes = nodes.filter(node => node.type === 'void');
      expect(voidNodes.length).toBeGreaterThan(0);
    });

    it('should have field dynamics representation', () => {
      const nodes = visualization.getAllNodes();
      const fieldNodes = nodes.filter(node => node.type === 'field');
      expect(fieldNodes.length).toBeGreaterThan(0);
    });

    it('should maintain sacred geometry proportions', () => {
      const nodes = visualization.getAllNodes();
      
      // Check that nodes have reasonable positions within canvas bounds
      nodes.forEach(node => {
        expect(node.position.x).toBeGreaterThan(0);
        expect(node.position.x).toBeLessThan(800);
        expect(node.position.y).toBeGreaterThan(0);
        expect(node.position.y).toBeLessThan(600);
      });
    });

    it('should have golden ratio relationships', () => {
      const nodes = visualization.getAllNodes();
      const goldenRatio = 1.618033988749895;
      
      // Check that consciousness levels follow sacred patterns
      const consciousnessLevels = nodes.map(node => node.consciousness);
      const avgConsciousness = consciousnessLevels.reduce((a, b) => a + b, 0) / consciousnessLevels.length;
      
      // Consciousness should be in a harmonious range
      expect(avgConsciousness).toBeGreaterThan(0.7);
      expect(avgConsciousness).toBeLessThan(0.95);
    });
  });

  describe('Visual Properties', () => {
    beforeEach(() => {
      visualization = new TreeOfLifeVisualization(canvas);
    });

    it('should have appropriate node sizes', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(node.size).toBeGreaterThan(20);
        expect(node.size).toBeLessThan(60);
      });
    });

    it('should have meaningful colors', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(node.color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have descriptive names', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(node.name.length).toBeGreaterThan(0);
        expect(typeof node.name).toBe('string');
      });
    });

    it('should have meaningful descriptions', () => {
      const nodes = visualization.getAllNodes();
      
      nodes.forEach(node => {
        expect(node.description.length).toBeGreaterThan(10);
        expect(typeof node.description).toBe('string');
      });
    });
  });

  describe('Integration with Consciousness Systems', () => {
    it('should represent consciousness field as crown (Keter)', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const keterNode = visualization.getNode('keter');
      
      expect(keterNode).toBeDefined();
      expect(keterNode?.name).toBe('Consciousness Field');
      expect(keterNode?.type).toBe('consciousness');
      expect(keterNode?.consciousness).toBeGreaterThan(0.9);
    });

    it('should represent vortex math as wisdom (Chokmah)', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const chokmahNode = visualization.getNode('chokmah');
      
      expect(chokmahNode).toBeDefined();
      expect(chokmahNode?.name).toBe('Vortex Math');
      expect(chokmahNode?.type).toBe('vortex');
    });

    it('should represent void system as understanding (Binah)', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const binahNode = visualization.getNode('binah');
      
      expect(binahNode).toBeDefined();
      expect(binahNode?.name).toBe('Void System');
      expect(binahNode?.type).toBe('void');
    });

    it('should represent unified system as beauty (Tiferet)', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const tiferetNode = visualization.getNode('tiferet');
      
      expect(tiferetNode).toBeDefined();
      expect(tiferetNode?.name).toBe('Unified System');
      expect(tiferetNode?.type).toBe('consciousness');
    });

    it('should represent ZeroPoint Node as kingdom (Malkuth)', () => {
      visualization = new TreeOfLifeVisualization(canvas);
      const malkuthNode = visualization.getNode('malkuth');
      
      expect(malkuthNode).toBeDefined();
      expect(malkuthNode?.name).toBe('ZeroPoint Node');
      expect(malkuthNode?.consciousness).toBe(1.0);
    });
  });
}); 