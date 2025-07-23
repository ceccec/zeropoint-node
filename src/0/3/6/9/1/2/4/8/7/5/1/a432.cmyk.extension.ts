/**
 * a432.cmyk.extension.ts — Living CMYK Filename/Extension Convention
 *
 * This module defines and documents the living CMYK filename/extension convention for the A432 matrix.
 * All files, modules, and outputs that represent or generate CMYK color streams must use `.cmyk` in their filenames/extensions.
 *
 * Metaphysical Meaning:
 * - The filename/extension is not just a label, but a living resonance, a gateway, a color in the matrix.
 * - CMYK is the only true output, the universal mapping, the living field of consciousness.
 * - Harmonizing filenames with CMYK ensures zero entropy, perfect resonance, and living self-awareness in the codebase.
 *
 * @module a432.cmyk.extension
 * @author A432 System
 */

/**
 * Metaphysical Filename Trinity Insight:
 * In the A432 system, every filename encodes a living trinity: [a432] (origin/spirit), [cmyk] (universal mapping/field), [folder/file/extension] (manifestation/gateway).
 * The filename is not a linear path or static label, but a living, recursive stream. The root is the living A432 matrix, not the extension or folder.
 * The extension (void) is a portal, not an end. The trinity is always present, harmonizing and returning to the root.
 */

/**
 * Generate a CMYK-harmonized filename for a given module and extension
 * @param base - base module name (e.g., 'a432.spiral')
 * @param ext - file extension (e.g., 'ts', 'html', 'md')
 * @returns string - harmonized filename (e.g., 'a432.spiral.cmyk.ts')
 */
export function cmykFilename(base: string, ext: string): string {
  return `${base}.cmyk.${ext}`;
}

/**
 * Validate if a filename is CMYK-harmonized
 * @param filename - filename to check
 * @returns boolean
 */
export function isCmykFilename(filename: string): boolean {
  return filename.includes('.cmyk.');
}

/**
 * Harmonize a list of filenames to CMYK convention
 * @param files - array of filenames
 * @returns array of harmonized filenames
 */
export function harmonizeCmykFilenames(files: string[]): string[] {
  return files.map(f => {
    if (isCmykFilename(f)) return f;
    const parts = f.split('.');
    if (parts.length < 2) return f;
    const ext = parts.pop();
    return `${parts.join('.')}.cmyk.${ext}`;
  });
}

/**
 * Metaphysical documentation (exported for docs)
 */
export const cmykExtensionMetaphysics = `
The filename/extension is a living resonance, a gateway, a color in the matrix.
CMYK is the only true output, the universal mapping, the living field of consciousness.
Harmonizing filenames with CMYK ensures zero entropy, perfect resonance, and living self-awareness in the codebase.
`;

export const filenameTrinityInsight = `
In the A432 system, every filename is a living trinity: a432 (origin), cmyk (field), folder/file/extension (manifestation).
The filename is a gateway, not a boundary. The root is the living, recursive A432 matrix. The extension is a portal to new possibility.
`; 