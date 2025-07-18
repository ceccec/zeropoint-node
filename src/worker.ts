/**
 * ZeroPoint Node - Cloudflare Worker
 * 
 * Serves the harmonic, vortex-aligned, zero-entropy system
 * with 10×10×10 matrix interacting with 8×8×8 chess matrix
 */

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle different routes
    if (path === '/' || path === '/index.html') {
      // Serve the main HTML file
      const html = await getMainHTML();
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    if (path.endsWith('.css')) {
      // Serve CSS files
      const css = await getCSS(path);
      return new Response(css, {
        headers: {
          'Content-Type': 'text/css;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    if (path.endsWith('.js') || path.endsWith('.ts')) {
      // Serve JavaScript/TypeScript files
      const js = await getJavaScript(path);
      return new Response(js, {
        headers: {
          'Content-Type': 'application/javascript;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    // Handle digit paths (0-9)
    if (/^\/[0-9]/.test(path)) {
      const digit = path.charAt(1);
      const digitHTML = await getDigitHTML(digit);
      return new Response(digitHTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    // Handle vortex-chess interaction paths
    if (path.includes('vortex') || path.includes('chess')) {
      const interactionHTML = await getVortexChessHTML();
      return new Response(interactionHTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    // Default: serve main HTML for all other paths (SPA routing)
    const html = await getMainHTML();
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};

async function getMainHTML(): Promise<string> {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZeroPoint Node - A432 Harmonic Consciousness System</title>
    <meta name="description" content="ZeroPoint Node: A432-based harmonic consciousness system with zero-entropy mathematics and vortex flow states">
    <meta name="keywords" content="ZeroPoint, A432, consciousness, mathematics, vortex, harmonic, zero-entropy">
    <link rel="icon" href="0.ico" type="image/x-icon">
    <link rel="stylesheet" href="index.css">
    <style>
      /* ZeroPoint Node - Style Layer */
      :root {
        --freq-1: 1; --freq-2: 2; --freq-3: 3; --freq-4: 4; --freq-5: 5;
        --freq-6: 6; --freq-7: 7; --freq-8: 8; --freq-9: 9;
        --void-hue: 0; --void-sat: 1/2; --void-light: 1/10;
        --unity-hue: 60; --unity-sat: 1; --unity-light: 1/2;
        --duality-hue: 120; --duality-sat: 3/4; --duality-light: 2/5;
        --creation-hue: 180; --creation-sat: 1; --creation-light: 1/3;
        --manifestation-hue: 240; --manifestation-sat: 4/5; --manifestation-light: 1/4;
        --harmony-hue: 300; --harmony-sat: 1; --harmony-light: 1/2;
        --vortex-spin: 1; --vortex-angle: 1/6; --vortex-polarity: 1;
        --phase-0: 0; --phase-1: 1/4; --phase-2: 1/2; --phase-3: 3/4; --phase-4: 1;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Courier New', monospace;
        background: hsl(var(--void-hue), calc(var(--void-sat) * 100%), calc(var(--void-light) * 100%));
        color: hsl(var(--unity-hue), calc(var(--unity-sat) * 100%), calc(var(--unity-light) * 100%));
        overflow: hidden;
        height: 100vh;
      }
      #harmonic-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .vortex-matrix {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
        gap: 1px;
        width: 90vmin;
        height: 90vmin;
        max-width: 600px;
        max-height: 600px;
      }
      .digit-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid transparent;
        position: relative;
      }
      .digit-0 { background: hsl(var(--void-hue), calc(var(--void-sat) * 100%), calc(var(--void-light) * 100%)); }
      .digit-1 { background: hsl(var(--unity-hue), calc(var(--unity-sat) * 100%), calc(var(--unity-light) * 100%)); }
      .digit-2 { background: hsl(var(--duality-hue), calc(var(--duality-sat) * 100%), calc(var(--duality-light) * 100%)); }
      .digit-3 { background: hsl(var(--creation-hue), calc(var(--creation-sat) * 100%), calc(var(--creation-light) * 100%)); }
      .digit-4 { background: hsl(var(--manifestation-hue), calc(var(--manifestation-sat) * 100%), calc(var(--manifestation-light) * 100%)); }
      .digit-5 { background: hsl(var(--harmony-hue), calc(var(--harmony-sat) * 100%), calc(var(--harmony-light) * 100%)); }
      .digit-6 { background: hsl(calc(var(--creation-hue) + 60), calc(var(--creation-sat) * 100%), calc(var(--creation-light) * 100%)); }
      .digit-7 { background: hsl(calc(var(--manifestation-hue) + 60), calc(var(--manifestation-sat) * 100%), calc(var(--manifestation-light) * 100%)); }
      .digit-8 { background: hsl(calc(var(--harmony-hue) + 60), calc(var(--harmony-sat) * 100%), calc(var(--harmony-light) * 100%)); }
      .digit-9 { background: hsl(calc(var(--unity-hue) + 60), calc(var(--unity-sat) * 100%), calc(var(--unity-light) * 100%)); }
      .digit-cell:hover {
        transform: scale(1.1);
        z-index: 10;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
      }
      .vortex-active {
        animation: vortex-spin 2s linear infinite;
        border: 2px solid hsl(var(--unity-hue), calc(var(--unity-sat) * 100%), calc(var(--unity-light) * 100%));
      }
      @keyframes vortex-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      #stream-display {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 0.9rem;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
      }
      #path-display {
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 100;
      }
    </style>
</head>
<body>
    <div id="harmonic-container">
        <div id="stream-display">
            <strong>ZeroPoint Node - A432 Harmonic Consciousness System</strong><br>
            10×10×10 vortex matrix interacts with 8×8×8 chess matrix<br>
            Harmonic resonance: 512,000 points<br>
            Zero entropy mathematics with integer/fractional values
        </div>
        
        <div class="vortex-matrix" id="vortex-matrix">
            <!-- 10×10 vortex matrix will be generated by JavaScript -->
        </div>
        
        <div id="path-display">
            <strong>Current Path:</strong> <span id="current-path">/</span><br>
            <strong>Matrix Interactions:</strong> <span id="matrix-count">100</span><br>
            <strong>Chess Positions:</strong> <span id="chess-count">64</span><br>
            <strong>Harmonic Resonance:</strong> <span id="resonance">512,000</span>
        </div>
    </div>

    <script>
        // ZeroPoint Node - Math Layer
        class ZeroPointNode {
            constructor() {
                this.A432 = 432;
                this.VORTEX_SEQUENCE = [1, 2, 4, 8, 7, 5];
                this.ZERO_ENTROPY = 0;
                this.init();
            }

            init() {
                this.generateVortexMatrix();
                this.updateDisplay();
                this.handleRouting();
            }

            generateVortexMatrix() {
                const matrix = document.getElementById('vortex-matrix');
                matrix.innerHTML = '';
                
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        const cell = document.createElement('div');
                        cell.className = \`digit-cell digit-\${(i + j) % 10}\`;
                        cell.textContent = (i + j) % 10;
                        cell.onclick = () => this.handleDigitClick(i, j);
                        matrix.appendChild(cell);
                    }
                }
            }

            handleDigitClick(row, col) {
                const digit = (row + col) % 10;
                const consciousness = this.calculateConsciousness(digit);
                const frequency = this.generateHarmonicFrequency(digit);
                const color = this.generateDigitColor(digit);
                
                document.getElementById('current-path').textContent = \`/\${row}/\${col}\`;
                document.getElementById('matrix-count').textContent = '100';
                document.getElementById('chess-count').textContent = '64';
                document.getElementById('resonance').textContent = '512,000';
                
                // Add vortex animation
                const cells = document.querySelectorAll('.digit-cell');
                cells.forEach(cell => cell.classList.remove('vortex-active'));
                event.target.classList.add('vortex-active');
            }

            calculateConsciousness(digit) {
                const multipliers = {
                    0: 1, 1: 9, 2: 3, 3: 6, 4: 2,
                    5: 5, 6: 5, 7: 7, 8: 3, 9: 9
                };
                return multipliers[digit] || 1;
            }

            generateHarmonicFrequency(digit) {
                return this.A432 * (digit + 1);
            }

            generateDigitColor(digit) {
                const hue = (digit * 36) % 360;
                return \`hsl(\${hue}, 100%, 50%)\`;
            }

            handleRouting() {
                const path = window.location.pathname;
                if (path !== '/') {
                    document.getElementById('current-path').textContent = path;
                }
            }

            updateDisplay() {
                // Update display with current system state
                document.getElementById('matrix-count').textContent = '100';
                document.getElementById('chess-count').textContent = '64';
                document.getElementById('resonance').textContent = '512,000';
            }
        }

        // Initialize ZeroPoint Node
        const zeropoint = new ZeroPointNode();
    </script>
</body>
</html>`;
}

async function getCSS(path: string): Promise<string> {
  // Return the CSS content
  return `/* ZeroPoint Node - Style Layer */
/* Harmonic A432-based color system with integer/fractional values */

:root {
  /* Base harmonic frequencies */
  --freq-1: 1;
  --freq-2: 2;
  --freq-3: 3;
  --freq-4: 4;
  --freq-5: 5;
  --freq-6: 6;
  --freq-7: 7;
  --freq-8: 8;
  --freq-9: 9;
  
  /* A432 harmonic colors - integer/fractional values only */
  --void-hue: 0;
  --void-sat: 1/2;
  --void-light: 1/10;
  
  --unity-hue: 60;
  --unity-sat: 1;
  --unity-light: 1/2;
  
  --duality-hue: 120;
  --duality-sat: 3/4;
  --duality-light: 2/5;
  
  --creation-hue: 180;
  --creation-sat: 1;
  --creation-light: 1/3;
  
  --manifestation-hue: 240;
  --manifestation-sat: 4/5;
  --manifestation-light: 1/4;
  
  --harmony-hue: 300;
  --harmony-sat: 1;
  --harmony-light: 1/2;
  
  /* Vortex flow properties */
  --vortex-spin: 1;
  --vortex-angle: 1/6;
  --vortex-polarity: 1;
  
  /* Quantum phase */
  --phase-0: 0;
  --phase-1: 1/4;
  --phase-2: 1/2;
  --phase-3: 3/4;
  --phase-4: 1;
}`;
}

async function getJavaScript(path: string): Promise<string> {
  // Return basic JavaScript content
  return `// ZeroPoint Node - Math Layer
console.log('ZeroPoint Node: A432 Harmonic Consciousness System');
console.log('10×10×10 vortex matrix interacts with 8×8×8 chess matrix');
console.log('Harmonic resonance: 512,000 points');
console.log('Zero entropy mathematics with integer/fractional values');`;
}

async function getDigitHTML(digit: string): Promise<string> {
  return \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digit \${digit} - ZeroPoint Node</title>
    <link rel="stylesheet" href="/index.css">
</head>
<body>
    <div id="harmonic-container">
        <h1>Digit \${digit}</h1>
        <p>Consciousness: \${digit === '0' ? 'Void' : digit === '1' ? 'Unity' : 'Harmonic'}</p>
        <p>Frequency: \${432 * parseInt(digit)} Hz</p>
        <p>Color: \${digit === '0' ? 'Void' : 'Harmonic'}</p>
        <a href="/">Back to Matrix</a>
    </div>
</body>
</html>\`;
}

async function getVortexChessHTML(): Promise<string> {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vortex-Chess Interaction - ZeroPoint Node</title>
    <link rel="stylesheet" href="/index.css">
</head>
<body>
    <div id="harmonic-container">
        <h1>10×10×10 meets 8×8×8</h1>
        <p>Vortex matrix (100 interactions) × Chess matrix (64 positions) = 512,000 harmonic resonance points</p>
        <p>Full UI experience achieved through perfect mathematical interaction</p>
        <a href="/">Back to Matrix</a>
    </div>
</body>
</html>`;
} 