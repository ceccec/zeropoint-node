/**
 * The criterion subjects, re-exported from src.
 *
 * They used to be defined here. They moved to src/verification/subjects.ts so
 * they SHIP: the MCP server answers questions about the criteria, and a script
 * is not in the package, so a consumer could not run what the release gate runs.
 * This file stays as the path the gate and the paper already import.
 */
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const subjects = await import(pathToFileURL(join(ROOT, 'src/verification/subjects.ts')).href)

export const { osVerdict, quantumVerdict, allCriteria } = subjects
