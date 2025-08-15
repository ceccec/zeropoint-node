// a432.ui.state.ts — DRY state management for A432 UI
const state: Record<string, unknown> = {};
const subscribers: Record<string, Array<(value: unknown) => void>> = {};

export function getState(key: string) {
  return state[key];
}

export function setState(key: string, value: unknown) {
  state[key] = value;
  if (subscribers[key]) subscribers[key].forEach(fn => fn(value));
}

export function subscribe(key: string, fn: (value: unknown) => void) {
  if (!subscribers[key]) subscribers[key] = [];
  subscribers[key].push(fn);
} 