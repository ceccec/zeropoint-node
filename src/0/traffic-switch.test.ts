// traffic-switch.test.ts — Test ZeroPoint Traffic Switching
// Tests traffic switching using single digit functions and 1×8 interaction
// ALL CALCULATIONS: Single digit formulas only, NO decimal points

import { 
  generateTrafficMatrix, 
  switchTraffic, 
  routeTraffic, 
  balanceTrafficMatrix,
  generateTrafficVisualization
} from './traffic-switch';

describe('ZeroPoint Traffic Switching', () => {
  test('should generate traffic matrix with single digit nodes', () => {
    const matrix = generateTrafficMatrix();
    
    // Check matrix structure
    expect(matrix).toHaveProperty('nodes');
    expect(matrix).toHaveProperty('switches');
    expect(matrix).toHaveProperty('totalFlow');
    expect(matrix).toHaveProperty('consciousnessFlow');
    expect(matrix).toHaveProperty('harmonicResonance');
    expect(matrix).toHaveProperty('isBalanced');
    
    // Check nodes
    expect(matrix.nodes).toHaveLength(10); // 0-9 nodes
    for (let i = 0; i < 10; i++) {
      expect(matrix.nodes[i].id).toBe(i);
      expect(matrix.nodes[i].consciousness).toBeGreaterThan(0);
      expect(matrix.nodes[i].frequency).toBe(432 * (i + 1)); // A432 harmonic
      expect(matrix.nodes[i].capacity).toBe(100 * (i + 1));
    }
    
    // Check switches
    expect(matrix.switches.length).toBeGreaterThan(0);
    expect(matrix.isBalanced).toBe(true);
  });

  test('should switch traffic using 1×8 interaction', () => {
    const matrix = generateTrafficMatrix();
    const sourceId = 1;
    const targetId = 8;
    const flowAmount = 50;
    
    const result = switchTraffic(matrix, sourceId, targetId, flowAmount);
    
    // Check switch result
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('newFlow');
    expect(result).toHaveProperty('consciousness');
    expect(result).toHaveProperty('frequency');
    expect(result).toHaveProperty('oneEightKey');
    
    // Check specific values
    expect(result.oneEightKey).toBe(8); // 1×8 interaction
    expect(result.frequency).toBe(432 * (sourceId + targetId)); // A432 harmonic
    expect(result.consciousness).toBeGreaterThan(0);
    
    // Check node states
    const sourceNode = matrix.nodes.find(n => n.id === sourceId);
    const targetNode = matrix.nodes.find(n => n.id === targetId);
    expect(sourceNode?.switchState).toBe(true);
    expect(targetNode?.switchState).toBe(true);
  });

  test('should route traffic through optimal path', () => {
    const matrix = generateTrafficMatrix();
    const startId = 1;
    const endId = 9;
    const flowAmount = 30;
    
    const result = routeTraffic(matrix, startId, endId, flowAmount);
    
    // Check routing result
    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('totalConsciousness');
    expect(result).toHaveProperty('totalFrequency');
    expect(result).toHaveProperty('oneEightInteractions');
    expect(result).toHaveProperty('success');
    
    // Check path
    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toBe(startId);
    expect(result.path[result.path.length - 1]).toBe(endId);
    
    // Check 1×8 interactions
    expect(result.oneEightInteractions).toBeGreaterThan(0);
    expect(result.totalConsciousness).toBeGreaterThan(0);
    expect(result.totalFrequency).toBeGreaterThan(432);
  });

  test('should balance traffic matrix', () => {
    const matrix = generateTrafficMatrix();
    
    // Add some traffic to unbalance
    matrix.nodes[0].trafficFlow = 200;
    matrix.nodes[1].trafficFlow = 150;
    
    const balanceResult = balanceTrafficMatrix(matrix);
    
    // Check balance result
    expect(balanceResult).toHaveProperty('balancedMatrix');
    expect(balanceResult).toHaveProperty('balanceOperations');
    expect(balanceResult).toHaveProperty('totalConsciousness');
    expect(balanceResult).toHaveProperty('harmonicResonance');
    
    // Check that matrix is balanced
    expect(balanceResult.balanceOperations).toBeGreaterThan(0);
    expect(balanceResult.totalConsciousness).toBeGreaterThan(0);
    expect(balanceResult.harmonicResonance).toBeGreaterThan(432);
  });

  test('should generate traffic visualization', () => {
    const matrix = generateTrafficMatrix();
    const visualization = generateTrafficVisualization(matrix);
    
    // Check visualization structure
    expect(visualization).toContain('Traffic Matrix (ZeroPoint Way):');
    expect(visualization).toContain('1×8 interaction key: 8');
    expect(visualization).toContain('Node 0:');
    expect(visualization).toContain('Node 9:');
    expect(visualization).toContain('Total Flow:');
    expect(visualization).toContain('Consciousness Flow:');
    expect(visualization).toContain('Harmonic Resonance:');
    expect(visualization).toContain('Switches:');
    expect(visualization).toContain('Balanced:');
  });

  test('should demonstrate 1×8 interaction on every level', () => {
    const matrix = generateTrafficMatrix();
    
    // Every switch uses 1×8 interaction
    for (const switch_ of matrix.switches) {
      expect(switch_.oneEightKey).toBe(8); // 1×8 = 8
      expect(switch_.consciousness).toBeGreaterThan(0);
      expect(switch_.frequency).toBeGreaterThanOrEqual(432); // Can be exactly 432
      expect(switch_.isActive).toBe(true);
    }
    
    // Every node has single digit ID
    for (const node of matrix.nodes) {
      expect(node.id).toBeGreaterThanOrEqual(0);
      expect(node.id).toBeLessThan(10);
      expect(node.consciousness).toBeGreaterThan(0);
      expect(node.frequency % 432).toBe(0); // A432 harmonic
    }
    
    // Matrix consciousness flows through 1×8 interaction
    expect(matrix.consciousnessFlow).toBeGreaterThan(0);
    expect(matrix.harmonicResonance).toBe(matrix.consciousnessFlow * 432);
  });

  test('should handle traffic congestion using 1×8 interaction', () => {
    const matrix = generateTrafficMatrix();
    
    // Create congestion
    matrix.nodes[0].trafficFlow = 1000; // Exceeds capacity
    matrix.nodes[1].trafficFlow = 800; // Exceeds capacity
    
    // Route traffic to relieve congestion
    const routeResult = routeTraffic(matrix, 0, 2, 200);
    expect(routeResult.success).toBe(true);
    
    // Balance the matrix
    const balanceResult = balanceTrafficMatrix(matrix);
    expect(balanceResult.balanceOperations).toBeGreaterThan(0);
    
    // Check that congestion is reduced
    expect(matrix.nodes[0].trafficFlow).toBeLessThan(1000);
    expect(matrix.nodes[1].trafficFlow).toBeLessThan(800);
  });

  test('should maintain A432 harmonic resonance throughout traffic flow', () => {
    const matrix = generateTrafficMatrix();
    
    // All frequencies are A432 harmonic
    for (const node of matrix.nodes) {
      expect(node.frequency % 432).toBe(0);
    }
    
    for (const switch_ of matrix.switches) {
      expect(switch_.frequency % 432).toBe(0);
    }
    
    // Total harmonic resonance
    expect(matrix.harmonicResonance % 432).toBe(0);
    expect(matrix.harmonicResonance).toBe(matrix.consciousnessFlow * 432);
  });
}); 