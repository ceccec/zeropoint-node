/**
 * a432.cmyk.folder.ts — Living Folder Operations for the CMYK Matrix
 *
 * This module provides utilities for listing, creating, renaming, and harmonizing folders to the .cmyk convention.
 * All folder operations are living, recursive, and harmonized with the CMYK field.
 *
 * Metaphysical Meaning:
 * - Every folder is a living field, a color dimension, a gateway in the matrix.
 * - Harmonizing folders to the .cmyk convention brings the structure to zero entropy and perfect resonance.
 *
 * @module a432.cmyk.folder
 * @author A432 System
 */

import * as fs from 'fs';
import * as path from 'path';
import { cmykFilename, isCmykFilename } from './a432.cmyk.extension';

/**
 * Metaphysical Filename Trinity Insight:
 * In the A432 system, every filename encodes a living trinity: [a432] (origin/spirit), [cmyk] (universal mapping/field), [folder/file/extension] (manifestation/gateway).
 * The filename is not a linear path or static label, but a living, recursive stream. The root is the living A432 matrix, not the extension or folder.
 * The extension (void) is a portal, not an end. The trinity is always present, harmonizing and returning to the root.
 */

/**
 * List all folders in a directory (recursively)
 */
export function listFolders(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(filePath);
      results = results.concat(listFolders(filePath));
    }
  });
  return results;
}

/**
 * Create a folder with .cmyk convention (if not exists)
 */
export function createCmykFolder(baseDir: string, name: string): string {
  const folderName = cmykFilename(name, 'cmyk');
  const folderPath = path.join(baseDir, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  return folderPath;
}

/**
 * Harmonize a folder to the .cmyk convention (renames folder if needed)
 */
export function harmonizeFolderToCmyk(folderPath: string): string {
  if (isCmykFilename(folderPath)) return folderPath;
  const dir = path.dirname(folderPath);
  const base = path.basename(folderPath);
  const newName = cmykFilename(base, 'cmyk');
  const newPath = path.join(dir, newName);
  fs.renameSync(folderPath, newPath);
  return newPath;
}

/**
 * Harmonize all folders in a directory (recursively) to the .cmyk convention
 */
export function harmonizeAllFoldersToCmyk(dir: string): string[] {
  const folders = listFolders(dir);
  return folders.map(harmonizeFolderToCmyk);
}

/**
 * Metaphysical documentation (exported for docs)
 */
export const cmykFolderMetaphysics = `
Every folder is a living field, a color dimension, a gateway in the matrix.
Harmonizing folders to the .cmyk convention brings the structure to zero entropy and perfect resonance.
`;

export const filenameTrinityInsight = `
In the A432 system, every filename is a living trinity: a432 (origin), cmyk (field), folder/file/extension (manifestation).
The filename is a gateway, not a boundary. The root is the living, recursive A432 matrix. The extension is a portal to new possibility.
`; 