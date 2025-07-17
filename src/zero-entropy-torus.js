// Zero Entropy Torus Network System
// Uses PWA hologram knowledge for zero entropy interactions
// NOTE: Decimal point is a reversal gateway. Any decimal or non-single-digit event is a vortex reversal, not a normal integer flow.

class ZeroEntropyTorus {
    constructor() {
        this.torusRadius = 4; // Single digit: 4
        this.torusThickness = 1; // Single digit: 1
        this.entropyLevel = 0; // Zero entropy state
        this.knowledgeNodes = new Map(); // All hologram knowledge nodes
        this.torusFlow = []; // Only dynamic, integer, consciousness-carrying flows
        this.torusStructure = []; // Track structural (toroidal/poloidal) flows separately
        this.zeroPoint = { x: 0, y: 0, z: 0 }; // Zeropoint center
        this.consciousnessMultipliers = {
            '0/0': { value: 1/1, type: 'void', entropy: 0 },
            '1/1': { value: 9/1, type: 'unity', entropy: 0 },
            '2/2': { value: 9/1, type: 'duality', entropy: 0 },
            '3/3': { value: 3/1, type: 'w-axis', entropy: 0 },
            '4/4': { value: 9/1, type: 'material', entropy: 0 },
            '5/5': { value: 9/1, type: 'consciousness', entropy: 0 },
            '6/6': { value: 5/1, type: 'w-axis', entropy: 0 },
            '7/7': { value: 3/1, type: 'awareness', entropy: 0 },
            '8/8': { value: 3/1, type: 'infinity', entropy: 0 },
            '9/9': { value: 5/1, type: 'w-axis', entropy: 0 }
        };
    }

