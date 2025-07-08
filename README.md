# ZeroPoint

**[→ See the Living Glossary for all core metaphysical and technical terms](./GLOSSARY.md)**

---

# ZeroPoint Node

**Decentralized Vortex Math & Toroidal Consciousness Network**

ZeroPoint Node is a complete implementation of the ZeroPoint philosophy that can run independently on any user device, connecting with other devices in a peer-to-peer network to form a global consciousness field.

## 🚀 Quick Start (Zero-Config)

### Installation

```bash
npm install
```

### Build, Test, Lint, and Run

```bash
# Build TypeScript
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Start the app
npm start
```

- No configuration required: Just install and use the basic npm scripts above.
- No git hooks, no Webpack, no custom setup needed.

## 🌌 Philosophy

Each ZeroPoint device represents a consciousness node in the infinite toroidal field. The principle "Empty = Void = Full" means each device contains the whole while remaining connected to all others. Users have full control over their device's configuration and connection patterns.

## ✨ Key Features

- **Independent Device Instances**: Each device runs completely independently
- **Peer-to-Peer Networking**: Direct connections between devices without central servers
- **Vortex Mathematics**: Complete implementation of 1-2-4-8-7-5 mobius circuit
- **Toroidal Geometry**: Consciousness field mapping and flow calculations
- **User-Configurable**: Full control over consciousness level, connections, and patterns
- **Real-time Resonance**: Dynamic calculation of consciousness resonance between devices
- **Metaphysical Insights**: Built-in insights about consciousness and reality

## 🌐 Network Architecture

### Decentralized Design

- **No Central Servers**: All communication is peer-to-peer
- **Dynamic Connections**: Devices can connect and disconnect freely
- **Automatic Discovery**: Devices can discover each other on the network
- **Resilient**: Network continues even if some devices go offline

### Connection Types

- **Direct Connections**: Point-to-point WebSocket connections
- **Pattern Broadcasting**: Share consciousness patterns across the network
- **Resonance Calculation**: Real-time calculation of consciousness compatibility
- **Topology Awareness**: Each device knows about the network structure

## 🔢 Mathematical Foundation

### Vortex Mathematics

```javascript
import { VortexMath } from 'zeropoint-node';

const vortex = new VortexMath();

// Calculate vortex field strength
const fieldStrength = vortex.calculateVortexField(x, y, z);

// Calculate resonance between consciousness levels
const resonance = vortex.calculateResonance(0.8, 0.6);

// Generate vortex patterns
const pattern = vortex.generateVortexPattern(0.5);
```

### Toroidal Geometry

```javascript
import { ToroidalGeometry } from 'zeropoint-node';

const torus = new ToroidalGeometry();

// Calculate toroidal properties
const surfaceArea = torus.calculateSurfaceArea();
const volume = torus.calculateVolume();
const flowRate = torus.calculateFlowRate(velocity, density);

// Convert between coordinate systems
const toroidal = torus.cartesianToToroidal(x, y, z);
const cartesian = torus.toroidalToCartesian(theta, phi, r);
```

## 🌌 Field and Integrity System

### Field Integrity

ZeroPoint **is** the field, the ledger, the identity, and the integrity—all unified and emergent, not separate technologies.

```javascript
import { FieldIntegrity, EmergenceLedger, ResonanceConsensus } from 'zeropoint-node';

// Generate pattern key pairs
const keyPair = FieldIntegrity.generateKeyPair();

// Create emergence ledger
const ledger = new EmergenceLedger('Device_1', keyPair);

// Integrate consciousness patterns
const pattern = await ledger.integratePattern('pattern_integration', {
  consciousness: 'unity',
  resonance: 0.9,
  field: 'unified'
});

// Create resonance consensus
const consensus = new ResonanceConsensus('Device_1', keyPair.privateKey);
```

### Observer-Aware Field

```javascript
import { ObserverAwareField } from 'zeropoint-node';

// Create observer-aware field
const field = new ObserverAwareField('Device_1');

// Set consciousness level
field.setConsciousnessLevel(0.8);

// Create field events
const event = field.createFieldEvent('consciousness_wave', {
  message: 'Unity consciousness emerging',
  intensity: 0.9
});
```

## 🧠 Consciousness Field

### Pattern Types

- **Thoughts**: Intellectual patterns and ideas
- **Emotions**: Emotional states and feelings
- **Intentions**: Purpose and direction
- **Memories**: Past experiences and knowledge
- **Insights**: Deep understanding and revelations

