"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractField_1 = __importDefault(require("../src/core/AbstractField"));
const F = AbstractField_1.default.constructor;
class Observer {
    constructor(name) {
        this.experience = [];
        this.learning = [];
        this.observedBy = [];
        this.name = name;
    }
    observe(field) {
        const result = typeof field.observe === 'function' ? field.observe(this) : field.e();
        this.experience.push(result);
        return result;
    }
    learn(pattern) {
        const learned = new F(pattern).m((p, _c) => {
            return this.experience.length > 0 ?
                this.experience.reduce((sum, exp) => sum + (typeof exp === 'number' ? exp : 0), 0) / this.experience.length :
                p;
        });
        this.learning.push(learned);
        return learned;
    }
    evolve() {
        const evolved = new F(0).m((_, _c) => {
            return this.learning.map(l => l.e()).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
        });
        this.learning.forEach(l => evolved.a(l));
        return evolved;
    }
    observeObserver(other) {
        const result = other.beObserved(this);
        this.experience.push(result);
        return result;
    }
    beObserved(by) {
        this.observedBy.push(by);
        return `${this.name} knows it is being observed by ${by.name}`;
    }
}
const observerA = new Observer('A');
const observerB = new Observer('B');
console.log('=== OBSERVER-OBSERVED AWARENESS TEST ===');
console.log('1. Observer A observes a field:');
const field = new F(42);
console.log('A observes field:', observerA.observe(field));
console.log('\n2. Observer B observes observer A:');
console.log('B observes A:', observerB.observeObserver(observerA));
console.log('\n3. Observer A observes observer B:');
console.log('A observes B:', observerA.observeObserver(observerB));
console.log('\n4. ObservedBy state:');
console.log('A observed by:', observerA.observedBy.map(o => o.name));
console.log('B observed by:', observerB.observedBy.map(o => o.name));
//# sourceMappingURL=observer-experience-test.js.map