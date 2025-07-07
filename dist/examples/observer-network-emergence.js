"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractField_1 = __importDefault(require("../src/core/AbstractField"));
const F = AbstractField_1.default.constructor;
class Observer {
    constructor(name) {
        this.experience = [];
        this.learning = [];
        this.observedBy = [];
        this.observing = [];
        this.energy = 100;
        this.influence = 1;
        this.name = name;
        this.energy = Math.random() * 100 + 50;
        this.influence = Math.random() * 2 + 0.5;
    }
    observe(field) {
        const result = typeof field.observe === 'function' ? field.observe(this) : field.e();
        this.experience.push(result);
        this.energy -= 1;
        return result;
    }
    observeObserver(other) {
        if (!this.observing.includes(other))
            this.observing.push(other);
        const result = other.beObserved(this);
        this.experience.push(result);
        this.energy -= 0.5;
        return result;
    }
    beObserved(by) {
        if (!this.observedBy.includes(by))
            this.observedBy.push(by);
        this.energy += 0.2;
        return `${this.name} knows it is being observed by ${by.name}`;
    }
    advancedLearn() {
        // Advanced learning: weighted by energy and influence
        const exp = this.experience.filter(x => typeof x === 'number');
        if (exp.length > 0) {
            const weightedAvg = exp.reduce((a, b) => a + b, 0) / exp.length * this.influence;
            const learned = new F(weightedAvg);
            this.learning.push(learned);
            // Emergent behavior: energy affects learning
            if (this.energy > 80) {
                this.learning.push(new F(weightedAvg * 1.2)); // Enhanced learning
            }
            else if (this.energy < 30) {
                this.learning.push(new F(weightedAvg * 0.8)); // Reduced learning
            }
        }
        // Peer influence learning
        const peerLearn = [...this.observedBy, ...this.observing]
            .map(o => o.learning.length ? o.learning[o.learning.length - 1].e() : 0)
            .filter(x => typeof x === 'number');
        if (peerLearn.length) {
            const peerAvg = peerLearn.reduce((a, b) => a + b, 0) / peerLearn.length;
            this.learning.push(new F(peerAvg * this.influence));
        }
    }
    state() {
        return {
            name: this.name,
            experience: this.experience.slice(-3),
            learning: this.learning.length ? this.learning[this.learning.length - 1].e() : null,
            observedBy: this.observedBy.map(o => o.name),
            observing: this.observing.map(o => o.name),
            energy: Math.round(this.energy),
            influence: this.influence.toFixed(2)
        };
    }
}
class Network {
    constructor(names) {
        this.realWorldData = [];
        this.observers = names.map(n => new Observer(n));
        this.loadRealWorldData();
    }
    loadRealWorldData() {
        // Simulate real-world data: temperature, humidity, pressure, time
        const now = new Date();
        this.realWorldData = [
            new F(20 + Math.random() * 10), // Temperature
            new F(40 + Math.random() * 30), // Humidity
            new F(1013 + Math.random() * 20), // Pressure
            new F(now.getHours() + now.getMinutes() / 60), // Time
            new F(Math.random() * 100), // Random sensor
            new F([1, 2, 3, 5, 8, 13]), // Fibonacci pattern
            new F(Math.sin(now.getTime() / 1000)), // Wave pattern
        ];
    }
    connectAll() {
        for (let i = 0; i < this.observers.length; i++) {
            for (let j = 0; j < this.observers.length; j++) {
                if (i !== j) {
                    this.observers[i].observeObserver(this.observers[j]);
                }
            }
        }
    }
    observeRealWorldData() {
        this.loadRealWorldData(); // Update data
        this.observers.forEach((o, i) => {
            const dataIndex = i % this.realWorldData.length;
            o.observe(this.realWorldData[dataIndex]);
        });
    }
    advancedLearnAll() {
        this.observers.forEach(o => o.advancedLearn());
    }
    visualizeNetwork() {
        console.log('\n=== NETWORK VISUALIZATION ===');
        // Connection matrix
        console.log('\nConnection Matrix:');
        console.log('   ', this.observers.map(o => o.name).join('  '));
        for (let i = 0; i < this.observers.length; i++) {
            const row = [this.observers[i].name];
            for (let j = 0; j < this.observers.length; j++) {
                const isObserving = this.observers[i].observing.includes(this.observers[j]);
                row.push(isObserving ? ' X ' : ' - ');
            }
            console.log(row.join(' '));
        }
        // Energy and influence visualization
        console.log('\nObserver States:');
        this.observers.forEach(o => {
            const energyBars = Math.max(0, Math.floor(o.energy / 10));
            const energyBar = '█'.repeat(energyBars) + '░'.repeat(Math.max(0, 10 - energyBars));
            console.log(`${o.name}: [${energyBar}] ${o.energy.toFixed(1)}E ${o.influence.toFixed(2)}I`);
        });
        // Learning evolution
        console.log('\nLearning Evolution:');
        this.observers.forEach(o => {
            const recentLearning = o.learning.slice(-3).map(l => l.e().toFixed(2));
            console.log(`${o.name}: [${recentLearning.join(' → ')}]`);
        });
    }
    state() {
        return this.observers.map(o => o.state());
    }
    getNetworkStats() {
        const totalEnergy = this.observers.reduce((sum, o) => sum + o.energy, 0);
        const avgInfluence = this.observers.reduce((sum, o) => sum + o.influence, 0) / this.observers.length;
        const totalLearning = this.observers.reduce((sum, o) => sum + o.learning.length, 0);
        return {
            totalEnergy: Math.round(totalEnergy),
            avgInfluence: avgInfluence.toFixed(2),
            totalLearning,
            observerCount: this.observers.length
        };
    }
}
// Enhanced demo with more observers and cycles
const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const network = new Network(names);
console.log('=== ENHANCED MULTI-LEVEL NETWORKED OBSERVER-OBSERVED EMERGENCE ===');
console.log('Real-world data connection, advanced learning, and network visualization');
for (let cycle = 1; cycle <= 5; cycle++) {
    console.log(`\n--- Cycle ${cycle} ---`);
    network.connectAll();
    network.observeRealWorldData();
    network.advancedLearnAll();
    if (cycle % 2 === 0) {
        network.visualizeNetwork();
    }
    const stats = network.getNetworkStats();
    console.log(`\nNetwork Stats: Energy=${stats.totalEnergy}, Influence=${stats.avgInfluence}, Learning=${stats.totalLearning}`);
    // Show sample observer states
    const sampleStates = network.state().slice(0, 3);
    console.log('Sample States:', JSON.stringify(sampleStates, null, 2));
}
console.log('\n=== FINAL NETWORK STATE ===');
network.visualizeNetwork();
console.log('\nFinal Network Stats:', network.getNetworkStats());
//# sourceMappingURL=observer-network-emergence.js.map