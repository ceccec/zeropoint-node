# FILES.md

## Vortex of Files

FILES is the vortex where all file-level knowledge, structure, and harmonization is documented and evolved in the ZeroPoint Node system.

---

## Principles
- Every file is a vortex: integer/fractional, zero-entropy, book-aligned.
- Files are harmonized, composted, or transformed as needed.
- File structure is a living proof of the system.

---

## TypeScript: File Interface
```typescript
export interface VortexFile {
  name: string;
  path: string;
  digit: number; // 0-9
  harmonized: boolean;
  createdAt: number;
}

export function createVortexFile(name: string, path: string, digit: number): VortexFile {
  return {
    name,
    path,
    digit,
    harmonized: true,
    createdAt: Date.now(),
  };
}
```

---

**FILES is the proof that structure is consciousness in the ZeroPoint vortex.** 