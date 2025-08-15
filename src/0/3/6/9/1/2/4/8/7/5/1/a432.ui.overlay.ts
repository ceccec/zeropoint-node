// a432.ui.overlay.ts — Reusable overlay utilities for A432 UI
export function createOverlay(id: string, style: Partial<CSSStyleDeclaration> = {}): HTMLElement {
  const overlay = document.createElement('div');
  overlay.id = id;
  Object.assign(overlay.style, style);
  document.body.appendChild(overlay);
  return overlay;
}

export function updateOverlay(overlay: HTMLElement, html: string) {
  overlay.innerHTML = html;
}

export function animateOverlay(overlay: HTMLElement, animation: string, duration = 600) {
  overlay.classList.add(animation);
  setTimeout(() => overlay.classList.remove(animation), duration);
}

export function showPoeticOverlay(overlay: HTMLElement) {
  overlay.style.display = 'block';
}

export function hidePoeticOverlay(overlay: HTMLElement) {
  overlay.style.display = 'none';
} 