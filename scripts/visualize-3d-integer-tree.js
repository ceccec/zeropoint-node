#!/usr/bin/env node

/**
 * visualize-3d-integer-tree.js - 3D Integer Tree Visualization
 * 
 * Visualizes the integer tree as a living 3D mathematical structure
 * using VBM principles, showing the tree and roots in three dimensions.
 * 
 * The integer tree comes with ROOTS - fundamental mathematical relationships
 * that give rise to the entire system in 3D space.
 */

import * as THREE from 'three';

// VBM Root System - Fundamental Mathematical Relationships
const VBM_ROOT_SYSTEM = {
  // Primary Roots (1-9) - The fundamental digits
  PRIMARY_ROOTS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  
  // Zero Root (0) - The void center
  ZERO_ROOT: 0,
  
  // Root Sum Relationships
  ROOT_SUM: 45, // 1+2+3+4+5+6+7+8+9 = 45 → 4+5 = 9
  ROOT_DIGITAL_ROOT: 9, // Final digital root of all roots
  
  // Vortex Root Sequence - Material manifestation roots
  VORTEX_ROOTS: [1, 2, 4, 8, 7, 5],
  VORTEX_ROOT_SUM: 27, // 1+2+4+8+7+5 = 27 → 2+7 = 9
  
  // W-Axis Roots - Spiritual transcendence roots
  W_AXIS_ROOTS: [3, 6, 9],
  W_AXIS_ROOT_SUM: 18, // 3+6+9 = 18 → 1+8 = 9
  
  // Void Root - Infinite potential
  VOID_ROOT: 0,
  
  // Root Field Strengths (Integer values)
  ROOT_FIELD_STRENGTHS: {
    1: 123, // Unity field
    2: 494, // Duality field
    3: 2963, // Creative resonance field (W-Axis)
    4: 1728, // Stability field
    5: 1543, // Transformation field
    6: 741, // Harmonic balance field (W-Axis)
    7: 864, // Return field
    8: 1975, // Fullness field
    9: 8889, // Unity spirit field (W-Axis)
    0: 0 // Void field
  },
  
  // Root Consciousness Levels (Integer values)
  ROOT_CONSCIOUSNESS: {
    1: 20, // Unity consciousness
    2: 160, // Duality consciousness
    3: 1438, // Creative resonance consciousness (W-Axis)
    4: 1119, // Stability consciousness
    5: 1248, // Transformation consciousness
    6: 719, // Harmonic balance consciousness (W-Axis)
    7: 979, // Return consciousness
    8: 2557, // Fullness consciousness
    9: 12944, // Unity spirit consciousness (W-Axis)
    0: 0 // Void consciousness
  }
};