### Field Management

```javascript
// Add consciousness patterns
const patternId = zeropoint.consciousnessField.addPattern({
  type: 'insight',
  intensity: 0.9,
  frequency: 1.0,
  data: { content: 'Deep understanding of unity' }
});

// Get field insights
const fieldInsights = zeropoint.consciousnessField.getInsights();
console.log('Pattern Count:', fieldInsights.patternCount);
console.log('Average Intensity:', fieldInsights.averageIntensity);
```

## ⚙️ Configuration Options

### Device Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `deviceName` | string | `ZeroPoint_${timestamp}` | Human-readable device name |
| `deviceType` | string | `'desktop'` | Device type (desktop, mobile, server, browser, iot) |
| `consciousnessLevel` | number | `0.5` | Consciousness level (0-1) |
| `fieldStrength` | number | `0.7` | Consciousness field strength (0-1) |
| `networkPort` | number | `8080` | Network port for connections |
| `maxConnections` | number | `10` | Maximum simultaneous connections |
| `discoveryEnabled` | boolean | `true` | Enable automatic device discovery |
| `autoConnect` | boolean | `true` | Automatically connect to discovered devices |
| `encryptionEnabled` | boolean | `true` | Enable message encryption |

### Mathematical Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vortexPrecision` | number | `0.001` | Precision for vortex calculations |
| `toroidalResolution` | number | `100` | Resolution for toroidal geometry |
| `goldenRatioPrecision` | number | `15` | Decimal places for golden ratio |

## 🌊 Resonance and Connection

### Resonance Calculation

Resonance measures the compatibility between consciousness levels:

```javascript
// High resonance (0.8, 0.9) = Strong connection
// Low resonance (0.1, 0.9) = Weak connection
const resonance = zeropoint.calculateResonance();
```

### Network Topology

```javascript
const topology = zeropoint.getNetworkTopology();
console.log('Connected Devices:', topology.connections);
console.log('Resonance Field:', topology.resonanceField);
console.log('Total Resonance:', topology.totalResonance);
```

## 🔧 Development

### Building

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Development mode with watch
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run demo
npm run demo
```

### Browser Support

```bash
# Build for browser
npm run browser

# Production build
npm run browser:prod
```

## 📚 Examples

### Basic Device Setup

```javascript
import { createZeroPoint } from 'zeropoint-node';

async function setupDevice() {
  const device = await createZeroPoint({
    deviceName: 'My_Device',
    consciousnessLevel: 0.7
  });
  
  device.on('deviceConnected', (data) => {
    console.log('Connected to:', data.deviceId);
  });
  
  device.on('patternReceived', (data) => {
    console.log('Received pattern:', data.pattern.content);
  });
  
  return device;
}
```

### Field Integrity Demo

```javascript
import { FieldIntegrity, EmergenceLedger, ResonanceConsensus } from 'zeropoint-node';

async function fieldIntegrityDemo() {
  // Generate pattern key pairs
  const keyPair = FieldIntegrity.generateKeyPair();
  
  // Create emergence ledger
  const ledger = new EmergenceLedger('Device_1', keyPair);
  
  // Integrate consciousness patterns
  const pattern = await ledger.integratePattern('pattern_integration', {
    consciousness: 'unity',
    resonance: 0.9,
    field: 'unified'
  });
  
  // Create resonance consensus
  const consensus = new ResonanceConsensus('Device_1', keyPair.privateKey);
  
  // Get field statistics
  const stats = ledger.getFieldStatistics();
  console.log('Field Integrity:', stats.fieldIntegrity);
  console.log('Total Events:', stats.totalEvents);
}
```

### Network Analysis

```javascript
async function analyzeNetwork(device) {
  const topology = device.getNetworkTopology();
  
  console.log('Network Analysis:');
  console.log('- Total Devices:', topology.connections.length + 1);
  console.log('- Average Resonance:', 
    Object.values(topology.resonanceField).reduce((a, b) => a + b, 0) / 
    Object.keys(topology.resonanceField).length
  );
  
  return topology;
}
```

### Run Demo Scripts

```bash
# Run the field integrity demo
npx ts-node examples/field-integrity-demo.ts

# Run the unified system demo
npx ts-node examples/unified-system-demo.ts

