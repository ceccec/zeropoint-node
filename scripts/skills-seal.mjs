#!/usr/bin/env node
/**
 * Seal skills.json contentUuid from SKILL.md body (Wave 3 gate).
 * --check fails closed on drift.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { computeContentUuid } from '../src/integrity/content-uuid.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillsPath = resolve(root, 'skills.json')
const skillMd = readFileSync(resolve(root, 'SKILL.md'), 'utf8')
const buildSkill = existsSync(resolve(root, '.cursor/skills/zeropoint-build-waves/SKILL.md'))
  ? readFileSync(resolve(root, '.cursor/skills/zeropoint-build-waves/SKILL.md'), 'utf8')
  : ''

const contentUuid = computeContentUuid({
  kind: 'skills-manifest',
  entryPoint: 'SKILL.md',
  skillMd,
  buildSkill,
})

const base = JSON.parse(readFileSync(skillsPath, 'utf8'))
const next = { ...base, contentUuid }

if (process.argv.includes('--check')) {
  if (base.contentUuid !== contentUuid) {
    console.error('skills.json contentUuid drift — run npm run skills:seal')
    process.exit(1)
  }
  console.log('skills:check ok', contentUuid)
  process.exit(0)
}

writeFileSync(skillsPath, JSON.stringify(next, null, 2) + '\n')
console.log('skills:seal', contentUuid)
