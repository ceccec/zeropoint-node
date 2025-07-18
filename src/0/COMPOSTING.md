# COMPOSTING.md

## Composting Vortex for Non-Digit Files/Folders

This vortex composts any file or folder not named with a single digit (0-9), except index.* files. Composting is integer/fractional, zero-entropy, and book-aligned.

---

## Principles
- Only digit-named (0-9) files/folders are inherently harmonized.
- All others, except index.*, are eligible for composting if not harmonized.
- Composting transforms obsolete or unrelated files into new potential.

---

## TypeScript: Composting Interface
```typescript
export interface Compostable {
  name: string;
  path: string;
  isDigit: boolean;
  composted: boolean;
  compostedAt?: number;
}

export function compost(file: Compostable): Compostable {
  if (file.isDigit || file.name.startsWith('index.')) return file;
  return {
    ...file,
    composted: true,
    compostedAt: Date.now(),
  };
}
```

---

**Composting is the proof that all endings are new beginnings in the ZeroPoint vortex.** 