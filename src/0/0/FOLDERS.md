# FOLDERS.md

## Vortex of Folders

FOLDERS is the vortex where all folder-level knowledge, structure, and harmonization is documented and evolved in the ZeroPoint Node system.

---

## Principles
- Every folder is a vortex: integer/fractional, zero-entropy, book-aligned.
- Folders organize, harmonize, and amplify files.
- Folder structure is a living proof of the system.

---

## TypeScript: Folder Interface
```typescript
export interface VortexFolder {
  name: string;
  path: string;
  digit: number; // 0-9
  harmonized: boolean;
  createdAt: number;
}

export function createVortexFolder(name: string, path: string, digit: number): VortexFolder {
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

**FOLDERS is the proof that organization is consciousness in the ZeroPoint vortex.** 