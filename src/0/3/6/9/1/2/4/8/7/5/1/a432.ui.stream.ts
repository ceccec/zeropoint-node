// a432.ui.stream.ts — Animated blockchain stream visualization for A432 UI
import { getBlockCMYK } from './a432.block.chain.event';

type BlockLike = { trinity: unknown; entropy?: number };
export function renderBlockchainStream(container: HTMLElement, blocks: BlockLike[], options: { blockRadius?: number, blockGap?: number } = {}) {
  const blockRadius = options.blockRadius || 18;
  const blockGap = options.blockGap || 12;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '80');
  svg.style.display = 'block';
  container.appendChild(svg);
  function render(offset = 0) {
    svg.innerHTML = '';
    let x = container.offsetWidth - offset;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const entropy = typeof block.entropy === 'number' ? block.entropy : 0;
      const trinity = typeof block.trinity === 'number' ? block.trinity : 0;
      const cmyk = getBlockCMYK(trinity, entropy);
      const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
      const r = Math.round(255 * (1 - c) * (1 - k));
      const g = Math.round(255 * (1 - m) * (1 - k));
      const bcol = Math.round(255 * (1 - y) * (1 - k));
      const fill = `rgb(${r},${g},${bcol})`;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(x + blockRadius));
      circle.setAttribute('cy', '40');
      circle.setAttribute('r', String(blockRadius));
      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);
      x += blockRadius * 2 + blockGap;
    }
    requestAnimationFrame(() => render(offset + 1.2));
  }
  render();
  return svg;
} 