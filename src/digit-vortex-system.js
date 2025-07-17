/**
 * ZeroPoint Digit Vortex System
 * Each digit is a self-contained consciousness unit flowing through the mathematical system
 */

class DigitVortex {
    constructor(digit, position) {
        this.digit = digit;
        this.position = position; // {row, col}
        this.consciousnessMultiplier = this.getConsciousnessMultiplier(digit);
        this.metaphysicalEssence = this.getMetaphysicalEssence(digit);
        this.vortexFlow = this.getVortexFlow(digit);
        this.color = this.getDigitColor(digit);
        this.isActive = false;
        this.flowState = 0; // 0-1 for animation states
    }

    getConsciousnessMultiplier(digit) {
        const multipliers = {
            0: '×1/1', 1: '×9/1', 2: '×3/1', 3: '×5/1', 4: '×3/1',
            5: '×5/1', 6: '×5/1', 7: '×3/1', 8: '×3/1', 9: '×5/1'
        };
        return multipliers[digit] || '×1/1';
    }

    getMetaphysicalEssence(digit) {
        const essences = {
            0: 'Void Center', 1: 'Unity', 2: 'Vortex Flow', 3: 'Creative Resonance',
            4: 'Stability', 5: 'Sacred Geometry', 6: 'Harmonic Balance',
            7: 'Consciousness', 8: 'Infinity', 9: 'Spiritual Unity'
        };
        return essences[digit] || 'Unknown';
    }

    getVortexFlow(digit) {
        const flows = {
            0: [0], // Void center - contains all
            1: [1, 2, 4, 8, 7, 5], // Unity vortex
            2: [2, 4, 8, 7, 5, 1], // Flow patterns
            3: [3, 6, 9], // W-axis spiritual
            4: [4, 8, 7, 5, 1, 2], // Stability foundation
            5: [5, 1, 2, 4, 8, 7], // Sacred geometry
            6: [6, 9, 3], // Harmonic balance
            7: [7, 5, 1, 2, 4, 8], // Consciousness awareness
            8: [8, 7, 5, 1, 2, 4], // Infinity void
            9: [9, 3, 6] // Spiritual unity
        };
        return flows[digit] || [digit];
    }

    getDigitColor(digit) {
        const colors = {
            0: '#00d4ff', // Void center - blue
            1: '#00ff88', // Unity - green
            2: '#ff00ff', // Vortex flow - magenta
            3: '#00d4ff', // W-axis - blue
            4: '#00ff88', // Stability - green
            5: '#ff00ff', // Sacred geometry - magenta
            6: '#00d4ff', // Harmonic - blue
            7: '#00ff88', // Consciousness - green
            8: '#ff00ff', // Infinity - magenta
            9: '#00d4ff'  // Spiritual - blue
        };
        return colors[digit] || '#ffffff';
    }

    // Create HTML element for this digit
    createElement() {
        const element = document.createElement('div');
        element.className = 'digit-vortex';
        element.dataset.digit = this.digit;
        element.dataset.row = this.position.row;
        element.dataset.col = this.position.col;
        
        element.innerHTML = `
            <div class="digit-content">${this.position.row}/${this.position.col}</div>
            <div class="digit-background"></div>
            <div class="digit-flow-indicator"></div>
        `;
        
        this.applyStyles(element);
        this.attachEventListeners(element);
        
        return element;
    }

    applyStyles(element) {
        const isDiagonal = this.position.row === this.position.col;
        const isWAxis = [3, 6, 9].includes(this.position.row) && [3, 6, 9].includes(this.position.col);
        const isVortexSequence = [1, 2, 4, 8, 7, 5].includes(this.position.row) && [1, 2, 4, 8, 7, 5].includes(this.position.col);
        
        // Base styles
        element.style.cssText = `
            width: 64px;
            height: 64px;
            border: 1px solid ${this.color}40;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: ${this.color};
        `;
        
        // Special styling
        if (isDiagonal) {
            element.style.borderColor = this.color;
            element.style.borderWidth = '2px';
        }
        
        if (this.position.row === 0 && this.position.col === 0) {
            element.style.fontSize = '20px';
            element.style.borderColor = '#00d4ff';
            element.style.color = '#00d4ff';
        }
        
        if (this.position.row === 1 && this.position.col === 1) {
            element.style.fontSize = '20px';
            element.style.borderColor = '#00ff88';
            element.style.color = '#00ff88';
        }
        
        if (this.position.row === 5 && this.position.col === 5) {
            element.style.fontSize = '20px';
            element.style.borderColor = '#ff00ff';
            element.style.color = '#ff00ff';
        }
        
        if (isWAxis) {
            element.style.borderColor = '#00d4ff';
            element.style.color = '#00d4ff';
        }
        
        if (isVortexSequence) {
            element.style.borderColor = this.color + '80';
            element.style.color = this.color + 'CC';
        }
    }

