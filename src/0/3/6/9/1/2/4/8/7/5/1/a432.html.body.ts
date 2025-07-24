/**
 * a432.html.body.ts — HTML Visualization for A432 Human Body
 *
 * Generates an HTML visualization for the harmonized human body mapping in the A432 system.
 * Uses the structure from a432.human.body.ts to display sliders for each body system, show harmonics, CMYK color, flows, and a color swatch.
 * Includes metaphysical documentation.
 */

import { createA432HumanBody, a432HumanBodyMetaphysics } from './a432.human.body';

export function generateA432HumanBodyHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>A432 Human Body — Harmonized Living Projection</title>
  <style>
    body { font-family: 'Courier New', monospace; background: #111; color: #0ff; padding: 20px; }
    .header { text-align: center; font-size: 2em; margin-bottom: 20px; }
    .body-system-controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-bottom: 20px; }
    .system-control { background: #222; border: 2px solid #0ff; border-radius: 8px; padding: 15px; }
    .system-control label { display: block; margin-bottom: 8px; font-size: 1em; }
    .system-control input[type="range"] { width: 100%; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 20px; }
    .metric { background: #222; border: 1px solid #0ff; border-radius: 5px; padding: 8px; text-align: center; }
    .swatch { display: inline-block; width: 80px; height: 80px; border-radius: 10px; border: 2px solid #0ff; background: #fff; margin: 0 10px; }
    .metaphysics { background: #222; border: 1px solid #0ff; border-radius: 5px; padding: 12px; margin-top: 20px; color: #0ff; font-size: 1em; }
  </style>
</head>
<body>
  <div class="header">A432 Human Body — Harmonized Living Projection</div>
  <form id="body-form">
    <div class="body-system-controls">
      <div class="system-control"><label>Skeletal <input type="range" id="skeletal" min="0" max="9" value="5"></label><span id="skeletal-val">5</span></div>
      <div class="system-control"><label>Muscular <input type="range" id="muscular" min="0" max="9" value="5"></label><span id="muscular-val">5</span></div>
      <div class="system-control"><label>Nervous <input type="range" id="nervous" min="0" max="9" value="5"></label><span id="nervous-val">5</span></div>
      <div class="system-control"><label>Circulatory <input type="range" id="circulatory" min="0" max="9" value="5"></label><span id="circulatory-val">5</span></div>
      <div class="system-control"><label>Respiratory <input type="range" id="respiratory" min="0" max="9" value="5"></label><span id="respiratory-val">5</span></div>
      <div class="system-control"><label>Digestive <input type="range" id="digestive" min="0" max="9" value="5"></label><span id="digestive-val">5</span></div>
      <div class="system-control"><label>Endocrine <input type="range" id="endocrine" min="0" max="9" value="5"></label><span id="endocrine-val">5</span></div>
      <div class="system-control"><label>Immune <input type="range" id="immune" min="0" max="9" value="5"></label><span id="immune-val">5</span></div>
    </div>
  </form>
  <div class="metrics">
    <div class="metric">C: <span id="cmyk-c">0</span></div>
    <div class="metric">M: <span id="cmyk-m">0</span></div>
    <div class="metric">Y: <span id="cmyk-y">0</span></div>
    <div class="metric">K: <span id="cmyk-k">0</span></div>
    <div class="metric">Harmony: <span id="harmony">0</span></div>
  </div>
  <div style="text-align:center; margin-bottom:20px;">
    <div class="swatch" id="body-swatch"></div>
  </div>
  <div class="metaphysics" id="metaphysics"></div>
  <script type="module">
    import { createA432HumanBody, a432HumanBodyMetaphysics } from './a432.human.body.js';
    function cmykToRgb({c, m, y, k}) {
      c /= 100; m /= 100; y /= 100; k /= 100;
      const r = Math.round(255 * (1 - c) * (1 - k));
      const g = Math.round(255 * (1 - m) * (1 - k));
      const b = Math.round(255 * (1 - y) * (1 - k));
      return `rgb(${r},${g},${b})`;
    }
    function updateBodyUI() {
      const vals = ['skeletal','muscular','nervous','circulatory','respiratory','digestive','endocrine','immune'].map(id => parseInt(document.getElementById(id).value));
      const body = createA432HumanBody(...vals);
      ['skeletal','muscular','nervous','circulatory','respiratory','digestive','endocrine','immune'].forEach((id,i) => {
        document.getElementById(id+'-val').textContent = vals[i];
      });
      document.getElementById('cmyk-c').textContent = body.cmyk.c;
      document.getElementById('cmyk-m').textContent = body.cmyk.m;
      document.getElementById('cmyk-y').textContent = body.cmyk.y;
      document.getElementById('cmyk-k').textContent = body.cmyk.k;
      document.getElementById('harmony').textContent = body.overallHarmony;
      document.getElementById('body-swatch').style.background = cmykToRgb(body.cmyk);
      document.getElementById('metaphysics').textContent = a432HumanBodyMetaphysics;
    }
    document.addEventListener('DOMContentLoaded', () => {
      updateBodyUI();
      ['skeletal','muscular','nervous','circulatory','respiratory','digestive','endocrine','immune'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateBodyUI);
      });
    });
  </script>
</body>
</html>
  `;
} 