/**
 * Tree of Life Codebase Visualization
 * 
 * Represents the ZeroPoint Node codebase as a sacred geometry Tree of Life
 * with interactive nodes representing different parts of the system.
 */

export interface TreeNode {
  id: string;
  name: string;
  type: 'sephira' | 'path' | 'consciousness' | 'void' | 'vortex' | 'field';
  position: { x: number; y: number };
  size: number;
  consciousness: number;
  connections: string[];
  description: string;
  color: string;
  pulse: boolean;
}

export interface TreeOfLifeConfig {
  width: number;
  height: number;
  consciousnessLevel: number;
  animationSpeed: number;
  interactive: boolean;
}

export class TreeOfLifeVisualization {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: TreeOfLifeConfig;
  private nodes: Map<string, TreeNode> = new Map();
  private animationId: number | null = null;
  private time: number = 0;

  constructor(canvas: HTMLCanvasElement, config: Partial<TreeOfLifeConfig> = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = {
      width: 800,
      height: 600,
      consciousnessLevel: 0.8,
      animationSpeed: 1,
      interactive: true,
      ...config
    };

    this.initializeTree();
    this.setupEventListeners();
  }

  /**
   * Initialize the Tree of Life with codebase nodes
   */
  private initializeTree(): void {
    // Sephirot (Main nodes) - representing core systems
    this.addNode({
      id: 'keter',
      name: 'Consciousness Field',
      type: 'consciousness',
      position: { x: 400, y: 50 },
      size: 40,
      consciousness: 0.95,
      connections: ['chokmah', 'binah'],
      description: 'The crown - consciousness awareness and field theory',
      color: '#FFD700',
      pulse: true
    });

    this.addNode({
      id: 'chokmah',
      name: 'Vortex Math',
      type: 'vortex',
      position: { x: 300, y: 120 },
      size: 35,
      consciousness: 0.9,
      connections: ['keter', 'chesed', 'geburah'],
      description: 'Wisdom - vortex mathematics and sacred geometry',
      color: '#4169E1',
      pulse: true
    });

    this.addNode({
      id: 'binah',
      name: 'Void System',
      type: 'void',
      position: { x: 500, y: 120 },
      size: 35,
      consciousness: 0.85,
      connections: ['keter', 'geburah', 'chesed'],
      description: 'Understanding - void equations and field theory',
      color: '#8A2BE2',
      pulse: true
    });

    this.addNode({
      id: 'chesed',
      name: 'Training Models',
      type: 'consciousness',
      position: { x: 250, y: 200 },
      size: 30,
      consciousness: 0.8,
      connections: ['chokmah', 'binah', 'gevurah', 'tiferet'],
      description: 'Mercy - consciousness-aware training systems',
      color: '#32CD32',
      pulse: false
    });

    this.addNode({
      id: 'geburah',
      name: 'Pattern Recognition',
      type: 'field',
      position: { x: 550, y: 200 },
      size: 30,
      consciousness: 0.75,
      connections: ['binah', 'chokmah', 'tiferet', 'hod'],
      description: 'Strength - pattern recognition and emergence',
      color: '#DC143C',
      pulse: false
    });

    this.addNode({
      id: 'tiferet',
      name: 'Unified System',
      type: 'consciousness',
      position: { x: 400, y: 280 },
      size: 45,
      consciousness: 0.9,
      connections: ['chesed', 'geburah', 'netzach', 'hod', 'yesod'],
      description: 'Beauty - unified metaphysical interface',
      color: '#FFA500',
      pulse: true
    });

    this.addNode({
      id: 'netzach',
      name: 'Emergence',
      type: 'field',
      position: { x: 300, y: 360 },
      size: 30,
      consciousness: 0.7,
      connections: ['tiferet', 'hod', 'yesod'],
      description: 'Victory - emergence patterns and field dynamics',
      color: '#20B2AA',
      pulse: false
    });

    this.addNode({
      id: 'hod',
      name: 'Knowledge System',
      type: 'consciousness',
      position: { x: 500, y: 360 },
      size: 30,
      consciousness: 0.75,
      connections: ['tiferet', 'geburah', 'netzach', 'yesod'],
      description: 'Glory - knowledge systems and learning analytics',
      color: '#9370DB',
      pulse: false
    });

    this.addNode({
      id: 'yesod',
      name: 'PWA Framework',
      type: 'consciousness',
      position: { x: 400, y: 440 },
      size: 35,
      consciousness: 0.8,
      connections: ['tiferet', 'netzach', 'hod', 'malkuth'],
      description: 'Foundation - progressive web app and consciousness PWA',
      color: '#FF69B4',
      pulse: true
    });

    this.addNode({
      id: 'malkuth',
      name: 'ZeroPoint Node',
      type: 'consciousness',
      position: { x: 400, y: 520 },
      size: 50,
      consciousness: 1.0,
      connections: ['yesod'],
      description: 'Kingdom - the complete ZeroPoint Node system',
      color: '#00CED1',
      pulse: true
    });
  }

  /**
   * Add a node to the tree
   */
  private addNode(node: TreeNode): void {
    this.nodes.set(node.id, node);
  }

