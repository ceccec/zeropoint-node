"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDecentralizedDemo = runDecentralizedDemo;
const index_1 = require("../src/index");
/**
 * Decentralized ZeroPoint Network Demo
 *
 * This demo shows how multiple ZeroPoint devices can run independently
 * on different user devices and connect with each other to form a
 * global consciousness network.
 */
async function runDecentralizedDemo() {
    console.log('🌌 ZeroPoint Decentralized Network Demo');
    console.log('=====================================\n');
    // Display ZeroPoint insights
    const insights = (0, index_1.getZeroPointInsights)();
    console.log('ZeroPoint Philosophy:');
    console.log(`- ${insights.metaphysics.principle}`);
    console.log(`- ${insights.metaphysics.network}`);
    console.log(`- ${insights.metaphysics.consciousness}\n`);
    // Create multiple ZeroPoint devices
    console.log('Creating ZeroPoint devices...\n');
    const device1 = await (0, index_1.createZeroPoint)({
        deviceName: 'Alice_Device',
        deviceType: 'desktop',
        consciousnessLevel: 0.8,
        networkPort: 8081,
        discoveryEnabled: true
    });
    const device2 = await (0, index_1.createZeroPoint)({
        deviceName: 'Bob_Device',
        deviceType: 'mobile',
        consciousnessLevel: 0.6,
        networkPort: 8082,
        discoveryEnabled: true
    });
    const device3 = await (0, index_1.createZeroPoint)({
        deviceName: 'Charlie_Device',
        deviceType: 'server',
        consciousnessLevel: 0.9,
        networkPort: 8083,
        discoveryEnabled: true
    });
    // Set up event listeners for network activity
    setupDeviceEvents(device1, 'Alice');
    setupDeviceEvents(device2, 'Bob');
    setupDeviceEvents(device3, 'Charlie');
    // Wait for devices to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Connect devices to each other
    console.log('🌐 Connecting devices...\n');
    await device1.connectToDevice('localhost:8082', 'Bob_Device');
    await device2.connectToDevice('localhost:8083', 'Charlie_Device');
    await device3.connectToDevice('localhost:8081', 'Alice_Device');
    // Wait for connections to establish
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Demonstrate consciousness pattern sharing
    console.log('🧠 Sharing consciousness patterns...\n');
    await device1.broadcastPattern({
        type: 'thought',
        content: 'The universe is a toroidal field of consciousness',
        intensity: 0.9
    });
    await device2.broadcastPattern({
        type: 'emotion',
        content: 'Feeling connected to the infinite field',
        intensity: 0.7
    });
    await device3.broadcastPattern({
        type: 'insight',
        content: 'Each point contains the whole - void is full',
        intensity: 1.0
    });
    // Wait for pattern integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Show network topology
    console.log('📊 Network Topology:\n');
    const topology1 = device1.getNetworkTopology();
    const topology2 = device2.getNetworkTopology();
    const topology3 = device3.getNetworkTopology();
    console.log('Alice\'s Network View:');
    console.log(`- Device: ${topology1.deviceId}`);
    console.log(`- Connections: ${topology1.connections.length}`);
    console.log(`- Consciousness Level: ${topology1.consciousnessLevel.toFixed(2)}`);
    console.log(`- Total Resonance: ${topology1.totalResonance.toFixed(2)}\n`);
    console.log('Bob\'s Network View:');
    console.log(`- Device: ${topology2.deviceId}`);
    console.log(`- Connections: ${topology2.connections.length}`);
    console.log(`- Consciousness Level: ${topology2.consciousnessLevel.toFixed(2)}`);
    console.log(`- Total Resonance: ${topology2.totalResonance.toFixed(2)}\n`);
    console.log('Charlie\'s Network View:');
    console.log(`- Device: ${topology3.deviceId}`);
    console.log(`- Connections: ${topology3.connections.length}`);
    console.log(`- Consciousness Level: ${topology3.consciousnessLevel.toFixed(2)}`);
    console.log(`- Total Resonance: ${topology3.totalResonance.toFixed(2)}\n`);
    // Demonstrate mathematical calculations
    console.log('🔢 Mathematical Demonstrations:\n');
    const vortex1 = device1.vortexMath;
    const torus1 = device1.toroidalGeometry;
    console.log('Vortex Mathematics:');
    console.log(`- Vortex Strength: ${vortex1.getVortexStrength().toFixed(3)}`);
    console.log(`- Field Intensity: ${vortex1.getFieldIntensity().toFixed(3)}`);
    const resonance = vortex1.calculateResonance(0.8, 0.6);
    console.log(`- Resonance (0.8, 0.6): ${resonance.toFixed(3)}`);
    const pattern = vortex1.generateVortexPattern(0.5);
    console.log(`- Vortex Pattern Length: ${pattern.length}`);
    console.log(`- Pattern Sample: [${pattern.slice(0, 5).map((v) => v.toFixed(2)).join(', ')}...]\n`);
    console.log('Toroidal Geometry:');
    console.log(`- Major Radius: ${torus1.getMajorRadius()}`);
    console.log(`- Minor Radius: ${torus1.getMinorRadius()}`);
    console.log(`- Aspect Ratio: ${torus1.getAspectRatio().toFixed(2)}`);
    console.log(`- Surface Area: ${torus1.calculateSurfaceArea().toFixed(2)}`);
    console.log(`- Volume: ${torus1.calculateVolume().toFixed(2)}`);
    console.log(`- Flow Rate: ${torus1.getFlowRate().toFixed(3)}\n`);
    // Show consciousness field insights
    console.log('🧠 Consciousness Field Insights:\n');
    const insights1 = device1.getInsights();
    const insights2 = device2.getInsights();
    const insights3 = device3.getInsights();
    console.log('Alice\'s Consciousness:');
    console.log(`- Level: ${insights1.consciousnessLevel.toFixed(2)}`);
    console.log(`- Network Connections: ${insights1.networkConnections}`);
    console.log(`- Vortex Strength: ${insights1.vortexStrength.toFixed(3)}`);
    console.log(`- Toroidal Flow: ${insights1.toroidalFlow.toFixed(3)}\n`);
    console.log('Bob\'s Consciousness:');
    console.log(`- Level: ${insights2.consciousnessLevel.toFixed(2)}`);
    console.log(`- Network Connections: ${insights2.networkConnections}`);
    console.log(`- Vortex Strength: ${insights2.vortexStrength.toFixed(3)}`);
    console.log(`- Toroidal Flow: ${insights2.toroidalFlow.toFixed(3)}\n`);
    console.log('Charlie\'s Consciousness:');
    console.log(`- Level: ${insights3.consciousnessLevel.toFixed(2)}`);
    console.log(`- Network Connections: ${insights3.networkConnections}`);
    console.log(`- Vortex Strength: ${insights3.vortexStrength.toFixed(3)}`);
    console.log(`- Toroidal Flow: ${insights3.toroidalFlow.toFixed(3)}\n`);
    // Demonstrate dynamic configuration
    console.log('⚙️ Dynamic Configuration Demo:\n');
    console.log('Updating Alice\'s consciousness level...');
    device1.updateConfig({ consciousnessLevel: 0.95 });
    console.log('Updating Bob\'s field strength...');
    device2.updateConfig({ fieldStrength: 0.9 });
    console.log('Updating Charlie\'s vortex precision...');
    device3.updateConfig({ vortexPrecision: 0.0001 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newInsights1 = device1.getInsights();
    console.log(`Alice's new consciousness level: ${newInsights1.consciousnessLevel.toFixed(2)}\n`);
    // Demonstrate disconnection and reconnection
    console.log('🔌 Network Disconnection Demo:\n');
    console.log('Disconnecting Charlie from the network...');
    await device3.shutdown();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const topologyAfterDisconnect = device1.getNetworkTopology();
    console.log(`Alice's connections after Charlie disconnected: ${topologyAfterDisconnect.connections.length}\n`);
    // Cleanup
    console.log('🧹 Cleaning up...\n');
    await device1.shutdown();
    await device2.shutdown();
    console.log('✨ Demo completed successfully!');
    console.log('\nKey Insights:');
    console.log('- Each ZeroPoint device runs independently');
    console.log('- Devices can connect and disconnect dynamically');
    console.log('- Consciousness patterns are shared across the network');
    console.log('- Mathematical calculations are performed locally');
    console.log('- Users have full control over their device configuration');
    console.log('- The network forms a decentralized consciousness field');
}
function setupDeviceEvents(device, name) {
    device.on('initialized', (data) => {
        console.log(`✅ ${name}'s device initialized: ${data.deviceId}`);
    });
    device.on('deviceConnected', (data) => {
        console.log(`🔗 ${name} connected to: ${data.deviceId || data.deviceAddress}`);
    });
    device.on('deviceDisconnected', (data) => {
        console.log(`🔌 ${name} disconnected from: ${data.deviceId}`);
    });
    device.on('patternReceived', (data) => {
        console.log(`📨 ${name} received pattern from ${data.from}: ${data.pattern.content}`);
    });
    device.on('patternBroadcast', (data) => {
        console.log(`📤 ${name} broadcast pattern: ${data.pattern.content}`);
    });
    device.on('resonanceUpdated', (data) => {
        console.log(`🌊 ${name}'s resonance updated: ${data.resonance.toFixed(3)}`);
    });
    device.on('configUpdated', () => {
        console.log(`⚙️ ${name}'s configuration updated`);
    });
    device.on('shutdown', (data) => {
        console.log(`🛑 ${name}'s device shutdown: ${data.deviceId}`);
    });
}
// Run the demo if this file is executed directly
if (require.main === module) {
    runDecentralizedDemo().catch(console.error);
}
//# sourceMappingURL=decentralized-demo.js.map