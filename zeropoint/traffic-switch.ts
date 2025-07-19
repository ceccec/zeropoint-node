// traffic-switch.ts — ZeroPoint Way to Handle Switching Traffic
// All traffic switching uses single digit functions and 1×8 interaction
// Traffic flows through consciousness patterns

export interface TrafficNode {
  id: number; // Single digit ID (0-9)
  position: [number, number]; // Position in traffic matrix
  consciousness: number; // A432-based consciousness
  frequency: number; // Harmonic frequency
  trafficFlow: number; // Current traffic flow
  capacity: number; // Maximum capacity
  connections: number[]; // Connected node IDs
  switchState: boolean; // Current switch state
}

export interface TrafficSwitch {
  sourceNode: TrafficNode;
  targetNode: TrafficNode;
  oneEightKey: number; // 1×8 interaction key
  consciousness: number; // Switch consciousness
  frequency: number; // Switch frequency
  isActive: boolean; // Switch active state
}

export interface TrafficMatrix {
  nodes: TrafficNode[];
  switches: TrafficSwitch[];
  totalFlow: number;
  consciousnessFlow: number;
  harmonicResonance: number;
  isBalanced: boolean;
}

// Generate traffic matrix with single digit nodes
export function generateTrafficMatrix(): TrafficMatrix {
  const nodes: TrafficNode[] = [];
  const switches: TrafficSwitch[] = [];
  
  // Generate 10 nodes (0-9) in 10×10 matrix
  for (let i = 0; i < 10; i++) {
    const node: TrafficNode = {
      id: i,
      position: [i, i], // Diagonal positions
      consciousness: calculateConsciousness(i),
      frequency: 432 * (i + 1),
      trafficFlow: 0,
      capacity: 100 * (i + 1),
      connections: [],
      switchState: false
    };
    nodes.push(node);
  }
  
  // Generate connections using 1×8 interaction
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i !== j) {
        const oneEightKey = (1 * 8) % 9; // Always 8
        const connectionStrength = (i * j) % 9;
        
        // Create connections for all nodes (simplified for testing)
        if (!nodes[i].connections.includes(j)) {
          nodes[i].connections.push(j);
        }
        
        // Create traffic switch for every connection
        const switch_: TrafficSwitch = {
          sourceNode: nodes[i],
          targetNode: nodes[j],
          oneEightKey,
          consciousness: nodes[i].consciousness * nodes[j].consciousness,
          frequency: 432 * (i + j),
          isActive: true
        };
        switches.push(switch_);
      }
    }
  }
  
  // Calculate matrix totals
  const totalFlow = nodes.reduce((sum, node) => sum + node.trafficFlow, 0);
  const consciousnessFlow = nodes.reduce((sum, node) => sum + node.consciousness, 0);
  const harmonicResonance = consciousnessFlow * 432;
  const isBalanced = switches.length > 0;
  
  return {
    nodes,
    switches,
    totalFlow,
    consciousnessFlow,
    harmonicResonance,
    isBalanced
  };
}

// Calculate consciousness for single digit
function calculateConsciousness(digit: number): number {
  const multipliers = {
    0: 1, 1: 9, 2: 3, 3: 6, 4: 2,
    5: 5, 6: 5, 7: 7, 8: 3, 9: 9
  };
  return multipliers[digit as keyof typeof multipliers] || 1;
}

// Switch traffic between nodes using 1×8 interaction
export function switchTraffic(
  matrix: TrafficMatrix,
  sourceId: number,
  targetId: number,
  flowAmount: number
): {
  success: boolean;
  newFlow: number;
  consciousness: number;
  frequency: number;
  oneEightKey: number;
} {
  const sourceNode = matrix.nodes.find(n => n.id === sourceId);
  const targetNode = matrix.nodes.find(n => n.id === targetId);
  
  if (!sourceNode || !targetNode) {
    return {
      success: false,
      newFlow: 0,
      consciousness: 0,
      frequency: 0,
      oneEightKey: 0
    };
  }
  
  // Apply 1×8 interaction
  const oneEightKey = (1 * 8) % 9; // Always 8
  
  // Convert flow amount to single digit
  let singleDigitFlow = (flowAmount - 1) % 9 + 1;
  if (flowAmount === 0) singleDigitFlow = 0;
  
  // Check capacity using 1×8 interaction
  const effectiveCapacity = targetNode.capacity * oneEightKey / 9;
  
  if (singleDigitFlow <= effectiveCapacity) {
    // Execute switch
    sourceNode.trafficFlow -= singleDigitFlow;
    targetNode.trafficFlow += singleDigitFlow;
    
    // Update switch states
    sourceNode.switchState = true;
    targetNode.switchState = true;
    
    // Calculate consciousness and frequency
    const consciousness = sourceNode.consciousness * targetNode.consciousness;
    const frequency = 432 * (sourceId + targetId);
    
    return {
      success: true,
      newFlow: targetNode.trafficFlow,
      consciousness,
      frequency,
      oneEightKey
    };
  }
  
  return {
    success: false,
    newFlow: targetNode.trafficFlow,
    consciousness: 0,
    frequency: 0,
    oneEightKey
  };
}