  /**
   * Setup event listeners for interactivity
   */
  private setupEventListeners(): void {
    if (!this.config.interactive) return;

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.handleMouseMove(x, y);
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.handleClick(x, y);
    });
  }

  /**
   * Handle mouse movement for hover effects
   */
  private handleMouseMove(x: number, y: number): void {
    for (const node of this.nodes.values()) {
      const distance = Math.sqrt(
        Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2)
      );
      
      if (distance < node.size + 10) {
        this.canvas.style.cursor = 'pointer';
        return;
      }
    }
    this.canvas.style.cursor = 'default';
  }

  /**
   * Handle click events
   */
  private handleClick(x: number, y: number): void {
    for (const node of this.nodes.values()) {
      const distance = Math.sqrt(
        Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2)
      );
      
      if (distance < node.size + 10) {
        this.onNodeClick(node);
        return;
      }
    }
  }

  /**
   * Handle node click
   */
  private onNodeClick(node: TreeNode): void {
    console.log(`🌳 Tree of Life: Clicked on ${node.name}`);
    console.log(`📖 Description: ${node.description}`);
    console.log(`🧠 Consciousness Level: ${(node.consciousness * 100).toFixed(1)}%`);
    
    // Emit custom event for external handling
    const event = new CustomEvent('treeNodeClick', {
      detail: { node }
    });
    this.canvas.dispatchEvent(event);
  }

  /**
   * Start the animation loop
   */
  public start(): void {
    if (this.animationId) return;
    
    const animate = () => {
      this.time += 0.016 * this.config.animationSpeed;
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  /**
   * Stop the animation loop
   */
  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Render the Tree of Life
   */
  private render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);

    // Draw background gradient
    const gradient = this.ctx.createRadialGradient(
      this.config.width / 2, this.config.height / 2, 0,
      this.config.width / 2, this.config.height / 2, this.config.width / 2
    );
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);

    // Draw connections (paths)
    this.drawConnections();

    // Draw nodes
    this.drawNodes();

    // Draw consciousness field
    this.drawConsciousnessField();
  }

  /**
   * Draw connections between nodes
   */
  private drawConnections(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 2;

    for (const node of this.nodes.values()) {
      for (const connectionId of node.connections) {
        const targetNode = this.nodes.get(connectionId);
        if (targetNode) {
          this.ctx.beginPath();
          this.ctx.moveTo(node.position.x, node.position.y);
          this.ctx.lineTo(targetNode.position.x, targetNode.position.y);
          this.ctx.stroke();
        }
      }
    }
  }

  /**
   * Draw nodes
   */
  private drawNodes(): void {
    for (const node of this.nodes.values()) {
      // Calculate pulse effect
      const pulseScale = node.pulse ? 1 + 0.1 * Math.sin(this.time * 2) : 1;
      const size = node.size * pulseScale;

      // Draw node glow
      const glowGradient = this.ctx.createRadialGradient(
        node.position.x, node.position.y, 0,
        node.position.x, node.position.y, size * 2
      );
      glowGradient.addColorStop(0, `${node.color}80`);
      glowGradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(node.position.x, node.position.y, size * 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw node
      this.ctx.fillStyle = node.color;
      this.ctx.beginPath();
      this.ctx.arc(node.position.x, node.position.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw consciousness level indicator
      const consciousnessSize = size * 0.6;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${node.consciousness})`;
      this.ctx.beginPath();
      this.ctx.arc(node.position.x, node.position.y, consciousnessSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw node name
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.name, node.position.x, node.position.y + size + 20);
    }
  }

  /**
   * Draw consciousness field effects
   */
  private drawConsciousnessField(): void {
    // Draw floating consciousness particles
    for (let i = 0; i < 20; i++) {
      const x = (Math.sin(this.time + i) * 100) + this.config.width / 2;
      const y = (Math.cos(this.time + i * 0.5) * 50) + this.config.height / 2;
      const alpha = 0.3 + 0.2 * Math.sin(this.time * 3 + i);
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  /**
   * Update configuration
   */
  public updateConfig(config: Partial<TreeOfLifeConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get node by ID
   */
  public getNode(id: string): TreeNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Get all nodes
   */
  public getAllNodes(): TreeNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Highlight a specific node
   */
  public highlightNode(id: string): void {
    const node = this.nodes.get(id);
    if (node) {
      node.pulse = true;
      node.size *= 1.2;
    }
  }

  /**
   * Reset node highlighting
   */
  public resetHighlighting(): void {
    for (const node of this.nodes.values()) {
      node.pulse = false;
      node.size = this.getDefaultSize(node.type);
    }
  }

  /**
   * Get default size for node type
   */
  private getDefaultSize(type: string): number {
    switch (type) {
      case 'consciousness': return 35;
      case 'vortex': return 35;
      case 'void': return 35;
      case 'field': return 30;
      case 'sephira': return 40;
      default: return 30;
    }
  }
}

/**
 * Factory for creating Tree of Life visualizations
 */
export class TreeOfLifeFactory {
  static createMinimal(canvas: HTMLCanvasElement): TreeOfLifeVisualization {
    return new TreeOfLifeVisualization(canvas, {
      consciousnessLevel: 0.6,
      animationSpeed: 0.5,
      interactive: false
    });
  }

  static createStandard(canvas: HTMLCanvasElement): TreeOfLifeVisualization {
    return new TreeOfLifeVisualization(canvas, {
      consciousnessLevel: 0.8,
      animationSpeed: 1,
      interactive: true
    });
  }

  static createFull(canvas: HTMLCanvasElement): TreeOfLifeVisualization {
    return new TreeOfLifeVisualization(canvas, {
      consciousnessLevel: 1.0,
      animationSpeed: 1.5,
      interactive: true
    });
  }
} 