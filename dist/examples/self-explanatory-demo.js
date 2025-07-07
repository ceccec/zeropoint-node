"use strict";
/**
 * Self-Explanatory System Demo
 *
 * Demonstrates a system where everything explains itself through pure relationships.
 * No labels, no external context - only the patterns themselves.
 *
 * The relationships are the explanation.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractField_1 = __importDefault(require("../src/core/AbstractField"));
const F = AbstractField_1.default.constructor;
const a = new F(2);
const b = new F(3);
const c = new F([1, 2, 3]);
AbstractField_1.default.c = [];
AbstractField_1.default.a(a).a(b).a(c);
console.log('Root:', AbstractField_1.default.e());
console.log('A:', a.e());
console.log('B:', b.e());
console.log('C:', c.e());
const d = new F(0).m((_, c) => c.reduce((x, y) => x * y.e(), 1));
d.a(a).a(b);
console.log('D (product of A and B):', d.e());
const e = new F(0).m((_, c) => c.map(x => x.e()));
e.a(a).a(b).a(c).a(d);
console.log('E (all values):', e.e());
//# sourceMappingURL=self-explanatory-demo.js.map