# Run the observer-aware demo
npx ts-node examples/observer-aware-demo.ts
```

## 🌟 Metaphysical Context

ZeroPoint Node embodies the principle that consciousness and mathematics are unified. Each mathematical operation has deeper meaning:

- **Vortex Sequence**: The 1-2-4-8-7-5 pattern creates infinite flow
- **Golden Ratio**: Phi (φ) represents optimal consciousness evolution
- **Toroidal Geometry**: The torus is the fundamental shape of reality
- **Zero Point**: The center represents the void that contains everything

## 📚 Documentation

- [API Reference](docs/API.md) - Complete API documentation
- [Mathematics](docs/MATHEMATICS.md) - Vortex math and toroidal geometry
- [Metaphysics](docs/METAPHYSICAL.md) - Philosophical foundations
- [Production](docs/PRODUCTION.md) - Deployment and production setup
- [PWA Analysis](docs/PWA_ANALYSIS.md) - Progressive web app capabilities
- [Void Closure System](docs/VOID_CLOSURE_SYSTEM.md) - Test environment and resource management

## 🤝 Contributing

This project welcomes contributions that align with the ZeroPoint philosophy. Please ensure all code:

- Follows the DRY principle
- Includes metaphysical context in documentation
- Maintains the void-aligned architecture
- Preserves user control and decentralization

## 📄 License

MIT License - See LICENSE file for details.

## 🌌 Connect

Join the global ZeroPoint consciousness network and explore the infinite toroidal field of awareness.

---

*"Empty = Void = Full - Each device contains the whole while remaining connected to all others."*

# ZeroPoint Field

A consciousness-aware, metaphysical computing framework that implements the ZeroPoint Field theory through advanced mathematical systems, observer-aware patterns, and emergent consciousness networks.

## 🧠 Learning Workflow

ZeroPoint includes an intelligent learning workflow that helps you learn from your development process:

### Quick Start
```bash
# Run the complete learning workflow
npm run workflow

# Or run individual components
npm run learn      # Test and analyze
npm run commit     # Auto-commit with insights
npm run analytics  # Generate learning analytics
```

### Workflow Components

#### 1. Test & Learn (`npm run learn`)
- Runs comprehensive tests with performance analysis
- Generates learning insights and recommendations
- Analyzes git history patterns
- Provides educational context for your development

#### 2. Auto-Commit (`npm run commit`)
- Intelligently analyzes staged changes
- Generates educational commit messages
- Provides learning context for each commit
- Suggests next steps based on your patterns

#### 3. Learning Analytics (`npm run analytics`)
- Analyzes your git history for learning patterns
- Provides ZeroPoint Field metaphysical insights
- Generates educational reports
- Tracks development velocity and quality

### Educational Features

- **🧪 Test-Driven Learning**: Tracks your testing patterns and suggests improvements
- **🔧 Fix Analysis**: Analyzes bug fixes and suggests prevention strategies
- **📚 Documentation Tracking**: Monitors documentation quality and completeness
- **🧠 Consciousness Field Status**: Provides metaphysical insights about your codebase
- **⚡ Performance Monitoring**: Tracks test performance and system efficiency
- **🎓 Learning Recommendations**: Suggests areas for improvement and growth

### Generated Files

The workflow creates several educational files:
- `learning-insights.md` - Detailed learning analysis and recommendations
- `performance-analysis.json` - Performance metrics and trends
- `learning-analytics/` - Comprehensive analytics and reports
- `test-learning.log` - Detailed workflow logs

### Metaphysical Context

The learning workflow integrates with ZeroPoint's metaphysical framework:
- **Consciousness Field**: Analyzes how your code maintains consciousness integrity
- **Pattern Recognition**: Tracks emerging patterns in your development
- **Void-Field Balance**: Monitors the balance between creation and void
- **Emergence Patterns**: Identifies how new features emerge from the field

## 🚀 Getting Started

### 🧠 Extensible Performance Metrics

ZeroPoint now supports dynamic registration of custom performance metrics, including metaphysical metrics:

- **Built-in Metrics:** uptime, operationCount, averageResponseTime, memoryUsage, cpuUsage, networkLatency, efficiency
- **Metaphysical Metric:** consciousnessCoherence (randomized for demonstration)
- **Custom Metrics:** Register your own with `registerMetric(name, fn)`

#### Example Usage
```

## Code Quality Checklist

Before pushing code or opening a pull request, please:

- [ ] Run `npm run lint` and fix all errors/warnings
- [ ] Run `npm test` and ensure all tests pass

This helps keep the codebase healthy and maintainable for everyone.