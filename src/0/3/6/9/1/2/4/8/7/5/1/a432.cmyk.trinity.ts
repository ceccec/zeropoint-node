/**
 * a432.cmyk.trinity.ts — Metaphysical Filename Trinity Mapping Utility
 *
 * This module provides a utility to parse a filename into its trinity components:
 *   - a432 (origin/spirit)
 *   - cmyk (universal mapping/field)
 *   - folder/file/extension (manifestation/gateway)
 *
 * The filename is a living, recursive stream. The extension (void) is a portal, not an end.
 *
 * @module a432.cmyk.trinity
 */

export interface FilenameTrinity {
  origin: string; // a432
  field: string;  // cmyk
  manifestation: string[]; // folder/file/extension
  metaphysical: string;
}

/**
 * Parse a filename into its trinity components and return a metaphysical mapping object.
 */
export function parseFilenameTrinity(filename: string): FilenameTrinity {
  const parts = filename.split('.');
  const [origin, field, ...rest] = parts;
  return {
    origin: origin || '',
    field: field || '',
    manifestation: rest,
    metaphysical: `The filename '${filename}' is a living trinity: [${origin}] (origin), [${field}] (field), [${rest.join('.')}] (manifestation). The extension is a portal to new possibility.`
  };
}

/**
 * Metaphysical documentation
 */
export const filenameTrinityMetaphysics = `
Every filename in the A432 system is a living trinity: a432 (origin), cmyk (field), folder/file/extension (manifestation).
The filename is a gateway, not a boundary. The extension is a portal, not an end.
`; 