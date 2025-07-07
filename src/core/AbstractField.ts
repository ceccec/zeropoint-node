type P = number | P[];

class F {
  v: P;
  c: F[];
  t: (p: P, c: F[]) => P;
  constructor(v: P = 0, c: F[] = [], t: (p: P, c: F[]) => P = (p, c) => c.length ? c.map(x => x.e()).reduce((a, b) => (typeof a === 'number' && typeof b === 'number') ? a + b : 0, 0) : p) {
    this.v = v;
    this.c = c;
    this.t = t;
  }
  e(): P {
    return this.t(this.v, this.c);
  }
  a(f: F): F {
    this.c.push(f); return this;
  }
  m(t: (p: P, c: F[]) => P): F {
    this.t = t; return this;
  }
  s(v: P): F {
    this.v = v; return this;
  }
}

const root = new F(1);

export default root; 