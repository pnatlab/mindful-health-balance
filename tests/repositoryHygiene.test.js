const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

// A fresh temporary repository, no staging, no personal files or global ignores.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mhb-ignore-fixture-'));
execFileSync('git', ['init', '-q', temp]);
fs.copyFileSync(path.join(__dirname, '../.gitignore'), path.join(temp, '.gitignore'));
function ignored(file) {
  const result = spawnSync('git', ['-c', 'core.excludesfile=/dev/null', 'check-ignore', '--no-index', '-q', '--', file], { cwd: temp });
  assert.ok([0, 1].includes(result.status));
  return result.status === 0;
}
for (const file of ['sample.xlsx', 'sample.XLSX', 'sample.xls', 'sample.xlsm', 'sample.xlsb', 'sample.xltx', 'sample.XLTM',
  'sample.csv', 'sample.tsv', '.env', '.env.local', 'local/auth.pem', 'local/auth.key', 'id_ed25519',
  'private/sample.jpg', 'private/sample.PNG', 'private/sample.HEIC', 'private/sample.heif', 'private/sample.dng',
  'private/sample.webp', 'private/sample.WEBP', 'private/sample.tiff', 'private/sample.TIFF', 'private/sample.gif', 'private/sample.GIF',
  'local-exports/sample.json', 'local-output/report.html', 'test-results/report.json', 'coverage/report.html', 'scratch.tmp']) {
  assert.equal(ignored(file), true, file);
}
for (const file of ['script.js', 'js/config/workbookSchema.js', 'docs/design_notes/example.md', '.env.example', '.env.sample',
  'assets/brand/mhb-header-mark.png', 'assets/field-review/field-room-hydration.png', 'assets/macos/mhb-app-icon-source.png',
  'assets/new-public-photo.jpg', 'assets/review.webp', 'assets/review.tiff', 'assets/review.gif',
  'docs/screenshots/review.png', 'docs/screenshots/review.webp', 'docs/screenshots/review.tiff', 'docs/screenshots/review.gif', 'tests/postS4DataIntegrity.test.js']) {
  assert.equal(ignored(file), false, file);
}
console.log('Bounded private/generated ignores and public asset exceptions passed.');
