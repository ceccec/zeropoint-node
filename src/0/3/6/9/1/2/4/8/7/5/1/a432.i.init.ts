// a432.i.init.ts — Auto-import all I-modules to ensure registration
// Node-only guard; in browser, modules are bundled explicitly.

if (typeof require !== 'undefined' && typeof __dirname !== 'undefined') {
  const fs = require('fs');
  const path = require('path');
  const dir = __dirname;
  fs.readdirSync(dir)
    .filter((f: string) => f.startsWith('a432.i.') && f.endsWith('.ts') && !f.includes('.test') && f !== 'a432.i.init.ts')
    .forEach((file: string) => {
      try { require(path.join(dir, file)); } catch { /* ignore */ }
    });
} 