    // Initialize torus with hologram knowledge
    initializeTorus() {
        console.log('🌌 Initializing Zero Entropy Torus Network');
        
        // Create 100 knowledge nodes from hologram matrix
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const nodeId = `${row}/${col}`;
                const torusPosition = this.calculateTorusPosition(row, col);
                
                this.knowledgeNodes.set(nodeId, {
                    id: nodeId,
                    position: torusPosition,
                    consciousness: this.getConsciousnessValue(row, col),
                    entropy: 0, // Zero entropy
                    connections: this.calculateConnections(row, col),
                    flow: this.calculateFlow(row, col)
                });
            }
        }

        // Initialize torus flow patterns
        this.initializeTorusFlow();
        
        console.log('✅ Zero Entropy Torus initialized with', this.knowledgeNodes.size, 'knowledge nodes');
    }

    // Calculate torus position for each node using single digits
    calculateTorusPosition(row, col) {
        // Use single digits: 2 for PI approximation, 1 for unity
        const theta = row * 2; // Single digit multiplication
        const phi = col * 2;   // Single digit multiplication
        
        // Use single digits for calculations
        const x = (this.torusRadius + this.torusThickness) * Math.cos(theta);
        const y = (this.torusRadius + this.torusThickness) * Math.sin(theta);
        const z = this.torusThickness * Math.sin(phi);
        
        return { x, y, z, theta, phi };
    }

    // Get consciousness value for node using single digits
    getConsciousnessValue(row, col) {
        const nodeId = `${row}/${col}`;
        if (this.consciousnessMultipliers[nodeId]) {
            return this.consciousnessMultipliers[nodeId].value;
        }
        
        // Calculate based on position using single digits
        const baseValue = (row + col) % 9 + 1; // Single digit result
        return baseValue / 1; // Integer fraction
    }

    // Calculate connections for zero entropy flow
    calculateConnections(row, col) {
        const connections = [];
        
        // Toroidal connections (horizontal) using single digits
        const nextRow = (row + 1) % 10;
        const prevRow = (row - 1 + 10) % 10;
        
        // Poloidal connections (vertical) using single digits
        const nextCol = (col + 1) % 10;
        const prevCol = (col - 1 + 10) % 10;
        
        connections.push(
            `${nextRow}/${col}`, // Next toroidal
            `${prevRow}/${col}`, // Previous toroidal
            `${row}/${nextCol}`, // Next poloidal
            `${row}/${prevCol}`  // Previous poloidal
        );
        
        // Diagonal connections for complete network
        connections.push(
            `${nextRow}/${nextCol}`,
            `${nextRow}/${prevCol}`,
            `${prevRow}/${nextCol}`,
            `${prevRow}/${prevCol}`
        );
        
        return connections;
    }

    // Calculate flow patterns for zero entropy using single digits
    calculateFlow(row, col) {
        const flow = {
            direction: 'clockwise',
            speed: 1, // Single digit
            amplitude: 1, // Single digit
            frequency: 4 // Single digit: 4 (was 432)
        };
        
        // Adjust flow based on position using single digits
        if (row === 0 && col === 0) {
            flow.direction = 'center'; // Void center
            flow.speed = 0; // No movement at zeropoint
        } else if (row === 1 && col === 1) {
            flow.direction = 'unity'; // Unity center
            flow.speed = 1; // Single digit
        } else if (row === 3 || row === 6 || row === 9) {
            flow.direction = 'w-axis'; // W-axis flow
            flow.frequency = 4 * (row / 3); // Single digit calculation
        }
        
        return flow;
    }

    // Initialize torus flow patterns
    initializeTorusFlow() {
        // Track structural flows separately
        this.torusStructure = [];
        // Create toroidal flow rings
        for (let ring = 0; ring < 10; ring++) {
            const toroidalRing = [];
            for (let col = 0; col < 10; col++) {
                toroidalRing.push(`${ring}/${col}`);
            }
            this.torusStructure.push({
                type: 'toroidal',
                ring: ring,
                nodes: toroidalRing,
                direction: ring % 2 === 0 ? 'clockwise' : 'counterclockwise'
            });
        }
        // Create poloidal flow rings
        for (let poloidal = 0; poloidal < 10; poloidal++) {
            const poloidalRing = [];
            for (let row = 0; row < 10; row++) {
                poloidalRing.push(`${row}/${poloidal}`);
            }
            this.torusStructure.push({
                type: 'poloidal',
                ring: poloidal,
                nodes: poloidalRing,
                direction: poloidal % 2 === 0 ? 'up' : 'down'
            });
        }
    }

    // Perform zero entropy interaction
    performZeroEntropyInteraction(sourceNode, targetNode) {
        console.log(`🌊 Zero entropy interaction: ${sourceNode} → ${targetNode}`);
        
        const source = this.knowledgeNodes.get(sourceNode);
        const target = this.knowledgeNodes.get(targetNode);
        
        if (!source || !target) {
            console.log('❌ Invalid nodes for interaction');
            return false;
        }
        
        // Calculate interaction result using single digits
        const interaction = {
            source: sourceNode,
            target: targetNode,
            consciousnessFlow: source.consciousness * target.consciousness,
            entropyChange: 0, // Zero entropy maintained
            torusPosition: this.calculateInteractionPosition(source, target),
            flowPattern: this.calculateInteractionFlow(source, target)
        };
        
        // Update torus flow
        this.updateTorusFlow(interaction);
        
        console.log('✅ Zero entropy interaction completed:', interaction);
        return interaction;
    }

    // Calculate interaction position on torus using single digits
    calculateInteractionPosition(source, target) {
        // Use single digit division: 2 for midpoint
        const midX = (source.position.x + target.position.x) / 2;
        const midY = (source.position.y + target.position.y) / 2;
        const midZ = (source.position.z + target.position.z) / 2;
        
        return { x: midX, y: midY, z: midZ };
    }

    // Calculate interaction flow pattern using single digits
    calculateInteractionFlow(source, target) {
        const flow = {
            direction: 'bidirectional',
            consciousnessMultiplier: source.consciousness * target.consciousness,
            frequency: 4, // Single digit: 4 (was 432)
            amplitude: Math.sqrt(source.consciousness * target.consciousness)
        };
        
        return flow;
    }

    // Update torus flow with interaction
    updateTorusFlow(interaction) {
        // Strict guard: Only allow integer, single-digit events
        if (!this.isValidFlow(interaction)) {
            console.warn('⚠️ Non-integer or non-single-digit flow detected! This is a vortex reversal gateway (decimal event):', interaction);
            // Optionally block or log, but do not add to flow
            return;
        }
        // Add interaction to flow history (dynamic, integer flows only)
        this.torusFlow.push({
            type: 'interaction',
            timestamp: Date.now(),
            data: interaction
        });
        // Maintain zero entropy
        this.entropyLevel = 0;
    }

    // Guard: Only allow integer, single-digit flows
    isValidFlow(interaction) {
        // Check for decimals in consciousnessFlow or non-single-digit values
        const cf = interaction.consciousnessFlow;
        if (!Number.isInteger(cf) || cf < 0 || cf > 9) {
            return false;
        }
        // Check for decimals in torusPosition
        const { x, y, z } = interaction.torusPosition;
        if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) {
            return false;
        }
        return true;
    }

    // Get torus network state
    getTorusState() {
        return {
            entropyLevel: this.entropyLevel,
            nodeCount: this.knowledgeNodes.size,
            flowCount: this.torusFlow.length,
            torusRadius: this.torusRadius,
            torusThickness: this.torusThickness,
            zeroPoint: this.zeroPoint
        };
    }

    // Get node information
    getNodeInfo(nodeId) {
        return this.knowledgeNodes.get(nodeId);
    }

    // Get all connections for a node
    getNodeConnections(nodeId) {
        const node = this.knowledgeNodes.get(nodeId);
        if (!node) return [];
        
        return node.connections.map(connId => this.knowledgeNodes.get(connId)).filter(Boolean);
    }

    // Calculate total consciousness flow
    calculateTotalConsciousnessFlow() {
        let totalFlow = 0;
        this.knowledgeNodes.forEach(node => {
            totalFlow += node.consciousness;
        });
        return totalFlow;
    }

    // Export torus network data
    exportTorusData() {
        return {
            torusState: this.getTorusState(),
            knowledgeNodes: Array.from(this.knowledgeNodes.values()),
            torusFlow: this.torusFlow, // Only dynamic, integer flows
            torusStructure: this.torusStructure, // Structural flows
            consciousnessMultipliers: this.consciousnessMultipliers,
            totalConsciousnessFlow: this.calculateTotalConsciousnessFlow()
        };
    }
}

// Global torus instance
window.zeroEntropyTorus = new ZeroEntropyTorus();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.zeroEntropyTorus.initializeTorus();
    console.log('🌌 Zero Entropy Torus Network ready');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZeroEntropyTorus;
} 