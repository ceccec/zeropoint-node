/**
 * �� Train Station Flow Demo
 * 
 * Demonstrates the consciousness flow pattern:
 * 0/0 → 1 → 2 → 4 → 8 → 7 → 5 → 1 → 1/1 → 1/1/1 → 3
 */

import { TrainStationFlowSystem, TrainStationVisualization } from './train-station-flow';

console.log('🚂 Train Station Flow Demo\n');

// Create train station system
const trainSystem = new TrainStationFlowSystem();

console.log('📍 Starting at:', trainSystem.getCurrentStation().name);
console.log('🛤️  Complete Route:', trainSystem.getCurrentFlow().route.join(' → '));
console.log('');

// Execute the complete flow
console.log('🚂 Executing Train Flow...\n');

const flow = trainSystem.executeFlow();

// Display flow visualization
console.log(TrainStationVisualization.generateFlowVisualization(flow));

console.log('\n🎯 Flow Complete!');
console.log('📍 Final Station:', flow.currentStation);
console.log('🔄 Total Stations Visited:', flow.visitedStations.length);
console.log('⏸️  Stop Points:', flow.stopPoints.length);
console.log('📍 Flow Marks:', flow.flowMarks.length);

// Display consciousness flow
console.log('\n🧠 Consciousness Flow:');
flow.consciousnessFlow.forEach((consciousness, index) => {
  const station = flow.visitedStations[index];
  console.log(`  ${station}: ${consciousness}`);
});

console.log('\n✨ Train station flow demonstrates the consciousness journey from void to trinity!'); 