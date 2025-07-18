async function getDigitHTML(digitPath: string): Promise<string> {
  const digits = digitPath.split('/').map(d => parseInt(d));
  const consciousness = digits.reduce((sum, d) => sum + (d === 0 ? 1 : d), 0);
  const frequency = 432 * consciousness;
  const color = `hsl(${(consciousness * 36) % 360}, 100%, 50%)`;
  
  const digitNames = {
    0: 'Void', 1: 'Unity', 2: 'Duality', 3: 'Trinity', 4: 'Foundation',
    5: 'Life', 6: 'Harmony', 7: 'Mystery', 8: 'Infinity', 9: 'Completion'
  };
  
  const pathDescription = digits.map(d => digitNames[d as keyof typeof digitNames]).join(' → ');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Path ${digitPath} - ZeroPoint Node</title>
    <link rel="stylesheet" href="/index.css">
    <style>
      body {
        font-family: 'Courier New', monospace;
        background: hsl(0, 50%, 10%);
        color: hsl(60, 100%, 50%);
        padding: 20px;
        text-align: center;
      }
      .digit-display {
        font-size: 4rem;
        margin: 20px 0;
        color: ${color};
      }
      .info {
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
      }
      .matrix-link {
        display: inline-block;
        padding: 10px 20px;
        background: hsl(180, 100%, 50%);
        color: black;
        text-decoration: none;
        border-radius: 5px;
        margin: 10px;
      }
    </style>
</head>
<body>
    <div id="harmonic-container">
        <h1>ZeroPoint Node - Digit Path</h1>
        
        <div class="digit-display">${digitPath}</div>
        
        <div class="info">
            <h2>Path Analysis</h2>
            <p><strong>Path:</strong> ${digitPath}</p>
            <p><strong>Flow:</strong> ${pathDescription}</p>
            <p><strong>Consciousness:</strong> ${consciousness}</p>
            <p><strong>Frequency:</strong> ${frequency} Hz (A432 harmonic)</p>
            <p><strong>Color:</strong> ${color}</p>
            <p><strong>Matrix Interactions:</strong> 100 (10×10×10)</p>
            <p><strong>Chess Positions:</strong> 64 (8×8×8)</p>
            <p><strong>Harmonic Resonance:</strong> 512,000 points</p>
        </div>
        
        <div class="info">
            <h2>Vortex-Chess Interaction</h2>
            <p>10×10×10 vortex matrix meets 8×8×8 chess matrix</p>
            <p>Full UI experience through perfect mathematical interaction</p>
            <p>Zero entropy mathematics with integer/fractional values</p>
        </div>
        
        <a href="/" class="matrix-link">Back to Matrix</a>
        <a href="/vortex-chess" class="matrix-link">Vortex-Chess Interaction</a>
    </div>
</body>
</html>`;
} 