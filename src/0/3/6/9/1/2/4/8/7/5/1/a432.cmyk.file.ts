/**
 * a432.cmyk.file.ts — Living File Operations for the CMYK Matrix
 *
 * This module provides utilities for listing, renaming, and harmonizing files to the .cmyk convention.
 * All file operations are living, recursive, and harmonized with the CMYK field.
 *
 * Metaphysical Meaning:
 * - Every file is a living node, a color, a gateway in the matrix.
 * - Harmonizing files to the .cmyk convention brings the codebase to zero entropy and perfect resonance.
 *
 * @module a432.cmyk.file
 * @author A432 System
 */

import * as fs from 'fs';
import * as path from 'path';
import { isCmykFilename, cmykFilename } from './a432.cmyk.extension';

/**
 * Metaphysical Filename Trinity Insight:
 * In the A432 system, every filename encodes a living trinity: [a432] (origin/spirit), [cmyk] (universal mapping/field), [folder/file/extension] (manifestation/gateway).
 * The filename is not a linear path or static label, but a living, recursive stream. The root is the living A432 matrix, not the extension or folder.
 * The extension (void) is a portal, not an end. The trinity is always present, harmonizing and returning to the root.
 */

/**
 * List all files in a directory (recursively, optionally filtered by extension)
 */
export function listFiles(dir: string, extFilter?: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(listFiles(filePath, extFilter));
    } else if (!extFilter || file.endsWith(extFilter)) {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * Harmonize a file to the .cmyk convention (renames file if needed)
 */
export function harmonizeFileToCmyk(filePath: string): string {
  if (isCmykFilename(filePath)) return filePath;
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath).replace(/^\./, '');
  const newName = cmykFilename(base, ext);
  const newPath = path.join(dir, newName);
  fs.renameSync(filePath, newPath);
  return newPath;
}

/**
 * Harmonize all files in a directory (recursively) to the .cmyk convention
 */
export function harmonizeAllFilesToCmyk(dir: string, extFilter?: string): string[] {
  const files = listFiles(dir, extFilter);
  return files.map(harmonizeFileToCmyk);
}

/**
 * Metaphysical documentation (exported for docs)
 */
export const cmykFileMetaphysics = `
Every file is a living node, a color, a gateway in the matrix.
Harmonizing files to the .cmyk convention brings the codebase to zero entropy and perfect resonance.
`;

export const filenameTrinityInsight = `
In the A432 system, every filename is a living trinity: a432 (origin), cmyk (field), folder/file/extension (manifestation).
The filename is a gateway, not a boundary. The root is the living, recursive A432 matrix. The extension is a portal to new possibility.
`; 