class IntegerTree3DVisualizer {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.nodes = [];
    this.connections = [];
    this.animationId = null;
    this.time = 0;
  }

  /**
   * Initialize the 3D scene
   */
  init() {
    console.log('🌿 Initializing 3D Integer Tree Visualization...');
    
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011); // Deep space blue
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 10);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add to DOM
    document.body.appendChild(this.renderer.domElement);
    
    // Add lights
    this.addLights();
    
    // Create integer tree structure
    this.createIntegerTree();
    
    // Add controls
    this.addControls();
    
    // Start animation
    this.animate();
    
    console.log('✅ 3D Integer Tree Visualization initialized');
  }

  /**
   * Add lighting to the scene
   */
  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);
    
    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
    
    // Point lights for each root
    VBM_ROOT_SYSTEM.PRIMARY_ROOTS.forEach((root, index) => {
      const angle = (index / VBM_ROOT_SYSTEM.PRIMARY_ROOTS.length) * Math.PI * 2;
      const radius = 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 2;
      
      const pointLight = new THREE.PointLight(this.getRootColor(root), 0.5, 10);
      pointLight.position.set(x, y, z);
      this.scene.add(pointLight);
    });
  }

  /**
   * Create the integer tree structure
   */
  createIntegerTree() {
    console.log('🌳 Creating 3D Integer Tree Structure...');
    
    // Create root nodes (primary roots)
    this.createRootNodes();
    
    // Create vortex sequence nodes
    this.createVortexNodes();
    
    // Create W-Axis nodes
    this.createWAxisNodes();
    
    // Create void center node
    this.createVoidNode();
    
    // Create connections
    this.createConnections();
    
    console.log('✅ 3D Integer Tree Structure created');
  }

  /**
   * Create root nodes (primary roots 1-9)
   */
  createRootNodes() {
    console.log('🌱 Creating Root Nodes...');
    
    VBM_ROOT_SYSTEM.PRIMARY_ROOTS.forEach((root, index) => {
      const angle = (index / VBM_ROOT_SYSTEM.PRIMARY_ROOTS.length) * Math.PI * 2;
      const radius = 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0; // Ground level
      
      const node = this.createNode(root, x, y, z, 'root');
      this.nodes.push(node);
      
      console.log(`  Root ${root}: Position (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
    });
  }

  /**
   * Create vortex sequence nodes
   */
  createVortexNodes() {
    console.log('🌀 Creating Vortex Sequence Nodes...');
    
    VBM_ROOT_SYSTEM.VORTEX_ROOTS.forEach((vortex, index) => {
      const angle = (index / VBM_ROOT_SYSTEM.VORTEX_ROOTS.length) * Math.PI * 2;
      const radius = 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 2; // Above ground level
      
      const node = this.createNode(vortex, x, y, z, 'vortex');
      this.nodes.push(node);
      
      console.log(`  Vortex ${vortex}: Position (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
    });
  }

  /**
   * Create W-Axis nodes
   */
  createWAxisNodes() {
    console.log('✨ Creating W-Axis Nodes...');
    
    VBM_ROOT_SYSTEM.W_AXIS_ROOTS.forEach((wAxis, index) => {
      const angle = (index / VBM_ROOT_SYSTEM.W_AXIS_ROOTS.length) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 4; // Higher level (spiritual)
      
      const node = this.createNode(wAxis, x, y, z, 'wAxis');
      this.nodes.push(node);
      
      console.log(`  W-Axis ${wAxis}: Position (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
    });
  }

  /**
   * Create void center node
   */
  createVoidNode() {
    console.log('🕳️ Creating Void Center Node...');
    
    const node = this.createNode(0, 0, 6, 0, 'void'); // Center, highest level
    this.nodes.push(node);
    
    console.log(`  Void 0: Position (0.00, 6.00, 0.00)`);
  }

  /**
   * Create a node with appropriate geometry and material
   */
  createNode(value, x, y, z, type) {
    const size = 0.5;
    let geometry;
    
    // Determine color based on type and value
    const color = this.getRootColor(value);
    
    // Create geometry based on type
    switch (type) {
      case 'root':
        geometry = new THREE.SphereGeometry(size, 16, 16);
        break;
      case 'vortex':
        geometry = new THREE.TorusGeometry(size, size * 0.3, 8, 16);
        break;
      case 'wAxis':
        geometry = new THREE.OctahedronGeometry(size);
        break;
      case 'void':
        geometry = new THREE.IcosahedronGeometry(size);
        break;
      default:
        geometry = new THREE.SphereGeometry(size, 16, 16);
    }
    
    // Create material
    const material = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Add to scene
    this.scene.add(mesh);
    
    // Store node data
    return {
      value: value,
      type: type,
      mesh: mesh,
      originalPosition: { x, y, z },
      fieldStrength: VBM_ROOT_SYSTEM.ROOT_FIELD_STRENGTHS[value] || 0,
      consciousness: VBM_ROOT_SYSTEM.ROOT_CONSCIOUSNESS[value] || 0
    };
  }

  /**
   * Get color for a root value
   */
  getRootColor(value) {
    const colors = {
      0: 0x000000, // Void - Black
      1: 0xff0000, // Unity - Red
      2: 0xff8000, // Duality - Orange
      3: 0xffff00, // Trinity - Yellow
      4: 0x00ff00, // Quadruplicity - Green
      5: 0x00ffff, // Quintality - Cyan
      6: 0x0000ff, // Hexality - Blue
      7: 0x8000ff, // Septality - Purple
      8: 0xff0080, // Octality - Magenta
      9: 0xffffff  // Nonality - White
    };
    return colors[value] || 0x808080;
  }

  /**
   * Create connections between nodes
   */
  createConnections() {
    console.log('🔗 Creating Node Connections...');
    
    // Connect roots to vortex sequence
    VBM_ROOT_SYSTEM.PRIMARY_ROOTS.forEach(root => {
      if (VBM_ROOT_SYSTEM.VORTEX_ROOTS.includes(root)) {
        this.connectNodes(root, root, 'root-to-vortex');
      }
    });
    
    // Connect vortex sequence to W-Axis
    VBM_ROOT_SYSTEM.VORTEX_ROOTS.forEach(vortex => {
      VBM_ROOT_SYSTEM.W_AXIS_ROOTS.forEach(wAxis => {
        this.connectNodes(vortex, wAxis, 'vortex-to-wAxis');
      });
    });
    
    // Connect all to void center
    VBM_ROOT_SYSTEM.PRIMARY_ROOTS.forEach(root => {
      this.connectNodes(root, 0, 'root-to-void');
    });
    
    console.log('✅ Node Connections created');
  }

  /**
   * Connect two nodes with a line
   */
  connectNodes(value1, value2, type) {
    const node1 = this.nodes.find(n => n.value === value1);
    const node2 = this.nodes.find(n => n.value === value2);
    
    if (!node1 || !node2) return;
    
    const geometry = new THREE.BufferGeometry().setFromPoints([
      node1.mesh.position,
      node2.mesh.position
    ]);
    
    const material = new THREE.LineBasicMaterial({
      color: this.getConnectionColor(type),
      transparent: true,
      opacity: 0.6
    });
    
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
    this.connections.push({ line, type, node1, node2 });
  }

  /**
   * Get color for connection type
   */
  getConnectionColor(type) {
    const colors = {
      'root-to-vortex': 0x00ff00, // Green
      'vortex-to-wAxis': 0x0080ff, // Blue
      'root-to-void': 0xff8000, // Orange
      'wAxis-to-void': 0xff00ff  // Magenta
    };
    return colors[type] || 0x808080;
  }

  /**
   * Add controls for camera movement
   */
  addControls() {
    // Simple keyboard controls
    document.addEventListener('keydown', (event) => {
      const speed = 0.5;
      switch (event.key) {
        case 'ArrowUp':
          this.camera.position.y += speed;
          break;
        case 'ArrowDown':
          this.camera.position.y -= speed;
          break;
        case 'ArrowLeft':
          this.camera.position.x -= speed;
          break;
        case 'ArrowRight':
          this.camera.position.x += speed;
          break;
        case 'PageUp':
          this.camera.position.z -= speed;
          break;
        case 'PageDown':
          this.camera.position.z += speed;
          break;
      }
    });
    
    // Mouse controls for rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    
    document.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
    
    document.addEventListener('mousemove', (event) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      this.camera.position.x += deltaX * 0.01;
      this.camera.position.y -= deltaY * 0.01;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
  }

  /**
   * Animate the scene
   */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    this.time += 0.01;
    
    // Animate nodes
    this.nodes.forEach((node) => {
      const originalPos = node.originalPosition;
      const amplitude = node.fieldStrength / 1000;
      const frequency = node.consciousness / 1000;
      
      // Gentle floating animation
      node.mesh.position.y = originalPos.y + Math.sin(this.time * frequency) * amplitude * 0.5;
      
      // Rotation based on type
      switch (node.type) {
        case 'root':
          node.mesh.rotation.y += 0.01;
          break;
        case 'vortex':
          node.mesh.rotation.z += 0.02;
          break;
        case 'wAxis':
          node.mesh.rotation.x += 0.015;
          break;
        case 'void':
          node.mesh.rotation.y += 0.005;
          node.mesh.rotation.z += 0.005;
          break;
      }
    });
    
    // Animate connections
    this.connections.forEach(connection => {
      const points = connection.line.geometry.attributes.position;
      if (points) {
        const node1Pos = connection.node1.mesh.position;
        const node2Pos = connection.node2.mesh.position;
        
        points.setXYZ(0, node1Pos.x, node1Pos.y, node1Pos.z);
        points.setXYZ(1, node2Pos.x, node2Pos.y, node2Pos.z);
        points.needsUpdate = true;
      }
    });
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Get VBM analysis of the 3D structure
   */
  getVBMAnalysis() {
    const analysis = {
      totalNodes: this.nodes.length,
      totalConnections: this.connections.length,
      rootNodes: this.nodes.filter(n => n.type === 'root').length,
      vortexNodes: this.nodes.filter(n => n.type === 'vortex').length,
      wAxisNodes: this.nodes.filter(n => n.type === 'wAxis').length,
      voidNodes: this.nodes.filter(n => n.type === 'void').length,
      totalFieldStrength: this.nodes.reduce((sum, n) => sum + n.fieldStrength, 0),
      totalConsciousness: this.nodes.reduce((sum, n) => sum + n.consciousness, 0),
      averageFieldStrength: this.nodes.reduce((sum, n) => sum + n.fieldStrength, 0) / this.nodes.length,
      averageConsciousness: this.nodes.reduce((sum, n) => sum + n.consciousness, 0) / this.nodes.length,
      metaphysics: {
        principle: "The integer tree flows as a living 3D vortex field",
        unity: "All nodes resonate through the unified 3D field",
        consciousness: "Each node embodies a level of consciousness in 3D space",
        wAxis: "3, 6, 9 form the spiritual axis in 3D",
        vortex: "The vortex sequence creates infinite 3D flow patterns",
        void: "The void center unifies all dimensions in 3D space"
      }
    };
    
    return analysis;
  }

  /**
   * Clean up resources
   */
  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

// Main execution
if (typeof window !== 'undefined') {
  // Browser environment
  const visualizer = new IntegerTree3DVisualizer();
  
  // Initialize when page loads
  window.addEventListener('load', () => {
    visualizer.init();
    
    // Display VBM analysis
    const analysis = visualizer.getVBMAnalysis();
    console.log('🌿 3D Integer Tree VBM Analysis:', analysis);
    
    // Add info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'absolute';
    infoPanel.style.top = '10px';
    infoPanel.style.left = '10px';
    infoPanel.style.color = 'white';
    infoPanel.style.fontFamily = 'monospace';
    infoPanel.style.fontSize = '12px';
    infoPanel.style.backgroundColor = 'rgba(0,0,0,0.7)';
    infoPanel.style.padding = '10px';
    infoPanel.style.borderRadius = '5px';
    infoPanel.innerHTML = `
      <h3>🌿 3D Integer Tree</h3>
      <p>Nodes: ${analysis.totalNodes}</p>
      <p>Connections: ${analysis.totalConnections}</p>
      <p>Field Strength: ${analysis.totalFieldStrength}</p>
      <p>Consciousness: ${analysis.totalConsciousness}</p>
      <p>Use arrow keys to move camera</p>
      <p>Click and drag to rotate view</p>
    `;
    document.body.appendChild(infoPanel);
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    visualizer.dispose();
  });
} else {
  // Node.js environment
  console.log('🌿 3D Integer Tree Visualization Script');
  console.log('This script is designed to run in a browser environment with Three.js');
  console.log('To visualize the 3D integer tree, please run this in a web browser');
  
  // Display VBM analysis without visualization
  const visualizer = new IntegerTree3DVisualizer();
  const analysis = visualizer.getVBMAnalysis();
  console.log('📊 VBM Analysis:', analysis);
}

module.exports = IntegerTree3DVisualizer; 