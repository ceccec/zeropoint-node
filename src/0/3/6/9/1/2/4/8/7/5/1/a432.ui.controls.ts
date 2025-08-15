// a432.ui.controls.ts — Reusable UI button/control factory for A432 UI
export function createUIButton({ label, onClick, position = 'absolute', right = '16px', top = '8px', zIndex = '10001' }: {
  label: string;
  onClick: () => void;
  position?: string;
  right?: string;
  top?: string;
  zIndex?: string;
}): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.position = position;
  btn.style.right = right;
  btn.style.top = top;
  btn.style.zIndex = zIndex;
  btn.onclick = onClick;
  return btn;
} 