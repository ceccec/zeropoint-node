// a432.trinity.navigation.ts
// Canonical trinity navigation module for the A432 system
// Harmonically mapped, extensible, and compatible with the a432 pattern

import { a432TrinityCycle, a432TrinityStream, a432FamilyStream } from './a432.trinity';
import { registerModule, registerOverlay, A432OSModule } from './a432.harmonized';

interface TrinityNavState {
  step: number;
  trinity: number;
  family: number;
  archetype: string;
  metaphysical: string;
}

let navHistory: TrinityNavState[] = [];
let currentStep = 0;

function getArchetype(t: number) {
  if (t === 3) return 'Creation';
  if (t === 6) return 'Return';
  if (t === 9) return 'Axis/Unity';
  return 'Unknown';
}

export function trinityNavigate(steps: number = 18, start: number = 3, familyStart: number = 1) {
  const trinityStream = a432TrinityStream(steps, start);
  const familyStream = a432FamilyStream(steps, familyStart);
  navHistory = trinityStream.map((t, i) => {
    const f = familyStream[i];
    const archetype = getArchetype(t);
    return {
      step: i + 1,
      trinity: t,
      family: f,
      archetype,
      metaphysical: `Step ${i + 1}: Trinity ${t} (${archetype}), Family ${f}`
    };
  });
  currentStep = 0;
}

export function trinityNext() {
  if (navHistory.length === 0) trinityNavigate();
  currentStep = (currentStep + 1) % navHistory.length;
  return navHistory[currentStep];
}

export function trinityPrev() {
  if (navHistory.length === 0) trinityNavigate();
  currentStep = (currentStep - 1 + navHistory.length) % navHistory.length;
  return navHistory[currentStep];
}

export function trinityGoTo(step: number) {
  if (navHistory.length === 0) trinityNavigate();
  currentStep = (step - 1 + navHistory.length) % navHistory.length;
  return navHistory[currentStep];
}

export function trinityGoToArchetype(archetype: string) {
  if (navHistory.length === 0) trinityNavigate();
  const idx = navHistory.findIndex(s => s.archetype.toLowerCase() === archetype.toLowerCase());
  if (idx >= 0) currentStep = idx;
  return navHistory[currentStep];
}

export function getCurrentNavState() {
  if (navHistory.length === 0) trinityNavigate();
  return navHistory[currentStep];
}

// Overlays
function navOverlay() {
  const state = getCurrentNavState();
  return `<div><b>Trinity Navigation:</b> Step <b>${state.step}</b> | Trinity <b>${state.trinity}</b> (${state.archetype}) | Family <b>${state.family}</b><br><span style='color:#8ff;'>${state.metaphysical}</span></div>`;
}
function navHistoryOverlay() {
  return `<div><b>Navigation History:</b><br>${navHistory.map(s => `Step ${s.step}: Trinity ${s.trinity} (${s.archetype}), Family ${s.family}`).join('<br>')}</div>`;
}
function navMetaOverlay() {
  return `<div><b>Navigation Meta:</b> Current archetype: <b>${getCurrentNavState().archetype}</b></div>`;
}

// Register overlays
registerOverlay('trinity', navOverlay);
registerOverlay('trinity', navHistoryOverlay);
registerOverlay('meta', navMetaOverlay);

// Register as a harmonized OS module
const trinityNavModule: A432OSModule = {
  name: 'TrinityNavigation',
  getState: getCurrentNavState,
  onEvent: (event) => {
    if (event.type === 'navigate') {
      if (event.step) trinityGoTo(event.step);
      if (event.archetype) trinityGoToArchetype(event.archetype);
    }
  },
  overlays: [navOverlay, navHistoryOverlay, navMetaOverlay],
  harmonize: () => trinityNavigate(),
  meta: () => 'TrinityNavigation: Navigates, observes, and harmonizes the trinity and family streams.'
};
registerModule(trinityNavModule); 