"use strict";
/**
 * TypeScript/Stimulus PWA Starter - ZeroPoint Principles
 *
 * - Thin Stimulus controllers (UI only)
 * - Centralized app state and logic (App class)
 * - Declarative rendering
 * - Event-driven updates
 * - PWA integration (service worker, offline)
 */
// Centralized App State and Logic
class ConsciousnessApp {
    constructor() {
        this.observers = new Map();
        this.currentObserverId = null;
        this.events = [];
    }
    // Observer management
    addObserver(name, consciousness, type) {
        const id = `observer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.observers.set(id, { id, name, consciousness, type });
        if (!this.currentObserverId)
            this.currentObserverId = id;
        this.dispatch('observers:changed');
    }
    selectObserver(id) {
        if (this.observers.has(id)) {
            this.currentObserverId = id;
            this.dispatch('observers:changed');
        }
    }
    getObservers() {
        return Array.from(this.observers.values());
    }
    getCurrentObserver() {
        return this.currentObserverId ? this.observers.get(this.currentObserverId) || null : null;
    }
    // Event management
    createEvent(type, content, intensity, radius) {
        if (!this.currentObserverId)
            return;
        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            observerId: this.currentObserverId,
            type,
            content,
            intensity,
            radius,
            timestamp: Date.now()
        };
        this.events.push(event);
        this.dispatch('events:changed');
    }
    getEvents() {
        return this.events.filter(e => e.observerId === this.currentObserverId);
    }
    // Event-driven updates
    dispatch(event) {
        document.dispatchEvent(new CustomEvent(event));
    }
}
// Expose app globally for Stimulus controllers
window.ConsciousnessApp = new ConsciousnessApp();
// Thin Stimulus Controllers (UI only)
// observer_controller.js
/*
import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["list", "current"];
  connect() { this.render(); }
  render() {
    const app = window.ConsciousnessApp;
    const observers = app.getObservers();
    this.listTarget.innerHTML = observers.map(o =>
      `<button data-action=\"click->observer#select\" data-id=\"${o.id}\">${o.name} (${o.type}, c=${o.consciousness})</button>`
    ).join(' ');
    const current = app.getCurrentObserver();
    this.currentTarget.textContent = current ? `${current.name} (${current.type})` : 'None';
  }
  create(e) {
    e.preventDefault();
    const form = e.target;
    window.ConsciousnessApp.addObserver(form.observerName.value, parseFloat(form.consciousness.value), form.type.value);
    this.render();
    form.reset();
  }
  select(e) {
    window.ConsciousnessApp.selectObserver(e.target.dataset.id);
    this.render();
  }
}
*/
// event_controller.js
/*
import { Controller } from "stimulus";
export default class extends Controller {
  create(e) {
    e.preventDefault();
    const form = e.target;
    window.ConsciousnessApp.createEvent(form.type.value, form.content.value, parseFloat(form.intensity.value), parseInt(form.radius.value, 10));
    form.reset();
    document.querySelector('[data-controller="observer"]').controller.render();
  }
}
*/
// PWA Integration (register service worker)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('PWA Service Worker registered:', reg.scope))
            .catch(err => console.error('PWA Service Worker registration failed:', err));
    });
}
// Usage: See README for HTML and Stimulus controller wiring. 
//# sourceMappingURL=stimulus-pwa-starter.js.map