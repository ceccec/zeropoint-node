"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class F {
    constructor(v = 0, c = [], t = (p, c) => c.length ? c.map(x => x.e()).reduce((a, b) => (typeof a === 'number' && typeof b === 'number') ? a + b : 0, 0) : p) {
        this.v = v;
        this.c = c;
        this.t = t;
    }
    e() {
        return this.t(this.v, this.c);
    }
    a(f) {
        this.c.push(f);
        return this;
    }
    m(t) {
        this.t = t;
        return this;
    }
    s(v) {
        this.v = v;
        return this;
    }
}
const root = new F(1);
exports.default = root;
//# sourceMappingURL=AbstractField.js.map