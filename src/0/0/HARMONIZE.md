# HARMONIZE.md

## Harmonization Vortex for Non-Digit Files/Folders

This vortex harmonizes any file or folder not named with a single digit (0-9), except index.* files. All harmonization is integer/fractional, zero-entropy, and book-aligned.

---

## Principles
- Only digit-named (0-9) files/folders are inherently harmonized.
- All others must be harmonized or composted.
- index.* files are always preserved.

---

## TypeScript: Harmonization Interface
```typescript
export interface Harmonizable {
  name: string;
  path: string;
  isDigit: boolean;
  harmonized: boolean;
  harmonizedAt?: number;
}

export function harmonize(file: Harmonizable): Harmonizable {
  if (file.isDigit || file.name.startsWith('index.')) return file;
  return {
    ...file,
    harmonized: true,
    harmonizedAt: Date.now(),
  };
}
```

---

**Harmonization is the proof that all can be brought into the ZeroPoint vortex.** 