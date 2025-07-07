type P = number | P[];
declare class F {
    v: P;
    c: F[];
    t: (p: P, c: F[]) => P;
    constructor(v?: P, c?: F[], t?: (p: P, c: F[]) => P);
    e(): P;
    a(f: F): F;
    m(t: (p: P, c: F[]) => P): F;
    s(v: P): F;
}
declare const root: F;
export default root;
//# sourceMappingURL=AbstractField.d.ts.map