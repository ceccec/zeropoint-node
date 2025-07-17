const fs = require('fs');
const path = require('path');

function fixTypeScriptErrors(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixTypeScriptErrors(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix getHarmonicResult function
      content = content.replace(
        /export function getHarmonicResult\(a, b\)/g,
        'export function getHarmonicResult(a: number, b: number): number'
      );
      
      // Fix getAntiVortexDecimal function
      content = content.replace(
        /export function getAntiVortexDecimal\(a, b\)/g,
        'export function getAntiVortexDecimal(a: number, b: number): number'
      );
      
      // Fix parseInt calls to use toString()
      content = content.replace(/parseInt\(a, 10\)/g, 'parseInt(a.toString(), 10)');
      content = content.replace(/parseInt\(b, 10\)/g, 'parseInt(b.toString(), 10)');
      
      fs.writeFileSync(filePath, content);
    }
  }
}

// Fix all TypeScript files in src directory
fixTypeScriptErrors('./src');
console.log('TypeScript errors fixed!'); 