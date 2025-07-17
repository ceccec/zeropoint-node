const { execSync } = require('child_process');
const fs = require('fs');

const digitMeta = {
  '0': 'Void, Origin, Infinite Potential',
  '1': 'Unity, Expansion, Initiation',
  '2': 'Duality, Reflection, Polarity',
  '3': 'Creation, Resonance, Trinity',
  '4': 'Stability, Foundation, Law',
  '5': 'Change, Flow, Center',
  '6': 'Harmony, Balance, Beauty',
  '7': 'Mystery, Gateway, Spiritual Insight',
  '8': 'Infinity, Power, Manifestation',
  '9': 'Completion, Spirit, W-Axis Control'
};

function getGitLog() {
  // Get last 50 commits affecting src/
  const log = execSync('git log -n 50 --pretty=format:"%h|%ad|%s" --date=short -- src/', { encoding: 'utf8' });
  return log.split('\n').map(line => {
    const [hash, date, ...msg] = line.split('|');
    return { hash, date, msg: msg.join('|') };
  });
}

function getChangedDigits(commitHash) {
  const files = execSync(`git show --name-only --pretty="" ${commitHash} -- src/`, { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.match(/^src\/[0-9]/));
  const digits = new Set();
  files.forEach(f => {
    const m = f.match(/^src\/([0-9])/);
    if (m) digits.add(m[1]);
  });
  return Array.from(digits);
}

function metaphysicalImpact(digit, msg) {
  // Simple mapping for demo; can be expanded
  return `**${digit} (${digitMeta[digit]})**: ${msg}
  - Metaphysical impact: ${digitMeta[digit]} flows, archetype resonance, and system harmony updated.`;
}

const log = getGitLog();
let out = '# Metaphysical Changelog\n\n';
out += 'This changelog summarizes recent changes in the digit modules, with metaphysical/systemic impact.\n\n';
log.forEach(entry => {
  const digits = getChangedDigits(entry.hash);
  if (digits.length) {
    out += `## ${entry.date} — ${entry.hash}\n`;
    digits.forEach(d => {
      out += metaphysicalImpact(d, entry.msg) + '\n';
    });
    out += '\n';
  }
});
fs.writeFileSync('docs/METAPHYSICAL_CHANGELOG.md', out);
console.log('Generated: docs/METAPHYSICAL_CHANGELOG.md'); 