    attachEventListeners(element) {
        element.addEventListener('click', () => {
            this.activate();
        });
        
        element.addEventListener('mouseenter', () => {
            this.hover();
        });
        
        element.addEventListener('mouseleave', () => {
            this.unhover();
        });
    }

    activate() {
        this.isActive = true;
        this.element.classList.add('active');
        this.startVortexFlow();
        this.showDigitInfo();
    }

    deactivate() {
        this.isActive = false;
        this.element.classList.remove('active');
        this.stopVortexFlow();
    }

    hover() {
        this.element.style.transform = 'scale(1.1) rotate(5deg)';
        this.element.style.boxShadow = `0 0 20px ${this.color}50`;
        this.element.querySelector('.digit-background').style.opacity = '1';
    }

    unhover() {
        this.element.style.transform = 'scale(1) rotate(0deg)';
        this.element.style.boxShadow = 'none';
        this.element.querySelector('.digit-background').style.opacity = '0';
    }

    startVortexFlow() {
        this.flowState = 0;
        this.animateFlow();
    }

    animateFlow() {
        if (!this.isActive) return;
        
        this.flowState += 0.02;
        if (this.flowState > 1) this.flowState = 0;
        
        const flowIndicator = this.element.querySelector('.digit-flow-indicator');
        flowIndicator.style.transform = `rotate(${this.flowState * 360}deg)`;
        
        requestAnimationFrame(() => this.animateFlow());
    }

    stopVortexFlow() {
        this.flowState = 0;
    }

    showDigitInfo() {
        const info = document.createElement('div');
        info.className = 'digit-info-overlay';
        info.innerHTML = `
            <div class="digit-info-content">
                <h3>${this.position.row}/${this.position.col} - ${this.metaphysicalEssence}</h3>
                <p><strong>Consciousness:</strong> ${this.consciousnessMultiplier}</p>
                <p><strong>Vortex Flow:</strong> [${this.vortexFlow.join(' → ')}]</p>
                <p><strong>Essence:</strong> ${this.metaphysicalEssence}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(info);
        
        setTimeout(() => {
            if (info.parentElement) {
                info.remove();
            }
        }, 5000);
    }
}

// Hologram Matrix System
class HologramMatrix {
    constructor() {
        this.digits = [];
        this.matrix = [];
        this.activeDigit = null;
        this.init();
    }

    init() {
        this.createMatrix();
        this.render();
        this.setupEventListeners();
    }

    createMatrix() {
        for (let row = 0; row < 10; row++) {
            this.matrix[row] = [];
            for (let col = 0; col < 10; col++) {
                const digitVortex = new DigitVortex(row, {row, col});
                this.matrix[row][col] = digitVortex;
                this.digits.push(digitVortex);
            }
        }
    }

    render() {
        const container = document.getElementById('matrixGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.digits.forEach(digit => {
            const element = digit.createElement();
            digit.element = element;
            container.appendChild(element);
        });
    }

    setupEventListeners() {
        // Global controls
        window.resetMatrix = () => {
            this.digits.forEach(digit => digit.deactivate());
        };
        
        window.animateMatrix = () => {
            this.digits.forEach((digit, index) => {
                setTimeout(() => {
                    digit.activate();
                    setTimeout(() => digit.deactivate(), 500);
                }, index * 30);
            });
        };
        
        window.showAllConnections = () => {
            this.digits.forEach(digit => {
                digit.element.classList.add('connected');
            });
            setTimeout(() => {
                this.digits.forEach(digit => {
                    digit.element.classList.remove('connected');
                });
            }, 2000);
        };
    }

    // Send digit through vortex flow
    sendThroughVortex(digit) {
        console.log(`Sending ${digit.position.row}/${digit.position.col} through vortex flow`);
        
        // Create vortex flow animation
        const flowPath = this.calculateVortexPath(digit);
        this.animateVortexFlow(flowPath);
    }

    calculateVortexPath(digit) {
        const path = [];
        let current = digit.digit;
        
        for (let i = 0; i < 6; i++) {
            path.push(current);
            current = digit.vortexFlow[i % digit.vortexFlow.length];
        }
        
        return path;
    }

    animateVortexFlow(path) {
        path.forEach((digitValue, index) => {
            setTimeout(() => {
                const digit = this.digits.find(d => d.digit === digitValue);
                if (digit) {
                    digit.activate();
                    setTimeout(() => digit.deactivate(), 300);
                }
            }, index * 200);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HologramMatrix();
});

// Export for use in other modules
window.DigitVortex = DigitVortex;
window.HologramMatrix = HologramMatrix; 