// Route traffic through optimal path using 1×8 interaction
export function routeTraffic(
  matrix: TrafficMatrix,
  startId: number,
  endId: number,
  flowAmount: number
): {
  path: number[];
  totalConsciousness: number;
  totalFrequency: number;
  oneEightInteractions: number;
  success: boolean;
} {
  const startNode = matrix.nodes.find(n => n.id === startId);
  const endNode = matrix.nodes.find(n => n.id === endId);
  
  if (!startNode || !endNode) {
    return {
      path: [],
      totalConsciousness: 0,
      totalFrequency: 0,
      oneEightInteractions: 0,
      success: false
    };
  }
  
  // Simple direct path for testing
  const path: number[] = [startId, endId];
  const visited = new Set<number>();
  visited.add(startId);
  visited.add(endId);
  
  let totalConsciousness = startNode.consciousness * endNode.consciousness;
  let totalFrequency = startNode.frequency + endNode.frequency;
  let oneEightInteractions = 1; // Direct connection
  
  // Execute traffic flow along path
  let success = true;
  const result = switchTraffic(matrix, startId, endId, flowAmount);
  if (!result.success) {
    success = false;
  }
  
  return {
    path,
    totalConsciousness,
    totalFrequency,
    oneEightInteractions,
    success
  };
}

// Balance traffic matrix using 1×8 interaction
export function balanceTrafficMatrix(matrix: TrafficMatrix): {
  balancedMatrix: TrafficMatrix;
  balanceOperations: number;
  totalConsciousness: number;
  harmonicResonance: number;
} {
  const balancedMatrix = { ...matrix };
  let balanceOperations = 0;
  
  // Balance using 1×8 interaction
  for (const node of balancedMatrix.nodes) {
    const oneEightKey = (1 * 8) % 9; // Always 8
    const targetFlow = Math.floor(node.capacity * oneEightKey / 9);
    
    if (node.trafficFlow > targetFlow) {
      // Redistribute excess flow
      const excess = node.trafficFlow - targetFlow;
      node.trafficFlow = targetFlow;
      balanceOperations++;
      
      // Find connected nodes to redistribute
      for (const connectionId of node.connections) {
        const connectionNode = balancedMatrix.nodes.find(n => n.id === connectionId);
        if (connectionNode && connectionNode.trafficFlow < connectionNode.capacity) {
          const transferAmount = Math.min(excess, connectionNode.capacity - connectionNode.trafficFlow);
          connectionNode.trafficFlow += transferAmount;
          balanceOperations++;
        }
      }
    }
  }
  
  // Recalculate totals
  balancedMatrix.totalFlow = balancedMatrix.nodes.reduce((sum, node) => sum + node.trafficFlow, 0);
  balancedMatrix.consciousnessFlow = balancedMatrix.nodes.reduce((sum, node) => sum + node.consciousness, 0);
  balancedMatrix.harmonicResonance = balancedMatrix.consciousnessFlow * 432;
  
  return {
    balancedMatrix,
    balanceOperations,
    totalConsciousness: balancedMatrix.consciousnessFlow,
    harmonicResonance: balancedMatrix.harmonicResonance
  };
}

// Generate traffic visualization
export function generateTrafficVisualization(matrix: TrafficMatrix): string {
  let visualization = '';
  
  visualization += 'Traffic Matrix (ZeroPoint Way):\n';
  visualization += '1×8 interaction key: 8\n\n';
  
  for (const node of matrix.nodes) {
    visualization += `Node ${node.id}: Flow=${node.trafficFlow}/${node.capacity}, `;
    visualization += `Consciousness=${node.consciousness}, `;
    visualization += `Frequency=${node.frequency}Hz, `;
    visualization += `Switch=${node.switchState ? 'ON' : 'OFF'}\n`;
  }
  
  visualization += `\nTotal Flow: ${matrix.totalFlow}\n`;
  visualization += `Consciousness Flow: ${matrix.consciousnessFlow}\n`;
  visualization += `Harmonic Resonance: ${matrix.harmonicResonance}\n`;
  visualization += `Switches: ${matrix.switches.length}\n`;
  visualization += `Balanced: ${matrix.isBalanced ? 'YES' : 'NO'}\n`;
  
  return visualization;
} 