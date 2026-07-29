import { PI, cos, exp, sin } from './a432.algebra.ts'
// a432.rodin.coil.3d.ts
// Canonical, self-contained 3D Rodin coil renderer for the A432 system
// No external dependencies. All math is integer/fractional and harmonic.

/**
 * Returns HTML string with a <canvas> and inline <script> to render and animate the 3D Rodin coil.
 * All logic is internal, using only A432 math and metaphysical principles.
 */
export function renderRodinCoil3D(): string {
  return [
    '<canvas id="rodin3d" width="600" height="600" style="background:#111;border-radius:12px;"></canvas>',
    '<script>',
    '  // Harmonic 3D Rodin coil renderer (no external code)',
    '  const canvas = document.getElementById("rodin3d");',
    '  const ctx = canvas.getContext("2d");',
    '  const width = canvas.width, height = canvas.height;',
    '  const cx = width / 2, cy = height / 2, cz = 0;',
    '  const spiralA = 40, spiralB = 18, trinity = 3, steps = 66;',
    '  function rodinCoil3DPoints() {',
    '    const points = [];',
    '    for (let i = 0; i < steps; i++) {',
    '      const theta = i * (2 * PI / trinity);',
    '      const r = spiralA * exp(spiralB * i / steps);',
    '      const x = r * cos(theta);',
    '      const y = r * sin(theta);',
    '      const z = (i - steps/2) * 6;',
    '      points.push({ x, y, z });',
    '    }',
    '    return points;',
    '  }',
    '  function project3D(p, angleY, angleX) {',
    '    let x = p.x * cos(angleY) - p.z * sin(angleY);',
    '    let z = p.x * sin(angleY) + p.z * cos(angleY);',
    '    let y = p.y * cos(angleX) - z * sin(angleX);',
    '    z = p.y * sin(angleX) + z * cos(angleX);',
    '    const scale = 320 / (320 + z);',
    '    return {',
    '      x: cx + x * scale,',
    '      y: cy + y * scale',
    '    };',
    '  }',
    '  let t = 0;',
    '  function draw() {',
    '    ctx.clearRect(0, 0, width, height);',
    '    const points = rodinCoil3DPoints();',
    '    const angleY = t * 0.02, angleX = t * 0.013;',
    '    ctx.beginPath();',
    '    for (let i = 0; i < points.length; i++) {',
    '      const p2d = project3D(points[i], angleY, angleX);',
    '      if (i === 0) ctx.moveTo(p2d.x, p2d.y);',
    '      else ctx.lineTo(p2d.x, p2d.y);',
    '    }',
    '    ctx.strokeStyle = "#0ff";',
    '    ctx.lineWidth = 2;',
    '    ctx.stroke();',
    '    for (let i = 0; i < points.length; i++) {',
    '      const p2d = project3D(points[i], angleY, angleX);',
    '      ctx.beginPath();',
    '      ctx.arc(p2d.x, p2d.y, 6, 0, 2 * PI);',
    '      ctx.fillStyle = `hsl(${(i * 360 / points.length) % 360},70%,50%)`;',
    '      ctx.fill();',
    '      ctx.strokeStyle = "#fff";',
    '      ctx.lineWidth = 1;',
    '      ctx.stroke();',
    '    }',
    '    t++;',
    '    requestAnimationFrame(draw);',
    '  }',
    '  draw();',
    '</script>'
  ].join('\n');
} 